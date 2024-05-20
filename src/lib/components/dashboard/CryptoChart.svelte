<script lang='ts'>
    import 'chart.js/auto';
	import type { ChartOptions } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { Bar } from 'svelte-chartjs';
	import { Line } from 'svelte-chartjs';
	
	export let crypto;
	export let chart;

    $: series = crypto.price.map((data: any) => ({
        x: new Date(data.date),
        price: data.price_now
    }));

    $: data = {
        datasets: [
            {
                label: 'Price',
                data: series || [],
                borderWidth: 2,
                pointRadius: 0.5,
                backgroundColor: 'grey',
                borderColor: 'grey',
                lineTension: 0.8,
                parsing: {
                    yAxisKey: 'price'
                }
            }
        ]
    };
    const options:ChartOptions<'bar' | 'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			}
		},
		interaction: {
			mode: 'index',
			intersect: false
		},
		scales: {
			x: {
				type: 'time',
				time: {
					unit: 'day'
				}
			},
			y: {
				ticks: {
					callback: function (value: number | string, index:number, ticks:any) {
						return 'RP.' + value;
					}
				}
			}
		}
	};



</script>

<div class="p-5">
	{#if chart === 'bar'}
        <Bar data={data} options={options}/>
    {:else}
        <Line data={data} options={options}/>
    {/if}
</div>
