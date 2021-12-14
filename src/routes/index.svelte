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
				<CartItem {...item} on:add-cart="{addItem}" on:remove-cart="{removeItem}" on:delete-cart="{deleteItem}"></CartItem>
				{/each}
				<div class="resume-cart">
					<div class="line sub-total">
						<div class="label">Subtotal:</div>
						<div class="amount">${roundToTwo(subTotal)}</div>
					</div>
					<div class="line tax">
						<div class="label">Tax:</div>
						<div class="amount">${roundToTwo(subTotal * 0.0975)}</div>
					</div>
					<div class="line total">
						<div class="label">Total:</div>
						<div class="amount">${roundToTwo(subTotal + subTotal * 0.0975)}</div>
					</div>
				</div>
			{:else}
				Your cart is empty.
			{/if}
		</GroupPane>
	</div>
</div>

<script>
	// Imports
	import GroupPane from '$modules/groupPane.svelte'
	import MenuItem from '$modules/menuItem.svelte'
	import CartItem from '$modules/cartItem.svelte'

	//Declarations
	$: dishes = [
		{id:1, image: 'plate__french-fries.png', description: 'French fries with Ketchup', amount: '4.50', background: '#FF0000', isAdded: false},
		{id:2, image: 'plate__salmon-vegetables.png', description: 'Salmon and Vegetables', amount: '4.50', background: '#00FF00', isAdded: false},
		{id:3, image: 'plate__spaghetti-meat-sauce.png', description: 'Spaghetti with Meat Sauce', amount: '4.50', background: '#0000FF', isAdded: false}
	]
	let cartItems = []

	$: cart = cartItems.map(group => {
		let dish = dishes.find( dish => dish.id === group.id)
		return {...dish, count: group.count}
	})

	$: subTotal = cartItems.reduce((prev,item) => {
		let dish = dishes.find(dish => dish.id === item.id)
		return prev + item.count * Number(dish.amount)}, 0
	)


	// functions
	function addItem(event){
		let newIndex = cartItems.findIndex(item => event.detail.id === item.id)
		if(newIndex === -1){
			cartItems.push({ count: 0, id: event.detail.id })
			newIndex = cartItems.length - 1
		}
		cartItems[newIndex].count += 1
		
		cartItems = [...cartItems]
		checkAddedItems()
	}
	//removes one item from list
	function removeItem(event){
		let removeIndex = cartItems.findIndex(item => event.detail.id === item.id)
		
		if(removeIndex !== -1) cartItems[removeIndex].count -= 1
		
		cartItems = [...cartItems]
	}
	// deletes item from array
	function deleteItem(event){
		let deleteIndex = cartItems.findIndex(item => event.detail.id === item.id)
		
		if(deleteIndex !== -1) cartItems.splice(deleteIndex, 1)
		
		cartItems = [...cartItems]
		checkAddedItems()
	}

	function checkAddedItems(){
		dishes.forEach((dish) =>{
			dish.isAdded = cartItems.findIndex(item => item.id === dish.id) !== -1
		})

		dishes = [...dishes]
	}

	function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
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

	.resume-cart{
		display:flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		gap:20px;

		padding-right: 30px;
	}

	.resume-cart .line{
		display: flex;

		flex: 0 0 auto;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
	}

	.resume-cart .amount{
		font-weight: bold;
		font-size: 32px;
		width: 150px;
		text-align: end;
	}

	.resume-cart .label{
		font-weight: bold;
		font-size: 16px;

	}
</style>
