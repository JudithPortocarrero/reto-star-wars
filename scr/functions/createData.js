const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const { putDynamo } = require("../utils/dynamo");

const crearJedi = async (event) => {
    const id = v4();
    console.log("Id creado: ", id);

    const { nombre, altura, peso, color_cabello, color_piel, color_ojos, año_nacimiento, genero, sable_laser } = JSON.parse(event.body);

    const fechaCreacion = Date.now();

    const params = {
        TableName: "theStarWars",
        Item: {
            id, fechaCreacion, nombre, altura, peso, color_cabello, color_piel, color_ojos, año_nacimiento, genero, sable_laser
        }
    }

    try {
        const crear = await putDynamo(params);
        return {
            codigoStatus: 200,
            mensaje: "¡Exito!",
            data: params.Item,
        };
    } catch (err) {
        return {
            codigoStatus: 500,
            mensaje: "!Ups, hemos tenido un error!",
        };
    }
};

module.exports = { crearJedi };
  