<template>
        <h1 style="text-align: center;margin-top: 50px;">Dashboard </h1>
    <div class="main">
        <div class="card-container">
            
            <Card style="width: 55%;margin: auto;">
                <template #content>
                    <router-link to="/admin/expense" style="text-decoration: none;color: unset;">
                        <div class="f-group">
                            <div class="i-group large">
                                <i style="font-size: larger;" class="pi pi-wallet"></i>
                            </div>
                            <div class="t-group">
                                <h2 style="margin-top: 0;margin-bottom: 10px;">Remaining Balance</h2>
                                <h2 style="margin: 0;" :style="remainingBalance > 0 ?{color: 'lime'}:{color:'red'}">
                                    {{ remainingBalance > 0 ? '+': '' }}
                                    {{ remainingBalance }} ₹
                                </h2>
                            </div>
                        </div>
                    </router-link>
                </template>
            </Card>
        
            <Card>
                <template #content>
                    <router-link to="/admin/expense" style="text-decoration: none;color: unset;">
                        <div class="f-group">
                            <div class="i-group">
                                <i class="pi pi-indian-rupee"></i>
                            </div>
                            <div class="t-group">
                                <h3 style="margin-top: 0;margin-bottom: 10px;">Total Credits</h3>
                                <h3 style="margin: 0; color: lime;">
                                    {{ totalCredits }} ₹
                                </h3>
                            </div>
                        </div>
                    </router-link>
                </template>
            </Card>
            <Card>
                <template #content>
                    <router-link to="/admin/expense" style="text-decoration: none;color: unset;">
                        <div class="f-group">
                            <div class="i-group">
                                <i class="pi pi-indian-rupee"></i>
                            </div>
                            <div class="t-group">
                                <h3 style="margin-top: 0;margin-bottom: 10px;">Total Expense</h3>
                                <h3 style="margin: 0; color: red;">
                                    {{ totalExpense }} ₹
                                </h3>
                            </div>
                        </div>
                    </router-link>
                </template>
            </Card>
            <Card>
                <template #content>
                    <router-link to="/admin/users" style="text-decoration: none;color: unset;">
                        <div class="f-group">
                            <div class="i-group">
                                <i class="pi pi-user"></i>
                            </div>
                            <div class="t-group">
                                <h3 style="margin-top: 0;margin-bottom: 10px;">Total Users</h3>
                                <h3 style="margin: 0;color: lime;">
                                    {{ totalUsers }} Active users
                                </h3>
                            </div>
                        </div>
                    </router-link>
                </template>
            </Card>
            <Card>
                <template #content>
                    <router-link to="/admin/nashta" style="text-decoration: none;color: unset;">
                        <div class="f-group">
                            <div class="i-group">
                                <i class="pi pi-apple"></i>
                            </div>
                            <div class="t-group">
                                <h3 style="margin-top: 0;margin-bottom: 10px;">Total Nashtas</h3>
                                <h3 style="margin: 0;color: lime;">
                                    {{ totalNashtas }} Nashtas
                                </h3>
                            </div>
                        </div>
                    </router-link>
                </template>
            </Card>
        </div>
        <div class="chart-container">
            <Chart v-if="chartData.labels.length" id="myChart" type="line" :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup>
import 'chartjs-adapter-date-fns';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useLoadingStore } from '@/loadingStore'

const store = useLoadingStore()
const api = import.meta.env.VITE_ADMIN_API_URL;
const toast = useToast();
const router = useRouter();

const totalUsers = ref(12);
const totalNashtas = ref(29);
const remainingBalance = ref(1269);
const totalExpense = ref(5562);
const expenseData = ref([
  {
    time: "01/10/2024, 10:30 AM", // Example transaction date and time
    amount: 1500,
    isCredited: false, // Debit
  },
  {
    time: "02/10/2024, 11:00 AM",
    amount: 2000,
    isCredited: false, // Debit
  },
  {
    time: "03/10/2024, 09:45 AM",
    amount: 1200,
    isCredited: true,  // Credit
  },
  {
    time: "04/10/2024, 01:15 PM",
    amount: 500,
    isCredited: false, // Debit
  },
  {
    time: "05/10/2024, 02:30 PM",
    amount: 300,
    isCredited: true,  // Credit
  },
  {
    time: "06/10/2024, 08:00 AM",
    amount: 600,
    isCredited: true,  // Credit
  },
  {
    time: "07/10/2024, 03:00 PM",
    amount: 2000,
    isCredited: false, // Debit
  },
  {
    time: "08/10/2024, 05:30 PM",
    amount: 800,
    isCredited: false, // Debit
  }
]);
const totalCredits = ref(6831);

