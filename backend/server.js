const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

const NOWPAYMENTS_API = 'https://api.nowpayments.io/v1';
const PLATFORM_FEE = 0.15; // 15%
const LISTING_FEE_USD = 5;

// 1. Create payment for listing fee
app.post('/api/pay/listing', async (req, res) => {
  const { authorId, bookId } = req.body;
  const payment = await axios.post(`${NOWPAYMENTS_API}/invoice`, {
    price_amount: LISTING_FEE_USD,
    price_currency: 'usd',
    pay_currencies: ['btc','eth','sol','usdt','usdc','bnb','trx','ltc','matic','doge']
  }, { headers: { 'x-api-key': process.env.NOWPAYMENTS_KEY }});
  
  await prisma.payment.create({ data: { type: 'LISTING', authorId, bookId, invoiceId: payment.data.id }});
  res.json(payment.data);
});

// 2. Webhook from NOWPayments - when payment confirmed
app.post('/api/webhook', async (req, res) => {
  const { payment_status, invoice_id } = req.body;
  if(payment_status === 'finished'){
    const payment = await prisma.payment.findUnique({ where: { invoiceId: invoice_id }});
    if(payment.type === 'LISTING'){
      await prisma.book.update({ where: { id: payment.bookId }, data: { isLive: true }});
    }
    // For book sales: split 85/15 and send to author wallet
  }
  res.sendStatus(200);
});

// 3. Upload book
app.post('/api/books', async (req, res) => {
  const { title, description, price, authorId, coverUrl, fileUrl } = req.body;
  const book = await prisma.book.create({ data: { title, description, price, authorId, coverUrl, fileUrl, isLive: false }});
  res.json(book);
});

app.listen(5000, () => console.log('Backend running on 5000'));