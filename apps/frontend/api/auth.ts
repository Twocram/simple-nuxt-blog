type LoginData = {
  email: string;
  password: string;
};

export async function login(
  loginData: LoginData
): Promise<{ data: string | null }> {
  try {
    const response: { data: string } = await useMyFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });

    return { data: response.data };
  } catch (err: unknown) {
    console.error('login error', err);
    return { data: null };
  }
}
export async function register(data: LoginData) {
  try {
    const response = await useMyFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return { data: response.data };
  } catch (err: unknown) {
    console.error('register error', err);
    return { data: null };
  }
}
