/*

async primitiveTraceAgent() {
return new Promise((resolve, reject) => {
console.log('Begin ' + this.truBegin);
console.log('end ' + this.truEnd);
console.log('Inicializando transaccion... (Por favor Espere)');
let account = this.account;
let begin = this.truBegin;
let end = this.truEnd;
this.trazabilidad=[];
this.registroContract.deployed().then( (instance) => {
return instance.primitiveTraceAgent(
begin, end,
{ from: account }
);
}).then( (status) => {
if (status) {
for (let _log of status.logs) {
console.log("Evento " + _log.event);
if (_log.event == "TruProducedBy") {
let step = new Traza("Produjo ",_log.args[1],_log.args[3]);
this.trazabilidad.push(step);
console.log(" Recibio de " + _log.args[1]);
console.log("Transaccion " + _log.args[3]);

} else if (_log.event == "ActivityConsumes") {
console.log("Recibido por " + _log.args[2]);
console.log("Item " + _log.args[3]);
let step = new Traza("Consumio",_log.args[3],_log.args[2]);
this.trazabilidad.push(step);

} else if (_log.event == "TraceExists") {
console.log("Existe un Traza Entre");
console.log("Recibido por " + _log.args[1]);
console.log("Item " + _log.args[2]);
let step = new Traza("TraceExists",-1,"-1");
this.trazabilidad.push(step);
} else if (_log.event == "TraceDoesNotExist") {
console.log("No existe trazabilidad entre los items");
let step = new Traza("TraceDoesNotExist",-1,"-1");
this.trazabilidad.push(step);
}

}
return resolve({ status: true });
}
}).catch(function (error) {
console.log(error);
let step = new Traza("TraceDoesNotExist Error",-1,"-1");
this.trazabilidad.push(step);
return reject("Error in transferEther service call");
});
});

}

*/