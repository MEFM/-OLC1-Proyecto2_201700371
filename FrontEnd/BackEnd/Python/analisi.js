
class Analisis{


    lex(texto){

        var lineas =texto.split("\n");
        

        var estado = 0;

        var palabra = "";

        //En este analizador a patita la i es fila y j columna

        for(var i = 0; i<lineas.length;i++){
            var caracteres = lineas[i].split('');

            for(var j=0;j<caracteres.length;j++){
                if(caracteres[j].match('[A-Za-z]')){
                    estado = 1;
                }


                switch(estado){
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
            }

        }

        this.traduccion("def main:");
    }

    traduccion(){
        return "def main"
    }

    asig(palabra, fila, columna){

    }

    repor(){

    }
}

