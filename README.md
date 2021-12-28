# Sistemas de recomendación. Modelos Basados en el Contenido
## ACOIDAN MESA HERNANDEZ - [alu0101206479@ull.edu.es](alu0101206479@ull.edu.es)

### Descripción del código desarrollado

Se ha desarrollado un código en ```HTML``` y ```Javascript```, este código consta de un fichero HTML con un formulario con 1 inputs:

  * Archivo de texto plano con extensión .txt. Cada documento viene representado en una línea del archivo.

Este formulario consta de un botón que cuando se pulsa llama a la función ```tratar_datos()``` del código de Javascript.

El fichero de Javascript consta de las siguientes funciones:

  * ```tratar_datos()```: Función a la que se llama desde el html, llama a la función ```obtener_tablas(documentos)``` y ```obtener_similiaridades(informacion_documentos)``` y muestra las salidas correspondientes en el HTML.
  * ```obtener_tablas(documentos)```: Función en la que se completa y se devuelve un vector con la información de los términos de los documentos (TF, IDF, TF-IDF, TF normalizados).
  * ```obtener_similiaridades(informacion_documentos)```: Función con la que se obtiene las similiaridades coseno entre los pares de documentos.
  * ```tf(terminos, documento)```: Función para calcular el TF de todos los términos de un documento determinado.
  * ```idf(terminos, documentos)```: Función para calcular el IDF de todos los términos de un documento determinado.
  * ```tf_idf(tf, idf)```: Función para calcular el TF-IDF de todos los términos de un documento determinado.

A parte de estas funciones en el fichero de Javascript también hay un manejador para el evento ```change``` del input en el que se selecciona el fichero que contiene los documentos, para obtener los terminos de estos y almacenarlos en una variable.

### Ejemplo de uso

Parametros de entrada:
  * Fichero: Seleccionar un fichero que contenga los siguientes documentos (Nos tenemos que asegurar que este fichero solo contenga espacios entre medio de los terminos, y no espacios ni al final ni al principio de cada fila o documento):  
    ```
    Aromas include tropical fruit, broom, brimstone and dried herb. The palate isn't overly expressive, offering unripened apple, citrus and dried sage alongside brisk acidity.
    This is ripe and fruity, a wine that is smooth while still structured. Firm tannins are filled out with juicy red berry fruits and freshened with acidity. It's  already drinkable, although it will certainly be better from 2016.
    Tart and snappy, the flavors of lime flesh and rind dominate. Some green pineapple pokes through, with crisp acidity underscoring the flavors. The wine was all stainless-steel fermented.
    Pineapple rind, lemon pith and orange blossom start off the aromas. The palate is a bit more opulent, with notes of honey-drizzled guava and mango giving way to a slightly astringent, semidry finish.
    Much like the regular bottling from 2012, this comes across as rather rough and tannic, with rustic, earthy, herbal characteristics. Nonetheless, if you think of it as a pleasantly unfussy country wine, it's a good companion to a hearty winter stew.
    Blackberry and raspberry aromas show a typical Navarran whiff of green herbs and, in this case, horseradish. In the mouth, this is fairly full bodied, with tomatoey acidity. Spicy, herbal flavors complement dark plum fruit, while the finish is fresh but grabby.
    Here's a bright, informal red that opens with aromas of candied berry, white pepper and savory herb that carry over to the palate. It's balanced with fresh acidity and soft tannins.
    This dry and restrained wine offers spice in profusion. Balanced with acidity and a firm texture, it's very much for food.
    Savory dried thyme notes accent sunnier flavors of preserved peach in this brisk, off-dry wine. It's fruity and fresh, with an elegant, sprightly footprint.
    This has great depth of flavor with its fresh apple and pear fruits and touch of spice. It's off dry while balanced with acidity and a crisp texture. Drink now.
    ```


Salida:
  
[![Video Salida](./Ejemplos/Salidas/documents-01.mp4)](./Ejemplos/Salidas/documents-01.mp4)
