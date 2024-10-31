<template>
    <section class="custom_loader" v-if="store.isLoading"><span class="loader-20"> </span></section>
    <template v-else>
     <h1 style="text-align: center;margin-top: 50px;">Account & Expense History </h1>
    <div class="card">
        <DataTable :value="ExpenseData" v-model:filters="filters" paginator size="large" :rows="10" stripedRows :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem" :globalFilterFields="['user','description', 'amount', 'time']">
            <template #header>
                <div style="display: flex;justify-content: space-between;gap: 15px;">
                    <div style="display: flex;gap: 15px;">
                        <Button :disabled="store.isLoading" label="Add Expense" icon="pi pi-plus" @click="goToAddExpense"></Button>
                        <Button :disabled="store.isLoading" v-if="isMasterAdmin" label="Add Credit" icon="pi pi-plus" severity="success" @click="goToAddCredit"></Button>
                    </div>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No data found. </template>
            <Column field="user" header="User" style="width: 20%"></Column>
            <Column field="description" header="Description" style="width: 25%">
            </Column>
            <Column field="amount" header="Credited / Debited" style="width: 15%">
                <template #body="{ data }">
                        <h3 style="margin: 0;" :style="data.isCredited ? {color : 'lime'} : {color:'red'}">{{ data.isCredited > 0 ? '+':'-' }} {{ Math.abs(data.amount) }} ₹</h3>
                </template>
            </Column>
            <Column field="time" header="Date" style="width: 20%">
                <template #body="{data}">
                    <div v-if="data.time">
                        {{ data.time }}
                    </div>
                </template>
            </Column>
            <Column field="image" header="Bills" style="width: 10%">
                <template #body="{ data }">
                    <a style="color: orange;" target="_blank" v-if="data.image" :href="data.image">
                        <i class="pi pi-eye"></i>
                    </a>
                </template>
            </Column>
            <Column field="_id" header="Delete" style="width: 10%">
                <template #body="{ data }">
                    <!-- <Button severity="secondary" style="margin-right: 5px;" icon="pi pi-pencil" @click="goTo(`/admin/expense/edit/${data._id}`)"></Button> -->
                    <ConfirmPopup group="headless">
                        <template #container="{ message, acceptCallback, rejectCallback }">
                            <div style="padding: 10px;border-radius: 10px;" class="rounded p-4">
                                <h3 style="margin-top:0;margin-bottom: 10px; color: red;">{{ message.message }} </h3>
                                <div style="display: flex;justify-content: center;gap: 5px; margin-top: 5px;" class="flex items-center gap-2 mt-4">
                                    <Button label="Delete" severity="danger" @click="acceptCallback" size="small"></Button>
                                    <Button label="Cancel" outlined @click="rejectCallback" severity="secondary" size="small" text></Button>
                                </div>
                            </div>
                        </template>
                    </ConfirmPopup>
                    <Button v-if="isMasterAdmin ? true : !data.isCredited" severity="secondary" icon="pi pi-trash" @click="requireConfirmation($event, data._id)"></Button>
                </template>
            </Column>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;gap: 15px;">
                    <h2 style="margin: 0;">
                        Remaining Balance : <span :style="remainingBalance > 0 ?{color: 'lime'}:{color:'red'}"> {{ remainingBalance > 0 ? '+': '' }}
                        {{ remainingBalance }} ₹ </span>
                    </h2>
                </div>
            </template>
        </DataTable>
    </div>
</template>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { useLoadingStore } from '@/loadingStore'
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const store = useLoadingStore()
const api = import.meta.env.VITE_ADMIN_API_URL;
const toast = useToast();
const router = useRouter();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const ExpenseData = ref([
        {
            "_id": "67176b7cc0bf52bb572e37f3",
            "user": "John",
            "description": "Debited Balance for Some Expense",
            "isCredited": false,
            "amount": 5700,
            "time": "22/11/2024, 5:59:23 pm",
            "image": "https://nashta-house.vercel.app/imgNotFound.png",
            "createdAt": "2024-10-22T09:08:12.521Z",
            "updatedAt": "2024-10-22T09:08:12.521Z",
            "__v": 0
        },
        {
            "_id": "67176b7cc0bf52bb572e37f3",
            "user": "Shyam",
            "description": "Credited by HR",
            "isCredited": true,
            "amount": 7000,
            "time": "20/11/2024, 1:43:28 pm",
            "image": "https://nashta-house.vercel.app/imgNotFound.png",
            "createdAt": "2024-10-22T09:08:12.521Z",
            "updatedAt": "2024-10-22T09:08:12.521Z",
            "__v": 0
        },
        {
            "_id": "67176b7cc0bf52bb572e37f3",
            "user": "Vivek",
            "description": "Debited Balance for Mouse + Keyboard",
            "isCredited": false,
            "amount": 400,
            "time": "17/11/2024, 12:49:23 am",
            "image": "https://nashta-house.vercel.app/imgNotFound.png",
            "createdAt": "2024-10-22T09:08:12.521Z",
            "updatedAt": "2024-10-22T09:08:12.521Z",
            "__v": 0
        },
        {
            "_id": "67176b7cc0bf52bb572e37f3",
            "user": "Hiren",
            "description": "Credited by Admin",
            "isCredited": true,
            "amount": 369,
            "time": "22/10/2024, 2:37:23 pm",
            "image": "https://nashta-house.vercel.app/imgNotFound.png",
            "createdAt": "2024-10-22T09:08:12.521Z",
            "updatedAt": "2024-10-22T09:08:12.521Z",
            "__v": 0
        },]);
const remainingBalance = ref(1269);
const isMasterAdmin = ref(true);

const requireConfirmation = (event, id) => {
    confirm.require({
        target: event.currentTarget,
        group: 'headless',
        message: 'Are you sure want to delete this expense data?',
        accept: () => {
            deleteExpense(id);
        },
        reject: () => {
            // toast.add({severity:'error', summary:'Cancelled', detail:'You have canclled the process', life: 3000});
        }
    });
}

async function deleteExpense(id){
    toast.add({
                    severity: 'success',
                    summary: 'Deleted!',
                    detail: 'Deleted Successfully!',
                    life: 3000
                });
}

function goToAddExpense(){
    router.push('/admin/expense/add')
}
async function getExpenseData() {
    try{
        store.LoadingTrue();
        const response = await axios.get(`${api}/getExpenseData`,{
            params: {
                token:sessionStorage.getItem('token'),
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
        ;
    }
}

function goToAddCredit(){
    router.push('/admin/expense/add-credit')
}

onMounted(() => {
    store.LoadingFalse()
})
</script>