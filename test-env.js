console.log(`Your port is ${process.env.PORT}`); // undefined
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PORT}`); // 8626
console.log(`AWSAccessKeyId is ${process.env.AWSAccessKeyId}`);
console.log(`AWSSecretKey is ${process.env.AWSSecretKey}`);