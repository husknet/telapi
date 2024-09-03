export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      const telegramToken = process.env.TELEGRAM_BOT_TOKEN; // Store your bot token in environment variables
      const chatId = process.env.TELEGRAM_CHAT_ID; // Store your chat ID in environment variables

      const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      if (response.ok) {
        res.status(200).json({ success: true, message: 'Message sent to Telegram' });
      } else {
        res.status(response.status).json({ success: false, message: 'Failed to send message to Telegram' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
