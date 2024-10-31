<template>
    <section class="custom_loader" v-if="store.isLoading"><span class="loader-20"> </span></section>
    <template v-else>
  <h1 style="text-align: center;margin-top: 50px;">Users </h1>
 <div class="card">
     <DataTable :value="UsersData" paginator size="large" :rows="10" stripedRows :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
         <template #empty> No data found. </template>
         <Column field="username" header="Username" style="width: 30%"></Column>
         <Column field="email" header="Email" style="width: 40%"></Column>
         <Column field="createdAtTime" header="Registred Date" style="width: 30%"></Column>
     </DataTable>
 </div>
 </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoadingStore } from '@/loadingStore'

const store = useLoadingStore()
const api = import.meta.env.VITE_ADMIN_API_URL;
const router = useRouter();
const toast = useToast();
const isLoading = ref(true);
const UsersData = ref([
    {
        "username": "Pankaj",
        "email": "pankaj@example.com",
        "createdAtTime": "28/10/2024, 12:28:07 pm"
    },
    {
        "username": "Ravi",
        "email": "ravi@example.com",
        "createdAtTime": "27/10/2024, 10:12:32 am"
    },
    {
        "username": "Sneha",
        "email": "sneha@example.com",
        "createdAtTime": "25/10/2024, 8:45:19 am"
    },
    {
        "username": "Priya",
        "email": "priya@example.com",
        "createdAtTime": "24/10/2024, 3:30:55 pm"
    },
    {
        "username": "Arjun",
        "email": "arjun@example.com",
        "createdAtTime": "22/10/2024, 6:11:47 pm"
    }
]
);



onMounted(() => {
    store.LoadingFalse();
    isLoading.value= false;
})
</script>