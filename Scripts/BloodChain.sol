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

    //listing 3
    event TraceExists(uint msgOrder, uint from_tru, uint to_tru);
    event TraceDoesNotExist(uint msgOrder, uint from_tru, uint to_tru);
    event ActivityCreated(uint msgOrder, uint activityId, address direccionLugar, uint consumedTruId, uint producedTruId);
    event TruCreated(uint msgOrder, uint truId);
    event TruConsumed(uint msgOrder, uint truId, uint activityId, address direccionLugar);
    event TruProducedBy(uint msgOrder, uint currTru, uint currActivity, address direccionLugar);
    event ActivityConsumes(uint msgOrder, uint currActivity, address direccionLugar, uint currTru);
    

    constructor () public{
        msgOrder = 0;
    }
    
    //... remaining listings 2-8
    
    
    //listing 2
    modifier nonZero(uint num) {
        if(num == 0){
            revert('Error el numero es zero');
        }
        _;
    }
    
    modifier truDoesNotExist(uint id){
        if(truLookup[id].created){
            revert('El tru ya existe');
        }
        _;
    }
    
    modifier truExists(uint id){
        if(truLookup[id].created != true){
            revert('El tru no existe');
        }
        _;
    }
    
    modifier primitiveActivityDoesNotExist(uint id){
        if(activityLookup[id].created){
            revert('El activiti ya fue creado');
        }
        _;
    }
    
    modifier primitiveActivityExists(uint id){
        if(activityLookup[id].created != true){
            revert();
        }
        _;
    }
    
    modifier truAvailable(uint id){
        if(truLookup[id].consumed || truLookup[id].used){
            revert();
        }
        _;
    }
    
struct BancosSangre{
    uint idBanco;
    string direccion;
    string nombre;
    uint cantidadLotes;
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


  struct Tru{ // Unidad de valor, en pocas palabra que es lo que se esta firmando 
        bool consumed;
        bool used;
        bool created;
        uint id;
        uint producedBy;
        uint consumedBy;
        string long;
        string lat;
    }
    
    struct PrimitiveActivity{  //Actores que pueden realizar un Trazo
        bool created;
        address direccionLugar;
        uint id;
        uint inputTruId;
        uint outputTruId;
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
    uint cantidadDonaciones;
    bool valido;
}

struct Donacion{
    uint idDonacion;
    uint cantidadExtraida;
    uint numeroVenoponuciones;
    uint numeroMinExtraccion;
    string fechaDonacion;
    uint idDonante;
    uint TruInicio;
    uint TruEnd;
    Documento HashConsentimiento;
    Documento HashEiquetaUnidad;
    Documento HashFirmaDonante;
    TipoBolsa tipBolsa;
    Empleado medicoEncargado;
}

struct LoteDonacion{
    uint idLote;
    Tru inicio;
    Tru end;
    mapping(uint=> Donacion) listaUnidades;
}





mapping(uint=>LoteDonacion) listaLotesTotales;
mapping(uint=>Donante) listaDonantes;
mapping(address=>BancosSangre) listaBancos;
    
mapping(uint => Tru) truLookup;
mapping(uint => PrimitiveActivity) activityLookup; // Lista de actores que realizaron un trazo 
    
    uint msgOrder;
    



//Busqueda de una Donacion por lote.
function getDonacionLote(uint idLote, uint idDonacion)public view returns(uint id, uint cantidadExtraida, uint numeroVenoponuciones, uint numeroMinExtraccion,string memory fechaDonacion, TipoBolsa idBolsa, uint idEmpleado){
Donacion memory u = listaLotesTotales[idLote].listaUnidades[idDonacion];
return (u.idDonacion,u.cantidadExtraida,u.numeroVenoponuciones, u.numeroMinExtraccion, u.fechaDonacion,u.tipBolsa, u.medicoEncargado.idEmpleado);
}

function getDonacionUsuario()public {

}



//creacion de una donacion que se agrega aun lote.
function setDonacion(address _BancosSangre, uint idDonacion,uint _idLote, uint _cantidadExtraida, uint numeroVenoponuciones, uint numeroMinExtraccion, string memory fechaDonacion, TipoBolsa tipo, uint idMedico, uint idUser)public{
    if(listaLotesTotales[_idLote].listaUnidades[idDonacion].idDonacion == 0 && listaDonantes[idUser].valido == true ){
        listaLotesTotales[_idLote].listaUnidades[idDonacion].idDonacion = idDonacion;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].cantidadExtraida = _cantidadExtraida;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].numeroVenoponuciones = numeroVenoponuciones;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].numeroMinExtraccion = numeroMinExtraccion;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].fechaDonacion = fechaDonacion;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].tipBolsa = tipo;
        listaLotesTotales[_idLote].listaUnidades[idDonacion].medicoEncargado = listaBancos[_BancosSangre].EmpleadosAsociados[idMedico];
        listaDonantes[idUser].cantidadDonaciones++;
        
        listaBancos[msg.sender].listaLotesPropios[listaBancos[msg.sender].cantidadLotes++] = _idLote;
        emit DatosCargadosExitosamente(true);
    }else{
        revert('ERROR DE CREACION');
    }
}



