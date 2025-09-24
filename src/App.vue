<script>
import Navbar from './components/navbar';
import Footer from './components/footer';
export default {
	name: 'App',
	components: {
		Navbar,
		Footer
	}
};
</script>
<template>
<div id="app">
	<Navbar />
	<main id="maincontent" tabindex="-1">
		<router-view />
	</main>
	<Footer />
</div>
</template>

<style lang="scss">
</style>
