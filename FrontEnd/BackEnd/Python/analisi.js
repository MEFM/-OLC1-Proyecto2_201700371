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


  listaTokens = [];
  listaErrores = [];
  contador = 0;


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
            } else if (caracteres[j].match("[0-9]")) {
              estado = 2;
              palabra += caracteres[j];
            } else if (caracteres[j] == "'") {
              estado = 3;
              palabra += caracteres[j];
            } else if (caracteres[j] == '"') {
              if (j + 1 < caracteres.length) {
              } else if (caracteres[j] == "/") {
                if (caracteres[j + 1] == "*") {
                  estado = 6;
                  palabra += caracteres;
                }

                if (caracteres[j + 1] == "/") {
                  estado = 7;
                  palabra += caracteres;
                }
              }
            } else {
              var validador = false;
              for (var simbolo in this.simbolos) {
                if (caracteres[j] == this.simbolos[simbolo]) {
                  estado = 8;
                  palabra += caracteres[j];
                  validador = true;
                }
              }

              if (validador == false) {
                this.listaErrores.push(new ErrorT(0, i, j, palabra, "Error Lexico"));
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
              palabra += caracteres[j];
              estado = 2;
            } else {
              this.token(palabra, i, j);
              estado = 0;
              palabra = "";
              j--;
            }

            break;
          case 3:
            if (caracteres[j] == "'") {
              this.token(palabra, i, j);
              palabra = "";
              estado = 0;
              j--;
            } else {
              palabra += caracteres[j];
              estado = 3;
            }
            break;
          case 4:
            if (caracteres[j] == '"') {
              this.token(palabra, i, j);
              palabra = "";
              estado = 0;
              j--;
            } else {
              palabra += caracteres[j];
              estado = 3;
            }
            break;
          case 5:
            this.token(palabra, i, j);
            estador = 0;
            palabra = "";
            j--;
            break;
          case 6:
            if (caracteres[j] == "\n") {
            } else {
              estado = 6;
            }
            break;
          case 7:
            if ((j+1)<caracteres.length) {
              if (caracteres[j] == "*" && caracteres[j + 1] == "/") {
                  estado = 0;
                  j--;
              } else {
                estador = 7;
              }
            }
            break;
          case 8:
              this.token(palabra, i, j, this.simbolos[palabra]);
              palabra = "";
              estado = 0;
              j--;
            break;
          default:
            console.log("aa");
        }
      }
    }


    var temporal = this.listaTokens;

    for(var i=0;i<temporal.length;i++){
        console.log(temporal[i].lexema);
    }


    this.listaErrores = [];
    this.listaTokens = [];
    this.contador = 0;
  }

  token(palabra, fila, columna, simbolo = "") {
      this.contador = this.contador + 1;
    switch (palabra) {
      case "class":
          this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "class"));
        break;
      case "public":
            this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "public"));
        break;
      case "private":
            this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "private"));
        break;
      case "protected":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "protected"));
        break;
      case "void":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "void"));
        break;
      case "int":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "int"));
        break;
      case "boolean":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "boolean"));
        break;
      case "char":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "char"));
        break;
      case "System":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "System"));
        break;
      case "out":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "out"));
        break;
      case "println":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "println"));
        break;
      case "print":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "print"));
        break;
      case "for":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "for"));
        break;
      case "String":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "String"));
        break;
      case "while":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "while"));
        break;
      case "do":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "do"));
        break;
      case "if":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "if"));
        break;
      case "else":
        this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "else"));
        break;
        
      default:
        var validador = false;
        for (var simbolo in this.simbolos) {
          if (palabra == this.simbolos[simbolo]) {
            //Aca se agrega la cosa de los simbolos
            validador = true;
            this.listaTokens.push(new Tokens(this.contador, fila, columna, palabra, "class"));
          }
        }
        if (validador == false) {
          if (palabra.match("[A-Za-z][A-Za-z]*[A-Za-z0-9_]*")) {
            //Se agrega la palabra nada mas
          } else if (palabra.match("[0-9][0-9]*")) {
            //Se agrega enteros
          } else if (palabra.match("[0-9][0-9]*(.[0-9][0-9]*)?")) {
            //Se agrega decimales
          }
        }
    }
  }

  traduccion() {
    return "def main";
  }

  repor() {}
}
