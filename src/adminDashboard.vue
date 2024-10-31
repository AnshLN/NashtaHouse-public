<template>
  <header>
    <Header/>
  </header>
    <router-view></router-view>
</template>

<script>
import Header from './header.vue';
export default {
    components:{
        Header
    },
  }
</script>

<style scoped>

.nmt-5{
    margin-top: 15px;
}
h5,h6{
    text-align: center;   
}
</style>