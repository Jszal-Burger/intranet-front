// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from "@/store/login";
import jwt_decode from "jwt-decode";
import { useNow } from '@vueuse/core'
import { timestamp } from '@vueuse/shared'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorView',
    meta: {
      requiresAuth: false,
      rolesAccess: [],
    },
    component: () => import('@/layouts/error/Error.vue'),
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    meta: {
      requiresAuth: false,
      rolesAccess: [],
    },
    component: () => import('@/layouts/error/Unauthorized.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAuth: false,
      rolesAccess: [],
    },
    component: () => import('@/layouts/login/Login.vue'),
  },
  {
    path: '/compte',
    meta: {
      requiresAuth: true,
      rolesAccess: ['ROLE_USER'],
    },
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: ':id',
        name: 'Compte',
        meta: {
          requiresAuth: true,
          rolesAccess: ['ROLE_USER'],
        },
        component: () => import('@/views/Account.vue'),
      },
    ],
  },
  {
    path: '/',
    meta: {
      requiresAuth: true,
      rolesAccess: ['ROLE_USER'],
    },
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Accueil',
        meta: {
          requiresAuth: true,
          rolesAccess: ['ROLE_USER'],
        },
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/crm',
    meta: {
      requiresAuth: true,
      rolesAccess: ['ROLE_USER'],
    },
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'agenda',
        name: 'Agenda',
        meta: {
          requiresAuth: true,
          rolesAccess: ['ROLE_USER'],
        },
        component: () => import('@/views/crm/Agenda.vue'),
      },
      {
        path: 'clients',
        name: 'Clients',
        meta: {
          requiresAuth: true,
          rolesAccess: ['ROLE_USER'],
        },
        component: () => import('@/views/crm/Clients.vue'),
      },
      {
        path: 'leads',
        name: 'Leads',
        meta: {
          requiresAuth: true,
          rolesAccess: ['ROLE_USER'],
        },
        component: () => import('@/views/crm/Leads.vue'),
      },
      {
        path: 'rapport-visite',
        name: 'Rapport visite',
        meta: {
          requiresAuth: true,
          rolesAccess: ['ROLE_USER'],
        },
        component: () => import('@/views/crm/RapportVisite.vue'),
      },
    ],
  },
  {
    path: '/production',
    meta: {
      requiresAuth: true,
      rolesAccess: ['ROLE_USER'],
    },
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'suivi-profeel',
        name: 'Suivi profeel',
        meta: {
          requiresAuth: true,
          rolesAccess: ['ROLE_USER'],
        },
        component: () => import('@/views/production/SuiviProfeel.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const isAuthenticated = () => {
  const loginStore = useLoginStore();
  if (loginStore.token != null && loginStore.token && loginStore.token != undefined) {
    const token = jwt_decode(loginStore.token)
    // console.log(token)
    if (token.exp * 1000 > timestamp()) {
      loginStore.addUser(token);
      return true
    } else {
      loginStore.$reset();
      return false
    }
  }

};

const isAllowed = (to) => {
  const loginStore = useLoginStore();
  if (to.rolesAccess  && to.rolesAccess.length > 0) {
    return to.rolesAccess.some((role) => loginStore.getRoles.includes(role));
  } else {
    return true
  }
};

router.beforeEach(async (to, from) => {
  // console.log(to)
  // console.log(from)

  // make sure the user is authenticated and avoid an infinite redirect ❗️
  if (isAuthenticated() && to.name == 'Login') {
    // redirect the user to the home page
    return { name: 'Accueil' }
  }
  
  // make sure the user is not authenticated and avoid an infinite redirect ❗️
  if (!isAuthenticated() && to.name !== 'Login') {
    // redirect the user to the login page
    return { name: 'Login' }
  }

  // make sure the user is allowed for the route and avoid an infinite redirect ❗️
  if (!isAllowed(to.meta) && to.name !== 'Unauthorized') {
    // redirect the user to the unauthorized page
    return { name: 'Unauthorized' }
  }
})

export default router
