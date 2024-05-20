import { Router, type Request, type Response } from 'express';
import moment from 'moment-timezone';
import { supabaseAdminClient } from '../supabase.js';

const router = Router();

/**
 * mengambil data berdasarkan id coin dengan supbase. 
 * data yg diambil data yg ada pada table coin dan price_coin
 * @returns {Promise<void>}
 */
router.get('/:id', async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const data_coin = await supabaseAdminClient.from('coin').select().eq('id', id);
		const data_price = await supabaseAdminClient.from('price_coin').select('*').eq('coin_id', id);

		res.json({ coin: data_coin.data, price: data_price.data });
	} catch (error) {
		// jika terjadi error
		console.log(error);
		res.status(500).send({ message: 'Error please Concact admin ' });
	}
});


/**
 * menambahkan data crypto berdasarkan 'buy' atau 'sell' dengan supabase.
 * jika state buy harga price_now terakhir akan ditambahkan dengan data terbaru yg diinput.
 * jika state sell harga price_now terakhir akan dikurangkan dengan data terbaru yg diinput.
 * date pada table price_coin akan ditambahkan secara otomatis 1 day dari date terakhir.
 * setelah data ditambakan price_now pada table coin akan diperbarui berdasarkan data terbaru.
 * @returns {Promise<void>}
 */
router.post('/', async (req: Request, res: Response) => {
	try {
		let { price_now, coin_id } = req.body;

		const { data } = await supabaseAdminClient
			.from('price_coin')
			.select('*')
			.eq('coin_id', coin_id)
			.order('date', { ascending: false });

		if (!data) {
			return res.status(404).json({ error: 'data is not found' });
		}

		if (req.body.state && req.body.state === 'buy') {
			price_now = data[0].price_now + price_now;
		}

		if (req.body.state && req.body.state === 'sell') {
			price_now = data[0].price_now - price_now;
		}

		const dateNow = moment(data[0].date).add(1, 'day').format();

		const result = await supabaseAdminClient
			.from('price_coin')
			.insert({ coin_id: coin_id, price_now: price_now, date: dateNow })
			.select();

		await supabaseAdminClient.from('coin').update({ price_now }).eq('id', coin_id);

		res.status(201).json(result.data);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: 'Unable to save chart data' });
	}
});


/**
 * api PACT untuk mengedit price_coin by id
 * input {price_now,coin_id date}
 */
router.patch('/:id', async (req: Request, res: Response) => {
    try {
        await supabaseAdminClient.from('price_coin').update(req.body).eq('id', req.params.id)
        res.status(200).send({message:"success update data"})
    } catch (error) {
         // jika terjadi error
		console.log(error);
		res.status(500).send({ message: 'Error please Concact admin ' });
    }
})

/**
 * api delete untuk menghapus data price_coin by id
 */
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await supabaseAdminClient.from('price_coin').delete().eq('id', req.params.id)
        res.status(200).send({message:"success delete data"})
    } catch (error) {
         // jika terjadi error
		console.log(error);
		res.status(500).send({ message: 'Error please Concact admin ' });
    }
})

export default router;
