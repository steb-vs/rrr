using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerControl : MonoBehaviour
{
    [SerializeField]
    private float speed;

    Rigidbody rb;
    // Start is called before the first frame update
    private void Start()
    {
        rb = GetComponent<Rigidbody>();
        GameHelper.Manager.OnStateChanged += Manager_OnStateChanged;
    }

    private void Manager_OnStateChanged(GameState oldState, GameState newState)
    {
        gameObject.SetActive(newState == GameState.InGame);
    }

    private void FixedUpdate()
    {
        if (GameHelper.Manager.state != GameState.InGame)
            return;

      #region Motion
      var x = Input.GetAxis("Horizontal");
      var z = Input.GetAxis("Vertical");
      rb.MovePosition(transform.position + transform.TransformDirection(x, 0, z) * Time.deltaTime * speed);
      #endregion
    }

    private void OnDestroy()
    {
        GameHelper.Manager.OnStateChanged -= Manager_OnStateChanged;
    }
}
