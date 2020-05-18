const productTypes = `

    type Product {
        _id: ID!
        description: String!
        details: String!
        categories: [Category!]!
        totalCategories: Int!
        createdAt: String!
        updatedAt: String!
    }
    type ProductData {
        products: [Product!]!
        totalRecords: Int!
        totalPages: Int!
    }
    input ProductInputData {
        description: String!
        details: String!
    }
    input ProductCategoryInputData {
        productId: ID!
        categoryId: ID!
    }
`;

const productQueries = `
    product(id: ID!): Product!
    products(filter: String, sortField: String, sortOrder: String, page: Int, pageSize: Int): ProductData!    
`;

const productMutations = `
    createProduct(productInput: ProductInputData): Product!
    createProductFaker(quantity: Int!): Int
    createProductCategory(productId: ID!, categoryId: ID!): Product!
    updateProduct(id: ID!, productInput: ProductInputData): Product!
    deleteProduct(id: ID!): Boolean
    deleteProductCategory(productId: ID!, categoryId: ID!): Boolean
`;

module.exports = {
    productTypes,
    productQueries,
    productMutations
}
