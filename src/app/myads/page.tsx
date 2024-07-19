import { cookies } from "next/headers"

import apiFetch from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import { AdCard } from "@/components/AdCard"
import { Ad, AdListResponse } from "@/types/api";

const cookieStore = cookies();

const fetchActiveAds = async () => {
  const userId = cookieStore.get('userId')?.value;
  const result = await apiFetch<AdListResponse>(`/ads?userId=${userId}&adStatus=ACTIVE&page=0&size=4`, {
    method: 'GET',
  });
  if (result.status === 'SUCCESS') {
    return result.data
  } else {
    console.error('Error from server:', result.error);
    toast({
      title: "Bir şeyler yanlış gitti.",
      variant: "destructive",
    });
  }
}

export default async function MyAds() {

  const data = await fetchActiveAds();
  // console.log(data);

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      {data?.map((item:Ad) => (
        <AdCard key={item.id} adItem={item}/>
      ))}
    </div>
  );
}
