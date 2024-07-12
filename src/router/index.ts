import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import CreateEvent from '@/components/CreateEvent.vue';
import EventList from '@/components/EventList.vue';
import UploadDocument from '@/components/UploadDocument.vue';
import DocumentList from '@/components/DocumentList.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/register' },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/create-event', component: CreateEvent },
  { path: '/events', component: EventList },
  { path: '/upload-document', component: UploadDocument },
  { path: '/documents', component: DocumentList },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
