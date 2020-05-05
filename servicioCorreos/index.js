const http = require('http');
const express = require('express');
const app = express();
const email = require('./src/correo/enviarCorreo');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/', (req, res) => {
    try {
        const data = {
            idUsuario: req.body.idUsuario,
            email: req.body.email,
            nombreProducto: req.body.nombreProducto,
            idProducto: req.body.idProducto,
            cantidad: req.body.cantidad
        }
        const ok = email.sendMail(data);

        if(ok){
            console.log("El mensaje se ha enviado con exito.");
            res.status(200).send("El mensaje se ha enviado con exito.")
        }else{
            console.log("No se pudo enviar el correo.");
            res.status(500).send("No se pudo enviar el correo.")
        }
        
    } catch (error) {
        res.status(500).send("No se pudo enviar el mensaje.")
    }
});

http.createServer(app).listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});