export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const token = localStorage.getItem('token');
    if (!token && to.path !== '/auth/login' && to.path !== '/auth/register') {
      return navigateTo('/auth/login');
    }
  }
});
