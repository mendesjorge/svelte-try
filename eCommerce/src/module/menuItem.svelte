<div class="entry">
	<div class="dish">
		<img src="{imageSrc}" alt="plate">
	</div>
	<div class="content" style="{cssVarStyles}">
		<div class="description">{description}</div>
		<div class="amount">${amount}</div>
		<a href="" on:click="{addToCart}">Add to Cart</a>
	</div>
</div>

<script context="module">
	export function load({id, image, description, amount, background}) {
		return {
			props: {
				id, image, description, amount, background
			}
		}
	}
</script>
<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
	export let image, description, amount, id, background = 'F0F0F0'

	export const imageSrc = 'images/'+ image
	
	
	function addToCart(){
		dispatch('add-cart', { id })
	}
	// background supposed to be in Hex with no transparency
	$: cssVarStyles = '--backgroundColor: '+ background +'33;';
</script>

<style>
	.entry {
		width: 100%;
		height: 180px;
		display: flex;
		
		position: relative;

		padding-left: 20px;
	}
	.dish{
		position: absolute;
		left: 0px;
		z-index: 10;
	}
	.dish img{
		width: 150px;
	}

	.content{
		width:100%;
		display: flex;
		flex-direction: column;
		/* align-items: center; */

		position:relative;
		padding-left: 120px;
		padding-top: 20px;
		margin: 20px;
		border-radius: 20px 0 0 20px;
		background-color: var(--backgroundColor);
	}
	.content .description{
		max-width: 160px;
		overflow: hidden;
		word-wrap: wrap;

		font-size: 18px;
		line-height: 20px;
	}

	.content .amount{
		font-size: 32px;
		line-height: 32px;
		font-weight: bold;
		margin: 16px 0px;
	}
	.content a{
		padding: 4px 18px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		width: 100px;
		height: 32px;
		position: absolute;
		bottom: -17px;
		
		/* margin: 20px 0px; */
		
		background: #6B00F5;
		border-radius: 20px;
		color: #FFFFFF;
		font-size: 16px;
		font-weight: bold;
	}
</style>
