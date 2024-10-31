<template>
    <div class="container">
        <img src="/logo.png" alt="logo">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="input-group">
                <InputGroup style="margin-bottom: 20px;">
                    <InputGroupAddon>
                        <i class="pi pi-user"></i>
                    </InputGroupAddon>
                    <InputText autocomplete="username" v-model="username" placeholder="Username" />
                </InputGroup>
                <InputGroup style="margin-bottom: 20px;">
                    <InputGroupAddon>
                        <i class="pi pi-lock"></i>
                    </InputGroupAddon>
                    <Password :inputProps="{ autocomplete:'current-password'}" v-model="password" placeholder="Authentication Password" :feedback="false" />
                </InputGroup>
                    <h4 style="margin-bottom: 5px;">New User? <router-link style="color: orange;text-decoration: underline;" to="/register">Sign up</router-link> here. </h4>
                    <!-- <h4>Forgot Password?<router-link style="color: orange;text-decoration: underline;" to="/changepassword">Change</router-link> here. </h4> -->
                <Button :disabled="isLoading" :icon="isLoading ? 'pi pi-spin pi-cog' :'pi pi-lock'" type="submit" label="login"></Button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const password = ref('');
const username = ref('');
const isLoading = ref(false);
const api = import.meta.env.VITE_ADMIN_API_URL;
async function login() {
    if(!username.value||!password.value){
        toast.add({ severity: 'error',
            summary: 'Fields Required!',
            detail: 'Please fill up all fields!',
            life: 3000 
        });
    } else{
        isLoading.value = true;
        try {
            const response = await axios.post(`${api}/front-login`,{
                username:username.value,
                password:password.value
            });
            switch(response.data.response_code) {
                case 201:
                    toast.add({
                        severity: 'error',
                        summary: 'Invalid Username!',
                        detail: 'Username is Invalid', 
                        life: 3000 
                    });
                    break;
                case 202:
                    toast.add({
                        severity: 'error',
                        summary: 'invalid Password!',
                        detail: 'Please Enter Valid password',
                        life: 3000
                    });
                    break;
                case 200:
                    toast.add({
                        severity: 'success',
                        summary: 'Login Successfull!',
                        detail: 'Redirecting to Dashboard...',
                        life: 3000
                    });
                    sessionStorage.setItem('FrontAuth',response.data.access_token);
                    router.push('/dashboard');
                    break;
                default:
                    toast.add({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'response code not found!',
                        life: 3000
                    });
            }
        } catch (err){
            toast.add({
                severity: 'error',
                summary: 'Internal server error',
                detail: 'Please try again later.',
                life: 3000
            });
            console.error('There was a problem with the fetch operation:', err);
        } finally{
            isLoading.value=false;
        }
    }
}
</script>

<style scoped>
img{
    max-width: 350px;
}
.container{
    margin: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.input-group{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    width: 320px;
    margin-top: 20px;
}
.input-group > *{
    width: 100%;
}
p{
    margin: 10px;
}
</style>