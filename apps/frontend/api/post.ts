import type { Post } from '~/types/post';

export async function createPost(
  data: Omit<Post, 'id'>
): Promise<{ data: Post | null; success: boolean }> {
  try {
    const token = import.meta.client
      ? window.localStorage.getItem('token')
      : null;
    const response = await useMyFetch('/post', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err: unknown) {
    console.error('createPost error', err);
    return { data: null, success: false };
  }
}

export async function getPosts(): Promise<{
  data: Omit<Post, 'userId'>[] | null;
  success: false;
}> {
  try {
    const token = import.meta.client
      ? window.localStorage.getItem('token')
      : null;
    const response = await useMyFetch('/post', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err: unknown) {
    console.error('getPosts error', err);
    return { data: null, success: false };
  }
}
