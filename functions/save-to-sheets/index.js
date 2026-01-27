const { google } = require('googleapis');

// Configuration - set via environment variables
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

exports.saveToSheets = async (req, res) => {
  // CORS headers for browser requests
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { source, translation, userEmail } = req.body;

    if (!source || !translation) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: source and translation'
      });
    }

    // Authenticate using default credentials (service account)
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Append row to sheet
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          source,
          translation,
          userEmail || 'anonymous'
        ]]
      }
    });

    // Extract row number from response
    const updatedRange = result.data.updates?.updatedRange || '';
    const rowMatch = updatedRange.match(/:?[A-Z]+(\d+)$/);
    const rowNumber = rowMatch ? parseInt(rowMatch[1]) : null;

    res.json({ success: true, rowNumber });
  } catch (error) {
    console.error('Google Sheets API error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save to Google Sheets'
    });
  }
};
