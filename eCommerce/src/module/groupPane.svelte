<div class="pane">
	<h1 class="title">{title}</h1>
	<div class="pane-content">
		<slot></slot>
	</div>
</div>

<script context="module">
	export function load({title}) {
		return {
			props: {
				title
			}
		}
	}
</script>
<script>
	export let title
</script>

<style>
	.pane {
		width: 375px;
		height: 100%;
		display: flex;
		flex-direction: column;
		
		background: #FFFFFF;
		box-shadow: 0px 0px 70px #C7CBE3;

		border-radius: 25px;
		padding: 50px 0 50px 20px;
	}

	.title {
		font-weight: 700;
		font-size: 32px;
		line-height: 48px;
		color: #000000;
	}

	.pane-content{
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
