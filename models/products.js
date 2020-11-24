const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		name: {
			type: String,
			default: 'Product'
		},
		price: {
			type: Number,
			default: 0,
			min: 0
		},
		quantity: {
			type: Number,
			default: 1,
			min: 0
		},
		seller: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Products', productSchema);
