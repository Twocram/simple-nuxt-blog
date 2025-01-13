export default defineNuxtRouteMiddleware(async (to) => {
  const token = import.meta.client
    ? window.localStorage.getItem('token')
    : null;

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
});
