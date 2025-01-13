import type { User } from '~/types/user';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  function setUser(userInfo: User) {
    user.value = userInfo;
  }

  return {
    user,
    setUser,
  };
});
