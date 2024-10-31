
<template>
    <Toast/>
    <router-view></router-view>
    <footer class="mt-5">
        <h5 style="text-align: center;" class="text-center">
            <img src="/ind.png" alt="India" style="width: 25px; vertical-align: middle;">
            {{ currentDate  }}
        </h5>
        <h6 style="text-align: center;" class="text-center"> Made By @Ap~ </h6>
    </footer>
</template>

<script>
export default {
data() {
      return {
        currentDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }
    },
    mounted() {
      setInterval(() => {
        this.currentDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      }, 1000)
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
* {
  font-family: "Josefin Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
.py-2.px-4{
  padding: 5px 10px;
}
.dark-container{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
body{
  overflow-x: hidden;
}
header{
  position: sticky;
  top: 20px;
  z-index: 9;
}
.p-menubar{
  background-color: transparent !important;
  backdrop-filter: blur(11px);
}
.custom_loader{
  margin: auto;
  min-width: 200px;
    width: 33.33%;
    height: 200px;
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    cursor: pointer;
    transition: 0.3s linear;
}
.loader-20 {
    width: 48px;
    height: 48px;
    border: 5px solid;
    border-color: #FF3D00 transparent;
    border-radius: 50%;
    display: inline-block;
    -webkit-animation: rotation 1s linear infinite;
    animation: rotation 1s linear infinite;
}
@-webkit-keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  body {
    margin: 0;
}
.bg-front-container-special{
  z-index: -9;
  position: sticky;
  width: 0%;
  height: 0%;
  top: 0;
  left: 0;
}
.bg-front-container-special::before {
  z-index: -9;
  display: block;
  height: 100vh;
  width: 100vw;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('/bg.avif');
  background-position: 0% 0%;
  background-size: auto;
  background-repeat: repeat;
  opacity: 0.3;
  pointer-events: none; 
}
</style>
