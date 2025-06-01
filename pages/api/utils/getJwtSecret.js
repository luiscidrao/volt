import dbConnect from '../database';
import Setting from '../models/Setting';

/**
 * Retrieves the JWT secret from MongoDB settings or falls back to environment variable
 * @returns {Promise<string>} The JWT secret
 */
export async function getJwtSecret() {
  try {
    // Connect to the database
    await dbConnect();

    // Try to get JWT secret from settings
    const jwtSecret = await Setting.getByKey('JWT_SECRET', null);

    // If found in database, return it
    if (jwtSecret) {
      return jwtSecret;
    }

    // Otherwise, get from environment variable or use default
    const envSecret = process.env.JWT_SECRET || 'solartech-secret-key';

    // Store the environment secret in the database for future use
    // Only do this if we had to fall back to the environment variable
    await Setting.setByKey(
      'JWT_SECRET', 
      envSecret, 
      'JWT Secret key used for authentication tokens', 
      true // Mark as protected since it's sensitive
    );

    return envSecret;
  } catch (error) {
    console.error('Error retrieving JWT secret:', error);
    // In case of database error, fall back to environment variable
    return process.env.JWT_SECRET || 'solartech-secret-key';
  }
}

export default getJwtSecret;
