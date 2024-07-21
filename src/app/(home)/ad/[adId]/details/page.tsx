"use server";
import apiFetch from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { AdDetails } from "@/types/api";
import AdDetail from "./components/AdDetails";

type Params = {
    adId: number;
};

const fetchAdDetails = async (id: number) => {
    
  const result = await apiFetch<AdDetails>(`/ads/${id}`, 
    {
      method: "GET",
      next: {
        revalidate: 0
      }
    },
  );
  if (result.status === "SUCCESS") {
    return result.data;
  } else {
    console.error("Error from server:", result.error);
    toast({
      title: "Bir şeyler yanlış gitti.",
      variant: "destructive",
    });
  }
};


export default async function AdPackets({params}:{params:Params}) {
    const data = await fetchAdDetails(params.adId);

  return (
    <div className="container flex h-screen w-full flex-row items-center justify-center gap-4">
      {data && <AdDetail ad={data}/>}
    </div>
  );
}
