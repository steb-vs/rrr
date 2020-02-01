using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UnityEngine;

public class WebSocketPieceListener : MonoBehaviour, IPieceListener
{
    public event Action<int, PieceParameters> OnPieceReceived;

    private HttpListener _httpListener;
    private Thread _listenerThread;
    private object _actionLock;
    private List<Action> _queue;

    private void Start()
    {
        _actionLock = new object();
        _queue = new List<Action>();
        _listenerThread = new Thread(Listen);
        _listenerThread.Start();
    }

    private void Update()
    {
        lock (_actionLock)
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

            ctx = _httpListener.GetContext();
            reader = new StreamReader(ctx.Request.InputStream);
            content = reader.ReadToEnd();
            reader.Close();
            ctx.Response.Close();

            lock (_actionLock)
            {
                _queue.Add(() => Debug.Log(content));
            }
        }
    }
}
