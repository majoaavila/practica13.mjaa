var express = require('express'); //se importa la dependencia
// const req = require('express/lib/request');
// const res = require('express/lib/response');
var app = express(); //desclaramos una App de Express
var port = process.env.PORT || 3000; //setteamos el puerto para que escuche el servidor

app.set('view engine', 'ejs'); //se especifica al app de express q el template engine sera EJS, render toma nombre de la vista y la extension
app.use('/', function (req, res, next) { //debug al acceder a una ruta particular
    console.log('Request Url:' + req.url);
    next();
})

app.use('/assets', express.static(__dirname + '/public')); //mapear carpeta virtual

//primera ruta (esta al nivel de la raiz /), Hello World! ROUTE HANDLER
app.get('/', function (req, res) {
    //insertar etiqueta <link>
    res.render('index') //aqui se usa render porque un template engine se encargara de renderizar el contenido.
});

//segunda ruta /api => regresa un objeto JSON / buscar localhost:3000/api
app.get('/api', function(req, res) {
    res.json({firstname: 'John', lastname: 'Doe'});
});

//tercera ruta /person => recibe un parametro
app.get('/person/:id', function(req, res) {
    res.render('person', { ID: req.params.id});
});

//cuarta ruta /numbers => recibe parametro numerico
app.get('/numbers/:id', function (req, res) {
    res.render('numbers', { number: req.params.id});
});

app.listen(port); //levantar el server y ponerlo a la escucha