import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Test the connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to MongoDB');
    
    // Try to query the delegates collection
    const count = await prisma.delegate.count();
    console.log(`Current number of delegates: ${count}`);
    
    return true;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

export default prisma; 