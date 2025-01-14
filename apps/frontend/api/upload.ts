export async function uploadFile(
  file: File
): Promise<{ data: string | null; success: boolean }> {
  try {
    const formData = new FormData();

    formData.append('file', file);

    const response = await useMyFetch('/upload', {
      method: 'POST',
      body: formData,
    });

    return response;
  } catch (err: unknown) {
    console.error('uploadFile error', err);
    return { data: null, success: false };
  }
}
