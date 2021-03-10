import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter);

const Login = () => import(/* webpackChunkName: "Login" */ '@/components/Login');
const SignUp = () => import(/* webpackChunkName: "SignUp" */ '@/components/signUp/SignUp');
const AccountType = () => import(/* webpackChunkName: "AccountType" */ '@/components/signUp/AccountType');
const CompleteAccount = () => import(/* webpackChunkName: "CompleteAccount" */ '@/components/signUp/CompleteAccount');
const InfluencerSignUp = () => import(/* webpackChunkName: "InfluencerSignUp" */ '@/components/signUp/InfluencerSignUp');
const ForgotPassword = () => import(/* webpackChunkName: "ForgotPassword" */ '@/components/ForgotPassword');
const ResetPassword = () => import(/* webpackChunkName: "ResetPassword" */ '@/components/ResetPassword');
const Dashboard = () => import(/* webpackChunkName: "Dashboard" */ '@/components/Dashboard');
const FAQ = () => import(/* webpackChunkName: "FAQ" */ '@/components/FAQ');
const ContactUs = () => import(/* webpackChunkName: "ContactUs" */ '@/components/ContactUs');
const Blog = () => import(/* webpackChunkName: "Blog" */ '@/components/Blog');
const FindJobs = () => import(/* webpackChunkName: "FindJobs" */ '@/components/FindJobs');

import Landing from '../components/Landing'

const router= new VueRouter({
  routes: [
    { path: '/', component: Landing },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: false } },
    { path: '/login', component: Login },
    { path: '/signup', component: AccountType },
    { path: '/signup/:userType', component: SignUp },
    { path: '/signup/:userType/complete-account', component: CompleteAccount },
    { 
      path: '/influencer-signup',
      component: InfluencerSignUp,
      meta: { requiresAuth: true },
      children: [
        {
          name: 'signup-code',
          path: 'code',
          component: () => import('@/components/signUp/InfluencerCode')
        },
        {
          name: 'advertiser-connect-paypal',
          path: 'paypal',
          component: () => import('@/components/signUp/InfluencerPaypal')
        },
        {
          name: 'signup-interests',
          path: 'interests',
          component: () => import('@/components/signUp/InfluencerInterests')
        }
      ]
    },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/reset-password', component: ResetPassword, beforeEnter: (to, from, next) => {
        // if password reset key not found redirect to ForgotPassword component
        store.getters.passwordResetKey ? next() : next('/forgot-password');
    }},
    { path: '/contact-us', component: ContactUs },
    { path: '/faq', component: FAQ },
    { path: '/blog', component: Blog },
    { path: '/find-jobs', component: FindJobs, meta: { requiresAuth: true } }
  ]  
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    // refresh logic
    next('/login')
  } else {
    next()
  }
})

export default router