# Data contract

**direction**

Direction du swipe normalisée.

|Langage|Type|
|-------|----|
|C#|Vector2|
|JS|object|

**velocity**

Vitesse du swipe.

|Langage|Type|
|-------|----|
|C#|float|
|JS|number|

**properties**

Propriétés de la pièce.

|Langage|Type|
|-------|----|
|C#|Object|
|JS|object|

**properties.brand**

Marque de la pièce.

|Langage|Type|
|-------|----|
|C#|enum (*TBD*)|
|JS|string (*TBD*)|

**properties.color**

Couleur de la pièce.

|Langage|Type|
|-------|----|
|C#|enum (Red, Blue, Green, etc.)|
|JS|string (red, blue, green, etc.)|

**properties.shape**

Couleur de la pièce.

|Langage|Type|
|-------|----|
|C#|enum (Cube, Sphere, etc.)|
|JS|string (cube, Sshere, etc.)|

**properties.size**

Taille de la pièce.

|Langage|Type|
|-------|----|
|C#|enum (Small, Medium, Large, etc.)|
|JS|string (small, medium, large, etc.)|

**Exemple**

```json
{
	"direction": {
		"x": 0.5,
		"y": 0.5
	},
	"velocity": 15.983,
	"properties": {
		"brand": "Durex",
		"color": "red",
		"shape": "cube",
		"size": "small"
	}
}
```