const nodemailer = require('nodemailer');
require('dotenv').config();

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'elnora65@ethereal.email',
                pass: 'raxQ72fMdUd2Z9mMSm'
            }
        });

        //opciones por default
        this.mailOption = {
            from: '"Tienda AMDVAT" <elnora65@ethereal.email>', // sender address
            subject: "Suscripcion de productos en tienda AMDVAT" // Subject line
        }
    }

    sendMail(data) {
        // send mail with defined transport object

        try {
            var message = "Ya hay disponibles " + data.cantidad + " " + data.nombreProducto + ", reserva el tuyo antes que se acaben.";  //text body
            let mail = {
                ...this.mailOption,
                to: data.email, // list of receivers            
                text: message,
                html: message
            }
            const exito = true;

            this.transporter.sendMail(mail, (error, info) => {
                try {
                    if (error) {
                        exito = false;
                        return exito;
                    }
                    console.log("Mensaje enviado: %s", info.messageId);
                    console.log("url de vista previa: %s", nodemailer.getTestMessageUrl(info));
                    return exito;
                    
                } catch (error) {
                }
            })
            console.log(exito);
            return exito;
        } catch (error) {
            return false;
        }
    }
}


module.exports = new Mailer();