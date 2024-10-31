<template>
    <div class="bg-front-container-special"></div>
    <div style="padding-top: 10px; padding-right: 10px;" class="dark-container">
        Toggle Dark Mode : &nbsp;&nbsp;
        <Button :icon="hasDarkClass ? 'pi pi-sun' : 'pi pi-moon'" @click="toggleDark" aria-label="dark-mode" />
    </div>
    <router-view></router-view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const hasDarkClass = ref(typeof(JSON.parse(localStorage.getItem('isDark'))) === 'object' ? true : (JSON.parse(localStorage.getItem('isDark'))));

onMounted(() => {
  document.querySelector('html').classList.toggle('dark',hasDarkClass.value);
});
function toggleDark(){
    hasDarkClass.value = !hasDarkClass.value;
    localStorage.setItem('isDark', hasDarkClass.value);
    document.querySelector('html').classList.toggle('dark', hasDarkClass.value);
}
</script>

<style scoped>

</style>