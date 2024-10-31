<template>
    <div>
<h1>404</h1>  
    <h3>
        Page Not Found
    </h3>
    <Button label="Go To Main" icon="pi pi-arrow-right" @click="goToMain"/>
</div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router= useRouter();
function goToMain(){
    router.push('/');
}
</script>

<style scoped>
div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>