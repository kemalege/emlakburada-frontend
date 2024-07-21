"use server";
import apiFetch from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { AdPacketList } from "@/types/api";
import { AdPacketCard } from "./components/AdPacketCard";


const fetchAdPackets = async () => {
  const result = await apiFetch<AdPacketList>(`/packages`, 
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


export default async function AdPackets() {
  const data = await fetchAdPackets();

  return (
    <div className="container flex h-screen w-full flex-row items-center justify-center gap-4">
      {data?.map((item) => (
        <AdPacketCard key={item.id} adPacket={item}
        />
      ))}
    </div>
  );
}
