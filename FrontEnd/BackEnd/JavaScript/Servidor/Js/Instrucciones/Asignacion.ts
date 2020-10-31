import {Instruction} from '../Abstract/Instruccion';
import nodoAst from '../Abstract/nodoAst';

export default class Declaracion extends Instruction{

    private exp: Instruction;
    private id: String;

    constructor(id:String, exp:Instruction, fila:Number, columna:number){
        super(fila, columna);
        this.id = id;
        this.exp = exp;
    }

    public getNodo(){
        var nod = new nodoAst("ASIGNACION");

        nod.addHijo(this.id);
        nod.addHijo2(this.exp.getNodo());

        return nod;
    }

    public translate(){
        var val = this.exp.translate();
        return `${this.id} = ${val} ; \n`;
    }
}








