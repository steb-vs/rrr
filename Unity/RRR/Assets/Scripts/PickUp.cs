using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PickUp : MonoBehaviour
{
    public GameObject item;
    public GameObject tempParent;
    public Transform guide;

    void Start()
    {
            GetComponent<Rigidbody>().useGravity = true;
    }

    void OnMouseDown()
    {
      // GetComponent<BoxCollider>().enabled = false;
      item.GetComponent<Rigidbody>().useGravity = false;
      item.GetComponent<Rigidbody>().isKinematic = true;
      item.transform.position = guide.transform.position;
      item.transform.rotation = guide.transform.rotation;
      item.transform.parent = tempParent.transform;
    }

    void OnMouseUp()
    {
      this.transform.parent = null;
            item.GetComponent<Rigidbody>().useGravity = true;
            item.GetComponent<Rigidbody>().isKinematic = false;
            item.transform.parent = null;
            item.transform.position = guide.transform.position;
    }
}
