using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public static class Utils
{
    public static int Count<TEnum>()
        where TEnum : Enum
    {
        return Enum.GetNames(typeof(TEnum)).Length;
    }

    public static TEnum Random<TEnum>()
        where TEnum : Enum
    {
        return (TEnum)(object)UnityEngine.Random.Range(0, Count<TEnum>());
    }
}
