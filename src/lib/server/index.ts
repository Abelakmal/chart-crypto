import cors from 'cors';
import express, { type Request, type Response } from 'express';
import priceRouter from './routers/price.router.ts';
import coinRouter from './routers/coin.router.ts';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());



app.use('/api/crypto/coin', coinRouter)
app.use('/api/crypto/price', priceRouter)



// membuat server express js
app.listen(port, () => {
	console.log(`Server berjalan di http://localhost:${port}`);
});
