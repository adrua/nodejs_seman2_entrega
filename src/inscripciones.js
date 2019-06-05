const fs = require('fs');
const path = require('path');
const inscripcionesFile = path.join(__dirname ,'../data') + '/inscripciones.json';
var inscripciones = [];


function saveSync() {
    var msg = {};
    fs.writeFileSync(inscripcionesFile, JSON.stringify(inscripciones), (err) => {
        if(err) {
            msg = {
                errorId: 101,
                error: err
            };
        } else {
            msg = {
                errorId: 0,
                error: "Actualizacion de inscripciones Exitosa"
            };
        }
    });

    return msg;
}

function check(inscripcion) {
    console.log(inscripcion);
    var msg = { errorId: 0 };
    if(!inscripcion.id) {
        msg.errorId = 103;
        msg.error = 'por favor registre un id\n';
    }
    if(!inscripcion.cursoId) {
        msg.errorId = 103;
        msg.error = 'por favor seleccion un curso\n';
    }
    if(!inscripcion.nombre) {
        msg.errorId = 103;
        msg.error += 'por favor registre un nombre\n';
    }
    if(!inscripcion.correo) {
        msg.errorId = 103;
        msg.error += 'por favor registre un correo\n';
    }
    if(!inscripcion.telefono) {
        msg.errorId = 103;
        msg.error += 'por favor registre un telefono\n';
    }
    return msg;
}

function getById(id, cursoId) {    
    inscripciones = require(inscripcionesFile);
    cursoId = parseInt(cursoId);
    return inscripciones.find((cur) => cur.id === id && cur.cursoId == cursoId);
}

function getByCursoId(cursoId) {    
    inscripciones = require(inscripcionesFile);
    cursoId = parseInt(cursoId);
    return inscripciones.filter((cur) => cur.id === id && cur.cursoId == cursoId);
}

function add(inscripcion) {
    var msg = {};
    inscripcion.cursoId = parseInt(inscripcion.cursoId || '0');
    if(getById(inscripcion.id, inscripcion.cursoId)) {
        msg = {
            errorId: 102,
            error: `inscripcion: ${inscripcion.id} ya existe`
        };
    } else {
        msg = check(inscripcion)
        if(msg.errorId === 0) {
            inscripciones.push(inscripcion);
            msg = saveSync();                
        }
    }     
    return msg;
}

function remove(cursoId, id) {
    inscripciones = require(inscripcionesFile);
    cursoId = parseInt(cursoId);
    inscripciones = inscripciones.filter((cur) => !(cur.id === id && cur.cursoId == cursoId));
    return saveSync();
}

module.exports = {
    add,
    getById ,
    getByCursoId,
    remove
}