import { Router, type Request, type Response } from 'express';
import { supabaseAdminClient } from '../supabase.js';

const router = Router();

/**
 * api untuk mengambil data pada table coin
 */
router.get('/', async (req: Request, res: Response) => {
	try {
		const data_coin = await supabaseAdminClient.from('coin').select('*');
		res.json({ coin: data_coin.data });
	} catch (error) {
		// jika terjadi error
		console.log(error);
		res.status(500).send({ message: 'Error please Concact admin ' });
	}
});

/**
 * api POST untuk menambahkan coin baru
 * input {name, price_now, realise_date}
 */
router.post('/', async (req: Request, res: Response) => {
	try {
        const {name, price_now, realise_date} = req.body
        await supabaseAdminClient.from('coin').insert({name, price_now, realise_date})

        res.status(200).send({message:"success add data"})
	} catch (error) {
        // jika terjadi error
		console.log(error);
		res.status(500).send({ message: 'Error please Concact admin ' });
    }
});

/**
 * api PACT untuk mengedit coin by id
 * input {name, price_now, realise_date}
 */
router.patch('/:id', async (req: Request, res: Response) => {
    try {
        await supabaseAdminClient.from('coin').update(req.body).eq('id', req.params.id)
        res.status(200).send({message:"success update data"})
    } catch (error) {
         // jika terjadi error
		console.log(error);
		res.status(500).send({ message: 'Error please Concact admin ' });
    }
})

/**
 * api delete untuk menghapus data coin by id
 */
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await supabaseAdminClient.from('coin').delete().eq('id', req.params.id)
        res.status(200).send({message:"success delete data"})
    } catch (error) {
         // jika terjadi error
		console.log(error);
		res.status(500).send({ message: 'Error please Concact admin ' });
    }
})

export default router;
