pragma solidity ^0.5.0;

contract Taller_D{

    struct Reunion{
        uint idReunion;
        string tema;
        string fecha;
        Foto[] listFotos;
    }
    
    struct Foto{
        string url;
        string hs;
    }
      
   mapping(uint => Reunion) reuniones;
    
   function addReunion(uint id, string memory tema, string memory fecha) public{
        reuniones[id].idReunion = id;
        reuniones[id].tema = tema;
        reuniones[id].fecha = fecha;
    }
                    
    
    function addFoto(uint idRe,string memory _url , string memory _hs) public{
       reuniones[idRe].listFotos.push(Foto({url: _url,hs:_hs}));
    }
    
    function getDataReunion(uint idRe)public view returns(uint,string memory, string memory){
        return (reuniones[idRe].idReunion, reuniones[idRe].tema, reuniones[idRe].fecha);
    }
    
    function getSizeFotosReunion(uint idRe)public view returns(uint){
        return (reuniones[idRe].listFotos.length);
    }
    
    /*
    indexFoto reci el numero de foto segun la pocision que requiere consulta
    ejemplo 
    indexFoto = 1 => devuelve la foto de la pocision 0 en el array de Fotos
    */
    function getDataFoto(uint indexFoto, uint idRe) public view returns(string memory, string memory){
        if(indexFoto>0){
        return(reuniones[idRe].listFotos[indexFoto-1].url, reuniones[idRe].listFotos[indexFoto-1].hs);
        }else{
            return("","");
        }
    }
    
    
    
    function verificarFoto(uint idRe, uint idFoto, string memory HAS) public view returns (bool){
    
    string memory lel = reuniones[idRe].listFotos[idFoto-1].hs ;
        if(keccak256(abi.encodePacked(lel)) == keccak256(abi.encodePacked(HAS))){
            return true;
        }else{
            return false;
        }
    }
    
    
    
    
}
