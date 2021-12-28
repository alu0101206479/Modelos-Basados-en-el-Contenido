// Obtenemos el fichero
var fichero = document.getElementById('fichero')
let documentos = []

// Leemos el fichero y almacenamos en documentos un vector en el que cada posicion contiene un vector con las palabras de cada documento respectivamente
fichero.addEventListener('change', function(e) {
  documentos = []

  let reader = new FileReader();
  reader.onload = function () {
    let lines = reader.result.toString()
    let filas = lines.split("\n")

    filas.forEach((fila, i) => {
      fila = fila.replace(/,/g, '');
      fila = fila.replace(/\./gi, '');
      fila = fila.toLowerCase();
      documentos.push(fila.split(" "));
    })
  }
  reader.readAsText(fichero.files[0]);
}, false)



// Función para calcular el TF de todos los términos de un documento determinado
function tf(terminos, documento) {
  let tfs = []

  terminos.forEach((term) => {
    let cont = 0;
    documento.forEach((termD) => {
      if (termD === term) {
        cont++;
      }
    })
    tfs.push(cont);
  })

  return tfs
}



// Función para calcular el IDF de todos los términos de un documento determinado
function idf(terminos, documentos) {
  let idf = [];

  terminos.forEach((termino) => {
    let ocurrencias = 0;
    documentos.forEach((documento) => {
      if (documento.find(terminoD => terminoD === termino)) {
        ocurrencias++;
      }
    });

    idf.push(Math.log10(documentos.length/ocurrencias));
  })

  return idf;
} 



// Función para calcular el TF-IDF de todos los términos de un documento determinado
function tf_idf(tf, idf) {
  let tf_idf = []

  // TF y IDF son vectores del mismo tamaño ya que refieren a los mismos términos
  for (let i = 0; i < tf.length; i++) {
    tf_idf.push(tf[i]*idf[i])
  }

  return tf_idf;
}



// Función en la que se completa y se devuelve un vector con la información de los términos de los documentos (TF, IDF, TF-IDF, TF normalizados)
function obtener_tablas(documentos) {
  let informacion_documentos = []     //  Vector en la que cada posición es un documento, y en cada posicion se almacena un vector con subvectores [indice, termino, tf, idf, tf-idf, tf-normalizados]

  // Completamos un vector con la información de los términos de cada documento y lo pusheamos en el vector con la información de todos los documentos
  documentos.forEach((documento) => {
    let informacion_documento = [];

    // Quitamos términos duplicados para obtener un vector de términos
    let terminos = JSON.parse(JSON.stringify(documento.filter((term, index) => documento.indexOf(term) === index)));


    // Índices y Términos
    terminos.forEach((termino, index) => {
      informacion_documento.push([index, termino]);
    });

    // TF
    let tfV = tf(terminos, documento);

    tfV.forEach((frecuencia, index) => {
      informacion_documento[index].push(frecuencia);
    })


    // IDF
    let idfV = idf(terminos, documentos)

    idfV.forEach((idfT, index) => {
      informacion_documento[index].push(idfT);
    });  
  
    // TF-IDF
    let tf_idfV = tf_idf(tfV, idfV)

    tf_idfV.forEach((tf_idfT, index) => {
      informacion_documento[index].push(tf_idfT);
    });


    // Principio de la similiaridad coseno (Normalización)

    // Calculo del tf que se utiliza para la similiaridad 1+log(tf)
    let tf_similiaridad = [];
    tfV.forEach((frecuencia, index) => {
      tf_similiaridad.push(1+Math.log10(frecuencia));
    })

    // Calculo de longitudes
    let sumatorio = 0;
    tf_similiaridad.forEach((frecuencia) => {
      sumatorio = sumatorio + Math.pow(frecuencia, 2)
    })
    
    let longitud = Math.sqrt(sumatorio)

    // Normalización
    tf_similiaridad.forEach((frecuencia, index) => {
      informacion_documento[index].push(frecuencia/longitud);
    })

    informacion_documentos.push(informacion_documento);
  })


  return informacion_documentos;
}



// Función con la que se obtiene las similiaridades coseno entre los pares de documentos
function obtener_similiaridades(informacion_documentos) {
  let similiaridades = []   // Vector que almacena las similaridades, este vector tiene el formato [[Documento1, [[Documento2, COS(D1,D2)], [Documento3, COS(D1,D3)]]], [Documento2, [[Documento1, COS(D2,D1)], [Documento3, COS(D2,D3)]]].....]

  for (let i = 0; i < informacion_documentos.length; i++) {
    for (let j = 0; j < informacion_documentos.length; j++) {
      
      if (i !== j) {  // Condicional para que no se haga comparación entre documentos iguales
        let coseno = 0;
        for (let k = 0; k < informacion_documentos[i].length; k++) {  // Se hace el sumatorio de las multiplicaciones de los TF normalizados de las palabras comunes entre ambos documentos
          let indice = informacion_documentos[j].findIndex((palabra) => {
            if (informacion_documentos[i][k][1] === palabra[1]) {
              return true;
            }
          })

          if (indice !== -1) {
            coseno = coseno + (informacion_documentos[i][k][5] * informacion_documentos[j][indice][5])
            console.log(informacion_documentos[i][k][5], informacion_documentos[j][indice][5], coseno);
          }
        }

        let indice = similiaridades.findIndex((documento) => {
          if (documento[0] === i) {
            return true;
          }
        });

        if (indice === -1) {
          similiaridades.push([i, [[j, coseno]]])
        } else {
          similiaridades[indice][1].push([j, coseno]);
        }
      }
    }
  }

  return similiaridades;
}


