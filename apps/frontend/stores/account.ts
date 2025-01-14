import type { User } from '~/types/user';

export const useAccountStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  function setUser(userInfo: User) {
    user.value = userInfo;
  }

  function logout() {
    user.value = null;
    window.localStorage.removeItem('token');

    navigateTo('/auth/login');
  }

  return {
    user,
    setUser,
    logout,
  };
});
