const hbs = require('hbs');

function getModalidad(modalidad) {
    modalidad = modalidad || '';
    switch(modalidad) {
        case 'V': 
            modalidad = 'Virtual';
            break;
        case 'P': 
            modalidad = 'Presencial';
            break;
    };

    return modalidad;
}

function getEstado(estado) {
    estado = estado || '';
    switch(estado) {
        case 'D': 
            estado = 'Disponible';
            break;
        case 'C': 
            estado = 'Cerrado';
            break;
    };
    return estado;
}

hbs.registerHelper('mostrarCursos', () => {
    var cursos = require('../data/cursos.json');

    res = 
`<table>
    <thead>
        <th>Id</th>
        <th>Descripcion</th>
        <th>Valor</th>
        <th>Modalidad</th>
        <th>Intensidad</th>
        <th>Estado</th>
    </thead>
    <tbody>
`;
    cursos.forEach((curso) => {
        var descripcion = '';
        switch(curso.estado) {
            case 'D':
                descripcion = `<a href="/inscritos?cursoId=${curso.id}">${curso.descripcion}</a>`;
                break;
            default:  
                descripcion = curso.descripcion;
                break;  
        }
        res += 
`<tr>
    <td>${curso.id}</td>
    <td>${descripcion}</td>
    <td>${curso.valor}</td>
    <td>${getModalidad(curso.modalidad)}</td>
    <td>${curso.intensidad || ''}</td>
    <td>${getEstado(curso.estado)}</td>
</tr>
`;
    })

    res += 
`    </tbody>    
</table>
`
    return res;
});


hbs.registerHelper('ofertaCursos', () => {
    var cursos = require('../data/cursos.json')
    var _cursos = cursos.filter((curso) => curso.estado === 'D');   
    res = 
`<table>
    <thead>
        <th>Id</th>
        <th>Descripcion</th>
        <th>Valor</th>
    </thead>
    <tbody>
`;
    _cursos.forEach((curso) => {

        res += 
`<tr>
    <td>${curso.id}</td>
    <td><a href="/oferta?cursoId=${curso.id}">${curso.descripcion}</a></td>
    <td>${curso.valor}</td>
</tr>
`;
    })

    res += 
`    </tbody>    
</table>
`
    return res;
});

hbs.registerHelper('InscritosPorCursos', (cursoId) => {
    var cursos = require('../data/cursos.json')
    var inscripciones = require('../data/inscripciones.json')
    cursoId = parseInt(cursoId);
    var curso = cursos.find((curso) => curso.id === cursoId);   
    var inscritos = inscripciones.filter((inscripcion) => inscripcion.cursoId === cursoId);
    res = 
`<h2>${curso.id} - ${curso.descripcion} <a href='/cursosCerrar?cursoId=${curso.id}'>Cerrar</a></h2>
    <table>
    <thead>
        <th>Id</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Telefono</th>
    </thead>
    <tbody>
`;
    inscritos.forEach((inscrito) => {

        res += 
`<tr>
    <td>${inscrito.id}</td>
    <td>${inscrito.nombre}</a></td>
    <td>${inscrito.correo}</td>
    <td>${inscrito.telefono}</td>
    <td><a href=/inscritosEliminar?cursoId=${curso.id}&id=${inscrito.id}>Eliminar</td>
</tr>
`;
    })

    res += 
`       <tr>
            <td></td>
            <td></a></td>
            <td>Total:</td>
            <td>${inscritos.length}</td>
        </tr>
    </tbody>    
</table>
`
    return res;
});

hbs.registerHelper('getModalidad', (modalidad) => getModalidad(modalidad));
hbs.registerHelper('getEstado', (estado) => getEstado(estado));
