pragma solidity ^0.5.1;

contract BloodChain{


event BancoEncontradoExitosamente();
event DonanteEncontradoExitosamente(uint cedula, uint edad, uint numeroTelefono, string nombre, string apellido, string Eps, string correoElectronico, string genero);
event DatosNoEncontados();
event DonanteCreadoExitosamente(uint cedula);
event ErrorDeCreacion();
event DatosCargadosExitosamente(bool);
event EmpleadoCreadoExitosamente(uint idEmpleado);
event LoteCreadoExitosamente(uint idLote);

struct BancosSangre{
    uint idBanco;
    string direccion;
    string nombre;
    mapping(uint => Empleado) EmpleadosAsociados;
    mapping(uint => uint) listaLotesPropios;
}


enum TipoBolsa {Extra,Corriente, Doble}

struct Empleado{
    uint idEmpleado;
    string password;
    string nombre;
    string rol;
}


struct Ubicacion{
    string long;
    string lat;
}




struct Documento{
    string Hash;
    string url;
}

struct Donante{
    uint cedula;
    uint edad;
    uint numeroTelefono;
    string nombre;
    string apellido;
    string Eps;
    string correoElectronico;
    string genero;
    uint[] peso;
    uint[] altura;
    uint[] TensionArterial;
    Donacion[] listaDonaciones;
}

struct Donacion{
    uint idDonacion;
    uint cantidadExtraida;
    uint numeroVenoponuciones;
    uint numeroMinExtraccion;
    string fechaDonacion;
    Ubicacion ubicacion;
    Documento HashConsentimiento;
    Documento HashEiquetaUnidad;
    Documento HashFirmaDonante;
    TipoBolsa tipBolsa;
    Empleado medicoEncargado;
}

struct LoteDonacion{
    uint idLote;
    Ubicacion ubicacion;
    mapping(uint=> Donacion) listaUnidades;
}





mapping(uint=>LoteDonacion) listaLotesTotales;
mapping(uint=>Donante) listaDonantes;
mapping(address=>BancosSangre) listaBancos;


//Busqueda de una Donacion por lote.
function getDonacionLote(uint idLote, uint idDonacion)public view returns(uint id, uint cantidadExtraida, uint numeroVenoponuciones, uint numeroMinExtraccion,string memory fechaDonacion, TipoBolsa idBolsa, uint idEmpleado){
Donacion memory u = listaLotesTotales[idLote].listaUnidades[idDonacion];
return (u.idDonacion,u.cantidadExtraida,u.numeroVenoponuciones, u.numeroMinExtraccion, u.fechaDonacion,u.tipBolsa, u.medicoEncargado.idEmpleado);
}

function getDonacionUsuario()public {

}



//creacion de una donacion que se agrega aun lote.
function setDonacion(address _BancosSangre, uint idDonacion,uint _idLote, uint _cantidadExtraida, uint numeroVenoponuciones, uint numeroMinExtraccion, string memory fechaDonacion, TipoBolsa tipo, uint idMedico, uint idUser)public{
    if(listaLotesTotales[_idLote].listaUnidades[idDonacion].idDonacion == 0){
        listaLotesTotales[_idLote].listaUnidades[idDonacion].idDonacion = idDonacion;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].cantidadExtraida = _cantidadExtraida;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].numeroVenoponuciones = numeroVenoponuciones;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].numeroMinExtraccion = numeroMinExtraccion;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].fechaDonacion = fechaDonacion;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].tipBolsa = tipo;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].medicoEncargado = listaBancos[_BancosSangre].EmpleadosAsociados[idMedico];
        listaDonantes[idUser].listaDonaciones.push(listaLotesTotales[_idLote].listaUnidades[idDonacion]);
        listaBancos[msg.sender].listaLotesPropios
        emit DatosCargadosExitosamente(true);
    }else{
        revert('ERROR DE CREACION');
    }
}



