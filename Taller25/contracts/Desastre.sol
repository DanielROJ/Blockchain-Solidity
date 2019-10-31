pragma solidity ^0.5.0;

contract Desastre{

    event CargaInformacion(string, string, string);
    event ErrorCarga();
	event correcto(bool);
	event Fallo(bool);
	struct Users{
	    uint idUser;
	    string  nombre;
	    Tipo rol;
	}

	enum Tipo {ciudadano,Adminsitracion}

	struct RegistroUbicacion{
	    string longitud;
	    string latitud;
	    string caudal;
	}

	mapping(string=>RegistroUbicacion) registrosUbicacion;
	mapping(uint => Users) listaUsuarios;

	function setUser(uint id, string memory nombre, Tipo _rol)public{
	    listaUsuarios[id].idUser = id;
	    listaUsuarios[id].nombre = nombre;
	    listaUsuarios[id].rol = _rol;
		emit correcto(true);
	}
	function setRegistro(uint idUser, string memory _fecha, string memory _latitud, string memory _longitud, string memory caudal) public{
	   if(listaUsuarios[idUser].idUser == idUser && listaUsuarios[idUser].rol == Tipo.Adminsitracion){
	    registrosUbicacion[_fecha].longitud = _longitud;
	    registrosUbicacion[_fecha].latitud = _latitud;
	    registrosUbicacion[_fecha].caudal = caudal;
	    emit correcto(true);
	   }else{
	       emit Fallo(false);
	        revert('Error de Autenticacion');
	   }
	}
	function getUser(uint id)public view returns(uint,string memory, Tipo){
	    return(listaUsuarios[id].idUser,listaUsuarios[id].nombre,listaUsuarios[id].rol);
	}
	function getRegistro(uint idUser,  string memory Fecha) public view returns(string memory, string memory, string memory){
	    if(listaUsuarios[idUser].idUser == 0){
	        revert('Error');
	    }else{
	        return (registrosUbicacion[Fecha].latitud,registrosUbicacion[Fecha].longitud,registrosUbicacion[Fecha].caudal);
	    }
	}

}
