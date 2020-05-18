const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        description: {
            type: String,
            required: true
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    }, { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);