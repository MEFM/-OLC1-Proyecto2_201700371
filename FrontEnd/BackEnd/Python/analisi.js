//var express = require('express');

export class Analisis {
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
  traduccion = "";
  tabsTrad = "";


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

              var bandera = true;

              if(caracteres[j] == "<"){

                if(caracteres[j + 1] == "="){
                  palabra += caracteres[j];
                  estado = 9;
                  bandera = false;
                }

              }else if(caracteres[j] == ">"){

                if(caracteres[j + 1] == "="){
                  estado = 10;
                  palabra += caracteres[j];
                  bandera = false;
                }

              }else if(caracteres[j] == "="){

                if(caracteres[j + 1] == "="){
                  estado = 11;
                  palabra += caracteres[j];
                  bandera = false;
                }

              }else if(caracteres[j] == "!"){

                if(caracteres[j + 1] == "="){
                  estado = 12;
                  palabra += caracteres[j];
                  bandera = false;
                }

              }else if(caracteres[j] == "+"){

                if(caracteres[j + 1] == "+"){
                  estado = 13;
                  palabra += caracteres[j];
                  bandera = false;
                }

              }else if(caracteres[j] == "-"){

                if(caracteres[j + 1] == "-"){
                  estado = 14;
                  palabra += caracteres[j];
                  bandera = false;
                }
              }

