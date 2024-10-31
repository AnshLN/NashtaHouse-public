<template>
      <section class="custom_loader" v-if="store.isLoading"><span class="loader-20"> </span></section>
      <template v-else>
    <h1 style="text-align: center;margin-top: 50px;">User Choices</h1>
   <div class="card">
       <DataTable :value="userChoices" paginator size="large" :rows="10" stripedRows :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <template #header>
               <div style="display: flex;justify-content: flex-end;gap: 15px;">
                   <Button :disabled="store.isLoading" label="Go To Monthly Choice" icon="pi pi-arrow-right" @click="goToChoice"></Button>
               </div>
           </template>
           <template #empty> No data found. </template>
           <Column field="username" header="Username" style="width: 30%">
               <template #body="{ data }">
                       {{data.username}}
               </template>
           </Column>
           <Column field="isRemaining" header="Remaining To Submit?" style="width: 25%">
               <template #body="{ data }">
                       <Badge :value="data.isRemaining ? 'Remaining' : 'Submitted'" :severity="data.isRemaining ? 'danger' : 'success'"></Badge>
               </template>
           </Column>
           <Column field="time" header="Submitted At" style="width: 25%"></Column>
           <Column field="choices" header="Choices" style="width: 20%">
               <template #body="{ data }">
                {{ data.choices.map(choice => choice.name).join(', ') }}
               </template>
           </Column>
       </DataTable>
   </div>
   </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useLoadingStore } from '@/loadingStore'

const store = useLoadingStore()
const route= useRoute();
const router=useRouter();
const api = import.meta.env.VITE_ADMIN_API_URL;
const toast = useToast();
const userChoices = ref([
    {
        "username": "Ravi",
        "choices": [
            {
                "_id": "671b32d51a9f02a8f0bdcc1a",
                "name": "Banana Chips",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            },
            {
                "_id": "671b33d61a9f02a8f0bdcc2b",
                "name": "Fruit Salad",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            },
            {
                "_id": "671b34e71a9f02a8f0bdcc3c",
                "name": "Samosa",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            }
        ],
        "isRemaining": true,
        "time": "25/10/2024, 3:10:15 pm"
    },
    {
        "username": "Sneha",
        "choices": [
            {
                "_id": "671c45f82b8d13b9e1ceee2d",
                "name": "Choco Pie",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            },
            {
                "_id": "671c46f92b8d13b9e1ceee3e",
                "name": "Potato Wafers",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            },
            {
                "_id": "671c47f92b8d13b9e1ceee4f",
                "name": "Sandwich",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            }
        ],
        "isRemaining": false,
        "time": "26/10/2024, 10:22:45 am"
    },
    {
        "username": "Arjun",
        "choices": [
            {
                "_id": "671d58d03c0e24d2f2dffd5a",
                "name": "Cookies",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            },
            {
                "_id": "671d59d13c0e24d2f2dffd6b",
                "name": "Veg Roll",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            },
            {
                "_id": "671d5ad23c0e24d2f2dffd7c",
                "name": "Chocolate Muffin",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            }
        ],
        "isRemaining": true,
        "time": "27/10/2024, 5:50:33 pm"
    },
    {
        "username": "Priya",
        "choices": [
            {
                "_id": "671e6bd53d1f35e3f3effe8d",
                "name": "Paneer Pakora",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            },
            {
                "_id": "671e6cd63d1f35e3f3effe9e",
                "name": "Kachori",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            },
            {
                "_id": "671e6dd73d1f35e3f3effeaf",
                "name": "Brownie",
                "img": "https://nashta-house.vercel.app/imgNotFound.png"
            }
        ],
        "isRemaining": false,
        "time": "28/10/2024, 12:05:17 pm"
    }
]
);


function goToChoice(){
    // toast.add({
    //     severity: 'success',
    //     summary: 'Redirected to choices',
    //     detail: 'Redirected to choice rounds successfully.',
    //     life: 3000
    // });
    router.push('/admin/choices')
}



onMounted(() => {
    store.LoadingFalse();
})
</script>