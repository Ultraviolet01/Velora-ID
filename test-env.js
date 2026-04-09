require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Defined' : 'Undefined');
console.log('DATABASE_URL Value starts with:', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 20) : 'N/A');
