import {Instruction} from '../Abstract/Instruccion';
import nodoAst from '../Abstract/nodoAst';

export default class Relacional extends Instruction{

    private op1:Instruction;
    private op2:Instruction;
    private operador:String;

    constructor(op1:Instruction, op2:Instruction, operador:String, fila:Number, columna:Number){
        super(fila, columna);
        
        this.op1 = op1;
        this.op2 = op2;
        this.operador = operador;

    }

    public getNodo(){
        var nod = new nodoAst("RELACIONAL");

        nod.addHijo2(this.op1.getNodo());
        nod.addHijo(this.operador + "");
        nod.addHijo2(this.op2.getNodo());

        return nod;
    }

    public translate(){
        return this.op1.translate() + this.operador + this.op2.translate() + "";
    }
}






