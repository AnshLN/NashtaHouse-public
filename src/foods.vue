<template>
    <section class="custom_loader" v-if="store.isLoading"><span class="loader-20"> </span></section>
    <template v-else>
  <h1 style="text-align: center;margin-top: 50px;">Nashtas </h1>
 <div class="card">
     <DataTable :value="FoodData" paginator size="large" :rows="10" stripedRows :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
         <template #empty> No data found. </template>
         <Column field="img" header="Image" style="width: 30%">
            <template #body={data}>
                    <img style="max-width: 50px;" v-if="data.img" :src="data.img">
            </template>
        </Column>

         <Column field="name" header="Nashta" style="width: 30%"></Column>
         <Column field="addedBy" header="Added by" style="width: 40%"></Column>
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
const FoodData = ref([
    {
        "name": "Cake",
        "addedBy": "Gayatri",
        "img": "https://nashta-house.vercel.app/imgNotFound.png"
    },
    {
        "name": "Samosa",
        "addedBy": "Ravi",
        "img": "https://nashta-house.vercel.app/imgNotFound.png"
    },
    {
        "name": "Cookies",
        "addedBy": "Sneha",
        "img": "https://nashta-house.vercel.app/imgNotFound.png"
    },
    {
        "name": "Paneer Pakora",
        "addedBy": "Priya",
        "img": "https://nashta-house.vercel.app/imgNotFound.png"
    },
    {
        "name": "Brownie",
        "addedBy": "Arjun",
        "img": "https://nashta-house.vercel.app/imgNotFound.png"
    }
]
);

onMounted(() => {
    store.LoadingFalse();
    isLoading.value= false;
})
</script>