// creacion de un donante de sangre
function setDonante(uint cedula, uint edad, uint numeroTelefono, string memory nombre, string memory apellido, string memory Eps, string memory correoElectronico, string memory genero)public{

if(listaDonantes[cedula].cedula == 0){
    listaDonantes[cedula].cedula = cedula;
    listaDonantes[cedula].edad = edad;
    listaDonantes[cedula].numeroTelefono = numeroTelefono;
    listaDonantes[cedula].nombre = nombre;
    listaDonantes[cedula].apellido = apellido;
    listaDonantes[cedula].Eps = Eps;
    listaDonantes[cedula].correoElectronico = correoElectronico;
    listaDonantes[cedula].genero = genero;
    emit DonanteCreadoExitosamente(cedula);
}else{
    emit ErrorDeCreacion();
    revert('Error en la creacion del Donante');
}
}


function setEmpleado(address _BancosSangre, uint idEmpleado,string memory password, string memory nombre, string memory rol)public{
    if(listaBancos[_BancosSangre].EmpleadosAsociados[idEmpleado].idEmpleado == 0){
        listaBancos[_BancosSangre].EmpleadosAsociados[idEmpleado].idEmpleado = idEmpleado;
        listaBancos[_BancosSangre].EmpleadosAsociados[idEmpleado].nombre = nombre;
        listaBancos[_BancosSangre].EmpleadosAsociados[idEmpleado].rol = rol;
         listaBancos[_BancosSangre].EmpleadosAsociados[idEmpleado].password = password;
        emit EmpleadoCreadoExitosamente(idEmpleado);
    }else{
        emit ErrorDeCreacion();
        revert('Error en la crecion del Empleado');
    }
}



function setSaludDonante(uint cedula, uint peso, uint altura, uint TensionArterial) public{
    if(listaDonantes[cedula].cedula!=0){
        listaDonantes[cedula].peso.push(peso);
        listaDonantes[cedula].altura.push(altura);
        listaDonantes[cedula].TensionArterial.push(TensionArterial);
        emit DatosCargadosExitosamente(true);
    }else{
        emit DatosNoEncontados();
        revert('Error en la carga de datos de salud');
    }
}

function createLote(uint idLote)public{
    if(listaLotesTotales[idLote].idLote == 0){
      listaLotesTotales[idLote].idLote = idLote;
      emit LoteCreadoExitosamente(idLote);
    }else{
        emit ErrorDeCreacion();
        revert('Error en la creacio del lote');
    }
}



function getEmpleado(address _BancosSangre, uint idEmpleado) public view returns(uint, string memory, string memory){
    if(listaBancos[_BancosSangre].EmpleadosAsociados[idEmpleado].idEmpleado != 0){
        return(listaBancos[_BancosSangre].EmpleadosAsociados[idEmpleado].idEmpleado,listaBancos[_BancosSangre].EmpleadosAsociados[idEmpleado].nombre,listaBancos[_BancosSangre].EmpleadosAsociados[idEmpleado].rol);
    }else{
        return(0,"","");
    }
}



function getBancoSangre(address dirrecionBanco)public view returns(uint,string memory, string memory){
    return(listaBancos[dirrecionBanco].idBanco,listaBancos[dirrecionBanco].direccion, listaBancos[dirrecionBanco].nombre);
}


function getDonante(uint _cedula) public view returns(uint cedula, uint edad, uint numeroTelefono, string memory nombre, string memory apellido, string memory Eps, string memory correoElectronico, string memory genero){
    if(listaDonantes[_cedula].cedula != 0){
        Donante memory  u= listaDonantes[_cedula];
     return (u.cedula,u.edad,u.numeroTelefono,u.nombre,u.apellido,u.Eps, u.correoElectronico,u.genero);
    }else{
        return(0,0,0,"","","","","");
    }
}




function setUbicacionUnidad(uint lote,  uint donacion, string  memory lat, string memory long) public{
    listaLotesTotales[lote].listaUnidades[donacion].ubicacion = Ubicacion({long:long,lat:lat});
}

function setUbicacionLote(uint lote, string  memory lat, string memory long) public{
    listaLotesTotales[lote].ubicacion = Ubicacion({long:long,lat:lat});
}


function getUbicacionUnidad(uint lote, uint donacion) public view returns(string memory, string memory){
    return(listaLotesTotales[lote].listaUnidades[donacion].ubicacion.long, listaLotesTotales[lote].listaUnidades[donacion].ubicacion.lat);
}



function getUbicacionLote(uint lote) public view returns(string memory, string memory){
    return(listaLotesTotales[lote].ubicacion.long, listaLotesTotales[lote].ubicacion.lat);
}

}
