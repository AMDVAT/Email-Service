let expect = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('Validar Autenticacion de usuario', function () {
    var dataEmail,dataEmailIncorrect;
    beforeEach(function (done) {

        dataEmailCorrect = {
            idUsuario: 2,
            email: "testUser@gmail.com",
            nombreProducto: "producto10",
            idProducto: 2,
            cantidad: 15
        }
        dataEmailIncorrect = {
            idUsuario: 2,
            email: "testUser+gmail.com",        //daria error por el signo mas.
            nombreProducto: "producto10",
            idProducto: 2,
            cantidad: 15
        }
        done();
    });

    it('Enviar mensaje correcto', (done) => {
        chai.request('http://localhost:3000')
            .post('/')
            .send(dataEmailCorrect)
            .end(function (err, res) {
                //console.log(res)
                expect(res).to.have.status(200);
                done();
            });
    });
    it('No se pudo enviar el mensjae', (done) => {
        chai.request('http://localhost:3000')
            .post('/')
            .send(dataEmailIncorrect)
            .end(function (err, res) {
                //console.log(res)
                expect(res).to.have.status(200);
                done();
            });
    });

});