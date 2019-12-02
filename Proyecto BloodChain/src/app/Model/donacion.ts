import { Documento } from './documento';
import { Empleado } from "./empleado";
import { TipoBolsa } from './tipo-bolsa';

export class Donacion {

    public idDonacion: Number;
    public cantidadExtraida: Number;
    public numeroVenoponuciones: Number;
    public numeroMinExtraccion: Number;
    public fechaDonacion: string;
    public idDonante: Number;
    public TruInicio: Number;
    public TruEnd: Number;
    public HashConsentimiento: Documento;
    public HashEiquetaUnidad: Documento;
    public HashFirmaDonante: Documento;
    public tipBolsa: TipoBolsa;
    public medicoEncargado: Empleado;

    

}
