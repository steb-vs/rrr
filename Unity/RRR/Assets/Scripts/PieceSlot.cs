using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PieceSlot : MonoBehaviour
{
    public bool testing = false;

    public Light myLight;
    public Mesh[] meshes;
    public Texture[] textures;

    public PieceBrand brand;
    public PieceColor color;
    public PieceShape shape;
    public PieceSize size;

    MeshFilter shapeMesh;
    Renderer myMat;

    Transform pieceSlot;

    // Start is called before the first frame update
    void Start()
    {
        GameHelper.Manager.maxScore++;
        pieceSlot = transform.GetChild(0);
        shapeMesh = GetComponent<MeshFilter>();
        myMat = GetComponent<Renderer>();

        if (!testing)
        {
            brand = (PieceBrand)Random.Range(1, 4);
            color = (PieceColor)Random.Range(1, 4);
            shape = (PieceShape)Random.Range(1, 4);
            size = (PieceSize)Random.Range(1, 4);
        }

        //Change color randomly
        switch (color)
        {
            case PieceColor.Red:
                myLight.color = Color.red;
                myMat.material.SetColor("_EmissionColor", Color.red);
                break;
            case PieceColor.Green:
                myLight.color = Color.green;
                myMat.material.SetColor("_EmissionColor", Color.green);
                break;
            case PieceColor.Blue:
                myLight.color = Color.blue;
                myMat.material.SetColor("_EmissionColor", Color.blue);
                break;
            default:
                myLight.color = Color.black;
                myMat.material.SetColor("_EmissionColor", Color.black);
                break;
        }

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


    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.tag == "pickable")
        {
            if (CompareTo(other.gameObject.GetComponent<PieceComp>()))
            {

                GameObject piece = other.gameObject;
                piece.transform.SetParent(transform);
                piece.transform.localPosition = pieceSlot.transform.localPosition;
                piece.transform.localRotation = pieceSlot.transform.localRotation;
                piece.tag = "fixed";
                piece.GetComponent<BoxCollider>().enabled = false;
                GameHelper.Manager.score++;
            }
        }
    }

    bool CompareTo(PieceComp piece)
    {
        bool result = false;

        if (brand == piece.brand && color == piece.color && size == piece.size && shape == piece.shape)
        {
            result = true;
        }
        Debug.Log(result);
        return result;
    }
}