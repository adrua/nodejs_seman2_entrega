const fs = require('fs');
const path = require('path');
const cursosFile = path.join(__dirname ,'../data') + '/cursos.json';
var cursos = [];


function saveSync() {
    var msg = {};
    fs.writeFileSync(cursosFile, JSON.stringify(cursos), (err) => {
        if(err) {
            msg = {
                errorId: 101,
                error: err
            };
        } else {
            msg = {
                errorId: 0,
                error: "Actualizacion de cursos Exitosa"
            };
        }
    });

    return msg;
}

function check(curso) {
    var msg = {errorId:0};
    if(!curso.id) {
        msg.errorId = 103;
        msg.error = 'por favor registre un id\n';
    }
    if(!curso.descripcion) {
        msg.errorId = 103;
        msg.error += 'por favor registre una descripcion\n';
    }
    if(!curso.valor) {
        msg.errorId = 103;
        msg.error += 'por favor registre un valor\n';
    } 
    return msg;
}

function getById(id) {    
    cursos = require(cursosFile);
    id = parseInt(id);
    return cursos.find((cur) => cur.id === id);
}

function add(curso) {
    var msg = {};
    curso.id = parseInt(curso.id || '0');

    if(getById(curso.id)) {
        msg = {
            errorId: 102,
            error: `curso: ${curso.id} ya existe`
        };
    } else {

        msg = check(curso);
        if(msg.errorId == 0) {
            curso.valor = parseInt(curso.valor);
            curso.intensidad = parseInt(curso.intensidad || '0');
            cursos.push(curso);
            msg = saveSync();
        }
    }     

    return msg;

}

function update(curso) {
    var msg = {};
    curso.id = parseInt(curso.id || '0');
    var _curso = getById(curso.id);
    if(_curso) {
        for(key in curso) {
            _curso[key] = curso[key];
        }
        msg = check(_curso);
        if(msg.errorId == 0) {
            _curso.valor = parseInt(_curso.valor);
            _curso.intensidad = parseInt(_curso.intensidad || '0');
            msg = saveSync();
        }
    } else {
        msg = {
            errorId: 102,
            error: `curso: ${curso.id} no existe`
        };
    }     

    return msg;

}

module.exports = {
    add,
    getById,
    update  
}