import { Documento } from './documento';

export class Donacion {

    public idDonacion: Number;
    public idLote:Number;
    public cantidadExtraida: Number;
    public numeroVenoponuciones: Number;
    public numeroMinExtraccion: Number;
    public fechaDonacion: string;
    public idDonante: Number;
    public TruInicio: Number;
    public TruEnd: Number;
    public HashConsentimiento: Documento;
    public HashEtiquetaUnidad: Documento;
    public HashFirmaDonante: Documento;
    public tipBolsa: Number;
    public medicoEncargado: Number;

    

}
