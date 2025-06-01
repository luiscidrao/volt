import dbConnect from '../database';
import Setting from '../models/Setting';

/**
 * Script to retrieve the JWT secret from MongoDB
 * This can be used to check the current JWT secret stored in the database
 * 
 * Usage:
 * 1. Run this script with Node.js:
 *    node -r esm pages/api/utils/getJwtSecretFromDb.js
 * 
 * 2. Or import and use the function in your code:
 *    import { getJwtSecretFromDb } from '../utils/getJwtSecretFromDb';
 *    const secret = await getJwtSecretFromDb();
 */

export async function getJwtSecretFromDb() {
  try {
    // Connect to the database
    await dbConnect();
    
    // Try to get JWT secret from settings
    const setting = await Setting.findOne({ key: 'JWT_SECRET' });
    
    if (setting) {
      console.log('JWT Secret found in database:');
      console.log('- Key:', setting.key);
      console.log('- Last Updated:', setting.lastUpdated);
      console.log('- Is Protected:', setting.isProtected);
      
      // Only show part of the secret for security
      const partialSecret = setting.value.substring(0, 4) + '...' + 
                           setting.value.substring(setting.value.length - 4);
      console.log('- Value (partial):', partialSecret);
      
      return setting;
    } else {
      console.log('JWT Secret not found in database.');
      console.log('The system will use the environment variable JWT_SECRET instead.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving JWT secret from database:', error);
    return null;
  } finally {
    // Close the database connection
    if (global.mongoose && global.mongoose.connection) {
      await global.mongoose.connection.close();
    }
  }
}

// If this script is run directly, execute the function
if (require.main === module) {
  getJwtSecretFromDb()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

export default getJwtSecretFromDb;