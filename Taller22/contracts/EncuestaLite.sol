pragma solidity ^0.5.1;


contract EncuestaLite{

 event CreacionExitosa(bool);

 struct PersonaE{
        uint cedula;
        string nombre;
    }

 struct Foto{
        string url;
        string hs;
    }
 struct Empresa{
        uint idEmpresa;
        address dir;
        mapping(uint=>EncuestaContratada) listaContratos;
 }
 struct EncuestaContratada{
        uint idEncuesta;
        CheckEncuesta[] listaComprobantes;
        uint indexC;
 }
 struct CheckEncuesta{
        string lugar;
        string fecha;
        string hora;
        Encuestador encuestador;
        PersonaE personaE;
        Foto evidencia;
        uint indexC;
    }
struct Encuestador{
        uint cedula;
    }

 mapping(address=> Empresa) listaEmpresas;

    function setEmpresa(address DirEmpresa) public{
        listaEmpresas[DirEmpresa].dir = DirEmpresa;
        emit CreacionExitosa(true);
    }

     function setEncuestaContratada(address idEmpresa, uint idEncuestaContratada)public{
        listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].idEncuesta= idEncuestaContratada;
        listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].indexC = 0;
        emit CreacionExitosa(true);
    }
    function setCheck(address idEmpresa, uint idEncuestaContratada, string memory lugar, string memory fecha, string memory hora, uint idEncuestador, uint idPersona, string memory nombre, string memory url, string memory hs)public {
     uint indexC = 0;
     if(listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].indexC >0){
         indexC = sizeCheck(idEmpresa,idEncuestaContratada);
     }
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaComprobantes[indexC].lugar = lugar;
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaComprobantes[indexC].fecha = fecha;
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaComprobantes[indexC].hora = hora;
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaComprobantes[indexC].personaE = PersonaE({cedula:idPersona, nombre:nombre});
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaComprobantes[indexC].evidencia = Foto({url:url,hs:hs});
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaComprobantes[indexC].encuestador = Encuestador({cedula:idEncuestador});
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].indexC++;
     emit CreacionExitosa(true);
    }

    function sizeCheck(address idEmpresa, uint idEncuestaContratada)public view returns(uint){
        return listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].indexC;
    }

    function getCheck(address idEmpresa, uint idEncuestaContratada,uint indexC)public view  returns(uint, string memory,string memory,string memory,uint,uint,string memory, string memory, string memory){
     CheckEncuesta memory tmp = listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaComprobantes[indexC];
     return (indexC,tmp.lugar,tmp.fecha,tmp.hora,tmp.encuestador.cedula,tmp.personaE.cedula,tmp.personaE.nombre,tmp.evidencia.url,tmp.evidencia.hs);
    }

}