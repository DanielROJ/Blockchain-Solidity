export class TipoCombustible {
    public idCombustible:Number;
    public nombreCombustible:string;
    public precioCombustible:Number;

    constructor(idCombustible:Number, nombreCom:string, priceCom:Number){
        this.idCombustible = idCombustible;
        this.nombreCombustible = nombreCom;
        this.precioCombustible = priceCom;
    }
}
