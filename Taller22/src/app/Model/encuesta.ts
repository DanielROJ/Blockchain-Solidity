import {Encuestador} from '../Model/encuestador';
import {PersonaEE} from '../Model/persona-ee';
import{Foto} from '../Model/foto';



export class Encuesta {
    public idEncuesta:Number;
    public encuestador: Encuestador;
    public persona:PersonaEE;
    public lugar:string;
    public fecha:string;
    public hora:string;
    public foto:Foto;

    constructor(){
        this.foto = new Foto();
        this.encuestador = new Encuestador();
        this.persona = new PersonaEE();
    }



}
