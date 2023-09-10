import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Notes from '../views/Notes.vue'
import Note from '../views/Note.vue'
import AddNote from '../views/AddNote.vue'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [

    { path: '/login', component: SignIn },
    { path: '/register', component: SignUp },
    { path: '/', component: Notes, meta: { requiresAuth: true } },
    { path: '/notes', component: Notes, meta: { requiresAuth: true } },
    { path: '/note/:id', component: Note, meta: { requiresAuth: true } },
    { path: '/new', component: AddNote, meta: { requiresAuth: true } },

  ]

})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {

    if (!token) {

      next('/login');

    } else {

      next();

    }
  } else {

    next();

  }
});

export default router
