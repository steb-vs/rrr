using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UnityEngine;

public class RestApiComponent : MonoBehaviour, IPieceListener
{
    public event Action<PieceParameters> OnPieceReceived;

    public delegate void RequestHandler(string resourcePath, string body, HttpListenerResponse response);

    private HttpListener _httpListener;
    private Thread _listenerThread;
    private object _queueLock;
    private List<Action> _queue;
    private Dictionary<string, RequestHandler> _handlers;

    private void Start()
    {
        _handlers = new Dictionary<string, RequestHandler>
        {
            { "piece",  BeginHandlePiece },
            { "controller",  SendControllerApp },
            { "controller/*",  SendControllerAppResource },
        };

        _queueLock = new object();
        _queue = new List<Action>();
        _listenerThread = new Thread(Listen);
        _listenerThread.Start();
    }

    private void Update()
    {
        lock (_queueLock)
        {
            foreach (Action action in _queue)
                action();

            _queue = new List<Action>();
        }
    }

    private void Listen()
    {
        _httpListener = new HttpListener();
        _httpListener.Prefixes.Add("http://*:2020/");
        _httpListener.Start();

        while(true)
        {
            HttpListenerContext ctx;
            StreamReader reader;
            string content;
            string resourcePath;
            string resourcePathRoot;

            ctx = _httpListener.GetContext();

            reader = new StreamReader(ctx.Request.InputStream);
            content = reader.ReadToEnd();
            reader.Close();

            resourcePath = ctx.Request.Url.LocalPath.Substring(1);
            resourcePathRoot = resourcePath.Split('/')[0];
            ctx.Response.AppendHeader("Access-Control-Allow-Origin", "*");

            if (_handlers.ContainsKey(resourcePath))
                _handlers[resourcePath]?.Invoke(resourcePath, content, ctx.Response);
            else
            {
                string key = _handlers.Keys.FirstOrDefault(x => x.StartsWith(resourcePathRoot) && x.EndsWith("/*"));

                if(key != null)
                    _handlers[key]?.Invoke(resourcePath, content, ctx.Response);
            }

            ctx.Response.Close();
        }
    }

    private void Invoke(Action action)
    {
        lock (_queueLock)
            _queue.Add(action);
    }

    private void InvokeAndWait(Action action)
    {
        object lockObj;
        bool done;

        lockObj = new object();
        done = false;

        Invoke(() =>
        {
            action();
            lock (lockObj)
                done = true;
        });

        while (true)
        {
            lock (lockObj)
                if (done)
                    break;

            Thread.Sleep(1);
        }
    }

    private void SendControllerAppResource(string resourcePath, string body, HttpListenerResponse response)
    {
        string relPath;
        string rootResPath;
        byte[] data;

        relPath = resourcePath.Replace("controller/", "");
        rootResPath = "ControllerApp/";
        data = File.ReadAllBytes("./" + rootResPath + relPath);
        response.ContentLength64 = data.Length;
        response.OutputStream.Write(data, 0, data.Length);
    }

    private void SendControllerApp(string resourcePath, string body, HttpListenerResponse response)
    {
        TextAsset txtAsset;
        byte[] data;

        txtAsset = null;
        data = null;
        InvokeAndWait(() => {
            txtAsset = Resources.Load("controller") as TextAsset;
            data = Encoding.UTF8.GetBytes(txtAsset.text);
        });
        response.ContentLength64 = data.Length;
        response.OutputStream.Write(data, 0, data.Length);
    }

    private void BeginHandlePiece(string resourcePath, string body, HttpListenerResponse response) => Invoke(() => HandlePiece(body));
    private void HandlePiece(string body)
    {
        PieceParameters parameters;

        try
        {
            parameters = JsonConvert.DeserializeObject<PieceParameters>(body);
            OnPieceReceived?.Invoke(parameters);
        }
        catch
        {
            Debug.LogError("Erreur lors de la déserialisation de la pièce.");
        }
    }
}
