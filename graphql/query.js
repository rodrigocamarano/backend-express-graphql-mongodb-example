const { categoryQueries } = require('./resources/category.schema');
const { productQueries } = require('./resources/product.schema');

const Query = `
    type Query {
        ${categoryQueries}
        ${productQueries}
    }
`;

module.exports = {
    Query
}