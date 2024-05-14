const { crearJedi } = require("../functions/createData");
const awsMock = require("aws-sdk-mock");

describe("crearJedi", () => {
  afterEach(() => {
    awsMock.restore("DynamoDB.DocumentClient");
  });

  it("crear nuevo Jedi", async () => {
    const dataPrueba = {
      body: JSON.stringify({
        nombre: "Judith Portocarrero",
        altura: 1.56,
        peso: 64,
        color_cabello: "negro",
        color_piel: "morena",
        color_ojos: "negro",
        año_nacimiento: "1999",
        genero: "femenino",
        sable_laser: "rosado"
      }),
    };

    awsMock.mock("DynamoDB.DocumentClient", "put", (params, callback) => {
      callback(null, {});
    });

    const response = await crearJedi(dataPrueba);

    expect(response.codigoStatus).toBe(200);
    expect(response.mensaje).toBe("¡Exito!");
    expect(response.data).toEqual({
      id: expect.any(String),
      fechaCreacion: expect.any(Number),
      ...JSON.parse(fakeEventData.body),
    });
  });
});
