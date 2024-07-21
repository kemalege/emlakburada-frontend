"use server";
import { cookies } from "next/headers";

import apiFetch from "@/lib/api";
import { toast } from "@/components/ui/use-toast"
import { AdListResponse } from "@/types/api";
import { NewAdForm } from "./components/NewAdForm";
import { TAdFormSchema } from "@/lib/validations/payment";

const cookieStore = cookies();

const createNewAd = async (data: TAdFormSchema) => {
    'use server'
  const userId = cookieStore.get("userId")?.value;
  const send = {...data, userId: userId}
  console.log(send, 'send')
  const result = await apiFetch(
    `/ads`,
    {
      method: "POST",
      body: send,
    }
    
  );
  return result
};

export default async function CreateAd() {

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
        <NewAdForm createNewAd={createNewAd} />
    </div>
  );
}
