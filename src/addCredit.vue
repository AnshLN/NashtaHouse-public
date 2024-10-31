<template>
    <form @submit.prevent="addExpense">
    <h1 style="text-align: center;margin-top: 50px;margin-bottom: 50px;">Add Credit </h1>
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: flex-start; max-width: 500px; margin: auto; gap: 25px;" class="trsf">
            
            <div style="display: flex; gap: 10px; justify-content: flex-start; flex-direction: column;" class="input-group">
                <label> Expense Detail :</label>
                <InputGroup>
                    <Select v-model="debitCredit" :options="['Credited']" class="w-full md:w-56">
                        <template #value="slotProps">
                                <div :style="slotProps.value==='Debited' ? { color:'red' } : { color: 'green'}">{{ slotProps.value }}</div>
                        </template>
                        <template #option="slotProps">
                                <div :style="slotProps.option==='Debited' ? { color:'red' } : { color: 'green'}">{{ slotProps.option }}</div>
                        </template>
                    </Select>
                    <InputNumber required v-model="amount" placeholder="Amount eg.INR 25.00" inputId="currency-india" mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" fluid />
                </InputGroup>
            </div>
            <div style="display: flex; gap: 10px; justify-content: flex-start; flex-direction: column;" class="input-group">
                <label> Expense Date :</label>
                <DatePicker id="datepicker-12h" v-model="dateTime" showTime hourFormat="12" fluid />
            </div>
            <div style="display: flex; gap: 16px;">
                <!-- <Button style="width: calc(50% - 8px);" type="button" @click="goToDashboard" label="Go To Dashboard" severity="success" icon="pi pi-arrow-up-right"></Button> -->
                <Button :disabled="isLoading" type="button" style="width: calc(50% - 8px);" @click="cancel" label="Cancel" severity="danger" icon="pi pi-times"></Button>
                <Button :disabled="isLoading" :icon="isLoading ? 'pi pi-spin pi-cog':''" label="Submit" type="submit" severity="success" style="width: calc(50% - 8px);"></Button>
            </div>
    </div>
</form>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { useLoadingStore } from '@/loadingStore'

const store = useLoadingStore()
const toast= useToast();
const router = useRouter();
const debitCredit = ref('Credited')
const amount = ref(0);
const dateTime = ref();
const isLoading = ref(false);
const api = import.meta.env.VITE_ADMIN_API_URL;

async function addExpense(){
    toast.add({
                        severity: 'success',
                        summary: 'Credits Added!',
                        detail: 'successfully added new credit.',
                        life: 3000
                    });
}
// function goToDashboard(){
//     // toast.add({ severity: 'success', summary: 'Redirected!', detail: 'Redirected To Dashboard...', life: 3000 });
//     router.push('/admin/dashboard')
// }
function cancel(){
    // toast.add({ severity: 'error', summary: 'Cancelled!', detail: 'Redirected To Expense...', life: 3000 });
    router.push('/admin/expense')
}

onMounted(() => {
    dateTime.value = new Date();
});
</script>

<style scoped>
.input-group{
    width: 100%;
}
.trsf > *{
    width: 100%;
}
</style>