              if(bandera){
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
          case 9:
            if(caracteres[j] == "="){
              palabra += caracteres[j];
              estado = 9;
            }else{
              this.token(palabra, i, j);
              estado = 0;
              palabra = ""
              j--;
            }
              break;
          case 10:
            if(caracteres[j] == "="){
              palabra += caracteres[j];
              estado = 9;
            }else{
              this.token(palabra, i, j);
              estado = 0;
              palabra = ""
              j--;
            }
              break;
          case 11:
            if(caracteres[j] == "="){
              palabra += caracteres[j];
              estado = 9;
            }else{
              this.token(palabra, i, j);
              estado = 0;
              palabra = ""
              j--;
            }
              break;
          case 12:
            if(caracteres[j] == "="){
              palabra += caracteres[j];
              estado = 9;
            }else{
              this.token(palabra, i, j);
              estado = 0;
              palabra = ""
              j--;
            }
             break;
          case 13:
            if(caracteres[j] == "+"){
              palabra += caracteres[j];
              estado = 9;
            }else{
              this.token(palabra, i, j);
              estado = 0;
              palabra = ""
              j--;
            }
            break;
          case 14:
            if(caracteres[j] == "-"){
              palabra += caracteres[j];
              estado = 9;
            }else{
              this.token(palabra, i, j);
              estado = 0;
              palabra = ""
              j--;
            }
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
    this.inicioParser(temporal)
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
      case "true":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "Bool")
        );
        break;
      case "false":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "Bool")
        );
        break;
      case "<=":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "MenorIgual")
        );
        break;
      case ">=":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "MayorIgual")
        );
        break;
      case "==":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "IgualIgual")
        );
        break;
      case "!=":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "Diferente")
        );
        break;
      case "++":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "Adicion")
        );
        break;
      case "--":
        this.listaTokens.push(
          new Tokens(this.contador, fila, columna, palabra, "Sustraccion")
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
    

    // for(var i = 0;i < temporal.length;i++){
    //   this.traduccion += temporal[i].lexema + " " + temporal[i].tipo + "\n";
    // }
    
    
    return this.traduccion;
  }

  repor() {}

  replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }


  preanalisis = new Tokens(0,0,0,"","");
  listaTemporal = [];
  numPreanalisis = 0;

  tipoMet = ["char", "String", "int", "double", "boolean", "void"]

  inicioParser(lista){
    this.listaTemporal = lista;
    this.listaTemporal.push( new Tokens(9999, 9999 , 9999 , "$$$", "$$$"));
    this.preanalisis = this.listaTemporal[0]
    this.numPreanalisis = 0;

    this.A();
  }

  encaje(entrada){

    if (!(entrada == this.preanalisis.tipo)){
      //Error sintactico
      console.log("Error sintactico");
    }else if(!(entrada == (this.preanalisis.tipo == "$$$"))){
      //Esta cosa es la salida 
      console.log(entrada + ", "+this.preanalisis.tipo+". AFUERA")
      this.numPreanalisis = this.numPreanalisis + 1;
      this.preanalisis = this.listaTemporal[this.numPreanalisis];
    }
  }




  A(){
    
    if(this.preanalisis.lexema == "public"){
      this.encaje(this.preanalisis.tipo)
      this.CLASS()
    }else{
      //EPSILON
    }
  }

  CLASS(){
    this.traduccion += "class ";
    if (this.preanalisis.lexema == "class") {
      this.encaje(this.preanalisis.tipo); // Classs
      this.traduccion += this.preanalisis.lexema + ":\n";
      this.encaje(this.preanalisis.tipo); //Identificador
      this.encaje(this.preanalisis.tipo); // LlaveApartura
      this.tabsTrad += "\t";
      this.traduccion += this.tabsTrad;
      this.BLOQUE_CLASS();
      this.encaje(this.preanalisis.tipo);
      this.tabsTrad = this.replaceAt(this.tabsTrad, 0, "");
      this.A();
    } else if (this.preanalisis.lexema == "interface") {
      this.encaje(this.preanalisis.tipo);
      this.traduccion += this.preanalisis.lexema + ":\n";
      this.encaje(this.preanalisis.tipo);
      this.encaje(this.preanalisis.tipo);

      this.tabsTrad += "\t";
      this.traduccion += this.tabsTrad;
      this.BLOQUE_INT();

      this.encaje(this.preanalisis.tipo);
      this.tabsTrad = this.replaceAt(this.tabsTrad, 0, "");

      this.A();
    }
  }

  BLOQUE_INT(){
    if (this.preanalisis.lexema == "public") {
      this.encaje(this.preanalisis.tipo);
      this.FUNC_VARI();
    } else if (this.preanalisis.tipo == "Identificador") {
      this.encaje(this.preanalisis.tipo); //Identificador
      this.traduccion += this.preanalisis.lexema + " ";
      this.encaje(this.preanalisis.tipo); // Igual
      this.traduccion += this.preanalisis.lexema + " ";
      this.E();

      this.encaje(this.preanalisis.tipo);
      this.traduccion += "\n";
      this.BLOQUE_INT();
    }
  }

  FUNC_VARI(){
    this.TIPODATOMET();

    if(this.preanalisis.tipo == "Identificador"){
            this.traduccion += this.preanalisis.lexema + " ";
            this.encaje(this.preanalisis.tipo);

            this.FUNC_VARIII();
            this.BLOQUE_INT();

    }
  }

  FUNC_VARIII(){
    if(this.preanalisis.lexema == "("){
      this.traduccion += this.preanalisis.lexema
      this.encaje(this.preanalisis.tipo)
      this.PARAMS();

      this.traduccion += this.preanalisis.lexema
      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);
      this.traduccion += "\n";
        

    }else{
      this.VARIABLEP();

      this.encaje(this.preanalisis.tipo);
      this.traduccion += "\n";
      
    }
  }
  
  BLOQUE_CLASS(){
    if(this.preanalisis.lexema == "public"){
      this.encaje(this.preanalisis.tipo)
      this.FUNC_VAR();
    }else if(this.preanalisis.tipo == "Identificador"){
      this.traduccion += this.tabsTrad + this.preanalisis.lexema + " ";
      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);
      this.traduccion += this.preanalisis.lexema + " ";
      this.E();

      this.encaje(this.preanalisis.tipo);
      this.traduccion += "\n";
      this.BLOQUE_CLASS();
        
      
    }else{
      //EPSILON
    }
  }

  FUNC_VAR(){
    if(this.preanalisis.tipo == "Identificador"){
      this.traduccion += "def init ";
      this.encaje(this.preanalisis.tipo);

      this.traduccion += this.preanalisis.lexema + " self ,";
      this.encaje(this.preanalisis.tipo);

      this.PARAMS();

      this.traduccion += this.preanalisis.lexema + ":\n ";
      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);
      this.tabsTrad += "\t";
      this.traduccion += this.tabsTrad;
      this.INSTRUCCIONES();

      this.encaje(this.preanalisis.tipo);
      this.tabsTrad = this.replaceAt(this.tabsTrad, 0, "");

      this.BLOQUE_CLASS();

    }else if(this.preanalisis.lexema == "static"){
      this.traduccion += "def main():\n";
      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);
      this.encaje(this.preanalisis.tipo);
      this.tabsTrad += "\t";
      this.traduccion += this.tabsTrad;
      this.INSTRUCCIONES();

      this.encaje(this.preanalisis.tipo);
      this.tabsTrad = this.replaceAt(this.tabsTrad, 0, "");
      this.BLOQUE_CLASS2();
       

    }/*Este mueve entre Epsilon y la 3er opcion*/else {
      var bandera = false

      for(var i = 0; i < this.tipoMet.length; i++){
        if(this.preanalisis.lexema == this.tipoMet[i]){
          bandera = true;
          break;
        }
      }

      if(bandera == true){
        this.TIPODATOMET();

        if(this.preanalisis.tipo == "Identificador"){

          this.encaje(this.preanalisis.tipo)
          this.traduccion += this.preanalisis.lexema +  " "
          this.FUNC_VARRR()
          this.BLOQUE_CLASS()

        }
      }else{
        //Este es el Epsilon
      }
    }
  }

  FUNC_VARRR(){
    if(this.preanalisis.lexema == "("){
      this.traduccion +=
        "def " + this.listaTemporal[this.numPreanalisis - 1].lexema;

      this.traduccion += this.preanalisis.lexema + " ";
      this.encaje(this.preanalisis.tipo);
      this.PARAMS();

      this.traduccion += this.preanalisis.lexema + ":";
      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);
      this.tabsTrad += "\t";
      this.traduccion += this.tabsTrad;
      this.INSTRUCCIONES();

      this.encaje(this.preanalisis.tipo);

      this.tabsTrad = this.replaceAt(this.tabsTrad, 0, "");
       

    }else{
      this.VARIABLEP()

      if(this.preanalisis.lexema == ";"){
        this.encaje(this.preanalisis.tipo)
        this.traduccion += "\n";
      }
    }
  }

  BLOQUE_CLASS2(){
    if(this.preanalisis.lexema == "public"){
      this.encaje(this.preanalisis.tipo)
      this.FUNC_VAR2();
    }else if(this.preanalisis.tipo == "Identificador"){
      this.traduccion += this.preanalisis.lexema + " "
      this.encaje(this.preanalisis.tipo)
      
      this.traduccion += this.preanalisis.lexema
        this.encaje(this.preanalisis.tipo);
        this.E();
        
          this.encaje(this.preanalisis.tipo)
          this.BLOQUE_CLASS2()
        
    }else{
      //EPSILON
    }
  }

  FUNC_VAR2(){

    if(this.preanalisis.tipo == "Identificador"){
      this.traduccion += "def " + this.preanalisis.lexema;
      this.encaje(this.preanalisis.tipo);

      this.traduccion += this.preanalisis.lexema;
      this.encaje(this.preanalisis.tipo);
      this.PARAMS();

      this.traduccion += this.preanalisis.lexema;
      this.encaje(this.preanalisis.tipo);

      this.tabsTrad += "\t";
      this.traduccion += this.tabsTrad;

      this.encaje(this.preanalisis.tipo);
      this.INSTRUCCIONES();

      this.tabsTrad = this.replaceAt(this.tabsTrad, 0, "");
      this.encaje(this.preanalisis.tipo);
      this.BLOQUE_CLASS2();
      
              
    }/*Este mueve entre Epsilon y la 3er opcion*/else {
      var bandera = false

      for(var i = 0; i < this.tipoMet.length; i++){
        if(this.preanalisis.lexema == this.tipoMet[i]){
          bandera = true;
          break;
        }
      }

      if(bandera == true){
        this.TIPODATOMET();

        if(this.preanalisis.tipo == "Identificador"){

          this.encaje(this.preanalisis.tipo)
          this.FUNC_VARRR()
          this.BLOQUE_CLASS2()

        }
      }else{
        //Este es el Epsilon
      }
    }


  }

  INSTRUCCIONES(){
    if(this.preanalisis.lexema == "if"){
      this.traduccion += this.tabsTrad + this.preanalisis.lexema;
      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);
      this.E();

      this.encaje(this.preanalisis.tipo);
      this.traduccion += ":\n";

      this.tabsTrad += "\n";
      this.encaje(this.preanalisis.tipo);

      this.INSTRUCCIONES();

      this.tabsTrad = this.replaceAt(this.tabsTrad, 0, "");
      this.encaje(this.preanalisis.tipo);

      this.IF();

      this.INSTRUCCIONES();
    }else if(this.preanalisis.lexema == "while"){

      this.traduccion += this.tabsTrad + this.preanalisis.lexema + " ";

      this.encaje(this.preanalisis.tipo);

      this.encaje(this.preanalisis.tipo);
      this.E();

      this.traduccion += " :\n";
      this.encaje(this.preanalisis.tipo);

      this.tabsTrad += "\t";
      this.encaje(this.preanalisis.tipo);
      this.INSTRUCCIONES();

      this.tabsTrad = this.replaceAt(this.tabsTrad, 0, "");
      this.encaje(this.preanalisis.tipo);

      this.INSTRUCCIONES();

    }else if(this.preanalisis.lexema == "for"){

      this.traduccion += this.tabsTrad + this.preanalisis.lexema + " "

      this.encaje(this.preanalisis.tipo)

      if(this.preanalisis.lexema == "("){
        this.encaje(this.preanalisis.tipo)
        this.TIP(); //
        this.VARIABLE()

        if(this.preanalisis.lexema == ";"){
          this.encaje(this.preanalisis.tipo)
          this.E()

          if(this.preanalisis.lexema == ";"){
            this.encaje(this.preanalisis.tipo)
            this.E()

            if(this.preanalisis.lexema == ")"){
              this.encaje(this.preanalisis.tipo)

              if(this.preanalisis.lexema == "{"){
                this.encaje(this.preanalisis.tipo)
                this.INSTRUCCIONES()

                if(this.preanalisis.lexema == "}"){
                  this.encaje(this.preanalisis.tipo)
                  this.INSTRUCCIONES()
                }
              }
            }
          }
        }
      }
    
    }else if(this.preanalisis.lexema == "do"){
      this.encaje(this.preanalisis.tipo)

      if(this.preanalisis.lexema == "{"){
        this.encaje(this.preanalisis.tipo)
        this.INSTRUCCIONES()

        if(this.preanalisis.lexema == "}"){
          this.encaje(this.preanalisis.tipo)
          this.INSTRUCCIONES();

          if(this.preanalisis.lexema == "while"){
            this.encaje(this.preanalisis.tipo)

            if(this.preanalisis.lexema == "("){
              this.encaje(this.preanalisis.tipo)

              this.E()

              if(this.preanalisis.lexema == ")"){
                this.encaje(this.preanalisis.tipo)

                if(this.preanalisis.lexema == ";"){
                  this.encaje(this.preanalisis.tipo)


                }
              }
            }
          }

        }

      }
      this.INSTRUCCIONES()
    
    }else if(this.preanalisis.lexema == "return"){
      this.encaje(this.preanalisis.tipo)

      this.RETURN()

      if(this.preanalisis.lexema == ";"){
        this.encaje(this.preanalisis.tipo)


      }

      this.INSTRUCCIONES()
      
    }else if(this.preanalisis.lexema == "break"){
      this.encaje(this.preanalisis.tipo)
      
      if(this.preanalisis.lexema == ";"){
        this.encaje(this.preanalisis.tipo)
      }

      this.INSTRUCCIONES()
    }else if(this.preanalisis.lexema == "continue"){
      this.encaje(this.preanalisis.tipo)
      if(this.preanalisis.lexema == ";"){
        this.encaje(this.preanalisis.tipo)
      }

      this.INSTRUCCIONES()

    }else if(this.preanalisis.tipo == "Identificador"){
      this.encaje(this.preanalisis.tipo)
      
      this.IDI()

      if(this.preanalisis.lexema == ";"){
        this.encaje(this.preanalisis.tipo)
      }

      this.INSTRUCCIONES()
    }else if(this.preanalisis.lexema == "System"){
      this.encaje(this.preanalisis.tipo)
      if(this.preanalisis.lexema == "."){
        this.encaje(this.preanalisis.tipo)
        if(this.preanalisis.lexema == "out"){
          this.encaje(this.preanalisis.tipo)

          if(this.preanalisis.lexema == "."){
            this.encaje(this.preanalisis.tipo)
            this.PR()

          if(this.preanalisis.lexema == "("){
            this.encaje(this.preanalisis.tipo)

            this.E()

            if(this.preanalisis.lexema == ")"){
              this.encaje(this.preanalisis.tipo)

              if(this.preanalisis.lexema == ";"){
                this.encaje(this.preanalisis.tipo)
              }
            }
          }
        }
        }
      }

      this.INSTRUCCIONES()
    }else{
      var bandera = false;

      for(var i = 0;i<this.tipoMet.length; i++){
        if(this.preanalisis.lexema == this.tipoMet[i]){
          bandera= true;
          break;
        }
      }

      if(bandera == true){
        this.TIPODATO();
        this.VARIABLE();

        if(this.preanalisis.lexema == ";"){
          this.encaje(this.preanalisis.tipo);
          
        }
        this.INSTRUCCIONES()
      }else{
        //EPSILON
      }

    }
  }

  RETURN(){
    if(this.preanalisis.tipo == "Identificador" || this.preanalisis.tipo == "Cadena" || this.preanalisis.tipo == "Caracter"
    || this.preanalisis.tipo == "Entero" || this.preanalisis.tipo == "Float" || this.preanalisis.tipo == "Bool"){
      this.E()
    }
  }

  IDI(){
    if(this.preanalisis.lexema == "="){
      this.encaje(this.preanalisis.tipo)
      this.E()

      if(this.preanalisis.lexema == ";"){
        this.encaje(this.preanalisis.tipo)
      }
    }else if(this.preanalisis.lexema == "("){
      this.encaje(this.preanalisis.tipo)

      this.PARAMSEN();

      if(this.preanalisis.lexema == ")"){
        this.encaje(this.preanalisis.tipo)

        if(this.preanalisis.lexema == ";"){
          this.encaje(this.preanalisis.tipo)
        }
      }
    }
  }

  VARIABLEP(){
    this.VARIABLEE()
  }

  VARIABLE(){
    if(this.preanalisis.tipo == "Identificador"){
      this.encaje(this.preanalisis.tipo)
      this.VARIABLEE()
    }
  } 

  VARIABLEE(){
    if(this.preanalisis.lexema == ","){
      this.encaje(this.preanalisis.tipo)

      if(this.preanalisis.tipo == "Identificador"){
        this.encaje(this.preanalisis.tipo)

        this.VARIABLEE()
      }
    }else if(this.preanalisis.lexema == "="){
      this.encaje(this.preanalisis.tipo)
      
      this.E()
      this.VARIABLEE()
    }else if(this.preanalisis.tipo == "Identificador"){
      this.encaje(this.preanalisis.tipo)
    }
  }

  TIP(){
    if(this.preanalisis.tipo == "Identificador" || this.preanalisis.tipo == "Cadena" || this.preanalisis.tipo == "Caracter"
    || this.preanalisis.tipo == "Entero" || this.preanalisis.tipo == "Float" || this.preanalisis.tipo == "Bool"){
      this.TIPODATO()
    }
  }
  

  TIPO(){

  }

  PR(){
    if(this.preanalisis.lexema == "println"){
      this.encaje(this.preanalisis.tipo)     
    }else if(this.preanalisis.lexema == "print"){
      this.encaje(this.preanalisis.tipo)
    }
  }

  IF(){
    if(this.preanalisis.lexema == "else"){
      this.encaje(this.preanalisis.tipo)
      this.IFF()
    }
  }

  IFF(){
    if(this.preanalisis.lexema == "if"){
      this.encaje(this.preanalisis.tipo)
      if(this.preanalisis.lexema =="("){
        this.encaje(this.preanalisis.tipo)
        this.E()

        if(this.preanalisis.lexema == ")"){
          this.encaje(this.preanalisis.tipo)

          if(this.preanalisis.lexema == "{"){
            this.encaje(this.preanalisis.tipo)

            this.INSTRUCCIONES()

            if(this.preanalisis.lexema == "}"){
              this.encaje(this.preanalisis.tipo)
            }
          }
        }
      }
    }else if(this.preanalisis.lexema == "{"){
      this.encaje(this.preanalisis.tipo)

      this.INSTRUCCIONES()

      if(this.preanalisis.lexema == "}"){
        this.encaje(this.preanalisis.tipo)
      }
    }
  }

  PARAMSEN(){
    if(this.preanalisis.tipo == "Identificador" || this.preanalisis.tipo == "Cadena" || this.preanalisis.tipo == "Caracter"
    || this.preanalisis.tipo == "Entero" || this.preanalisis.tipo == "Float" || this.preanalisis.tipo == "Bool"){
      this.VALOR()
      this.PARAMSENN()
    }
  }

  PARAMSENN(){
    if(this.preanalisis.lexema == ","){
      this.encaje(this.preanalisis.tipo)
      this.PARAMSENN()
    }else{
      if(this.preanalisis.tipo == "Identificador" || this.preanalisis.tipo == "Cadena" || this.preanalisis.tipo == "Caracter"
      || this.preanalisis.tipo == "Entero" || this.preanalisis.tipo == "Float" || this.preanalisis.tipo == "Bool"){
        this.VALOR()
      } 
    } 
  }

  PARAMS(){
    var bandera = false;

    for(var i = 0; i<this.tipoMet.length ; i++){
      if(this.preanalisis.lexema == this.tipoMet[i]){
        bandera = true
        break
      }
    }

    if(bandera == true){
      this.TIPODATO()
      if(this.preanalisis.tipo == "Identificador"){
        this.encaje(this.preanalisis.tipo)
        this.PARAMSS()
      }
    }else{
      //Epsilon
    }
  }

  PARAMSS(){
    if(this.preanalisis.lexema == ","){
      this.encaje(this.preanalisis.tipo)
      this.PARAMSS()
    }else {

      var bandera = false;

      for(var i = 0; i<this.tipoMet.length ; i++){
        if(this.preanalisis.lexema == this.tipoMet[i]){
          bandera = true
          break
        }
      }

      if(bandera == true){
        this.TIPODATO()
        if(this.preanalisis.tipo == "Identificador"){
          this.encaje(this.preanalisis.tipo)
        }
      }

    }
  }

  E(){
    if(this.preanalisis.lexema == "+"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
      this.EEE()
    }else if(this.preanalisis.lexema == "-"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
      this.EEE()
    }else if(this.preanalisis.lexema == "!"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
      this.EEE()
    }else{
      this.T()
      this.EE()
      this.EEE()
    }
  }

  EE(){
    if(this.preanalisis.lexema == "-"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == "/"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == "||"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == "&&"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == "=="){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == "!="){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == "^"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == "<="){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == ">="){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == "<"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == ">"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else     if(this.preanalisis.lexema == "+"){
      this.encaje(this.preanalisis.tipo)
      this.T()
      this.EE()
    }else    {
    } 
  }

  EEE(){
    if(this.preanalisis.lexema == "++"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.lexema == "--"){
      this.encaje(this.preanalisis.tipo)
    }
  }

  T(){
    this.F()
    this.TT()
  }

  TT(){
    if(this.preanalisis.lexema == "*"){
      this.encaje(this.preanalisis.tipo)
      this.F()
      this.TT()
    }else{
      if(this.preanalisis.lexema == "("){
        this.F()
        this.TT()
      }else{
        //EPsilon
      }
    }
  }

  F(){
    if(this.preanalisis.lexema == "("){
      this.encaje(this.preanalisis.tipo)
      this.E()
      if(this.preanalisis.lexema == ")"){
        this.encaje(this.preanalisis.tipo)
      }
    }else{
      this.VALOR()
    }
  }

  VALOR(){
    if(this.preanalisis.tipo == "Identificador"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "Cadena"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "Caracter"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "Float"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "Entero"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "Bool"){
      this.encaje(this.preanalisis.tipo)
    }
  }

  TIPODATO(){
    if(this.preanalisis.tipo == "String"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "char"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "int"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "double"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "boolean"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "void"){
      this.encaje(this.preanalisis.tipo)
    }
  }

  TIPODATOMET(){
    if(this.preanalisis.tipo == "String"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "char"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "int"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "double"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "boolean"){
      this.encaje(this.preanalisis.tipo)
    }else if(this.preanalisis.tipo == "void"){
      this.encaje(this.preanalisis.tipo)
    }
  }
}


