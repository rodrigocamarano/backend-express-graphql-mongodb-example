const validator = require('validator');
const faker = require('faker/locale/pt_BR');
const Product = require('../../models/product');
const Category = require('../../models/category');

module.exports = {

    // Queries
    products: async function ({ filter, sortField, sortOrder, page, pageSize }) {
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
        let products;
        if (!filter || validator.isEmpty(filter) || !validator.isLength(filter, { min: 3 })) {
            totalRecords = await Product.find().countDocuments();
            if (sortField === 'description') {
                products = await Product
                    .find()
                    .sort({ description: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate('categories');
            }
            else if (sortField === 'createdAt') {
                products = await Product
                    .find()
                    .sort({ createdAt: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate('categories');
            }
            else if (sortField === 'updatedAt') {
                products = await Product
                    .find()
                    .sort({ updatedAt: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate('categories');
            }
        }
        else {
            totalRecords = await Product.find({ "description": { "$regex": filter, "$options": "i" } }).countDocuments();
            if (sortField === 'description') {
                products = await Product
                    .find({ "description": { "$regex": filter, "$options": "i" } })
                    .sort({ description: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate('categories');
            }
            else if (sortField === 'createdAt') {
                products = await Product
                    .find({ "description": { "$regex": filter, "$options": "i" } })
                    .sort({ createdAt: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate('categories');
            }
            else if (sortField === 'updatedAt') {
                products = await Product
                    .find({ "description": { "$regex": filter, "$options": "i" } })
                    .sort({ updatedAt: sortOrder })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .populate('categories');
            }
        }
        const totalPages = Math.ceil(totalRecords / pageSize);
        return {
            products: products.map(item => {
                return {
                    ...item._doc,
                    _id: item._id.toString(),
                    categories: item.categories.map(c => {
                        return {
                            ...c._doc,
                            _id: c._id.toString(),
                            createdAt: this.convertToBrazilianUTC(c.createdAt).toISOString(),
                            updatedAt: this.convertToBrazilianUTC(c.updatedAt).toISOString(),
                        }
                    }),
                    totalCategories: item.categories.length,
                    createdAt: this.convertToBrazilianUTC(item.createdAt).toISOString(),
                    updatedAt: this.convertToBrazilianUTC(item.updatedAt).toISOString()
                };
            }),
            totalRecords,
            totalPages
        };
    },
    product: async function ({ id }) {
        const product = await Product
            .findById(id)
            .populate('categories');
        if (!product) {
            const error = new Error('No product found!');
            error.code = 404;
            throw error;
        }
        return {
            ...product._doc,
            _id: product._id.toString(),
            categories: product.categories.map(c => {
                return {
                    ...c._doc,
                    _id: c._id.toString(),
                    createdAt: this.convertToBrazilianUTC(c.createdAt).toISOString(),
                    updatedAt: this.convertToBrazilianUTC(c.updatedAt).toISOString()
                }
            }),
            totalCategories: product.categories.length,
            createdAt: this.convertToBrazilianUTC(product.createdAt).toISOString(),
            updatedAt: this.convertToBrazilianUTC(product.updatedAt).toISOString()
        };
    },

    // Mutations
    createProduct: async function ({ productInput }) {
        const errors = [];
        if (validator.isEmpty(productInput.description.trim())) {
            errors.push({ message: 'Description cannot be null.' });
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const product = new Product({
            description: productInput.description,
            details: productInput.details
        });
        const createdProduct = await product.save();
        return {
            ...createdProduct._doc,
            _id: createdProduct._id.toString(),
            createdAt: this.convertToBrazilianUTC(createdProduct.createdAt).toISOString(),
            updatedAt: this.convertToBrazilianUTC(createdProduct.updatedAt).toISOString()
        };
    },
    createProductFaker: async function ({ quantity }) {
        const totalRecords = await Product.find().countDocuments();
        if (totalRecords > 0) {
            Product.collection.drop();
        }
        let success = 0;

        const descriptions = [];
        for (let i = 0; i < quantity; i++) {
            const description = faker.company.companyName();
            if (!descriptions.includes(description))
            descriptions.push(description);
        }
        const total = descriptions.length;
        for (let i = 0; i < total; i++) {

            let random = Math.floor(Math.random() * await Category.find().countDocuments());
            const categories = await Category.find().skip(random).limit(3);

            const product = new Product({

                description: descriptions[i],
                details: `${faker.lorem.paragraphs()}`,
                categories
            });

            try {
                const createdProduct = await product.save();
                // ----------------------------------------
                for (let j = 0; j < categories.length; j++) {
                    const category = await Category.findById(categories[j]._id);
                    let existsInCategory = false;
                    for (let k = 0; k < category.products.length; k++) {
                        const _product = category.products[k];
                        if (_product._id === product.id) {
                            existsInCategory = true;
                        }
                    }
                    if (existsInCategory === false) {
                        category.products.push(product);
                        await category.save();
                    }
                }
                // ----------------------------------------
                if (createdProduct)
                    success++;
            } catch {

            }
        }
        return success;
    },
    createProductCategory: async function ({ productId, categoryId }) {
        const product = await Product.findById(productId).populate('categories');
        if (!product) {
            const error = new Error('No product found!');
            error.code = 500;
            throw error;
        }

        const category = await Category.findById(categoryId).populate('products');
        if (!category) {
            const error = new Error('No category found!');
            error.code = 500;
            throw error;
        }

        let existsInProduct = false;
        for (let i = 0; i < product.categories.length; i++) {
            const _category = product.categories[i];
            if (_category.id === category.id) {
                existsInProduct = true;
            }
        }
        if (existsInProduct === false) {
            product.categories.push(category);
            await product.save();
        }
        // ---------------
        let existsInCategory = false;
        for (let i = 0; i < category.products.length; i++) {
            const _product = category.products[i];
            if (_product.id === product.id) {
                existsInCategory = true;
            }
        }
        if (existsInCategory === false) {
            category.products.push(product);
            await category.save();
        }

        return {
            ...product._doc,
            _id: product._id.toString(),
            createdAt: this.convertToBrazilianUTC(product.createdAt).toISOString(),
            updatedAt: this.convertToBrazilianUTC(product.updatedAt).toISOString()
        };
    },
    updateProduct: async function ({ id, productInput }) {
        const product = await Product.findById(id);
        if (!product) {
            const error = new Error('No product found!');
            error.code = 404;
            throw error;
        }
        const errors = [];
        if (validator.isEmpty(productInput.description.trim())) {
            errors.push({ message: 'Description cannot be null.' });
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        product.description = productInput.description;
        product.details = productInput.details;
        const updatedProduct = await product.save();
        return {
            ...updatedProduct._doc,
            _id: updatedProduct._id.toString(),
            createdAt: this.convertToBrazilianUTC(updatedProduct.createdAt).toISOString(),
            updatedAt: this.convertToBrazilianUTC(updatedProduct.updatedAt).toISOString()
        };
    },
    deleteProduct: async function ({ id }) {
        const product = await Product.findById(id);
        if (!product) {
            const error = new Error('No product found!');
            error.code = 404;
            throw error;
        }
        for (let i = 0; i < product.categories.length; i++) {
            const category = await Category.findById(product.categories[i]);
            if (category) {
                try {
                    category.products.pull(id);
                    await category.save();
                }
                catch (e) {
                    console.error('Error', e);
                }
            }
        }
        await Product.findByIdAndRemove(id);
        return true;
    },
    deleteProductCategory: async function ({ productId, categoryId }) {
        const product = await Product.findById(productId);
        if (!product) {
            const error = new Error('No product found!');
            error.code = 500;
            throw error;
        }

        const category = await Category.findById(categoryId);
        if (!category) {
            const error = new Error('No category found!');
            error.code = 500;
            throw error;
        }

        product.categories.pull(categoryId);
        await product.save();

        category.products.pull(productId);
        await category.save();


        return true;
    }
};