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
[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.

  - Type some Markdown on the left
  - See HTML in the right
  - Magic

# New Features!

  - Import a HTML file and watch it magically convert to Markdown
  - Drag and drop images (requires your Dropbox account be linked)


You can also:
  - Import and save files from GitHub, Dropbox, Google Drive and One Drive
  - Drag and drop markdown and HTML files into Dillinger
  - Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [Breakdance](https://breakdance.github.io/breakdance/) - HTML to Markdown converter
* [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd dillinger
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
```

### Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |


### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma test
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
docker build -t joemccann/dillinger:${package.json.version} .
```
This will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)


### Todos

 - Write MORE Tests
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
