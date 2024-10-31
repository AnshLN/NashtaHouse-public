<template>
    <template v-if="isChoiceRoundAvailable">
        <template v-if="!isDashboardLoading">
            <Menubar style="margin: 25px;">
                <template #start>
                    <img src="/logo.png" style="max-height: 60px;" alt="logo">
                    <h2>Nashta house</h2>
                </template>
                
                <template #end>
                    <div class="flex items-center gap-2">
                        {{ user }}
                        <i class="pi pi-user" style="margin-right: 10px;"></i>
                        <Button @click="logout" label="Logout" icon="pi pi-arrow-left"></Button>
                    </div>
                </template>
            </Menubar>
            <div class="container">
            
                <h1>Welcome  <span style="color: orange;">@{{ user }}!</span></h1>
                <form @submit.prevent="sendFoodChoices()" autocomplete="off">
                    <div v-if="isFoodSubmitted" class="input-group">
                        <p>Your Current Month Choices :</p>
                        <DataView :value="choices">
                            <template #list="slotProps">
                                <div style="display: flex; flex-direction: column;">
                                    <div v-for="(item, index) in slotProps.items" :key="index">
                                        <div 
                                            style="display: flex; flex-direction: column; align-items: center; padding: 1.5rem; gap: 5px;"
                                        >
                                            <div style="width: 10rem; position: relative;">
                                                <img 
                                                    v-if="item.img"
                                                    :src="item.img" 
                                                    :alt="item.name" 
                                                    style="display: block; margin: auto; border-radius: 0.5rem; width: 100%;" 
                                                />
                                            </div>
                                            <div style="display: flex; justify-content: space-between; flex: 1; gap: 1.5rem;">
                                                <div style="font-size: 1.25rem; font-weight: 500; margin-top: 0.5rem;">
                                                    {{ item.name }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </DataView>


                    </div>
                    <div class="input-group">
                        <p>{{isFoodSubmitted ? 'Change your Nashta choices' : 'Choose Your Favourite Nashta'}}  :</p>
                        <MultiSelect v-model="foods" :options="foodsOptions" optionLabel="name" filter placeholder="Choose Nashta" display="chip" style="width: 100%;" class="w-full md:w-80">
                            <template #option="slotProps">
                                <div style="display: flex; justify-content: center;align-items: center;" class="flex items-center">
                                    <img v-if="slotProps.option.img" :src="slotProps.option.img" style="width: 70px; margin-right: 10px;" />
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                            <template #dropdownicon>
                                <i class="pi pi-verified" />
                            </template>
                            <template #filtericon>
                                <i class="pi pi-apple" />
                            </template>
                            <template #header>
                                <div style="font-size: medium;padding: 8px 10px;" class="font-medium px-3 py-2">Available Nashta</div>
                            </template>
                            <template #footer>
                                <div style="padding: 10px;display: flex;justify-content: space-between;" class="p-3 flex justify-between">
                                    <Button @click="visible=true" label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
                                    <Button @click="foods=[]" label="Remove All" severity="danger" text size="small" icon="pi pi-times" />
                                </div>
                            </template>
                        </MultiSelect>
                    </div>
                    <br>
                    <br>
                    <Button type="submit" :disabled="isLoading" style="width: 100%;" label="Send Choices" :icon="isLoading ? 'pi pi-cog pi-spin' : 'pi pi-send'"></Button>
                </form>
            </div>
        </template>
        <template v-else>
            <h1 style="text-align: center;"><i style="font-size: 50px;" class="pi pi-spin pi-spinner"></i></h1>
        </template>
    </template>
    <template v-else>
        <h2 style="text-align: center;color: orange;">{{ reason ? 'Thank You For Registering. The Options will be available to you soon...':'Thank You For Registering. The Options will be available to you soon...' }}</h2>
    </template>
    <Dialog v-model:visible="visible" modal header="Add Nashta" :style="{ width: '25rem' }">
        <div style="display: flex;flex-direction: column;gap: 5px;margin-bottom: 25px;" class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Nashta Name :</label>
            <InputText v-model="addNashtaItem" placeholder="eg. Mamra"id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div style="display: flex;flex-direction:column;gap: 5px;margin-bottom: 5px;" class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Nashta Image :</label>
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
                    <span>Drag and drop Nashta here to upload.</span>
                    <img draggable="false" style="width: 100%;" src="/imgNotFound.png" alt="Not Found">
                </template>
            </FileUpload>
        </div>
        
        <div style="display: flex;justify-content: flex-end;gap: 10px;" class="flex justify-end gap-2">
            <Button type="button" label="Cancel" :disabled="isNashtaLoading" severity="secondary" @click="visible = false"></Button>
            <Button type="button" :disabled="isNashtaLoading" label="Add" :icon="isNashtaLoading ? 'pi pi-spin pi-cog':''" @click="addNashta()"></Button>
        </div>
    </Dialog>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
   GetUserData(); 
});

