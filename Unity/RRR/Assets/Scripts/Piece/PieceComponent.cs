using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PieceComponent : MonoBehaviour
{
    private PieceParametersComponent _parameters;

    // Start is called before the first frame update
    void Start()
    {
        _parameters = GetComponent<PieceParametersComponent>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
