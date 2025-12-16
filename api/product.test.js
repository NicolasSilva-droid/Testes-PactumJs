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
it('API - deve adicionar produto', async () => {
    _id = await spec()
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
            .returns('data._id')
});

it('API - deve editar produto', async () => {
    await spec()
        .put('http://lojaebac.ebaconline.art.br/api-docs/#/default/put_api_editProduct__id_')
        .withPath("id", _id)
        .withHeaders("authorization", token)
        .withJson({
            "name": "lapis",
            "price": "15",
            "quantity": "10",
            "description": "verde",
            "photos": "encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIFjrBqj1iMWuPQ8NygMolDDug78TxHE_nVw&s"
        })
        .expectStatus(200)
        .expectJson('success', true)
});

it('API - deve deletar produto', async () => {
    await spec()
        .delete('http://lojaebac.ebaconline.art.br/api-docs/#/default/delete_api_deleteProduct__id_')
        .withPath("id", _id)
        .withHeaders("authorization", token)
        .withJson({
            "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3OWY1MGViMGNmMGE5MTMyNThiMjg2YyIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTc2NTg5Njg0NywiZXhwIjoxNzY1OTgzMjQ3fQ.wqKUZ-071tJAN787JapPQyTqCeumJpAYWumuAssRiRc"
        })
        .expectStatus(200)
        .expectJson('success', true)
});