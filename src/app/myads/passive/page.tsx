import { AdCard } from "@/components/AdCard"
import { toast } from "@/components/ui/use-toast"

import apiFetch from "@/lib/api"
import { cookies } from "next/headers"

const cookieStore = cookies();

const fetchPassiveAds = async () => {
    const userId = cookieStore.get('userId')?.value;
    const result = await apiFetch(`/ads?userId=${userId}&adStatus=PASSIVE&page=0&size=4`, {
      method: 'GET',
    });
    if (result.status === 'SUCCESS') {
      return result
    } else {
      console.error('Error from server:', result.error);
      return toast({
        title: "Bir şeyler yanlış gitti.",
        variant: "destructive",
      });
    }
  }

export default async function PassiveAds() {

  const data = await fetchPassiveAds();
  // console.log(data);

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      {data.data.map((item:any) => (
        <AdCard key={item.id} adItem={item}/>
      ))}
    </div>
  );
}
