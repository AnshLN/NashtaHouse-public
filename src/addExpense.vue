<template>
    <form @submit.prevent="addExpense">
    <h1 style="text-align: center;margin-top: 50px;margin-bottom: 50px;">Add Expense </h1>
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: flex-start; max-width: 500px; margin: auto; gap: 25px;" class="trsf">
            <div style="display: flex; gap: 10px; justify-content: flex-start; flex-direction: column;" class="input-group">
                <label> Enter Expense Description Here :</label>
                <Textarea required v-model="Description" rows="5" cols="30" placeholder="eg. For Office Nasta"/>
            </div>
            <div style="display: flex; gap: 10px; justify-content: flex-start; flex-direction: column;" class="input-group">
                <label> Expense Detail :</label>
                <InputGroup>
                    <Select v-model="debitCredit" :options="['Debited']" class="w-full md:w-56">
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
            
            <FileUpload :disabled="image ? true : false" @select="onAdvancedUpload($event)" @clear="image=''" :multiple="false" accept="image/*" @remove="onAdvancedUpload($event)" :maxFileSize="2147483648">
                <template #header="{ chooseCallback , clearCallback, files }">
                    <div style="display: flex;gap: 15px;" class="flex gap-2">
                        <Button @click="chooseCallback()" :disabled="files&&files.length ? true : false" icon="pi pi-plus" label="Choose"></Button>
                        <Button @click="clearCallback()" icon="pi pi-times" label="Remove" severity="secondary" :disabled="!files || files.length === 0"></Button>
                    </div>
                </template>
                <template #content="{ files }">
                    <div v-if="files&&files.length">
                        <img :src="files[0].objectURL" alt="Uploaded Image" style="max-width: 100%;">
                    </div>
                </template>
                <template #empty>
                    <span>Drag and drop bill here to upload.</span>
                    <img draggable="false" style="width: 100%;" src="/imgNotFound.png" alt="Not Found">
                </template>
            </FileUpload>
            
            <div style="display: flex; gap: 16px;">
                <!-- <Button style="width: calc(50% - 8px);" type="button" @click="goToDashboard" label="Go To Dashboard" severity="success" icon="pi pi-arrow-up-right"></Button> -->
                <Button :disabled="isLoading" type="button" style="width: calc(50% - 8px);" @click="cancel" label="Cancel" severity="danger" icon="pi pi-times"></Button>
                <Button :disabled="isLoading" :icon="isLoading ? 'pi pi-spin pi-cog':''" label="Submit" type="submit" severity="success" style="width: calc(50% - 8px);"></Button>
            </div>
    </div>
</form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { useLoadingStore } from '@/loadingStore'

const store = useLoadingStore()
const toast= useToast();
const router = useRouter();
const debitCredit = ref('Debited')
const Description = ref('');
const amount = ref(0);
const image = ref('');
const dateTime = ref();
const isLoading = ref(false);
const api = import.meta.env.VITE_ADMIN_API_URL;


function onAdvancedUpload(event){
    const file = event.files[0];
    const reader = new FileReader();

      reader.onload = (e) => {
        image.value = e.target.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
}
async function addExpense(){
    toast.add({
                        severity: 'success',
                        summary: 'Expense Added!',
                        detail: 'successfully added new expense.',
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
    dateTime.value = new Date();; // Store as string in IST
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