// Función a la que se llama desde el html, llama a la función obtener_tablas() y obtener_similiaridades(informacion_documentos) y muestra las salidas correspondientes en el HTMLfunction tratar_datos() {
function tratar_datos() {
  if (documentos.length === 0) {
    alert("Los documentos no se han cargado bien, es posible que el fichero de entrada este vacío")
  } else {
    let salida = document.getElementById("salida");
    salida.innerHTML = "";

    let br = document.createElement("br");
    let titulo = document.createElement("h3");
    texto = document.createTextNode("Tabla de los documentos");
    titulo.appendChild(texto);
    salida.appendChild(titulo)

    let informacion_documentos = obtener_tablas(documentos)     //  Vector en la que cada posición es un documento, y en cada posicion se almacena un vector con subvectores [indice, termino, tf, idf, tf-idf, tf-normalizados]
    console.log(informacion_documentos);
    // Se muestra por pantalla las tablas de cada documento
    documentos.forEach((documento, n_documento) => {
      let titulo_documento = document.createElement("h5");
      texto = document.createTextNode("Documento "+(n_documento+1));
      titulo_documento.appendChild(texto);
      salida.appendChild(titulo_documento)

      var container_tabla = document.createElement("div");
      container_tabla.classList.add('container-md');
      container_tabla.style.overflowX = "scroll"
      container_tabla.style.overflowY = "hidden"
      container_tabla.style.marginBottom = "1%"

      var tabla   = document.createElement("table");
      tabla.classList.add('table');
      tabla.classList.add('table-bordered');
      tabla.classList.add('border-dark');
      
      
      let tblBody = document.createElement("tbody");

      let fila_indices = document.createElement("tr");
      let celda = document.createElement("th");
      texto = document.createTextNode("Índices");
      celda.appendChild(texto);
      fila_indices.appendChild(celda)

      let fila_terminos = document.createElement("tr");
      celda = document.createElement("th");
      texto = document.createTextNode("Términos");
      celda.appendChild(texto);
      fila_terminos.appendChild(celda)

      let fila_tf = document.createElement("tr");
      celda = document.createElement("th");
      texto = document.createTextNode("TF");
      celda.appendChild(texto);
      fila_tf.appendChild(celda)

      let fila_idf = document.createElement("tr");
      celda = document.createElement("th");
      texto = document.createTextNode("IDF");
      celda.appendChild(texto);
      fila_idf.appendChild(celda)

      let fila_tf_idf = document.createElement("tr");
      celda = document.createElement("th");
      texto = document.createTextNode("TF-IDF");
      celda.appendChild(texto);
      fila_tf_idf.appendChild(celda)

      informacion_documentos[n_documento].forEach((termino) => {
        celda = document.createElement("td");
        texto = document.createTextNode(termino[0]);
        celda.appendChild(texto);
        fila_indices.appendChild(celda);

        celda = document.createElement("td");
        texto = document.createTextNode(termino[1]);
        celda.appendChild(texto);
        fila_terminos.appendChild(celda);

        celda = document.createElement("td");
        texto = document.createTextNode(termino[2]);
        celda.appendChild(texto);
        fila_tf.appendChild(celda);

        celda = document.createElement("td");
        texto = document.createTextNode(termino[3]);
        celda.appendChild(texto);
        fila_idf.appendChild(celda);

        celda = document.createElement("td");
        texto = document.createTextNode(termino[4]);
        celda.appendChild(texto);
        fila_tf_idf.appendChild(celda);
      })

      tblBody.appendChild(fila_indices);
      tblBody.appendChild(fila_terminos);
      tblBody.appendChild(fila_tf);
      tblBody.appendChild(fila_idf);
      tblBody.appendChild(fila_tf_idf);

      tabla.appendChild(tblBody);
      container_tabla.appendChild(tabla)
      salida.appendChild(container_tabla);
    })

    salida.appendChild(br)
    salida.appendChild(br)


    // Similiaridad coseno
    let similiaridades = obtener_similiaridades(informacion_documentos)

    // Se muestran por pantallas las similiaridades
    titulo = document.createElement("h3");
    texto = document.createTextNode("Similaridad coseno entre cada par de documentos");
    titulo.appendChild(texto);
    salida.appendChild(titulo);

    similiaridades.forEach((documento) => {
      let titulo_documento = document.createElement("h5");
      texto = document.createTextNode("· Documento "+ (documento[0]+1));
      titulo_documento.appendChild(texto);
      salida.appendChild(titulo_documento);

      let comparaciones = document.createElement("p")
      let comparacionesTexto = "";
      documento[1].forEach((comparacion) => {
        comparacionesTexto = comparacionesTexto + "Documento " + (documento[0]+1) + " - " + (comparacion[0]+1) + ": <b>" + comparacion[1] + "</b><br>"
      })

      comparaciones.innerHTML = comparacionesTexto;

      salida.appendChild(comparaciones);
    })
  }  
}