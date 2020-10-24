export default class nodoAst{

    //Para creacion de arbol AST

    public hijos: Array<nodoAst>;   //
    public valor:String;

    constructor(valor:String){
        this.valor = valor;
        this.hijos = new Array<nodoAst>();
    }

    public addHijos(hijos:Array<nodoAst>){
        for(var hijo of hijos){
            this.hijos.push(hijo);
        }
    }

    public addHijo2(hijo:nodoAst){
        this.hijos.push(hijo);
    }

    public agregarFirstHijo(cade:String){
        this.hijos.unshift(new nodoAst(cade));
    }

    public agregarFirstHijo2(hijo:nodoAst){
        this.hijos.unshift(hijo);
    }

    public getValor(){
        return this.valor;
    }

    public setValor(valor:String){
        this.valor = valor;
    }

    public getHijos():Array<nodoAst>{
        return this.hijos;
    }
}