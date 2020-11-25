const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
	{
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Products'
			}
		]
	},
	{
		timestamps: true
	}
);

const userSchema = new Schema(
	{
		googleId: String,
		avatar: String,
		email: String,
		firstName: String,
		lastName: String,
		contactNumber: String,
		zipCode: Number,
		address: String,
		cart: cartSchema,
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Products'
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userSchema);
