const { Router } = require('express');
const express = require('express');
const router = express.Router();
const connectionBD = require('../database');

router.get('/nroregistros', async (req, res) => {
    rowVehiculos = await connectionBD.query('SELECT COUNT(nro_placa) FROM vehiculos;');
    rowLineas = await connectionBD.query('SELECT COUNT(id_linea) FROM tipo_linea;');
    rowMarcas = await connectionBD.query('SELECT COUNT(id_marca) FROM tipo_marca;');
    if (rowVehiculos[0]['COUNT(nro_placa)'] == 30 && rowLineas[0]['COUNT(id_linea)'] == 20 && rowMarcas[0]['COUNT(id_marca)'] == 5) {
        res.send('Los registros tienen las cantidades previstas');
    } else {
        res.send('Los registros no tienen las cantidades que se solicitaron');
    }
});

router.get('/modelo-maxmin', async (req, res) => {
    row = await connectionBD.query('select modelo, count(modelo) nro_veces from vehiculos group by modelo order by nro_veces desc;');
    const result = [row[0], row[row.length - 1]]
    res.send(result);
})

router.get('/lineasxmarca', async (req, res) => {
    row = await connectionBD.query('SELECT tipo_linea.id_linea, tipo_linea.desc_linea, tipo_marca.desc_marca FROM tipo_linea INNER JOIN tipo_marca ON tipo_linea.id_marca=tipo_marca.id_marca;');
    res.send(row);
})

router.post('/vehiculosfecha', async (req, res) => {
    const { init, end } = req.body;
    row = await connectionBD.query(`SELECT * FROM vehiculos WHERE fecha_ven_contratodo BETWEEN "${init}" and "${end}";`);
    res.send(row);
});

router.post('/rangovehiculos', async (req, res) => {
    const { a, b } = req.body;
    row = await connectionBD.query(`SELECT * FROM vehiculos WHERE modelo BETWEEN "${a}" and "${b}" ORDER BY modelo;`);
    res.send(row);
});

router.post('/updateregistro', async (req, res) => {
    const { activo, id } = req.body;
    row = await connectionBD.query(`UPDATE tipo_linea set activo = "${activo}" WHERE id_linea = ${id};`);
    res.send(row);
});

router.post('/eliminar_registro', async (req, res) => {
    const { id } = req.body;
    row = await connectionBD.query(`DELETE FROM tipo_marca WHERE id_marca = ${id};`);
    res.send(row);
});

router.get('/todoslosregistros', async (req, res) => {
    row = await connectionBD.query(`SELECT vehiculos.nro_placa,vehiculos.modelo,tipo_linea.desc_linea, tipo_marca.desc_marca FROM tipo_linea INNER JOIN vehiculos ON vehiculos.id_linea = tipo_linea.id_linea INNER JOIN tipo_marca ON tipo_marca.id_marca = tipo_linea.id_marca;`);
    res.send(row);
});

router.get('/todoslosregistros_s', async (req, res) => {
    row = await connectionBD.query(`SELECT vehiculos.nro_placa,vehiculos.modelo,tipo_linea.desc_linea, tipo_marca.desc_marca FROM tipo_linea INNER JOIN vehiculos ON vehiculos.id_linea = tipo_linea.id_linea INNER JOIN tipo_marca ON tipo_marca.id_marca = tipo_linea.id_marca WHERE tipo_linea.activo = 'S';`);
    res.send(row);
});

router.get('/suma_de_los_modelos', async (req, res) => {
    row = await connectionBD.query(`SELECT modelo, count(modelo) AS Cantidad FROM vehiculos GROUP BY modelo;`);
    res.send(row);
});

router.get('/prom_de_los_modelos', async (req, res) => {
    row = await connectionBD.query(`SELECT AVG(Cantidad) FROM (SELECT modelo, count(modelo) AS Cantidad FROM vehiculos GROUP BY modelo) as T;`);
    res.send(row);
});

module.exports = router;