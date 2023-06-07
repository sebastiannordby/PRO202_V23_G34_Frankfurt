import { MongoClient } from 'mongodb'

console.log('env: ', process.env.MONGODB_URI_SOCKET);

if (!process.env.MONGODB_URI_SOCKET) {
  throw new Error('Invalid environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI_SOCKET
const options = {}

if (!process.env.MONGODB_URI_SOCKET) {
  throw new Error('Please add your Mongo URI to .env.local')
}

// In production mode, it's best to not use a global variable.

export async function getDatabaseAsync(){
  const client = new MongoClient(uri, options)

  const mongoClient = await client.connect();

  return mongoClient;
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.