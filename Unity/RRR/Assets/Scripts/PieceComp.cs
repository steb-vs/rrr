using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PieceComp : MonoBehaviour
{
    public Light myLight;
    public Mesh[] meshes;
    public Texture[] textures;

    public PieceBrand brand;
    public PieceColor color;
    public PieceShape shape;
    public PieceSize size;

    MeshFilter shapeMesh;
    Renderer myMat;


    // Start is called before the first frame update
    void Start()
    {

        //Change color randomly
        switch (color)
        {
            case PieceColor.Red:
                myLight.color = Color.red;
                break;
            case PieceColor.Green:
                myLight.color = Color.green;
                break;
            case PieceColor.Blue:
                myLight.color = Color.blue;
                break;
            default:
                myLight.color = Color.black;
                break;
        }

        shapeMesh = GetComponent<MeshFilter>();
        switch (shape)
        {
            case PieceShape.Cube:
                shapeMesh.mesh = meshes[0];
                break;
            case PieceShape.Sphere:
                shapeMesh.mesh = meshes[1];
                break;
            case PieceShape.Cylinder:
                shapeMesh.mesh = meshes[2];
                break;
            default:
                shapeMesh.mesh = meshes[0];
                break;
        }
        myMat = GetComponent<Renderer>();
        switch (brand)
        {
            case PieceBrand.Durex:
                myMat.material.SetTexture("_MainTex",textures[0]);
                break;
            case PieceBrand.Lays:
                myMat.material.SetTexture("_MainTex", textures[1]);
                break;
            case PieceBrand.Ikea:
                myMat.material.SetTexture("_MainTex", textures[2]);
                break;
            default:
                myMat.material.SetTexture("_MainTex", textures[0]);
                break;
        }
        switch (size)
        {
            case PieceSize.Small:
                transform.localScale = new Vector3(0.2f, 0.2f, 0.2f);
                break;
            case PieceSize.Medium:
                transform.localScale = new Vector3(0.42f, 0.42f, 0.42f);
                break;
            case PieceSize.Large:
                transform.localScale = new Vector3(0.65f, 0.65f, 0.65f);
                break;
            default:
                transform.localScale = new Vector3(1f, 1f, 1f);
                break;
        }

    }

    public void SetParameters(PieceParameters parameters)
    {
        color = parameters.Properties.Color ?? PieceColor.Undefined;
        brand = parameters.Properties.Brand ?? PieceBrand.Undefined;
        shape = parameters.Properties.Shape ?? PieceShape.Undefined;
        size = parameters.Properties.Size ?? PieceSize.Undefined;

        //Change color randomly
        switch (color)
        {
            case PieceColor.Red:
                myLight.color = Color.red;
                break;
            case PieceColor.Green:
                myLight.color = Color.green;
                break;
            case PieceColor.Blue:
                myLight.color = Color.blue;
                break;
            default:
                myLight.color = Color.black;
                break;
        }

        shapeMesh = GetComponent<MeshFilter>();
        switch (shape)
        {
            case PieceShape.Cube:
                shapeMesh.mesh = meshes[0];
                break;
            case PieceShape.Sphere:
                shapeMesh.mesh = meshes[1];
                break;
            case PieceShape.Cylinder:
                shapeMesh.mesh = meshes[2];
                break;
            default:
                shapeMesh.mesh = meshes[0];
                break;
        }
        myMat = GetComponent<Renderer>();
        switch (brand)
        {
            case PieceBrand.Durex:
                myMat.material.SetTexture("_MainTex", textures[0]);
                break;
            case PieceBrand.Lays:
                myMat.material.SetTexture("_MainTex", textures[1]);
                break;
            case PieceBrand.Ikea:
                myMat.material.SetTexture("_MainTex", textures[2]);
                break;
            default:
                myMat.material.SetTexture("_MainTex", textures[0]);
                break;
        }
        switch (size)
        {
            case PieceSize.Small:
                transform.localScale = new Vector3(0.2f, 0.2f, 0.2f);
                break;
            case PieceSize.Medium:
                transform.localScale = new Vector3(0.42f, 0.42f, 0.42f);
                break;
            case PieceSize.Large:
                transform.localScale = new Vector3(0.65f, 0.65f, 0.65f);
                break;
            default:
                transform.localScale = new Vector3(1f, 1f, 1f);
                break;
        }
    }


    // Update is called once per frame
    void Update()
    {
        
    }
}