//Daniel Rojas

pragma solidity ^0.5.1;


contract EstacionGas{

    event RegistroEstacionExitosa(uint);
    event RegistroCombustibleExitoso();
    event DepositoRealizado(bool);
    event DepositoFallido(bool);
    event DepositoCancelado(bool);
    event ErrorCancelacion(bool);
    event CargaGasolinaExitosa(TipoCombustible, uint, uint, uint);
    event CargaGasolinaFallida();
    event InformacionGasStation();
    event CargaTransaccion(address, TipoCombustible,uint,uint,uint,bool);
    struct Estacion{
        string nombreEstacion;
        uint[3] listaPreciosTipoCombustible; //cada Estacion define su lista de precios, donde cada pocision (pos 0 => GAS) representa un tipo de combustible
        mapping(uint => Transaccion) listaTransacciones; //Cada estacion maneja un diccionario de transacciones para llevar el registro de la interaccion de deposito de los vehiculos
    }
    struct Transaccion{ //Cada vehiculo que realice exitosamente un deposito de gasolina es una Transaccion de la estacion.
        address payable direccionVehiculo;
        TipoCombustible fuelSolicitado;
        uint deposito;
        uint cantidadSolicitadaFuel;
        uint depositoDevuelta;
        bool valida; // Sirve para saber si la Transaccion todavia es valida /(False => cuando se cancela el deposito antes de la carga de combustible o cuado se cargo el combustible);
    }

    enum TipoCombustible {GAS, Diesel, Corriente} //Tipos de combustible que manejan todas las estaciones
    TipoCombustible[] listaCombustibles = [TipoCombustible.GAS, TipoCombustible.Diesel, TipoCombustible.Corriente]; // Lista de indices de los Tipos de combustibles
    mapping(address => Estacion) estaciones; // Registro de Todas la estaciones en la red;
    mapping(address => uint) listaVehiculosGlobal; //Registro de todos los vehiculos  que hayan interactuado con alguna estacion;
    mapping(address=>uint) SaldoEstaciones;// Registro de saldo de ethers ganados por cada estacion;

function setPriceFuel(address addEstacion,TipoCombustible tipo, uint _precio)public{
    estaciones[addEstacion].listaPreciosTipoCombustible[uint(tipo)] = _precio;
    emit RegistroCombustibleExitoso();
}
function getPriceFuel(address direccionEstacion, TipoCombustible tipo)public view returns(uint){
    return (estaciones[direccionEstacion].listaPreciosTipoCombustible[uint(tipo)]);
}
function setGasInfo( address direccionEstacion, string memory _nombre) public{
    estaciones[direccionEstacion].nombreEstacion = _nombre;
    emit RegistroEstacionExitosa(1);
}
function getGasInfo(address direccionEstacion) public view returns(string memory,  TipoCombustible[] memory, uint[3] memory){
    return(estaciones[direccionEstacion].nombreEstacion,listaCombustibles, estaciones[direccionEstacion].listaPreciosTipoCombustible);
}

/**
 * Esta funcion solo puede ser utilizada por el vehiculo;
 * */
function sendDeposit(address direccionEstacion,  uint idVehiculo,  TipoCombustible tipo, uint cantidadFuel )public payable{
    if(msg.value >= (estaciones[direccionEstacion].listaPreciosTipoCombustible[uint(tipo)] * cantidadFuel)){
    estaciones[direccionEstacion].listaTransacciones[idVehiculo].deposito += msg.value;
    estaciones[direccionEstacion].listaTransacciones[idVehiculo].cantidadSolicitadaFuel = cantidadFuel;
    estaciones[direccionEstacion].listaTransacciones[idVehiculo].fuelSolicitado = tipo;
    estaciones[direccionEstacion].listaTransacciones[idVehiculo].valida = true;
    estaciones[direccionEstacion].listaTransacciones[idVehiculo].direccionVehiculo = msg.sender;
    listaVehiculosGlobal[msg.sender] = idVehiculo;
    emit DepositoRealizado(true);
    }else{
    emit DepositoFallido(false);
    revert('La recarga no cumple el precio minimo dle combustible');
    }
}
function enviarFuel( address payable direccionEstacion, uint idVehiculo) public payable{
    if(verifyDeposit(direccionEstacion, idVehiculo) == true){
        uint precio = getPriceFuel(direccionEstacion, estaciones[direccionEstacion].listaTransacciones[idVehiculo].fuelSolicitado) * estaciones[direccionEstacion].listaTransacciones[idVehiculo].cantidadSolicitadaFuel;
        estaciones[direccionEstacion].listaTransacciones[idVehiculo].valida = false;
        if(estaciones[direccionEstacion].listaTransacciones[idVehiculo].deposito - precio == 0){
        estaciones[direccionEstacion].listaTransacciones[idVehiculo].depositoDevuelta = 0;
        SaldoEstaciones[direccionEstacion] += estaciones[direccionEstacion].listaTransacciones[idVehiculo].deposito;
        direccionEstacion.transfer(estaciones[direccionEstacion].listaTransacciones[idVehiculo].deposito);
        emit CargaGasolinaExitosa(estaciones[direccionEstacion].listaTransacciones[idVehiculo].fuelSolicitado,estaciones[direccionEstacion].listaTransacciones[idVehiculo].cantidadSolicitadaFuel, precio, 0);
        }else{
            if(estaciones[direccionEstacion].listaTransacciones[idVehiculo].deposito - precio > 0){
                uint depositoDevuelta = estaciones[direccionEstacion].listaTransacciones[idVehiculo].deposito - precio;
                estaciones[direccionEstacion].listaTransacciones[idVehiculo].depositoDevuelta = depositoDevuelta;
                estaciones[direccionEstacion].listaTransacciones[idVehiculo].direccionVehiculo.transfer(depositoDevuelta);
                direccionEstacion.transfer(estaciones[direccionEstacion].listaTransacciones[idVehiculo].deposito - depositoDevuelta);
                SaldoEstaciones[direccionEstacion] += estaciones[direccionEstacion].listaTransacciones[idVehiculo].deposito - depositoDevuelta;
                emit CargaGasolinaExitosa(estaciones[direccionEstacion].listaTransacciones[idVehiculo].fuelSolicitado,estaciones[direccionEstacion].listaTransacciones[idVehiculo].cantidadSolicitadaFuel, precio, depositoDevuelta);
                }else{
                emit CargaGasolinaFallida();
                revert('El deposito no tiene fondos');
            }
        }
    }else{
        emit CargaGasolinaFallida();
        revert('El deposito no es valido');
    }
}
function verifyDeposit(address direccionEstacion, uint idVehiculo) public view returns(bool){
    return(estaciones[direccionEstacion].listaTransacciones[idVehiculo].valida);
}
function cancelDeposit(address direccionEstacion, uint idVehiculo) public payable {
    if( estaciones[direccionEstacion].listaTransacciones[idVehiculo].valida == true ){
         estaciones[direccionEstacion].listaTransacciones[idVehiculo].valida = false;
         estaciones[direccionEstacion].listaTransacciones[idVehiculo].direccionVehiculo.transfer(estaciones[direccionEstacion].listaTransacciones[idVehiculo].deposito);
         emit DepositoCancelado(true);
    }else{
         emit ErrorCancelacion(false);
        revert('No se puede Cancelar la Transaccion');
    }
}


function getSaldoEstacion(address direccionEstacion) public view returns(uint){
    return SaldoEstaciones[direccionEstacion];
}
function getTransaccion(address direccionEstacion, uint idVehiculo) public{
        address direccionVehiculo = estaciones[direccionEstacion].listaTransacciones[idVehiculo].direccionVehiculo;
        TipoCombustible fuelSolicitado = estaciones[direccionEstacion].listaTransacciones[idVehiculo].fuelSolicitado;
        uint deposito = estaciones[direccionEstacion].listaTransacciones[idVehiculo].deposito;
        uint cantidadSolicitadaFuel = estaciones[direccionEstacion].listaTransacciones[idVehiculo].cantidadSolicitadaFuel;
        uint depositoDevuelta = estaciones[direccionEstacion].listaTransacciones[idVehiculo].depositoDevuelta;
        bool valida = estaciones[direccionEstacion].listaTransacciones[idVehiculo].valida;

emit CargaTransaccion(direccionVehiculo,fuelSolicitado,deposito,cantidadSolicitadaFuel,depositoDevuelta,valida);
}



}