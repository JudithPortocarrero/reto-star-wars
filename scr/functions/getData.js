const AWS = require("aws-sdk");
const { scanDynamo } = require("../utils/dynamo");
const { get } = require("../utils/axios");
const translate = new AWS.Translate();

const listarJedis = async (event) => {
    console.log('listarJedis***')
    try {
        const listar = await scanDynamo({ TableName: "theStarWars" });
        return {
            codigoStatus: 200,
            mensaje: "¡Exito!",
            body: listar.Items
        };
    } catch (err) {
        return {
            codigoStatus: 500,
            mensaje: "!Ups, hemos tenido un error!",
        };
    }
};

const traducirData = async (event) => {
    try {
        const response = get('people/1');
        const data = response.data;

        const mapping = {
            name: "nombre",
            height: "altura",
            mass: "masa",
            hair_color: "color_cabello",
            skin_color: "color_piel",
            eye_color: "color_ojos",
            birth_year: "año_nacimiento",
            gender: "genero",
            homeworld: "planeta_natal",
            films: "peliculas",
            species: "especies",
            vehicles: "vehiculos",
            starships: "naves_estelares",
            created: "creado",
            edited: "editado",
            url: "enlace"
        };

        const translatedData = {};
        for (const clave in data) {
            try {
                let translatedKey = mapping.hasOwnProperty(clave) ? mapping[clave] : clave;

                const params = {
                    SourceLanguageCode: 'auto',
                    TargetLanguageCode: 'es',
                    Text: data[clave],
                };
                const translationResponse = await translate.translateText(params).promise();
                translatedData[translatedKey] = translationResponse.TranslatedText;
            } catch (error) {
                console.error("Error al traducir:", error);
                translatedData[clave] = data[clave];
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(translatedData),
        };
    } catch (error) {
        console.error("!Ups, hemos tenido un error!", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "!Ups, hemos tenido un error!" }),
        };
    }
};

module.exports = { listarJedis, traducirData };