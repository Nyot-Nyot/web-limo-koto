// Utility untuk upload file ke Cloudinary
export const uploadToCloudinary = async (file: File | null): Promise<string> => {
  if (!file) return '';
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'limokoto');
  const res = await fetch('https://api.cloudinary.com/v1_1/de7gk1as4/image/upload', {
    method: 'POST',
    body: data,
  });
  const json = await res.json();
  return json.secure_url;
}; 