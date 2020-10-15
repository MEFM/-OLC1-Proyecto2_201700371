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
    Cruz: "+",
  };

  listaTokens = [];
  listaErrores = [];
  contador = 0;
  traduccion;

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
              palabra += caracteres[j];
              estado = 3;
            } else if (caracteres[j] == '"') {
              palabra += caracteres[j];
              estado = 4;
            } else if (caracteres[j] == "/") {
              if (j + 1 < caracteres.length) {
                if (caracteres[j] == "/") {
                  if (caracteres[j + 1] == "*") {
                    estado = 7;
                    palabra += caracteres;
                  }

                  if (caracteres[j + 1] == "/") {
                    estado = 6;
                    palabra += caracteres;
                  }
                }
              }
            } else if (
              caracteres[j] == " " ||
              caracteres[j] == "\n" ||
              caracteres[j] == "\t" ||
              caracteres[j] == "\r"
            ) {
              estado = 0;
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
                this.listaErrores.push(
                  new ErrorT(0, i, j, palabra, "Error Lexico")
                );
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
              //j--;
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
              //j--;
            } else {
              palabra += caracteres[j];
              estado = 4;
            }
            break;
          case 5:
            this.token(palabra, i, j);
            estador = 0;
            palabra = "";
            j--;
            break;
          case 6:
            if (j + 1 == caracteres.length) {
              estado = 0;
              // j--;
              palabra = "";
            } else {
              estado = 6;
            }
            break;
          case 7:
            if (j + 1 < caracteres.length) {
              if (caracteres[j] == "*" && caracteres[j + 1] == "/") {
                estado = 0;
                j--;
              } else {
                estado = 7;
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
    /** 
    for (var i = 0; i < temporal.length; i++) {
      console.log(temporal[i].lexema + "-" + temporal[i].tipo);
    }
    */

    this.listaErrores = [];
    this.listaTokens = [];
    this.contador = 0;
    return this.traductor(temporal);
  }

  token(palabra, fila, columna, simbolo = "") {
    this.contador = this.contador + 1;
    switch (palabra) {
      case "interface":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "interface")
        );
        break;
      case "class":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "class")
        );
        break;
      case "public":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "public")
        );
        break;
      case "private":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "private")
        );
        break;
      case "protected":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "protected")
        );
        break;
      case "void":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "TipoDato")
        );
        break;
      case "int":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "TipoDato")
        );
        break;
      case "boolean":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "TipoDato")
        );
        break;
      case "char":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "TipoDato")
        );
        break;
      case "System":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "System")
        );
        break;
      case "out":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "out")
        );
        break;
      case "println":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "println")
        );
        break;
      case "print":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "print")
        );
        break;
      case "for":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "for")
        );
        break;
      case "String":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "TipoDato")
        );
        break;
      case "while":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "while")
        );
        break;
      case "do":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "do")
        );
        break;
      case "if":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "if")
        );
        break;
      case "else":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "else")
        );
        break;
      default:
        var validador = false;
        for (var simbolo in this.simbolos) {
          if (palabra == this.simbolos[simbolo]) {
            //Aca se agrega la cosa de los simbolos
            validador = true;
            this.listaTokens.push(
              new Tokens(this.contador, fila, columna, palabra, simbolo)
            );
          }
        }
        if (validador == false) {
          if (palabra.includes('"')) {
            palabra += '"';
            this.listaTokens.push(
              new Tokens(this.contador, fila, columna, palabra, "Cadena")
            );
          } else if (palabra.includes("'")) {
            palabra += "'";
            this.listaTokens.push(
              new Tokens(this.contador, fila, columna, palabra, "Caracter")
            );
          } else if (palabra.match("[A-Za-z][A-Za-z]*[A-Za-z0-9_]*")) {
            //Se agrega la palabra nada mas
            this.listaTokens.push(
              new Tokens(this.contador, fila, columna, palabra, "Identificador")
            );
          } else if (palabra.match("[0-9][0-9]*")) {
            //Se agrega enteros
            this.listaTokens.push(
              new Tokens(this.contador, fila, columna, palabra, "Entero")
            );
          } else if (palabra.match("[0-9][0-9]*(.[0-9][0-9]*)?")) {
            //Se agrega decimales
            this.listaTokens.push(
              new Tokens(this.contador, fila, columna, palabra, "Float")
            );
          }
        }
    }
  }

  traductor(temporal) {
    var tabs = "";
    for (var i = 0; i < temporal.length; i++) {
      if (temporal[i].tipo == "public") {
        /*
          Cualquier declaracion de tipo public conlleva a que solo puedan ser:
            -Declaracion de metodos
            -Declaracion de variables
            -Clases o Interfaces
        */
        if (
          temporal[i + 1].tipo == "class" ||
          temporal[i + 1].tipo == "interface"
        ) {
          tabs = "";
          i = i + 1;
          this.traduccion += "class";
          this.traduccion += " " + temporal[i + 1].lexema + "";
          i = i + 1;
        } else if (temporal[i + 1].tipo == "TipoDato") {
          i = i + 1;

          if (temporal[i + 1].tipo == "Identificador") {
            i = i + 1;
            if (temporal[i + 1].lexema == "(") {
              this.traduccion += tabs + "def " + temporal[i].lexema + "";
              for (var j = i+1; j < temporal.length; j++) {
                if (temporal[j].lexema != "{") {
                  this.traduccion += temporal[j].lexema + " ";
                } else {
                  i = j - 1;
                  //this.traduccion += ":\n"
                  break;
                }
              }
            } else {
              this.traduccion += tabs + "var ";
              for (var j = i; j < temporal.length; j++) {
                if (temporal[j].temporal != ";") {
                  this.traduccion += temporal[j].lexema + " ";
                } else {
                  i = j - 1;
                  break;
                }
              }
            }
          }
        } else if (temporal[i + 1].tipo == "Identificador") {
          i = i + 1;
          if (temporal[i + 1].lexema == "(") {
            this.traduccion += tabs + "def __init__";
          }
        }
      } else if (temporal[i].tipo == "TipoDato") {
        /*
          Solo pueden ser variables dentro de un metodo
        */
        this.traduccion += tabs + "var " + temporal[i + 1].lexema +" ";

      }else if(temporal[i].tipo = "Identificador"){
        this.traduccion += tabs + temporal[i].lexema;

        for(var j=i;j<temporal.length;j++){
          if(temporal[j].lexema != ";" || temporal[j].lexema != "{"){
            this.traduccion += temporal[j].lexema;
          }else{
            i = j - 1;
            break;
          }
        }
      }
      else if (temporal[i].tipo == "for") {
        /*
          sentencia de repeticion 1
        */

        var contenedor = 0;
        this.traduccion += tabs + "for var " + temporal[i + 3].lexema + " ";

        if (
          temporal[i + 5].tipo == "Entero" ||
          temporal[i + 5].tipo == "Float" ||
          (temporal[i + 5].tipo == "Identificador" &&
            temporal[i + 6].lexema == ";")
        ) {
          contenedor = temporal[i + 5].lexema;
        } else {
          contenedor = 0;
        }

        this.traduccion += "in Range(" + contenedor + ",";

        for (var j = (i + 3); j < temporal.length; j++) {
          if (temporal[j].lexema == ";") {
            for (var k = j + 1; k < temporal.length; k++) {
              if (temporal[k].lexema != ";") {
                this.traduccion += temporal[k].lexema;
              } else {
                this.traduccion += ")";
                for (var l = k + 1; l < temporal.length; l++) {
                  if (temporal[l].lexema != "{") {
                  } else {
                    i = l - 1;
                    break;
                  }
                }
                break;
              }
            }
            break;
          }
          break;
        }
      } else if (temporal[i].tipo == "while") {
        /*
          sentencia de repeticion 1
        */

        this.traduccion += tabs + "while";
      } else if (temporal[i].tipo == "do") {
        /*
          sentencia de repeticion 1
        */

        this.traduccion += tabs + "while";
      } else if (temporal[i].tipo == "System") {
        i = i + 5;
        var tem = temporal;

        this.traduccion += tabs + "print";
        for (var j = i; j < temporal.length; j++) {
          if (temporal[j].lexema != ";") {
            this.traduccion += temporal[j].lexema;
          } else {
            this.traduccion += "\n";
            i = j;
            break;
          }
        }
      } else if (temporal[i].tipo == "if") {
        i = i + 1;
        this.traduccion += tabs + "if";
        for (var j = i; j < temporal.length; j++) {
          if (temporal[j].lexema != "{") {
            this.traduccion += temporal[j].lexema + " ";
          } else {
            i = j - 1;
            break;
          }
        }
      } else if (temporal[i].lexema == "else") {
        i = i + 1;

        if (temporal[i].lexema == "if") {
          this.traduccion += tabs + "elif";
          i = i + 1;
          for (var j = i; j < temporal.length; j++) {
            if (temporal[j].lexema != "{") {
              this.traduccion += temporal[j].lexema;
            } else {
              i = j - 1;
              break;
            }
          }
        } else {
          this.traduccion += tabs + "else:\n";
          if (temporal[i + 1].lexema == "{") {
            tabs += "\t";
            i = i + 1;

            for (var j = i; j < temporal.length; j++) {
              if (temporal[j].lexema != "}") {
                this.traduccion += tabs + temporal[j];
              } else {
                i = i - j;
                break;
              }
            }
          }
        }
      } else {
        if (temporal[i].lexema == "{") {
          tabs += "\t";
          this.traduccion += ":\n";
        } else if (temporal[i].lexema == ";") {
          this.traduccion += "\n";
        } else if (temporal[i].lexema == "}") {
          tabs = this.replaceAt(tabs, 0, "");
          this.traduccion += "\n";
        } else if (temporal[i].lexema == "(") {
        } else if (temporal[i].lexema == ")") {
        } else {
          //this.traduccion += " "+temporal[i].lexema;
        }
      }
    }

    return this.traduccion;
  }

  repor() {}

  replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }
}
