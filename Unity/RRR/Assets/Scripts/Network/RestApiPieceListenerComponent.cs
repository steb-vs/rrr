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

public class RestApiPieceListenerComponent : MonoBehaviour, IPieceListener
{
    public event Action<PieceParameters> OnPieceReceived;

    private HttpListener _httpListener;
    private Thread _listenerThread;
    private object _queueLock;
    private List<Action> _queue;
    private Dictionary<string, Action<string>> _handlers;

    private void Start()
    {
        _handlers = new Dictionary<string, Action<string>>
        {
            { "piece",  HandlePiece}
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

            ctx = _httpListener.GetContext();
            reader = new StreamReader(ctx.Request.InputStream);
            content = reader.ReadToEnd();
            reader.Close();
            ctx.Response.Close();
            resourcePath = ctx.Request.Url.LocalPath.Substring(1);

            if (_handlers.ContainsKey(resourcePath))
            {
                lock(_queueLock)
                {
                    _queue.Add(() => _handlers[resourcePath]?.Invoke(content));
                }
            }
        }
    }

    private void HandlePiece(string content)
    {
        PieceParameters parameters;

        try
        {
            parameters = JsonConvert.DeserializeObject<PieceParameters>(content);
            OnPieceReceived?.Invoke(parameters);
        }
        catch
        {
            Debug.LogError("Erreur lors de la déserialisation de la pièce.");
        }
    }
}
