export class Transaccion {

    public TipoCombustible : string;
    public precioETH: Number;
    public depositoETH : Number;
    public depositoDevueltaETH: Number;
    public cantidadFuel :Number;
    public valida:boolean;

    constructor( data : any){
       this.TipoCombustible =  data["0"];
       this.cantidadFuel =  data["1"]
       this.precioETH = data["2"]/ (1*Math.pow(10,18));
       this.depositoDevueltaETH = data["3"] /  (1*Math.pow(10,18));
    }






}
