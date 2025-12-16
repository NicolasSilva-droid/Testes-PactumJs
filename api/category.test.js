const {spec} = require('pactum')

let token;
beforeEach(async() => {
    token = await spec()
        .post('http://lojaebac.ebaconline.art.br/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')
});

let _id; 
it('API - deve adicionar categoria', async () => {
    _id = await spec()
        .post('http://lojaebac.ebaconline.art.br/api-docs/#/default/post_api_addCategory')
        .withHeaders("authorization", token)
        .withJson({
            "name": "Bags",
            "photo": "prenelove.ca/cdn/shop/articles/how-many-bags-should-you-own-225009_1024x733.jpg?v=1709320764"
        })
        .expectStatus(200)
        .expectJson('success', true)
        .returns('data._id')
});

it('API - deve editar categoria', async () => {
    await spec()
        .put('http://lojaebac.ebaconline.art.br/api-docs/#/default/put_api_editCategory__id_')
        .withPath("id", _id)
        .withHeaders("authorization", token)
        .withJson({
            "name": "Bugs",
            "photo": "https://ideiasesquecidas.com/wp-content/uploads/2014/11/bug.jpg"
        })
        .expectStatus(200)
        .expectJson('success', true)
});

it('API - deve deletar categoria', async () => {
    await spec()
        .delete('http://lojaebac.ebaconline.art.br/api-docs/#/default/delete_api_deleteCategory__id_')
        .withPath("id", _id)
        .withHeaders("authorization", token)
        .withJson({
            "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3OWY1MGViMGNmMGE5MTMyNThiMjg2YyIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTc2NTg5NDE1MywiZXhwIjoxNzY1OTgwNTUzfQ.cRlxXUVrDbMmMl699Sj3i_2W22hj23enfm2Y8OoKglk"
        })
        .expectStatus(200)
        .expectJson('success', true)
});