// creacion de un donante de sangre
function setDonante(uint cedula, uint edad, uint numeroTelefono, string memory nombre, string memory apellido, string memory Eps, string memory correoElectronico, string memory genero, bool valido)public{

if(listaDonantes[cedula].cedula == 0){
    listaDonantes[cedula].cedula = cedula;
    listaDonantes[cedula].edad = edad;
    listaDonantes[cedula].numeroTelefono = numeroTelefono;
    listaDonantes[cedula].nombre = nombre;
    listaDonantes[cedula].apellido = apellido;
    listaDonantes[cedula].Eps = Eps;
    listaDonantes[cedula].correoElectronico = correoElectronico;
    listaDonantes[cedula].genero = genero;
    listaDonantes[cedula].valido = valido;
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


function getUbicacionUnidad(uint lote, uint donacion) public view returns(string memory, string memory){
    uint idtru = listaLotesTotales[lote].listaUnidades[donacion].TruEnd;
    return(truLookup[idtru].long, truLookup[idtru].lat);
}



function getUbicacionLote(uint lote) public view returns(string memory, string memory){
    return(listaLotesTotales[lote].end.long, listaLotesTotales[lote].inicio.lat);
}

    //listing 4
    function newTru(uint id) private //Funcion que permite la creacion de la unidad de valor
    truDoesNotExist(id)
    nonZero(id)
    {
        truLookup[id].created = true;
        truLookup[id].id = id;
        truLookup[id].consumed = false;
        truLookup[id].used = false;
        truLookup[id].producedBy = 0;
        truLookup[id].consumedBy = 0;
        emit TruCreated(msgOrder++, id);
    }
    
    //listing 5
    function newTru(uint id, uint activityId) private // Metodo que  firma la unidad de valor por su creador.
    truDoesNotExist(id)
    nonZero(id)
    primitiveActivityExists(activityId)
    {
        newTru(id);
        truLookup[id].producedBy = activityId;
        
    }
    
    //listing 6
    function consumeTru(uint truId, uint activityId,string memory long, string memory lat, uint idUnidad, uint idLote) private //Meotodo que firman que la unidad de valor fue recibida.
    truExists(truId)
    truAvailable(truId)
    primitiveActivityExists(activityId)
    {
        truLookup[truId].consumed = true;
        truLookup[truId].long = long;
        truLookup[truId].lat = lat;
        truLookup[truId].consumedBy = activityId;
        if(listaLotesTotales[idLote].listaUnidades[idUnidad].TruInicio ==0){
            listaLotesTotales[idLote].listaUnidades[idUnidad].TruInicio = truId;
            listaLotesTotales[idLote].listaUnidades[idUnidad].TruEnd = truId;
        }else{
             listaLotesTotales[idLote].listaUnidades[idUnidad].TruEnd = truId; 
        }
        emit TruConsumed(msgOrder++, truId, activityId, activityLookup[activityId].direccionLugar);
        
    }
    
    //listing 7
    function newPrimitiveActivity(address name, uint idTrazo, uint inputTruId, uint outputTruId,string memory long, string memory lat, uint idUnidad, uint idLote) // Metodo que permite Crear un Autor que podra firmar el trazo
    truAvailable(inputTruId)
    truDoesNotExist(outputTruId)
    primitiveActivityDoesNotExist(idTrazo)
    nonZero(idTrazo)
    public {
        activityLookup[idTrazo].direccionLugar = name;
        activityLookup[idTrazo].id = idTrazo;
        activityLookup[idTrazo].created = true;
        
        if(truLookup[inputTruId].created != true){
            newTru(inputTruId);
        }
        emit ActivityCreated(msgOrder++, idTrazo, name, inputTruId, outputTruId);
        consumeTru(inputTruId, idTrazo,long, lat,idUnidad, idLote);
        activityLookup[idTrazo].inputTruId = inputTruId;
        newTru(outputTruId, idTrazo);
        activityLookup[idTrazo].outputTruId = outputTruId;
    }
    
    //listing 8
    function primitiveTrace(uint tru_begin, uint tru_end) //metodo que realiza el dibujo de la Trazabilidad  segun quien lo creo y consumio.
    truExists(tru_begin)
    truExists(tru_end)
    public  {
        uint currTru = tru_begin;
        
        while(currTru != tru_end && truLookup[currTru].producedBy != 0){
            uint currActivity = truLookup[currTru].producedBy;
            address dir  = activityLookup[currActivity].direccionLugar;
            emit TruProducedBy(msgOrder++, currTru, currActivity, dir);
            currTru = activityLookup[currActivity].inputTruId;
            dir = activityLookup[currActivity].direccionLugar;
            emit ActivityConsumes(msgOrder++, currActivity, dir, currTru);
        }
        if(currTru == tru_end){
           emit TraceExists(msgOrder++, tru_begin, tru_end);
        }
        else
        {
           emit   TraceDoesNotExist(msgOrder++,tru_begin, tru_end);
        }
    }
    

}
