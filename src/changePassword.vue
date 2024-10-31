<template>
    <div class="container">
        <img src="/logo.png" alt="logo">
        <h1>Change password</h1>
        <form @submit.prevent="otpSended ? verifyOTP() : sendOTP() " autocomplete="off">
            <div v-if="!otpSended" class="input-group">
                <p>Enter your email :</p>
                <InputText type="email" :required="true" v-model="email" placeholder="eg. johndoe@yahoo.com..."/>
            </div>
            <div v-if="otpSended" class="input-group">
                <p>Enter OTP :</p>
                <InputOtp :length="6" v-model="otp" integerOnly />
            </div>
            <br>
            <h4 v-if="otpSended">Wrong email? <a href="#" @click.prevent="otpSended=false" style="color: orange;text-decoration: underline;">change</a> here. </h4>
            <br>
            <Button type="submit" :disabled="isLoading" style="width: 100%;" :label="otpSended ? 'verify OTP' : 'Send OTP'" :icon="isLoading ? 'pi pi-cog pi-spin' : (otpSended ? 'pi pi-verified' : 'pi pi-send')"></Button>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const email = ref('');
const otp = ref('');
const otpSended = ref(false);
const isLoading = ref(false);
const api = import.meta.env.VITE_ADMIN_API_URL;

async function sendOTP() {
    try{
        isLoading.value = true;
        const response = await axios.post(`${api}/sendOTP`,{
            params: {
                email: email.value,
                
            },
        });
        switch(response.data.response_code) {
            case 205:
                toast.add({
                    severity: 'error',
                    summary: 'Invalid Admin',
                    detail: 'Please login Again.', 
                    life: 3000 
                });
                sessionStorage.removeItem('token');
                router.push('/admin/login')
                break;
            case 201:
                toast.add({
                    severity: 'error',
                    summary: 'No Expense Found!',
                    detail: 'No Expense data Found.', 
                    life: 3000 
                });
                sessionStorage.setItem('token',response.data.access_token);
                isMasterAdmin.value = response.data.isMasterAdmin;
                break;
            case 200:
                // toast.add({
                //     severity: 'success',
                //     summary: 'Data Fetched!',
                //     detail: 'Data Fetched Successfully!',
                //     life: 3000
                // });
                sessionStorage.setItem('token',response.data.access_token);
                ExpenseData.value = response.data.Expenses;
                isMasterAdmin.value = response.data.isMasterAdmin;
                remainingBalance.value = response.data.remainingBalance;
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