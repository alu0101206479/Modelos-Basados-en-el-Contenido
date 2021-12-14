// Obtenemos el fichero
var fichero = document.getElementById('fichero')
let documentos = []

// Leemos el fichero y almacenamos en matriz_entrada la matriz que contiene
fichero.addEventListener('change', function(e) {
  let reader = new FileReader();
  reader.onload = function () {
    let lines = reader.result.toString()
    let filas = lines.split("\n")

    filas.forEach((fila, i) => {
      fila = fila.replace(/,/g, '');
      fila = fila.replace(/\./gi, '');
      fila = fila.toLowerCase();
      documentos.push(fila.split(" "));

      //documentos[i] = documentos[i].filter((term, index) => documentos[i].indexOf(term) === index);
    })
  }
  reader.readAsText(fichero.files[0]);
}, false)


function tf_idf(tf, idf) {
  let tf_idf = []

  // TF y IDF son vectores del mismo tamaño
  for (let i = 0; i < tf.length; i++) {
    tf_idf.push(tf[i]*idf[i])
  }

  return tf_idf;
}

function idf(documentos, terminos) {
  let idf = [];

  terminos.forEach((termino) => {
    let ocurrencias = 0;
    documentos.forEach((documento) => {
      if (documento.find(terminoD => terminoD === termino)) {
        ocurrencias++;
      }
    });

    idf.push(Math.log(documentos.length/ocurrencias)/Math.log(10));
  })

  return idf;
} 




// Función a la que se llama desde el html, recoge los datos y muestra la salida
function tratar_datos() {
  let body = document.getElementById("salida");

  // Crea un elemento <table> y un elemento <tbody>


  documentos.forEach((documento) => {
    var tabla   = document.createElement("table");
    tabla.classList.add('table');
    tabla.classList.add('table-bordered');
    tabla.classList.add('border-dark');
    
    let tblBody = document.createElement("tbody");

    // Quitamos términos duplicados para obtener un vector de términos
    let indice_terminos = JSON.parse(JSON.stringify(documento.filter((term, index) => documento.indexOf(term) === index)));

    // Índices y Términos
    let fila_indices = document.createElement("tr");
    let celda_indices = document.createElement("th");
    let textoCelda_indices = document.createTextNode("Índices");
    celda_indices.appendChild(textoCelda_indices);
    fila_indices.appendChild(celda_indices)

    let fila_terminos = document.createElement("tr");
    let celda_terminos = document.createElement("th");
    let textoCelda_terminos = document.createTextNode("Términos");
    celda_terminos.appendChild(textoCelda_terminos);
    fila_terminos.appendChild(celda_terminos)

    indice_terminos.forEach((termino, index) => {
      celda_terminos = document.createElement("td");
      textoCelda_terminos = document.createTextNode(termino);
      celda_terminos.appendChild(textoCelda_terminos);
      fila_terminos.appendChild(celda_terminos)

      celda_indices = document.createElement("td");
      textoCelda_indices = document.createTextNode(index);
      celda_indices.appendChild(textoCelda_indices);
      fila_indices.appendChild(celda_indices)
    });


    tblBody.appendChild(fila_indices)
    tblBody.appendChild(fila_terminos)


    // TF
    let tf = [];

    indice_terminos.forEach((term) => {
      let cont = 0;
      documento.forEach((termD) => {
        if (termD === term) {
          cont++;
        }
      })
      tf.push(cont);
    })

    let fila_tf = document.createElement("tr");
    let celda_tf = document.createElement("th");
    let textoCelda_tf = document.createTextNode("TF");
    celda_tf.appendChild(textoCelda_tf);
    fila_tf.appendChild(celda_tf)

    tf.forEach((tfT, index) => {
      celda = document.createElement("td");
      let textoCelda = document.createTextNode(tfT);
      celda.appendChild(textoCelda);
      fila_tf.appendChild(celda)
    });

    tblBody.appendChild(fila_tf)



    // IDF

    let idfV = idf(documentos, indice_terminos)

    let fila_idf = document.createElement("tr");
    let celda_idf = document.createElement("th");
    let textoCelda_idf = document.createTextNode("IDF");
    celda_idf.appendChild(textoCelda_idf);
    fila_idf.appendChild(celda_idf)

    idfV.forEach((idfT, index) => {
      celda = document.createElement("td");
      let textoCelda = document.createTextNode(idfT);
      celda.appendChild(textoCelda);
      fila_idf.appendChild(celda)
    });

    tblBody.appendChild(fila_idf)


    tabla.appendChild(tblBody)
    body.appendChild(tabla);
  

  
  
    // TF-IDF
    let tf_idfV = tf_idf(tf, idfV)
    console.log(tf, idfV, tf_idfV);
    let fila_tf_idf = document.createElement("tr");
    let celda_tf_idf = document.createElement("th");
    let textoCelda_tf_idf = document.createTextNode("TF-IDF");
    celda_tf_idf.appendChild(textoCelda_tf_idf);
    fila_tf_idf.appendChild(celda_tf_idf)

    tf_idfV.forEach((tf_idfT, index) => {
      celda = document.createElement("td");
      let textoCelda = document.createTextNode(tf_idfT);
      celda.appendChild(textoCelda);
      fila_tf_idf.appendChild(celda)
    });

    tblBody.appendChild(fila_tf_idf)




    tabla.appendChild(tblBody)
    body.appendChild(tabla);
  })

  
}