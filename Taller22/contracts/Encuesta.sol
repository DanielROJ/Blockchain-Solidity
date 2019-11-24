//Daniel Rojas

pragma solidity ^0.5.1;


contract EEncuesta{

    event CreacionExitosa(bool);
    struct Encuestador{
        uint cedula;
        bool root;
    }

    struct PersonaE{
        uint cedula;
        string nombre;
    }

    struct Foto{
        string url;
        string hs;
    }

    struct CheckEncuesta{
        string lugar;
        string fecha;
        string hora;
        Encuestador encuestador;
        PersonaE personaE;
        Foto evidencia;
        string[] respuestas;
    }

    struct EncuestaContratada{
        uint idEncuestaContratada;
        string[] preguntas;
        uint indexC;
        mapping(uint=>CheckEncuesta) listaResultados;
    }

    struct Empresa{
        uint idEmpresa;
        mapping(uint=>EncuestaContratada) listaContratos;
        bool root;
    }

    struct Contrato{
        uint idEmpresa;
        uint idEncuestaContratada;
    }

    mapping(uint=> Encuestador) listaEncuestadores;
    mapping(uint=> Empresa) listaEmpresas;
    uint[]  idContratos;
    mapping(uint=> Contrato) listaContratos; // uint index contrato -- contrato

   //---------------------------------------------------------------------------------------------------------------------------------------Funciones Empresa 
    function setEmpresa(uint idEmpresa) public{
        listaEmpresas[idEmpresa].idEmpresa = idEmpresa;
        emit CreacionExitosa(true);
    }

    function getEmpresa(uint idEmpresa)public view returns(uint){
        return listaEmpresas[idEmpresa].idEmpresa;
    }

    function setEncuestaContratada(uint idEmpresa, uint idEncuestaContratada)public{
        listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].idEncuestaContratada = idEncuestaContratada;
        idContratos.push(idEncuestaContratada);
        listaContratos[idContratos.length].idEmpresa = idEmpresa;
        listaContratos[idContratos.length].idEncuestaContratada = idEncuestaContratada;
        emit CreacionExitosa(true);
    }
 
    function setPregunta(uint idEmpresa, uint idEncuestaContratada, string memory pregunta)public{
          listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].preguntas.push(pregunta);
    }

    function getRespuesta(uint idEmpresa, uint idEncuestaContratada, uint indexC , uint indexR)public view returns(string memory){
       return  listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaResultados[indexC].respuestas[indexR];

    }


    function sizeRespuesta(uint idEmpresa, uint idEncuestaContratada, uint indexC)public view returns(uint){
       return  listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaResultados[indexC].respuestas.length;
    }

    //--------------------------------------------------------------------------------------------------------------------------------------- Funciones Encuestador

    function setEncuestador(uint cedula) public{
        listaEncuestadores[cedula].cedula = cedula;
        emit CreacionExitosa(true);
    }

    function getContrato(uint indexContrato) public view returns(uint, uint){
        return (listaContratos[indexContrato].idEmpresa,listaContratos[indexContrato].idEncuestaContratada) ;
    }

    function getEncuestador(uint cedula) public view returns(uint){
        return listaEncuestadores[cedula].cedula;
    }

     function sizePreguntas(uint idEmpresa, uint idEncuestaContratada) public view returns(uint){
        return  listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].preguntas.length;
    }

    function getPregunta(uint idEmpresa, uint idEncuestaContratada, uint index) public view returns(string memory pr){
        return listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].preguntas[index];
    }

    function sizeListaContratos() public view returns(uint){
        return idContratos.length;
    }

    function sizeCheck(uint idEmpresa, uint idEncuestaContratada)public view returns(uint){
        return listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].indexC;
    }

    function setCheck(uint idEmpresa, uint idEncuestaContratada, string memory lugar, string memory fecha, string memory hora, uint idEncuestador, uint idPersona, string memory nombre, string memory url, string memory hs, uint indexC)public {

     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaResultados[indexC].lugar = lugar;
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaResultados[indexC].fecha = fecha;
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaResultados[indexC].hora = hora;
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaResultados[indexC].encuestador = listaEncuestadores[idEncuestador];
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaResultados[indexC].personaE = PersonaE({cedula:idPersona, nombre:nombre});
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaResultados[indexC].evidencia = Foto({url:url,hs:hs});
     listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].indexC++;
     emit CreacionExitosa(true);
    }
    function setRespuesta(uint idEmpresa, uint idEncuestaContratada, string memory respuesta, uint indexC )public{
         listaEmpresas[idEmpresa].listaContratos[idEncuestaContratada].listaResultados[indexC].respuestas.push(respuesta);
         emit CreacionExitosa(true);
    }
}