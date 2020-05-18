const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        description: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category'
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);