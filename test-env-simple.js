const dotenv = require('dotenv');
const path = require('path');
const res = dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('Dotenv result:', res);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
