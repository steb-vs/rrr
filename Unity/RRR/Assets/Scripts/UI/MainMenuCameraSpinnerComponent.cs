using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainMenuCameraSpinnerComponent : MonoBehaviour
{
    public float rotationSpeed;

    private float _rotation;

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
        _rotation = (_rotation + (rotationSpeed * Time.deltaTime)) % 360;
        transform.rotation = Quaternion.FromToRotation(Vector3.forward, new Vector3(Mathf.Cos(_rotation * Mathf.Deg2Rad), 0, Mathf.Sin(_rotation * Mathf.Deg2Rad)));
    }
}
