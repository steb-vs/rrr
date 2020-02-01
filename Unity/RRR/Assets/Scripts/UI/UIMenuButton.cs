using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class UIMenuButton : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    public Button button;
    public Text arrow;
    public float animationDuration;

    private bool _hover;
    private float _currentArrowShift;
    private float _currentButtonShift;
    private float _timer;
    private float _arrowLeft;
    private float _buttonLeft;
    private RectTransform _buttonTransform;
    private RectTransform _arrowTransform;

    private const float ARROW_SHIFT = 30;
    private const float BUTTON_SHIFT = 10;

    public void OnPointerEnter(PointerEventData eventData)
    {
        _hover = true;
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        _hover = false;
    }

    // Start is called before the first frame update
    void Start()
    {
        _buttonTransform = button.transform as RectTransform;
        _arrowTransform = arrow.transform as RectTransform;

        _arrowLeft = _arrowTransform.anchoredPosition.x;
        _buttonLeft = _buttonTransform.anchoredPosition.x;
    }

    // Update is called once per frame
    void Update()
    {
        if(_hover)
        {
            if (_timer < animationDuration)
                _timer += Time.deltaTime;

            if (_timer > animationDuration)
                _timer = animationDuration;
        }
        else
        {
            if (_timer > 0)
                _timer -= Time.deltaTime;

            if (_timer < 0)
                _timer = 0;
        }

        _arrowTransform.anchoredPosition = new Vector2(_arrowLeft + (_timer / animationDuration) * ARROW_SHIFT, _arrowTransform.anchoredPosition.y);
        _buttonTransform.anchoredPosition = new Vector2(_buttonLeft + (_timer / animationDuration) * BUTTON_SHIFT, _buttonTransform.anchoredPosition.y);
        arrow.color = new Color(arrow.color.r, arrow.color.g, arrow.color.b, _timer / animationDuration);
    }
}
