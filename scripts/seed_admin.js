import { MongoClient } from 'mongodb';
import path from 'path';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: Please set MONGODB_URI in your .env.local file');
  process.exit(1);
}

async function seed() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    const db = client.db();
    
    // Clear existing admins
    await db.collection('admins').deleteMany({});
    
    // Insert new admin
    const result = await db.collection('admins').insertOne({
      username: 'admin',
      password: 'password123',
    });
    
    console.log('Successfully created admin user!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}

seed();
