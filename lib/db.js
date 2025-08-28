import connectDB from './connectDB';

// Initialize connection immediately
let dbConnection;
(async () => {
  try {
    dbConnection = await connectDB();
    console.log('Database connection ready');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1); // Exit if DB connection fails
  }
})();

// Export a function that ensures connection is ready
export default async function getDB() {
  if (!dbConnection) {
    dbConnection = await connectDB();
  }
  return dbConnection;
}