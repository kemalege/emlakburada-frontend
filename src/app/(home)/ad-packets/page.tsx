"use server";
import { cookies } from "next/headers";

import apiFetch from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { AdCard } from "@/components/AdCard";
import { Ad, AdListResponse, AdPacketList } from "@/types/api";
import { revalidateTag } from "next/cache";
import { AdStatus } from "@/types/enums";
import { AdPacketCard } from "./components/AdPacketCard";

const cookieStore = cookies();

const fetchAdPackets = async () => {
  const result = await apiFetch<AdPacketList>(`/packages`,
    {
      method: "GET",
    }
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
