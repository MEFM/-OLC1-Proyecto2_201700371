//Seccion para Abrir

var codeMirr; //Objeto de tipo CodeMirror Java
var codeMirrjs; //Objeto de CM, JavaScript
var codeMirrpy; //Objeto de CM, Python

function tomarValor(cM, cMj, cMp) {
  this.codeMirr = cM;
  this.codeMirrjs = cMj;
  this.codeMirrpy = cMp;
}

var nombreArchivo; //Nombre del archivo con que se guardaran todas las salidas
var result = document.getElementById("myCode");
var file = document.getElementById("file");


function readAsText() {
  var file = document.getElementById("file").files[0];
  this.nombreArchivo = file.name;
  var reader = new FileReader();
  //Read the file into the page as text
  reader.readAsText(file);
  var texto = "";
  reader.onload = function (f) {
    var result = document.getElementById("myCode");
    texto = this.result.toString();
    aaa(texto);
  };
}

function aaa(texto) {
  this.codeMirr.getDoc().setValue(texto);
}

//Seccion Para Guardar Archivos

function seleccionArchivo() {
  var cod = document.getElementById("Archivo").value;

  switch (cod) {
    case "Guardar":
        guardarArchivo();
        //console.log(this.cM.getValue().toString());
      break;
    case "GuardarC":
        guardarComo();
      break;
    case "Salida":
        salida();
      break;
    default:

  }
}

function guardarArchivo(){
    var contenidoFuente = this.codeMirr.getValue();
    var contenidoJs = this.codeMirrjs.getValue();
    var contenidoPy = this.codeMirrpy.getValue();

    if (contenidoJs == ""){
        contenidoJs = " ";
    }
    if (contenidoPy == ""){
        contenidoPy = " ";
    }

    if (contenidoFuente == ""){
        contenidoFuente = " ";
    }    

    console.log(contenidoFuente);

    descarga(this.nombreArchivo, contenidoFuente);
    descarga(this.nombreArchivo+".js",contenidoJs);
    descarga(this.nombreArchivo+".py", contenidoPy);


}

function descarga(filename, text){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function salida(){

}

//Seccion para envio de texto para analisis
function Analizar() {
    
}
