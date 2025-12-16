const { reporter, flow } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; 
  pf.config.projectId = 'addProductApi-service';
  pf.config.projectName = 'Add Product API Service';
  pf.config.version = '1.0.0';
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
});

// global after
after(async () => {
  await reporter.end();
});

it('API - deve adicionar produto', async () => {
    await flow("Adicionar")
        .post('http://lojaebac.ebaconline.art.br/api-docs/#/default/post_api_addProduct')
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