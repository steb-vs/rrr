using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PieceParametersComponent : MonoBehaviour
{
    public PieceColor color;
    public PieceBrand brand;
    public PieceShape shape;
    public PieceSize size;
    public Vector2 direction;
    public float velocity;

    public void Initialize(PieceParameters parameters)
    {
        color = parameters.Properties.Color ?? PieceColor.Undefined;
        brand = parameters.Properties.Brand ?? PieceBrand.Undefined;
        shape = parameters.Properties.Shape ?? PieceShape.Undefined;
        size = parameters.Properties.Size ?? PieceSize.Undefined;
        direction = parameters.Direction;
        velocity = parameters.Velocity;
    }
}
