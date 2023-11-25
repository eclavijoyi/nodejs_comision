const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { resultado: null });
});

app.post('/', (req, res) => {
    const comision = parseFloat(req.body.comision);
    const comision_principal = comi(comision);
    const comision_extra_condicional = comision_extra(comision);

    const resultado = {
        comision_principal: comision_principal,
        comision_extra_condicional: comision_extra_condicional,
        comision_total: comision_principal + comision_extra_condicional,
    };

    res.render('index', { resultado: resultado });
});

function comi(num) {
    if (num < 30400) {
        return 0;
    } else if (30400 <= num && num <= 36465) {
        return 90;
    } else if (36465 < num && num <= 48620) {
        return 180;
    } else if (48620 < num && num <= 66852) {
        return 270;
    } else if (66852 < num && num <= 91162) {
        return 360;
    } else {
        return 450;
    }
}

function comision_extra(comision) {
    if (comision <= 91162) {
        return 0;
    } else {
        const diferenciaVenta = comision - 91162;
        const igv = diferenciaVenta * 0.18;
        const renta = diferenciaVenta * 0.03;
        const sumaIgvRenta = diferenciaVenta - (igv + renta);
        const resultado = sumaIgvRenta * 0.008;
        const resultadoRedondeado = Math.round(resultado * 100) / 100;
        return resultadoRedondeado;
    }
}

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
  });

