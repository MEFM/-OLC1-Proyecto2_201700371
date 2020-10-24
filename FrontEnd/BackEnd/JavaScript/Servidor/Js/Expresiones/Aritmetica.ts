import {Instruction} from '../Abstract/Instruccion';
import nodoAst from '../Abstract/nodoAst';

export default class Aritmentic extends Instruction{

    private ope1: Instruction|undefined;
    private ope2: Instruction|undefined;
    private opeU: Instruction|undefined;
    private operador: String;

    constructor(operador:String, fila:Number, columna:Number, ope1:Instruction, ope2?:Instruction){
        super(fila, columna);

        this.operador = operador;

        if(!ope2){
            this.opeU = ope1;
        }else{
            this.ope1 = ope1;
            this.ope2 = ope2;
        }   

    }

    public getNodo(){
        var nod = new nodoAst("ARITMETIC");

        if(this.opeU != null){
            nod.addHijo(this.operador + "");
            nod.addHijo2(this.opeU.getNodo());   
        }else{
            if(this.ope1 != undefined && this.ope2 != undefined){
                nod.addHijo2(this.ope1.getNodo());
                nod.addHijo(this.operador + "");
                nod.addHijo2(this.ope2.getNodo());
            }
        }

        return nod;
    }

    public translate():any{
        if(this.opeU != null){
            return `${this.operador} ${this.opeU.translate()}`;
        }else{
            if(this.ope1 != undefined && this.ope2 != undefined){
                return `${this.ope1.translate()} ${this.operador} ${this.ope2.translate()}`;
            }
        }   
    }
}