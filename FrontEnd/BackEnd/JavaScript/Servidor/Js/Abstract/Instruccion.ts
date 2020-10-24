import nodoAst from './nodoAst';

export abstract class Instruction{
    public linea:Number;
    public columna:Number;
    private retorno:String|undefined;

    constructor(linea:Number, columna:Number){
        this.linea = linea;
        this.columna = columna;
    }

    public setSalida(salida:String|undefined){
        this.retorno = salida;
    }

    public getRetorno(){
        return this.retorno;
    }

    abstract translate():any;
    abstract getNodo():nodoAst;
}