using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainMenuComponent : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        GameHelper.Manager.OnStateChanged += Manager_OnStateChanged;
    }

    private void Manager_OnStateChanged(GameState oldState, GameState newState)
    {
        gameObject.SetActive(newState == GameState.MainMenu);
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnDestroy()
    {
        GameHelper.Manager.OnStateChanged -= Manager_OnStateChanged;
    }
}
