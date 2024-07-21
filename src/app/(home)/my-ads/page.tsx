"use server";
import { cookies } from "next/headers";

import apiFetch from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { AdCard } from "@/components/AdCard";
import { Ad, AdListResponse } from "@/types/api";
import { revalidateTag } from "next/cache";

const cookieStore = cookies();

const customRevalidateTag = (tag: string) => {
  "use server";
  revalidateTag(tag);
};

const fetchActiveAds = async () => {
  const userId = cookieStore.get("userId")?.value;
  const result = await apiFetch<AdListResponse>(
    `/ads?userId=${userId}&adStatus=ACTIVE&page=0&size=4`,
    {
      next: {
        tags: ["myads"],
      },
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

async function deleteAd(id: string) {
  "use server";
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/ads/${id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    revalidateTag("myads");
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export default async function MyAds() {
  const data = await fetchActiveAds();
  // console.log(data);

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      {data?.map((item: Ad) => (
        <AdCard
          key={item.id}
          adItem={item}
          editable={true}
          deleteAd={deleteAd}
        />
      ))}
    </div>
  );
}
