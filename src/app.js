const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./helper');

const cursos = require('./cursos');
const inscripciones = require('./inscripciones');

const directorioPublico = path.join(__dirname ,'../public');
const directorioPartials = path.join(__dirname ,'../partials');
app.use(express.static(directorioPublico));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

hbs.registerPartials(directorioPartials);

app.set('view engine', 'hbs');

app.post('/cursos', (req, res) => {
    const result = cursos.add(req.body);
    res.render('cursos', { 
        result: result
    });
});

app.get('/cursos', (req, res) => {
    res.render('cursos');
});

app.get('/cursosCerrar', (req, res) => {
    cursos.update({id: req.query.cursoId, estado: 'C' });
    res.render('cursos');
});

app.get('/oferta', (req, res) => {
    const curso = cursos.getById(req.query.cursoId);
    res.render('inscripcion', { curso, result: {}, inscripcion: {} });
});

app.get('/ofertas', (req, res) => {
    res.render('cursos_ofertas');
});

app.post('/inscripcion', (req, res) => {
    const result = inscripciones.add(req.body);
    const curso = cursos.getById(req.body.cursoId);
    res.render('inscripcion', { curso, result, inscripcion: req.body });            
});

app.get('/inscritos', (req, res) => {
    res.render('inscritos',  req.query);
});

app.get('/inscritosEliminar', (req, res) => {
    inscripciones.remove(req.query.cursoId, req.query.id);
    res.render('inscritos',  req.query);
});

app.get('*', (req, res) => {
    res.render('index');
});


app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000')
})
