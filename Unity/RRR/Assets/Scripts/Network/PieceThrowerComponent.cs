using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PieceThrowerComponent : MonoBehaviour
{
    public GameObject pieceObject;
    public float spawnRadius;
    public GameObject pieceListenerObject;

    private bool _canThrow;

    // Start is called before the first frame update
    void Start()
    {
        IPieceListener pieceListener;

        pieceListener = pieceListenerObject.GetComponent<IPieceListener>();
        pieceListener.OnPieceReceived += PieceListener_OnPieceReceived;

        GameHelper.Manager.OnStateChanged += Manager_OnStateChanged;
    }

    private void Manager_OnStateChanged(GameState oldState, GameState newState)
    {
        _canThrow = newState == GameState.InGame;
    }

    private void PieceListener_OnPieceReceived(PieceParameters parameters)
    {
        GameObject pieceClone;
        PieceComp pieceParameters;
        Rigidbody body;
        Vector3 randomPos;
        Quaternion quat;

        if (!_canThrow)
            return;

        quat = Quaternion.FromToRotation(Vector3.forward, transform.forward);

        pieceClone = Instantiate(pieceObject);
        pieceClone.SetActive(true);

        randomPos = new Vector3(
            Mathf.Cos(UnityEngine.Random.Range(-180.0f * Mathf.Deg2Rad, 180.0f * Mathf.Deg2Rad)),
            Mathf.Sin(UnityEngine.Random.Range(-180.0f * Mathf.Deg2Rad, 180.0f * Mathf.Deg2Rad)),
            0);
        randomPos = randomPos.normalized;
        randomPos = quat * randomPos;

        pieceParameters = pieceClone.GetComponent<PieceComp>();
        pieceParameters.SetParameters(parameters);

        pieceClone.transform.position = transform.position + randomPos * spawnRadius;
        pieceClone.transform.rotation = transform.rotation;

        body = pieceClone.GetComponent<Rigidbody>();
        body.AddForce(quat * new Vector3(parameters.Direction.x, 0, parameters.Direction.y) * parameters.Velocity);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
