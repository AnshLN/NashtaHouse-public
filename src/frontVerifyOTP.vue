<template>
    <div class="container">
        <img src="/logo.png" alt="logo">
        <h1>Registration</h1>
        <form @submit.prevent="sendOTP()" autocomplete="off">
            <div class="input-group">
                <p>Enter OTP :</p>
                <InputOtp v-model="otp" :length="6" integerOnly />
            </div>
            <br>
            <h4>Wrong Email? <router-link style="color: orange;text-decoration: underline;" to="/register">Change</router-link> here. </h4>
            <br>
            <Button type="submit" :disabled="isLoading" style="width: 100%;" label="Verify OTP" :icon="isLoading ? 'pi pi-cog pi-spin' : 'pi pi-verified'"></Button>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useRoute,useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const otp = ref('');
const isLoading = ref(false);
const api = import.meta.env.VITE_ADMIN_API_URL;

async function sendOTP() {
    try{
        isLoading.value = true;
        const response = await axios.post(`${api}/verify-otp`,{
            otp:otp.value,
            id: route.params.id
        });
        switch(response.data.response_code) {
            case 209:
                toast.add({
                    severity: 'error',
                    summary: 'Username Exist!',
                    detail: 'Please Try Another username.', 
                    life: 3000 
                });
                break;
            case 210:
                toast.add({
                    severity: 'error',
                    summary: 'Email Already Exist!',
                    detail: 'Please try another email.', 
                    life: 3000 
                });
                break;
            case 201:
                toast.add({
                    severity: 'error',
                    summary: 'Invalid',
                    detail: 'Please register Again.', 
                    life: 3000 
                });
                router.push('/admin/register')
                break;
            case 205:
                toast.add({
                    severity: 'error',
                    summary: 'Invalid OTP',
                    detail: 'OTP is invalid..', 
                    life: 3000 
                });
                break;
            case 200:
                toast.add({
                    severity: 'success',
                    summary: 'User Registered!',
                    detail: 'User Registered Successfully!',
                    life: 3000
                });
                sessionStorage.setItem('FrontAuth',response.data.auth);
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
    } catch(err){
        toast.add({
                severity: 'error',
                summary: 'Internal server error',
                detail: 'Please try again later.',
                life: 3000
            });
            console.log('There was a problem with the fetch operation:', err);
    }finally{
        isLoading.value=false
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
    width: 350px;
    margin-top: 20px;
}
:deep(.p-inputotp-input){
    flex-grow: 1;
}
.input-group > *{
    width: 100%;
}
p{
    margin: 10px;
}
</style>