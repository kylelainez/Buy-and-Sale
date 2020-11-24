const mongoose = require('mongoose');

console.log('HERE', process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

const db = mongoose.connection;

// database connection event
db.on('connected', function () {
	console.log(`Mongoose connected to: ${db.host}:${db.port}`);
});
