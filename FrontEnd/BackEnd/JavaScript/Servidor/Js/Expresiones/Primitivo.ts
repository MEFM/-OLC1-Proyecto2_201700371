import {Instruction} from '../Abstract/Instruccion';
import nodoAst from '../Abstract/nodoAst';


export default class Primitivo extends Instruction{


    private dPrimitivo:String;

    constructor(valor:String, fila:Number, columna:Number){
        super(fila, columna);
        this.dPrimitivo = valor;
    }

    public getNodo(){
        var nod = new nodoAst("PRIMITIVO");

        if(this.dPrimitivo[0] == '"' || this.dPrimitivo[0] == "'"){
            nod.addHijo(this.dPrimitivo.substr(1, this.dPrimitivo.length - 2));
        }else{
            nod.addHijo(this.dPrimitivo);
        }

        return nod;
    }

    public translate():any{
        return this.dPrimitivo;
    }
}


