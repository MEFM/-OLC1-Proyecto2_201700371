import {Instruction} from "../Abstract/Instruccion";
import nodoAst from "../Abstract/nodoAst";


export default class Identificador extends Instruction{

    private id:String;


    constructor(id:String, fila:Number, columna:Number){
        super(fila, columna);

        this.id = id;
    }

    public getNodo(){
        var nod = new nodoAst("IDENTIFICADOR");

        nod.addHijo(this.id);

        return nod;
    }

    public translate(){
        return this.id;
    }
}


