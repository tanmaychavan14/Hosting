require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let messages = [];

app.post('/api/message', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: 'All fields required' });
  messages.push({ name, message });
  res.status(201).json({ success: true, data: { name, message } });
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});


// 👇 Add this logic to auto-switch between dev and prod
const isLambda = !!process.env.LAMBDA_TASK_ROOT;

if (isLambda) {
  const awsServerlessExpress = require('aws-serverless-express');
  const server = awsServerlessExpress.createServer(app);
  exports.handler = (event, context) =>
    awsServerlessExpress.proxy(server, event, context);
} else {
  app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

}
