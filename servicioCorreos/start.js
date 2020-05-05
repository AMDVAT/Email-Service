var amqp = require('amqplib/callback_api');

amqp.connect('amqp://64.225.24.183:5672', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'amdvat';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            const email = require('./src/correo/enviarCorreo');
            email.sendMail(JSON.parse(msg.content.toString()));
        }, {
            noAck: true
        });
    });
});