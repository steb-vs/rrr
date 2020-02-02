using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public float score;
    public GameState state;

    public event Action<GameState, GameState> OnStateChanged;

    private bool _init;

    // Start is called before the first frame update
    void Start()
    {
        GameHelper.Manager = this;
        state = GameState.MainMenu;
    }

    // Update is called once per frame
    void Update()
    {
        if (_init)
            return;

        _init = true;
        SetState(GameState.MainMenu);
    }

    public void SetState(GameState newState)
    {
        OnStateChanged?.Invoke(state, newState);
        state = newState;
    }

    public void StartGame() => SetState(GameState.InGame);
}
