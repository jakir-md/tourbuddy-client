import { serverFetch } from "@/lib/server-fetch";

export const uploadImage = async (file: File): Promise<string> => {
  console.log("file from upload", file);
  const formData = new FormData();
  formData.append("file", file);
  console.log("get from formdata", formData.get("file"));
  const res = await serverFetch.post(`/trip/upload-image`, {
    body: formData,
  });
  const data = await res.json();
  return data.data;
};