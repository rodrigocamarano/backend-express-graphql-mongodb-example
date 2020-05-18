const categoryTypes = `

    type Category {
        _id: ID!
        description: String!
        products: [Product!]!
        createdAt: String!
        updatedAt: String!
    }

    type CategoryData {
        categories: [Category!]!
        totalRecords: Int!
        totalPages: Int!
    }
    input CategoryInputData {
        description: String!
    }

`;

const categoryQueries = `
    categories(filter: String, sortField: String, sortOrder: String, page: Int, pageSize: Int): CategoryData!
    category(id: ID!): Category!
`;

const categoryMutations = `
    createCategory(categoryInput: CategoryInputData): Category!
    createCategoryFaker(quantity: Int!): Int
    updateCategory(id: ID!, categoryInput: CategoryInputData): Category!
    deleteCategory(id: ID!): Boolean
`;

module.exports = {
    categoryTypes,
    categoryQueries,
    categoryMutations
}
