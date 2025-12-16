const { reporter, flow, handler, mock } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; 
  pf.config.projectId = 'addProductFront-service';
  pf.config.projectName = 'Add Product Front Service';
  pf.config.version = '1.0.0';
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
  await mock.start(4000);
});

// global after
after(async () => {
  await mock.stop();
  await reporter.end();
});

handler.addInteractionHandler('Adicionar response', () => {
  return {
    provider: 'addProductApi-service',
    flow: 'Adicionar',
    request: {
      method: 'POST',
      path: 'http://lojaebac.ebaconline.art.br/api-docs/#/default/post_api_addProduct',
      body: {
        "name": "lapis",
        "price": "15",
        "quantity": "10",
        "description": "azul",
        "photos": "encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooe8ZT7JQ59s-RgAzua8lBt3L_iRyix9uzw&s"
      }
    },
      response: {
        status: 200,
        body: {
            "success": true,
            "message": "product added",
            "data": {
                "categories": [],
                "photos": [
                    "encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooe8ZT7JQ59s-RgAzua8lBt3L_iRyix9uzw&s"
                ],
            "visible": true,
            "additionalDetails": [],
            "_id": "6941b1836a9a40875825fd59",
            "name": "lapis",
            "price": 15,
            "quantity": 10,
            "description": "azul",
            "specialPrice": 15,
            "createdAt": "2025-12-16T19:22:43.158Z",
            "updatedAt": "2025-12-16T19:22:43.158Z",
            "__v": 0
                }
            }
        }
    }
})


it('FRONT - deve adicionar produto', async () => {
    await flow("Adicionar")
        .useInteraction('Adicionar response')
        .post('http://localhost:4000/api-docs/#/default/post_api_addProduct')
        .withHeaders("authorization", token)
        .withJson({
            "name": "lapis",
            "price": "15",
            "quantity": "10",
            "description": "azul",
            "photos": "encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooe8ZT7JQ59s-RgAzua8lBt3L_iRyix9uzw&s"
        })
        .expectStatus(200)
        .expectJson('success', true)
});