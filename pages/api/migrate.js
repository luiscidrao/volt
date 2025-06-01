import migrateData from './utils/migrateData';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Check for a secret key to prevent unauthorized migrations
    const { secret } = req.body;

    if (secret !== process.env.MIGRATION_SECRET && secret !== 'solartech-migration') {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Run the migration
    const result = await migrateData();

    // Return the result
    return res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.error('Migration error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
