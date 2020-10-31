import {Instruction} from '../Abstract/Instruccion';
import nodoAst from '../Abstract/nodoAst';
import Declaracion from './Declaracion';


export default class For extends Instruction{

    public declaracion:Declaracion;
    public expI:Instruction;
    public expF:Instruction;
    public bloque:Array<Instruction>;
    

    constructor(declaracion:Declaracion, expI:Instruction, expf:Instruction, bloque:Array<Instruction>,fila:Number, columna:number){
        super(fila, columna);
        this.declaracion = declaracion;
        this.expI = expI;
        this.expF = expf;
        this.bloque = bloque;

    }

    public getNodo(){
        var nod = new nodoAst("FOR");



        return nod;
    }

    public translate(){

    }
}

