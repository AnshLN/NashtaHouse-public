<template>
    <div class="container">
        <img src="/logo.png" alt="logo">
        <h1>Registration</h1>
        <form @submit.prevent="sendOTP()" autocomplete="off">
            <div class="input-group">
                <p>Enter Email (for OTP Verification) :</p>
                <InputText type="email" :required="true" v-model="email" placeholder="eg. johndoe@yahoo.com..."/>
            </div>
            <div class="input-group">
                <p>Create Username :</p>
                <InputText type="text" :required="true" v-model="username" placeholder="eg. John07"/>
            </div>
            <div class="input-group">
                <p>Create Password :</p>
                <Password :inputProps="{ required: 'true' }" :inputStyle="{ width: '100%' }" v-model="password" :required="true" placeholder="Enter your password here..."/>
            </div>
            <br>
            <br>
            <Button type="submit" :disabled="isLoading" style="width: 100%;" label="Send OTP" :icon="isLoading ? 'pi pi-cog pi-spin' : 'pi pi-send'"></Button>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const email = ref('');
const username = ref('');
const password = ref('');
const isLoading = ref(false);
const api = import.meta.env.VITE_ADMIN_API_URL;
const router = useRouter();

async function sendOTP() {
    if (!username.value || !password.value || !email.value) {
        toast.add({
            severity: 'error',
            summary: 'Username Password and email is requied!',
            detail: 'Please Fill up all the fields.', 
            life: 3000 
        });
        return;
    }
    try{
        isLoading.value = true;
        const response = await axios.post(`${api}/send-otp`,{
                email: email.value,
                password: password.value,
                username: username.value
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
                    summary: 'Username Password and email is requied!',
                    detail: 'Please Fill up all the fields.', 
                    life: 3000 
                });
                break;
            case 200:
                toast.add({
                    severity: 'success',
                    summary: 'OTP Sent!',
                    detail: 'OTP have been sent Successfully!',
                    life: 3000
                });
                router.push(`/verifyotp/${response.data.id}`)
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