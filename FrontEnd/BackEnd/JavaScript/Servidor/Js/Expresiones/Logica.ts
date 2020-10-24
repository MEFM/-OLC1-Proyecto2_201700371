import {Instruction} from "../Abstract/Instruccion";
import nodoAst from "../Abstract/nodoAst";


export default class Logica extends Instruction{


    private op1: Instruction|undefined;
    private op2: Instruction|undefined;
    private opU: Instruction|undefined;
    private operador: String;

    constructor(operador:String, fila:Number, columna:Number, op1:Instruction, op2?:Instruction,){
        super(fila, columna);

        this.operador = operador;

        if(!op2){
            this.opU = op1;
        }else{
            this.op1 = op1;
            this.op2 = op2;
        }
    }

    public getNodo(){
        var nod = new nodoAst("LOGICA");

        if(this.opU != null){
            nod.addHijo(this.operador+"");
            nod.addHijo2(this.opU.getNodo());
        }else{
            if(this.op1 != undefined && this.op2 != undefined){
                nod.addHijo2(this.op1.getNodo());
                nod.addHijo(this.operador + "");
                nod.addHijo2(this.op2.getNodo());
            }
        }

        return nod;
    }

    public translate():any{
        
        if(this.opU != null){
            return `${this.operador} ${this.opU.translate()}`;
        }else{
            if(this.op1 != undefined && this.op2 != undefined){
                return `${this.op1.translate()} ${this.operador} ${this.op2.translate()}`;
            }
        }
    }
}








