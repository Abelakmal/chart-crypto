import { writable } from 'svelte/store';
import type { PageLoad } from './$types';
import { getAllCoin, getCryptoById } from './api';
import type { crypto } from './type';

export const load: PageLoad = async (event) => {
	// const ip_api_result = await event.fetch('https://ipapi.co/json');
	// const location = await ip_api_result.json();
	// // console.log(location)

	// const weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m&current_weather=true`;
	// // console.log(weather_url)
	// const weather_result = await event.fetch(weather_url);
	// const weather = await weather_result.json();
	// // console.log(weather)

	/**
	 * variabel ini digunakan untuk menyimpan data crypto
	 * ini menggunakan Writlable store dari Svelte untuk memungkinkan perubahan nilai
	 * @type {import('svelte/store').Writable<Array<any>>}
	 */
	let crypto: any = writable([]);
	let coin: any = writable([]);
	try {
		// set nilai crypto yg diambil dari fungsi getAllCrypto()
		crypto.set(await getCryptoById(1));
		coin.set(await getAllCoin())
	} catch (error) {
		//menangani kesalahan jika terjadi kegagalan saat set data crypto
		console.error('Error fetching crypto data:', error);
		crypto.set([]);
	}

	/**
	 * Mengembalikan nilai Object
	 * @returns {Object}
	 */
	return {
		crypto: crypto,
		coin: coin
	};
};
