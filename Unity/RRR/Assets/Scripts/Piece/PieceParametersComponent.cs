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
        color = parameters.Properties.Color;
        brand = parameters.Properties.Brand;
        shape = parameters.Properties.Shape;
        size = parameters.Properties.Size;
        direction = parameters.Direction;
        velocity = parameters.Velocity;
    }
}
