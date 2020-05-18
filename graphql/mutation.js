const { categoryMutations } = require('./resources/category.schema');
const { productMutations } = require('./resources/product.schema');

const Mutation = `
    type Mutation {
        ${categoryMutations}
        ${productMutations}
    }
`;

module.exports = {
    Mutation
}