import type { User } from '~/types/user';

export async function getAccount(): Promise<{
  data: User | null;
  success: boolean;
}> {
  try {
    const token = window.localStorage.getItem('token');
    const response = (await useMyFetch('/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })) as unknown as { data: User; sucess: boolean };

    return { data: response.data, success: true };
  } catch (err: unknown) {
    console.error('getAccount error', err);
    return { data: null, success: false };
  }
}