const image = ref('');
const visible = ref(false);
const isDashboardLoading = ref(true);
const isChoiceRoundAvailable = ref(true);
const router = useRouter();
const toast = useToast();
const user = ref('John');
const isFoodSubmitted = ref(false)
const isLoading = ref(false);
const api = import.meta.env.VITE_ADMIN_API_URL;
const choices = ref([])
const foods = ref([]);
const foodsOptions = ref([]);
const reason = ref(0);
const isNashtaLoading=ref(false);
const addNashtaItem = ref('');

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

async function addNashta() {
    if(!addNashtaItem.value){
        toast.add({
            severity: 'error',
            summary: 'Name is required field!',
            detail: 'Please fill up name field!',
            life: 3000
        });
        return;
    }
    try{
        isNashtaLoading.value = true;
        const response = await axios.post(`${api}/addNewFood`,{
            token: sessionStorage.getItem('FrontAuth'),
            name : addNashtaItem.value,
            img: image.value
        });
        switch(response.data.response_code) {
            case 205:
                toast.add({
                    severity: 'error',
                    summary: 'Invalid User',
                    detail: 'Please login Again.', 
                    life: 3000 
                });
                sessionStorage.removeItem('FrontAuth');
                router.push('/login')
                break;
            case 201:
                toast.add({
                    severity: 'error',
                    summary: 'Name is required field!',
                    detail: 'Please fill up name field!',
                    life: 3000
                });
                break;
            case 200:
                toast.add({
                    severity: 'success',
                    summary: 'Nashta Added Successfully!',
                    detail: 'New Nashta has been Added Successfully!',
                    life: 3000
                });
                addNashtaItem.value = '';
                image.value = '';
                GetUserData();
                visible.value=false;
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
        isNashtaLoading.value=false
    }
}

async function GetUserData() {
    try{
        isDashboardLoading.value = true
        const response = await axios.get(`${api}/GetUserData`,{
            params: {
                token: sessionStorage.getItem('FrontAuth'),
            },
        });
        switch(response.data.response_code) {
            case 205:
                toast.add({
                    severity: 'error',
                    summary: 'Invalid User',
                    detail: 'Please login Again.', 
                    life: 3000 
                });
                sessionStorage.removeItem('FrontAuth');
                router.push('/login')
                break;
            case 201:
                toast.add({
                    severity: 'error',
                    summary: 'Choice Round Not Available.',
                    detail: 'No Monthly Food Choice Round Available!.', 
                    life: 6000 
                });
                reason.value=0;
                isChoiceRoundAvailable.value=false;
                break;
            case 202:
                toast.add({
                    severity: 'error',
                    summary: 'Looks Like New User.',
                    detail: 'New Users Can Submit Their Choices From Next Round!.', 
                    life: 6000
                });
                reason.value = 1;
                isChoiceRoundAvailable.value=false;
                break;
            case 200:
                // toast.add({
                //     severity: 'success',
                //     summary: 'Welcom To Nashta House.',
                //     detail: 'You Can Submit Your Favourite Choices!',
                //     life: 3000
                // });
                isChoiceRoundAvailable.value=true;
                user.value = response.data.foundUser.username;
                isFoodSubmitted.value = !response.data.foundUser.isRemaining;
                choices.value = response.data.foundUser.choices;
                foodsOptions.value=response.data.food;
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
        isDashboardLoading.value = false;
    }
}

async function sendFoodChoices() {
    if(!foods.value||!foods.value.length){
        toast.add({
            severity: 'error',
            summary: 'Minimum 1 Nashta is required.',
            detail: 'Please fill Choose some Nashtas!',
            life: 4000
        });
        return;
    }
    try{
        isLoading.value = true
        const response = await axios.post(`${api}/addFoodChoices`,{
            token: sessionStorage.getItem('FrontAuth'),
            choices:foods.value,
        });
        switch(response.data.response_code) {
            case 205:
                toast.add({
                    severity: 'error',
                    summary: 'Invalid User',
                    detail: 'Please login Again.', 
                    life: 3000 
                });
                sessionStorage.removeItem('FrontAuth');
                router.push('/login')
                break;
            case 201:
                toast.add({
                    severity: 'error',
                    summary: 'Minimum 1 Nashta choice is required.',
                    detail: 'Please select atleast 1 nashta!.', 
                    life: 6000 
                });
                break;
            case 202:
                toast.add({
                    severity: 'error',
                    summary: 'No Choice Rounds Found.',
                    detail: 'New Users Can Submit Their Choices From Next Round!.', 
                    life: 6000
                });
                break;
            case 203:
                toast.add({
                    severity: 'error',
                    summary: 'User not found.',
                    detail: 'Something wrong happened. please try again later', 
                    life: 6000
                });
                break;
            case 200:
                toast.add({
                    severity: 'success',
                    summary: 'Choices Submitted!',
                    detail: 'Your choices has been submited successfully!',
                    life: 3000
                });
                GetUserData();
                foods.value=[];
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
        isLoading.value = false;
    }
}

function logout(){
    sessionStorage.removeItem('FrontAuth');
    router.push('/login');
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
    width: 400px;
    margin-top: 20px;
}
.input-group > *{
    width: 100%;
}
:deep(.p-dataview-content){
    background-color: transparent;
}
p{
    margin: 10px;
}
</style>