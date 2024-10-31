<template>
      <section class="custom_loader" v-if="store.isLoading"><span class="loader-20"> </span></section>
      <template v-else>
    <h1 style="text-align: center;margin-top: 50px;">Monthly Food Choices </h1>
   <div class="card">
       <DataTable :value="ChoiceData" paginator size="large" :rows="10" stripedRows :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
           <template #header>
               <div style="display: flex;justify-content: flex-end;align-items:center;gap: 15px;">
                <label><span style="color: red;">WARNING : IT IS IRREVERSIBLE</span> ( Only Do This If you Know use very well. )</label>
                    <ConfirmPopup group="headless">
                        <template #container="{ message, acceptCallback, rejectCallback }">
                            <div style="padding: 10px;border-radius: 10px;" class="rounded p-4">
                                <h3 style="margin-bottom: 1px; color: red;">{{ message.message }} </h3><br>
                                <h4 style="margin-top: 0;margin-bottom: 8px;text-align: center;">all users will open to submit their choices again</h4>
                                <div style="display: flex;justify-content: center;gap: 5px; margin-top: 5px;" class="flex items-center gap-2 mt-4">
                                    <Button label="Add" @click="acceptCallback" size="small"></Button>
                                    <Button label="Cancel" outlined @click="rejectCallback" severity="secondary" size="small" text></Button>
                                </div>
                            </div>
                        </template>
                    </ConfirmPopup>
                   <Button severity="danger" :disabled="isLoading||store.isLoading" :icon="isLoading ? 'pi pi-spin pi-cog' : 'pi pi-plus'" label="Add Choice" @click="requireConfirmation($event)"></Button>
               </div>
           </template>
           <template #empty> No data found. </template>
           <Column field="description" header="Choice Description" style="width: 30%">
               <template #body="{ data }">
                       Added new Monthly Food Choice
               </template>
           </Column>
           <Column field="isActive" header="Latest / Closed" style="width: 25%">
               <template #body="{ data }">
                       <Badge :value="data.isActive ? 'Latest' : 'Closed'" :severity="data.isActive ? 'success' : 'danger'"></Badge>
               </template>
           </Column>
           <Column field="createdAtTime" header="Created Date" style="width: 25%"></Column>
           <Column field="_id" header="Users Choices" style="width: 20%">
               <template #body="{ data }">
                   <router-link :to="`/admin/choices/userchoice`">
                       <i class="pi pi-eye"></i>
                   </router-link>
               </template>
           </Column>
       </DataTable>
   </div>
   </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useConfirm } from "primevue/useconfirm";
import { useLoadingStore } from '@/loadingStore'

const store = useLoadingStore()

const confirm = useConfirm();
const api = import.meta.env.VITE_ADMIN_API_URL;

const router = useRouter();
const toast = useToast();
const isLoading = ref(true);
const ChoiceData = ref([   {
      "_id": "67174d563ad82deb83802478",
      "isActive": true,
      "createdAtTime": "22/10/2024, 12:29:34 pm"
    },
    {
      "_id": "6718af124adc11be7498a245",
      "isActive": false,
      "createdAtTime": "20/10/2024, 09:45:21 am"
    },
    {
      "_id": "6719bf1d8cad62cd8247ab56",
      "isActive": true,
      "createdAtTime": "18/10/2024, 03:15:46 pm"
    },
    {
      "_id": "6715cd3a7bd92a4b7341cc58",
      "isActive": false,
      "createdAtTime": "15/10/2024, 11:03:58 am"
    },
    {
      "_id": "6716de42abf72edc9378db99",
      "isActive": true,
      "createdAtTime": "12/10/2024, 06:17:29 pm"
    }
  ]);


async function addChoice(){
    toast.add({
                    severity: 'success',
                    summary: 'New Choice Added!',
                    detail: 'choice has been added Successfully!',
                    life: 3000
                });
}

const requireConfirmation = (event) => {
    confirm.require({
        target: event.currentTarget,
        group: 'headless',
        message: 'Current choice will be closed & new active choice will be added',
        accept: () => {
            addChoice();
        },
        reject: () => {
            toast.add({severity:'error', summary:'Cancelled', detail:'You have canclled the process', life: 3000});
        }
    });
}

onMounted(() => {
    // fetchData();
    store.LoadingFalse();
        isLoading.value=false;
})
</script>