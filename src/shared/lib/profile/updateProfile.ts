import Fetch from "@/shared/lib/Fetch";

export interface IUpdateProfilePayload {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;
  birthday: string;
  bio: string;
  profile_image: File | null;
}

export async function updateProfile(
  data: IUpdateProfilePayload
): Promise<IUpdateProfilePayload> {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const response = await Fetch<IUpdateProfilePayload>({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`,
    body: formData,
    multipart: true,
  });

  return response;
}
