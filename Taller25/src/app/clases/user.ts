export class User {
    idUser:number;
    nombre:string;
    tipo = ["Ciudadano","Administracion"];
    idrol : number;

    getRol(){
        return this.tipo[this.idrol];
    }

    getIndexRol(values:string){
        return this.tipo.indexOf(values);
    }

}