const chartData = ref({
    labels: [],
    datasets: [{
        label: 'Date wise Remaining Balance',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Smooth line
        borderWidth: 2,
        borderJoinStyle: 'round' // Makes the borders round
    }]
});

const chartOptions = ref({
    responsive: true,
    animation: {
        duration: 2000,
        easing: 'easeInOutQuad',
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'week'
            },
            title: {
                display: true,
                text: 'Date'
            },
            ticks: {
                source: 'data' // Ensure it uses the data for ticks
            }
        },
        y: {
            title: {
                display: true,
                text: 'Remaining balance (₹)'
            }
        }
    }
});

async function fetchDashboardData(){
    try{
        store.LoadingTrue();
        const response = await axios.get(`${api}/getAdminDashboard`,{
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
            case 200:
                // toast.add({
                //     severity: 'success',
                //     summary: 'Data Fetched!',
                //     detail: 'Data Fetched Successfully!',
                //     life: 3000
                // });
                sessionStorage.setItem('token',response.data.access_token);
                totalUsers.value=response.data.dashboardData.totalUsers;
                totalNashtas.value=response.data.dashboardData.totalFoods;
                remainingBalance.value=response.data.dashboardData.remainingBalance;
                totalExpense.value=response.data.dashboardData.totalExpenseAmount;
                expenseData.value=response.data.dashboardData.latestExpenses;
                totalCredits.value = response.data.dashboardData.totalCreditAmount;
                updateGraphData();
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
    } finally{
        store.LoadingFalse();
    }
}

function updateGraphData() {
    const dates = expenseData.value.map(exp => {
        const [datePart, timePart] = exp.time.split(', ');
        const [day, month, year] = datePart.split('/');
        const formattedDateString = `${month}/${day}/${year} ${timePart}`;
        const dateObject = new Date(formattedDateString + ' GMT+0530');
        return dateObject;
    });

    // Calculate the amounts (credit and debit)
    const amounts = expenseData.value.map(exp => (exp.isCredited ? exp.amount : -exp.amount));

    // Reverse the dates and amounts to display recent transactions first
    const reversedDates = dates.reverse();
    const reversedAmounts = amounts.reverse();
    
    let currentBalance = remainingBalance.value; // Replace this with your actual current balance

    reversedAmounts.forEach(amount => {
        currentBalance -= amount;
    });

    let reversedFinalAmounts = [];
    reversedAmounts.forEach(amount => {
        currentBalance += amount;
        reversedFinalAmounts.push(currentBalance);
    });

    // Format dates for the chart
    const formattedDates = reversedDates.map(date => {
        const isIST = date.getTimezoneOffset() === -330;
        if (!isIST) {
            const utcDate = new Date(date.getTime() + (330 * 60 * 1000));
            return utcDate.toISOString();
        }
        store.LoadingFalse();
        return date.toISOString();
    });

    // Update chart data with remaining balances
    chartData.value.labels = formattedDates;
    chartData.value.datasets[0].data = reversedFinalAmounts;
}

onMounted(() => {
    updateGraphData();
    // fetchDashboardData();
})
</script>

<style>
.card{
    margin: 10px 50px;
}
.main{
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 26px;
}
.chart-container{
    width: calc(50% - 13px);

}
.card-container{
    width: calc(50% - 13px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 26px;
}
@media screen and (max-width: 950px) {
    .main{
        flex-direction: column-reverse;
    }
    .main > *{
        width: 90%;
    }
}
@media screen and (max-width: 600px) {
    .card-container > *{
        width: 90% !important;
        margin: auto;
    }
}
.p-card{
    width: calc(50% - 13px);
}
.double{
    height: 100%;
}
.f-group{
    display: flex;
    align-items: center;
    gap: 15px;
}
i{
    font-size: 20px;
}
.i-group{
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgba(0, 128, 0, 0.288);
}
.i-group.large{
    width: 60px;
    height: 60px;
}
.t-group{
    width: calc(100% - 55px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>