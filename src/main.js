import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import { createPinia } from 'pinia'

import App from './App.vue'
import admin from './admin.vue';
import front from './front.vue';
import login from './login.vue';
import adminDashboard from './adminDashboard.vue';
import dashboard from './dashboard.vue';
import choices from './choices.vue';
import userChoices from './userChoices.vue';
import pageNotFound from './pageNotFound.vue';
import addExpense from './addExpense.vue';
import Expense from './Expense.vue'
import addCredit from './addCredit.vue';
import users from './users.vue'
import Foods from './foods.vue'
import frontRegister from './frontRegister.vue';
import frontVerifyOTP from './frontVerifyOTP.vue';
import frontLogin from './frontLogin.vue';
import changePassword from './changePassword.vue';
import frontDashboard from './frontDashboard.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'',
            component:front,
            children:[
                {
                    path:'register',
                    component:frontRegister
                },
                {
                    path:'verifyotp/:id',
                    component:frontVerifyOTP
                },
                {
                    path:'login',
                    component:frontLogin
                },
                {
                    path:'changepassword',
                    component:changePassword
                },
                {
                    path:'dashboard',
                    component:frontDashboard
                },
            ]
        },
        {
            path:'/admin',
            component:admin,
            children:[
                {
                    path:'login',
                    component:login
                },
                {
                    path:'',
                    component:adminDashboard,
                    children:[
                        {
                            path:'dashboard',
                            component:dashboard
                        },
                        {
                            path:'expense',
                            component:Expense,
                        },
                        {
                            path:'expense/add',
                            component:addExpense
                        },
                        {
                            path:'expense/add-credit',
                            component:addCredit
                        },
                        {
                            path:'choices',
                            component:choices
                        },
                        {
                            path:'choices/userchoice',
                            component:userChoices
                        },
                        {
                            path:'users',
                            component:users
                        },
                        {
                            path:'nashta',
                            component:Foods
                        }
                    ]
                }
            ]
        },
        { 
            path: '/:pathMatch(.*)*',  
            component: pageNotFound
        }
    ],
  });

  // Router Guards for authentications
router.beforeEach((to, from, next) => {
    const frontendAuthentication = !!sessionStorage.getItem('FrontAuth');
    
    switch (true) {
      case to.path === '/admin' || to.path === '/admin/':
        next('/admin/dashboard');
        break;
    
      case to.path === '/admin/login' || to.path === '/admin/login/':
        next('/admin/dashboard');
        break;
    
      case to.path.startsWith('/admin/'):
        next();
        break;
    
      case to.path === '' || to.path === '/':
        next(frontendAuthentication ? '/dashboard' : '/login');
        break;   

      case to.path === '/login' || to.path === '/login/':
        next(frontendAuthentication ? '/dashboard' : undefined);
        break;

      case to.path === '/register' || to.path === '/register/'||to.path === '/changepassword'||to.path === '/changepassword/'||to.path.startsWith('/verifyotp'):
        next();
        break;

      case to.path.startsWith('/'):
        next(frontendAuthentication ? undefined : '/login');
        break;

      default:
        next();
    }
  });

  const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{orange.50}',
            100: '{orange.100}',
            200: '{orange.200}',
            300: '{orange.300}',
            400: '{orange.400}',
            500: '{orange.500}',
            600: '{orange.600}',
            700: '{orange.700}',
            800: '{orange.800}',
            900: '{orange.900}',
            950: '{orange.950}'
        }
    }
});

const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.dark',
        }
    }
});

app.mount('#app')

