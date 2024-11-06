import express from 'express';
import cors from 'cors';
import router from './app/routes';
import gobleErrorhandler from './app/middleware/gobleErrorhandler';
import notFound from './app/middleware/Notfound';

const app = express();

// app.use(
//   cors({
//     origin: ['http://localhost:5173'],
//     credentials: true,
//   }),
// );

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // specify allowed headers
//   }),
// );

app.use(
  cors({
    origin: ['http://localhost:3000','https://suju-cart.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(gobleErrorhandler);
app.use(notFound);
export default app;
