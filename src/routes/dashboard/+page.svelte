<script lang="ts">
	import CryptoChart from '$lib/components/dashboard/CryptoChart.svelte';

	// import { browser } from '$app/environment';

	import { toast } from '$lib/components/Toast';
	import { onDestroy } from 'svelte';
	import { addCrypto, getCryptoById } from './api';
	/** @type {import('./$types').PageData} */
	export let data;

	const action = () => {
		toast.push('TOAST!', { classes: ['alert-success'] });
	};
	

	let crypto: any = [];
	const unsubscribe_crypto = data.crypto.subscribe((value: any) => {
		crypto = value;
	});


	let data_coin: any = [];
	const unsubscribe_coin = data.coin.subscribe((value: any) => {
		data_coin = value;
	});

	onDestroy(() => {
		unsubscribe_coin();
		unsubscribe_crypto();
	});

	let chart: any = 'bar';



	/**
	 * handleBuy menanangi untuk menambah data dengan state "buy".
	 * Jika data  telah ditambahkan,fungsi ini kan memperbarui data crypto.
	 * @returns {Promise<void>}
	 * Example:
	 * await handleBuy()
	 */
	const handleBuy = async (id:number): Promise<void> => {
		// menambahkan data dengan state 'buy'
		await addCrypto('buy',id);

		//update data dengan data crypto baru
		data.crypto.set(await getCryptoById(id));
	};

	/**
	 * handleSell menanangi untuk menambah data dengan state "sell".
	 * Jika data  telah ditambahkan,fungsi ini kan memperbarui data crypto.
	 * @returns {Promise<void>}
	 * Example:
	 * await handleSell()
	 */
	const handleSell = async (id:number): Promise<void> => {
		// menambahkan data dengan state 'sell'
		await addCrypto('sell',id);

		//update data dengan data crypto baru
		data.crypto.set(await getCryptoById(id));
	};

	const handleChart = (type: string) => {
		chart = type;
	};

	/**
	 * melakukan filter data chart berdasarkan  id coin yang diambil dari table coin.
	 * @param event
	 */
	const handleCoin = async(event:any) => {
		const id = event.target.value
		crypto = await getCryptoById(id);
	}

</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="alert alert-success shadow-lg mb-5">
	<div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current flex-shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>Welcome to SvelteKit Supabase Dashboard!</span>
	</div>
	<div class="flex-none">
		<!-- <button class="btn btn-sm btn-primary">OK</button> -->
		<a class="btn btn-sm btn-primary" href="https://github.com/xulioc/sveltekit-supabase-dashboard"
			>GITHUB</a
		>
	</div>
</div>

<!-- {#if $page.data.session.user.app_metadata.role=='admin'}
ADMIN
	
{/if} -->

<!-- <div class="card flex-col bg-base-100 shadow-xl">
	<div class="stats bg-primary text-primary-content">
		<div class="stat">
			<div class="stat-title">You are in</div>
			<div class="stat-value">{data.location.region} ({data.location.country_name})</div>
			<div class="stat-actions">
				<button on:click={action} class="btn btn-sm btn-success">Yes I DO!</button>
			</div>
		</div>

		<div class="stat">
			<div class="stat-title">Temperature in {data.location.city}</div>
			<div class="stat-value">{data.weather.current_weather.temperature} ºC</div>
			<div class="stat-actions">
				<button class="btn btn-sm">i feel hot</button>
				<button class="btn btn-sm">i feel cold</button>
			</div>
		</div>
	</div>
</div>

<div class="card mt-5 p-3 bg-neutral shadow-xl">
	<h1 class="text-center text-2xl font-bold">Temperature forecast at {data.location.city}</h1>
	<div><WeatherChart weather={data.weather} /></div>
</div> -->

<div class="card flex-col bg-base-100 shadow-xl">
	<div class="stats bg-primary text-primary-content">
		<div class="stat">
			<div class="stat-value">{crypto.coin[0].name}</div>
			<p>Realise Date : {crypto.coin[0].realise_date}</p>
			<select class="text-xl font-bold w-max h-max p-1" on:change={handleCoin}>
				<option>list coin</option>
				{#each data_coin.coin as coin }
				<option value={coin.id}>{coin.name}</option>
				{/each}
			</select>
		</div>

		<div class="stat">
			<div class="stat-title">Price {crypto.coin[0].name} In IDR</div>
			<div class="stat-value">Rp. {crypto.coin[0].price_now}</div>
			<div class="stat-actions">
				<button
					on:click={() => handleBuy(crypto.coin[0].id)}
					class="hover:bg-green-600 btn-sm bg-green-500 text-black border-none">BUY</button
				>
				<button
					on:click={() => handleSell(crypto.coin[0].id)}
					class="hover:bg-red-600 btn-sm bg-red-500 text-black border-none">SELL</button
				>
			</div>
		</div>
	</div>
</div>

<div class="card mt-5 p-3 bg-neutral shadow-xl">
	<h1 class="text-left text-2xl font-bold capitalize">{chart}</h1>
	<div><CryptoChart {crypto} {chart} /></div>
</div>

<div class="card flex-col lg:flex-row bg-base-200 shadow-xl mt-5">
	<div class="hero">
		<div class="hero-content flex-col lg:flex-row">
			<!-- <img
				alt="alt"
				height="260"
				width="260"
				src="https://placeimg.com/260/260/arch"
				class="max-w-sm rounded-lg shadow-2xl"
			/> -->
			<div>
				<h1 class="text-5xl font-bold">Box Office News!</h1>
				<p class="py-6">
					Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
					exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
				</p>
				<button class="btn btn-primary">Get Started</button>
			</div>
		</div>
	</div>
</div>

<div class="carousel w-full mt-5">
	<div id="item1" class="carousel-item w-full">
		<img alt="" src="https://placeimg.com/800/200/arch" class="w-full" />
	</div>
	<div id="item2" class="carousel-item w-full">
		<img alt="" src="https://placeimg.com/800/200/nature" class="w-full" />
	</div>
	<div id="item3" class="carousel-item w-full">
		<img alt="" src="https://placeimg.com/800/200/people" class="w-full" />
	</div>
	<div id="item4" class="carousel-item w-full">
		<img alt="" src="https://placeimg.com/800/200/tech" class="w-full" />
	</div>
</div>
<div class="flex justify-center w-full py-2 gap-2">
	<button on:click={() => handleChart('bar')} class="btn btn-xs">1</button>
	<button on:click={() => handleChart('line')} class="btn btn-xs">2</button>
</div>
