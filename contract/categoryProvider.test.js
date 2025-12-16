const { reporter, flow } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; 
  pf.config.projectId = 'addCategoryApi-service';
  pf.config.projectName = 'Add Category API Service';
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

it('API - deve adicionar categoria', async () => {
    await flow("Adicionar")
        .post('http://lojaebac.ebaconline.art.br/api-docs/#/default/post_api_addCategory')
        .withHeaders("authorization", token)
        .withJson({
            "name": "Bags",
            "photo": "prenelove.ca/cdn/shop/articles/how-many-bags-should-you-own-225009_1024x733.jpg?v=1709320764"
        })
        .expectStatus(200)
        .expectJson('success', true)
});