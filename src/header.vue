
<template>
    <div class="card">
        <Menubar :model="items">
            <template #start>
                <a @click.prevent="goTo('/admin/dashboard')" class="tem" href="#">
                    <img style="max-width: 69px;" src="/logo.png" alt="logo">
                    <h2 style="color: orange;font-weight: bold;">Nashta House</h2>
                </a>
            </template>
            <template #item="{ item, props }">
                <a @click.prevent="goTo(item.href)" class="aria-hidden-false flex items-center" :class="{'active' : route.path.startsWith(item.href)}" href="#" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </template>
            <template #end>
                <div class="flex items-center gap-2">
                    <Button @click="logout" label="logout"></Button>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from 'primevue/usetoast';
import { useRouter } from "vue-router";
import { useLoadingStore } from '@/loadingStore'

const store = useLoadingStore()
const router = useRouter();
const toast = useToast();
const route = useRoute();

const items = ref([
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        href:'/admin/dashboard'
    },
    {
        label: 'Account & Expenses',
        icon: 'pi pi-dollar',
        href: '/admin/expense'
    },
    {
        label: 'Monthly Food Choices',
        icon: 'pi pi-star',
        href: '/admin/choices'
    },
    {
        label: 'Users',
        icon: 'pi pi-users',
        href: '/admin/users'
    },
    {
        label: 'Nashtas',
        icon: 'pi pi-shop',
        href: '/admin/nashta'
    },
]);

function goTo(link){
    // if(store.isLoading){
    //     toast.add({
    //     severity: 'warn',
    //     summary: 'Please wait!',
    //     detail: 'Wait for the request to be finished!', 
    //     life: 3000 
    // });
    //     return;
    // }
    router.push(link);
}
function logout(){
    //logout logic here
    sessionStorage.removeItem('token');
    router.push('/admin/login');
    toast.add({
        severity: 'success',
        summary: 'Logged out!',
        detail: 'User logged out successfully!', 
        life: 3000 
    });
}

</script>

<style>
.card{
    margin-top: 15px;
}
.tem{
    display: flex;
    text-decoration: none;
    align-items: center;
    justify-content: center;
}
a.active{
    color: orange;
}

</style>
