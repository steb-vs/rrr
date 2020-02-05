using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerGrab : MonoBehaviour
{
    public Camera cam;


    public float distance = 100;
    public Transform destination;

    GameObject pieceComp;

    bool grabbing = false;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        RaycastHit hit;

        Debug.DrawRay(cam.transform.position, cam.transform.forward, Color.green);

        if ((grabbing && Input.GetButtonDown("Grab")) || pieceComp?.tag == "fixed")
        {
            releaseGrab();
        }

        if (Physics.Raycast(cam.transform.position, cam.transform.forward, out hit, distance))
        {

            if (pieceComp && grabbing)
            {
                //Grabbing();
            }

            if (hit.collider.gameObject.tag == "pickable" && Input.GetButtonDown("Grab") && !grabbing)
            {
                pieceComp = hit.collider.gameObject;
                //pieceComp.GetComponent<Collider>().enabled = false;
                grabbing = true;
                Grab();
            }
        }
    }

    void Grab()
    {
        pieceComp.transform.SetParent(destination);
        pieceComp.GetComponent<Rigidbody>().isKinematic = true;
        pieceComp.GetComponent<Rigidbody>().useGravity = false;
        pieceComp.GetComponent<BoxCollider>().isTrigger = true;
        pieceComp.transform.localPosition = Vector3.zero;
        Debug.Log("Grab");
    }

    void Grabbing()
    {
        pieceComp.transform.localPosition = Vector3.zero;
    }
    void releaseGrab()
    {
        //pieceComp.GetComponent<Collider>().enabled = true;
        if(pieceComp?.tag != "fixed")
            pieceComp.GetComponent<Rigidbody>().useGravity = true;
        pieceComp.GetComponent<Rigidbody>().isKinematic = false;
        pieceComp.GetComponent<BoxCollider>().isTrigger = false;
        pieceComp.transform.SetParent(null);
        pieceComp = null;
        grabbing = false;
    }
}
