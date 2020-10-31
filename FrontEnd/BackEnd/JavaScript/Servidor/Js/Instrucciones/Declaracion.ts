import {Instruction} from '../Abstract/Instruccion';
import nodoAst from '../Abstract/nodoAst';

export default class Declaracion extends Instruction{

    private tipo:String;
    private exp:Instruction;
    private id:String;
    private variables:Array<Instruction>;



    constructor(tipo:String, identificador:String, exp:Instruction, fila:Number, columna:Number){
        super(fila, columna);
        this.tipo = tipo;
        this.id = identificador;
        this.exp = exp;
    }

    public getNodo(){
        var nod = new nodoAst("ASIGNACION");

        nod.addHijo(this.tipo);
        nod.addHijo(this.id);
        nod.addHijo2(this.exp.getNodo());

        return nod;
    }
 
    public translate(){

    }
}







