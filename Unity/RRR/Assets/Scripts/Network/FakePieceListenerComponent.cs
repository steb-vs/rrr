﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

public class FakePieceListenerComponent : MonoBehaviour, IPieceListener
{
    public float throwFrequency;

    public event Action<PieceParameters> OnPieceReceived;

    private float _currentTimer;

    public void Update()
    {
        _currentTimer += Time.deltaTime;

        if (_currentTimer < throwFrequency)
            return;

        _currentTimer = 0;
        GeneratePiece();
    }

    private void GeneratePiece()
    {
        Vector2 direction;
        float velocity;
        PieceParameters parameters;

        direction = new Vector2(UnityEngine.Random.Range(-0.5f, 0.5f), 1.0f);
        direction = direction.normalized;

        velocity = UnityEngine.Random.Range(5.0f, 20.0f) * 100.0f;

        parameters = new PieceParameters
        {
            Direction = direction,
            Velocity = velocity,
            Properties = new PieceProperties
            {
                Brand = (PieceBrand)UnityEngine.Random.Range(1, 4),
                Color = (PieceColor)UnityEngine.Random.Range(1, 4),
                Shape = (PieceShape)UnityEngine.Random.Range(1, 4),
                Size = (PieceSize)UnityEngine.Random.Range(1, 4)
            }
        };

        OnPieceReceived?.Invoke(parameters);
    }
}