<div class="main">

	<div class="home-content">
		<GroupPane title="To Go Menu">
			{#each dishes as dish}
				<MenuItem {...dish} on:add-cart="{addItem}"/>
			{/each}
		</GroupPane>
		<GroupPane title="Your Cart">
			{#if cart.length}
				{#each cart as item}
					{item.description}
				{/each}
			{:else}
				Your cart is empty.
			{/if}
		</GroupPane>
	</div>
</div>

<script>
	import GroupPane from '$modules/groupPane.svelte'
	import MenuItem from '$modules/menuItem.svelte'

	export let dishes = [
		{id:1, image: 'plate__french-fries.png', description: 'French fries with Ketchup', amount: '4.50', background: '#FF0000'},
		{id:2, image: 'plate__salmon-vegetables.png', description: 'Salmon and Vegetables', amount: '4.50', background: '#00FF00'},
		{id:3, image: 'plate__spaghetti-meat-sauce.png', description: 'Spaghetti with Meat Sauce', amount: '4.50', background: '#0000FF'}
	]
	let cartItems = []

	$: cart = cartItems.map(group => {
		let dish = dishes.find( dish => dish.id === group.id)
		return {...dish, count: group.count}
	})

	function addItem(event){
		let newIndex = cartItems.findIndex(item => event.detail.id === item.id)
		if(newIndex === -1){
			cartItems.push({ count: 0, id: event.detail.id })
			newIndex = cartItems.length - 1
		}
		cartItems[newIndex].count += 1
		
		cartItems = [...cartItems]
		console.log(cartItems)
	}



</script>

<style>
	* {
		font-family: 'Poppins', sans-serif;
		box-sizing: border-box;
	}
	.main{
		height: 100vh;
		overflow: hidden;

		display: flex;
		justify-content: center;
		align-items: center;

		background: #E5E5E5;
	}
	.home-content{
		height: 80%;
		padding: 50px;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 50px;
	}
</style>
