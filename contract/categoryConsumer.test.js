const { reporter, flow, handler, mock } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; 
  pf.config.projectId = 'addCategoryFront-service';
  pf.config.projectName = 'Add Category Front Service';
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
    provider: 'addCategoryApi-service',
    flow: 'Adicionar',
    request: {
      method: 'POST',
      path: 'http://lojaebac.ebaconline.art.br/api-docs/#/default/post_api_addCategory',
      body: {
        "name": "Bags",
        "photo": "prenelove.ca/cdn/shop/articles/how-many-bags-should-you-own-225009_1024x733.jpg?v=1709320764"
      }
    },
      response: {
        status: 200,
        body: {
        "success": true,
        "message": "category added",
        "data": {
          "_id": "6941a8576a9a40875825fd57",
          "name": "Bags",
          "photo": "prenelove.ca/cdn/shop/articles/how-many-bags-should-you-own-225009_1024x733.jpg?v=1709320764",
          "createdAt": "2025-12-16T18:43:35.067Z",
          "updatedAt": "2025-12-16T18:43:35.067Z",
          "__v": 0
        }
      }
    }
  }
})

it('FRONT - deve adicionar categoria', async () => {
    await flow("Adicionar")
        .useInteraction('Adicionar response')
        .post('http://localhost:4000/api-docs/#/default/post_api_addCategory')
        .withHeaders("authorization", token)
        .withJson({
            "name": "Bags",
            "photo": "prenelove.ca/cdn/shop/articles/how-many-bags-should-you-own-225009_1024x733.jpg?v=1709320764"
        })
        .expectStatus(200)
        .expectJson('success', true)
});