# backend-express-graphql-mongodb-example
## Exemplo de backend utilizando Express.js, GraphQL e MongoDB
### Instalação
Baixe o repositório
```sh
$ git clone https://github.com/rodrigocamarano/backend-express-graphql-mongodb-example
```
Execute os seguintes comandos
```sh
$ cd backend-express-graphql-mongodb-example
$ yarn
```
O exemplo foi baseado em uma conta crieada no https://www.mongodb.com/cloud/atlas
Crie uma conta e no diretório raiz crie o arquivo nodemon.json substituindo **xxx** pelas configurações necessárias
```sh
{
    "env": {
        "MONGO_USER": "xxx",
        "MONGO_PASSWORD": "xxx",
        "MONGO_SERVER": "xxx",
        "MONGO_DEFAULT_DATABASE": "xxx",
        "MONGO_DEFAULT_PAGE_SIZE": "1000"
    }
}
```
Após criar a conta execute o comando abaixo
```sh
$ yarn start
```
Para realiar testes foi utilizado o https://insomnia.rest/download/
Acesse 
```sh
http://localhost:8080/graphql
```
## Categorias
Para criar uma categoria:
```sh
mutation createCategory {
  createCategory(categoryInput: {description: "Test"}) {
    _id
    description
  }
}
```
Para criar várias categorias de teste utilizando o https://www.npmjs.com/package/faker (você pode definir a quantidade a ser criada, ao executar este comando todas as coleções serão apagadas)
```sh
mutation {
  createCategoryFaker(quantity: 10)
}
```
Para visualizar de forma simples as categorias criadas:
```sh
{
  categories {
    categories {
      _id
      description      
      products {
        _id
        description
        details
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    totalPages
    totalRecords
  }
}
```
Para visualizar de forma detalhada as categorias criadas (pode ser necessário substituir Chief por outra categoria):
```sh
{
  categories(filter: "Chief", sortField: "description", sortOrder: "ASC", page: 1, pageSize: 2) {
    categories {
      _id
      description
      products {
        _id
        description
        details
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    totalPages
    totalRecords
  }
}
```
Para excluir uma categoria de teste (pode ser necessário substituir o ID):
```sh
mutation {
  deleteCategory(id: "5ec2929ddfe20824cf8ccf48")
}
```
## Produtos
Para criar um produto:
```sh
mutation createProduct {
  createProduct(productInput: {description: "Test",details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin viverra orci a ornare pulvinar. Quisque maximus, neque quis finibus consectetur, mi quam commodo risus, eu suscipit augue dolor congue lorem. Etiam sodales purus tellus. Fusce porttitor massa nibh, ac ullamcorper odio viverra ac. Nullam ornare bibendum dapibus. Proin nisl elit, interdum ut ultricies non, aliquam sed felis. Integer a malesuada mauris. Vivamus mattis massa vitae mauris tempor finibus. Duis massa mauris, sollicitudin id dolor nec, finibus convallis nisi. Integer consequat ligula quis purus interdum vestibulum. Fusce molestie lorem sem."}) {
    _id
    description
  }
}

```
Para criar vários produtos de teste utilizando o https://www.npmjs.com/package/faker (você pode definir a quantidade a ser criada, ao executar este comando todas as coleções serão apagadas)
```sh
mutation {
  createProductFaker(quantity: 30)
}
```
Para visualizar de forma simples os produtos criados:
```sh
{
  products {
    products {
      _id
      description
      details
      createdAt
      updatedAt
      categories {
        _id
        description
        createdAt
        updatedAt
      }
    }
    totalPages
    totalRecords
  }
}
```
Para visualizar de forma detalhada os produtos criados (pode ser necessário substituir **Barros** por outra categoria):
```sh
{
  products(filter: "Barros", sortField: "description", sortOrder: "ASC", page: 1, pageSize: 2) {
    products {
      _id
      description
      details
      createdAt
      updatedAt
      categories {
        _id
        description
        createdAt
        updatedAt
      }
    }
    totalPages
    totalRecords
  }
}
```
Para excluir um produto (pode ser necessário substituir o ID):
```sh
mutation {
  deleteProduct(id: "5ec293e5dfe20824cf8ccf6f")
}
```