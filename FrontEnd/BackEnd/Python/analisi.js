class Analisis {
  simbolos = {
    ParAp: "(",
    ParC: ")",
    LlavAp: "{",
    LlavC: "}",
    CorAp: "[",
    CorC: "]",
    Coma: ",",
    PuntC: ";",
    Punto: ".",
    DosP: ":",
    Bar: "|",
    Apr: "&",
    Slash: "/",
    Asterisco: "*",
    MayorQue: ">",
    MenorQue: "<",
    Asig: "=",
    Negar: "!",
    Xor: "^",
    Guion: "-",
  };

  lex(texto) {
    var lineas = texto.split("\n");

    var estado = 0;

    var palabra = "";

    //En este analizador a patita la i es fila y j columna

    for (var i = 0; i < lineas.length; i++) {
      var caracteres = lineas[i].split("");

      for (var j = 0; j < caracteres.length; j++) {
        switch (estado) {
          case 0:
            if (caracteres[j].match("[A-Za-z]")) {
              estado = 1;
              palabra += caracteres[j];
            } else if (caracteres[j].match("[0.9]")) {
              estado = 2;
              palabra += caracteres[j];
            } else if (caracteres[j] == "'") {
              estado = 3;
              palabra += caracteres[j];
            } else if (caracteres[j] == '"') {
              if (j + 1 < caracteres.length) {
                if (caracteres[j + 1] == "*") {
                  estado = 4;
                  palabra += caracteres;
                }

                if (caracteres[j + 1] == "/") {
                  estado = 5;
                  palabra += caracteres;
                }
              }
            } else {
              var validador = true;
              for (var simbolo in this.simbolos) {
                if (caracteres[j] == this.simbolos[simbolo]) {
                  estado = 6;
                  palabra += caracteres[j];
                }
              }
            }

            break;

          case 1:
            //Estado para letras

            if (caracteres[j].match("[A-Za-z0-9_]")) {
              palabra += caracteres[j];
              estado = 1;
            } else {
              this.token(palabra, i, j);
              estado = 0;
              palabra = "";
              j--;
            }

            break;
          case 2:
            if (caracteres[j].match("[0-9]") || caracteres[j] == ".") {
              palabras += caracteres[j];
              estado = 2;
            } else {
              this.token(palabra, i, j);
              estado = 0;
              palabra = "";
              j--;
            }

            break;
          case 3:
              if(caracteres[j] == "'"){
                this.token(palabra, i, j);
                palabra = "";
                estado = 0;
                j--;
              }else{
                palabra += caracteres[j];
                estado = 3;
              }
            break;
          case 4:
            if(caracteres[j] == "\""){
                this.token(palabra, i, j);
                palabra = "";
                estado = 0;
                j--;
              }else{
                palabra += caracteres[j];
                estado = 3;
              }
            break;
          case 5:
            break;
          case 6:
            break;
          case 7:
            break;
          case 8:
            break;
          default:
            console.log("aa");
        }
      }
    }

    this.traduccion("def main:");
  }

  token(palabra, fila, columna) {
      switch(palabra){
          case "class":
              break;
          case "public":
              break;
            case "private":
                break;
            case "protected":
                break;
            case "void":
                break;
            case "int":
                break;
            case "boolean":
                break;
            case "char":
                break;
            case "System":
                break;
            case "out":
                break;
            case "println":
                break;
            case "print":
                break;
            case "":
                break;
            
      }
  }

  traduccion() {
    return "def main";
  }

  repor() {}
}
