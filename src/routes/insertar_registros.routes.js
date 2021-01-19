const { Router } = require('express');
const express = require('express');
const router = express.Router();
const connectionBD = require('../database');

router.post('/addmarcas', (req, res) => {

    req.body.forEach(async element => {
        const { desc_marca, activo } = element;
        const newMarca = {
            desc_marca,
            activo
        }
        console.log(element);
        await connectionBD.query('INSERT INTO tipo_marca set ?', [newMarca]);
    });
    res.send(req.body);
});

router.post('/addlineas', (req, res) => {

    req.body.forEach(async element => {
        const { desc_linea, id_marca, activo } = element;
        const newLinea = {
            desc_linea,
            id_marca,
            activo
        }
        console.log(element);
        await connectionBD.query('INSERT INTO tipo_linea set ?', [newLinea]);
    });
    res.send(req.body);
});

router.post('/addvehiculos', (req, res) => {

    req.body.forEach(async element => {
        const { nro_placa, id_linea, modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contratodo } = element;
        const newVehiculo = {
            nro_placa,
            id_linea,
            modelo,
            fecha_ven_seguro,
            fecha_ven_tecnomecanica,
            fecha_ven_contratodo
        }
        console.log(element);
        await connectionBD.query('INSERT INTO vehiculos set ?', [newVehiculo]);
    });
    res.send(req.body);
});

module.exports = router;