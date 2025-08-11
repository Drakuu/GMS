import connectDB from '@/utils/connectdb';

// This ensures the connection is established when the server starts
const globalDB = connectDB().catch(console.error);

export default globalDB;