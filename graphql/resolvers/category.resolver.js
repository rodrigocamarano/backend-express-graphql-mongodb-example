const faker = require('faker/locale/pt_BR');
const validator = require('validator');
const Category = require('../../models/category');
const Product = require('../../models/product');

module.exports = {

    // Queries
    categories: async function ({ filter, sortField, sortOrder, page, pageSize }) {
        if (!sortField) {
            sortField = "createdAt";
        }
        if (!sortOrder) {
            sortOrder = "DESC";
        }
        if (sortOrder === "ASC")
            sortOrder = 1;
        else
            sortOrder = -1;
        if (!page || page < 0) {
            page = 1;
        }
        if (!pageSize || pageSize < 0) {
            pageSize = parseInt(process.env.MONGO_DEFAULT_PAGE_SIZE);
        }
        let totalRecords;
        let categories;
        if (!filter || validator.isEmpty(filter) || !validator.isLength(filter, { min: 3 })) {
            totalRecords = await Category.find().countDocuments();
            if (sortField === 'description') {
                categories = await Category
                    .find()
                    .sort({ description: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate({
                        path: 'products',
                        options: {
                            sort: { 'description': 1 }
                        }
                    });
            }
            else if (sortField === 'createdAt') {
                categories = await Category
                    .find()
                    .sort({ createdAt: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate({
                        path: 'products',
                        options: {
                            sort: { 'description': 1 }
                        }
                    });
            }
            else if (sortField === 'updatedAt') {
                categories = await Category
                    .find()
                    .sort({ updatedAt: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate({
                        path: 'products',
                        options: {
                            sort: { 'description': 1 }
                        }
                    });
            }
        }
        else {
            totalRecords = await Category.find({ "description": { "$regex": filter, "$options": "i" } }).countDocuments();
            if (sortField === 'description') {
                categories = await Category
                    .find({ "description": { "$regex": filter, "$options": "i" } })
                    .sort({ description: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate({
                        path: 'products',
                        options: {
                            sort: { 'description': 1 }
                        }
                    });
            }
            else if (sortField === 'createdAt') {
                categories = await Category
                    .find({ "description": { "$regex": filter, "$options": "i" } })
                    .sort({ createdAt: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate({
                        path: 'products',
                        options: {
                            sort: { 'description': 1 }
                        }
                    });
            }
            else if (sortField === 'updatedAt') {
                categories = await Category
                    .find({ "description": { "$regex": filter, "$options": "i" } })
                    .sort({ updatedAt: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate({
                        path: 'products',
                        options: {
                            sort: { 'description': 1 }
                        }
                    });
            }
        }
        const totalPages = Math.ceil(totalRecords / pageSize);
        return {
            categories: categories.map(p => {
                return {
                    ...p._doc,
                    _id: p._id.toString(),
                    products: p.products.map(s => {
                        return {
                            ...s._doc,
                            _id: s._id.toString(),
                            createdAt: this.convertToBrazilianUTC(s.createdAt).toISOString(),
                            updatedAt: this.convertToBrazilianUTC(s.updatedAt).toISOString(),
                        }
                    }),
                    createdAt: this.convertToBrazilianUTC(p.createdAt).toISOString(),
                    updatedAt: this.convertToBrazilianUTC(p.updatedAt).toISOString()
                };
            }),
            totalRecords,
            totalPages
        };
    },
    category: async function ({ id }) {
        const category = await Category.findById(id);
        if (!category) {
            const error = new Error('No category found!');
            error.code = 404;
            throw error;
        }
        return {
            ...category._doc,
            _id: category._id.toString(),
            createdAt: this.convertToBrazilianUTC(category.createdAt).toISOString(),
            updatedAt: this.convertToBrazilianUTC(category.updatedAt).toISOString()
        };
    },

    // Mutations
    createCategory: async function ({ categoryInput }) {
        const errors = [];
        if (validator.isEmpty(categoryInput.description)) {
            errors.push({ message: 'Description cannot be null.' });
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const category = new Category({
            description: categoryInput.description.trim()
        });
        const createdCategory = await category.save();
        return {
            ...createdCategory._doc,
            _id: createdCategory._id.toString(),
            createdAt: this.convertToBrazilianUTC(createdCategory.createdAt).toISOString(),
            updatedAt: this.convertToBrazilianUTC(createdCategory.updatedAt).toISOString()
        };
    },
    createCategoryFaker: async function ({ quantity }) {
        const categoriesTotalRecords = await Category.find().countDocuments();
        if (categoriesTotalRecords > 0) {
            Category.collection.drop();
        }
        const productsTotalRecords = await Product.find().countDocuments();
        if (productsTotalRecords > 0) {
            Product.collection.drop();
        }
        let success = 0;
        for (let i = 0; i < quantity; i++) {
            const description = faker.name.jobDescriptor();
            const verify = await Category.findOne({ 'description': description });
            if (verify === null) {
                const category = new Category({
                    description
                });

                try {
                    const createdCategory = await category.save();
                    if (createdCategory)
                        success++;
                } catch {

                }
            }
        }
        return success;
    },
    updateCategory: async function ({ id, categoryInput }) {
        const category = await Category.findById(id);
        if (!category) {
            const error = new Error('No category found!');
            error.code = 404;
            throw error;
        }
        const errors = [];
        if (validator.isEmpty(categoryInput.description)) {
            errors.push({ message: 'Description cannot be null.' });
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        category.description = categoryInput.description.trim();
        const updatedCategory = await category.save();
        return {
            ...updatedCategory._doc,
            _id: updatedCategory._id.toString(),
            createdAt: this.convertToBrazilianUTC(updatedCategory.createdAt).toISOString(),
            updatedAt: this.convertToBrazilianUTC(updatedCategory.updatedAt).toISOString()
        };
    },
    deleteCategory: async function ({ id }) {
        const category = await Category.findById(id);
        if (!category) {
            const error = new Error('No category found!');
            error.code = 404;
            throw error;
        }
        for (let i = 0; i < category.products.length; i++) {
            const product = await Product.findById(category.products[i]);
            if (product) {
                try {
                    product.categories.pull(id);
                    await product.save();
                }
                catch (e) {
                    console.error('Error', e);
                }
            }
        }
        await Category.findByIdAndRemove(id);
        return true;
    }
};