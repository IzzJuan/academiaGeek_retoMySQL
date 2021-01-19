const { Router } = require('express');
const express = require('express');
const router = express.Router();
const connectionBD = require('../database');

router.post('/addmarca', async (req, res) => {
    const { desc_marca, activo } = req.body;
    const newMarca = {
        desc_marca,
        activo
    }
    console.log(req.body);
    await connectionBD.query('INSERT INTO tipo_marca set ?', [newMarca]);
    res.send(newMarca);
});

router.post('/addlinea', async (req, res) => {
    const { desc_linea, id_marca, activo } = req.body;
    const newLinea = {
        desc_linea,
        id_marca,
        activo
    }
    console.log(req.body);
    await connectionBD.query('INSERT INTO tipo_linea set ?', [newLinea]);
    res.send(newLinea);
});

router.post('/addvehiculo', async (req, res) => {
    const { nro_placa, id_linea, modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contratodo } = req.body;
    const newVehiculo = {
        nro_placa,
        id_linea,
        modelo,
        fecha_ven_seguro,
        fecha_ven_tecnomecanica,
        fecha_ven_contratodo
    }
    res.send(newVehiculo);
    await connectionBD.query('INSERT INTO vehiculos set ?', [newVehiculo]);

});

module.exports = router;