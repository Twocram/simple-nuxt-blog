export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const token = window.localStorage.getItem('token');

    if (to.path !== '/auth/login' && to.path !== '/auth/register') {
      if (!token) {
        return navigateTo('/auth/login');
      }
    }

    if (to.path === '/auth/login' || to.path === '/auth/register') {
      if (token) {
        return navigateTo('/');
      }
    }
  }
});
