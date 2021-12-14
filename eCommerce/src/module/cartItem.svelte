<div class="entry">
	<div class="dish">
		<img src="{imageSrc}" alt="plate">
	</div>
	<div class="content">
		<div class="description">{description}</div>
		<div class="amount">${amount}</div>
	</div>
	<div class="lower-panel">
		{#if showDeleteButtons}
			<div class="button cancel" on:click="{() => showDeleteButtons = false}">Cancel</div>
			<div class="button delete" on:click="{deleteCart}">Delete</div>
		{:else}
			<div class="button minus" on:click="{removeCart}"> &lt; </div>
			<div class="count">{count}</div>
			<div class="button plus" on:click="{addCart}"> > </div>
			{/if}
		<div class="amount">${(count*amount).toFixed(2)}</div>
	</div>
</div>

<script context="module">
	export function load({id, image, description, amount, count}) {
		return {
			props: {
				id, image, description, amount, count
			}
		}
	}
</script>
<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
	export let image, description, amount, id, count, showDeleteButtons = false

	export const imageSrc = 'images/'+ image
	
	
	function addCart(){
		dispatch('add-cart', { id })
	}
	function removeCart(){
		if(count === 1){
			showDeleteButtons = true
		}else{
			dispatch('remove-cart', { id })
		}
	}
	function deleteCart(){
		dispatch('delete-cart', { id })
	}
	// background supposed to be in Hex with no transparency
</script>

<style>
	.entry {
		width: 100%;
		height: 180px;
		display: flex;
		flex-direction: column;
		position: relative;

		padding: 0 20px;
	}
	.dish{
		position: absolute;
		left: 0px;
		z-index: 10;
	}
	.dish img{
		width: 64px;
	}

	.content{
		width:100%;
		display: flex;
		flex-direction: column;
		/* align-items: center; */

		position:relative;
		padding-top: 10px;
		margin-left: 50px;
		border-radius: 20px 0 0 20px;
	}
	.content .description{
		font-size: 18px;
		line-height: 20px;
	}

	.content .amount{
		font-size: 16px;
		line-height: 32px;
		font-weight: bold;
		/* margin: 16px 0px; */
	}

	.lower-panel{
		display: flex;

		align-items: center;
		justify-content: space-between;
		width: 240px;
		margin: 10px 50px;
	}

	.lower-panel .amount{
		font-size: 32px;
		font-weight: bold;
	}

	.lower-panel .count{
		font-weight: bold;
	}

	.button {
		height: 32px;

		border-radius: 20px;
		color: #FFFFFF;
		background: #6B00F5;
		display:flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		font-size: 32px;
	}
	.button.minus, .button.plus{
		width:32px;
	}

	.button.cancel, .button.delete{
		font-size: 14px;
		padding: 0 10px;
	}

	.button.delete{
		background-color: #fc2e00;
	}
</style>
