const { categories, category, createCategory,
  createCategoryFaker, updateCategory, deleteCategory } = require('./resolvers/category.resolver');
const { products, product, createProduct, createProductFaker,
  createProductCategory, updateProduct, deleteProduct, 
  deleteProductCategory } = require('./resolvers/product.resolver');

module.exports = {

  convertToBrazilianUTC: function (date) {

    let transformadDate = new Date(date);
    transformadDate.setHours(date.getHours() + 3);

    return transformadDate;
  },

  // Categories
  categories, category, createCategory,
  createCategoryFaker, updateCategory, deleteCategory,

  // Product
  products, product, createProduct, createProductFaker,
  createProductCategory, updateProduct, deleteProduct, 
  deleteProductCategory

};