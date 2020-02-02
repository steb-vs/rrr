using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MouseLook : MonoBehaviour
{
    public float mouseSensitivity = 100f;

    public Transform playerBody;

    float xRotation = 0f;
    // Start is called before the first frame update
    void Start()
    {
        GameHelper.Manager.OnStateChanged += Manager_OnStateChanged;
    }

    private void Manager_OnStateChanged(GameState oldState, GameState newState)
    {
        Cursor.lockState = newState == GameState.InGame ? CursorLockMode.Locked : CursorLockMode.None;
    }

    // Update is called once per frame
    void Update()
    {
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -90f, 90f);

        transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
        playerBody.Rotate(Vector3.up * mouseX);
    }

    private void OnDestroy()
    {
        GameHelper.Manager.OnStateChanged -= Manager_OnStateChanged;
    }
}
