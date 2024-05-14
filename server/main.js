var express = require('express');
var app=express();
var server=require('http').Server(app);
var io = require ('socket.io')(server);
var messages=[{ id:1,
    texto:"hola soy un mensaje",
    autor: "Idalia Saenz Martinez"
}];

//Usamo un middleware para usar elementos estaticos en la seccion publica de la aplicación/
app.use(express.static('public'));

app.get('/', function(req,res){
    res.status(200).send("Hola mundo");
});

/*De esta forma activamos socket para que este escuchando mandamos un mensaje de control por consola para saber que pasa
y tenemos que hacer que el mensaje venga del navegador web mediante html y JS */ 
io.on('connection', function(socket){
    console.log('Alguien se ha conectado con socket')
    socket.emit('messages',messages);
    //ahora queremos escuchar todos los mensajes que envia el cliente
    socket.on('new-message',function(data){
        //para  poder guardar estos mensajes lo ideal seria en una base de datos
        //para este ejercicio utilizaremos arrays (esto no es bueno en produccion)

        messages.push(data);
        io.sockets.emit('messages',messages);

    });
});

server.listen(3002, function(){
    console.log("El servidor esta corriendo en http://localhost:3002");
});