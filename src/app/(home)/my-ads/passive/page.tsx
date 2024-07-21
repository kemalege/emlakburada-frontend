"use server";
import { AdCard } from "@/components/AdCard";
import { toast } from "@/components/ui/use-toast";

import apiFetch from "@/lib/api";
import { AdListResponse } from "@/types/api";
import { AdStatus } from "@/types/enums";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const cookieStore = cookies();

const customRevalidateTag = (tag: string) => {
    "use server";
    revalidateTag(tag);
  };

const fetchPassiveAds = async () => {
  const userId = cookieStore.get("userId")?.value;
  const result = await apiFetch<AdListResponse>(
    `/ads?userId=${userId}&adStatus=PASSIVE&page=0&size=10`,
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
    customRevalidateTag("myads");
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}


async function updateAdStatusToActive(id: string) {
    "use server";
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/ads/${id}/status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adStatus: AdStatus.ACTIVE }),
      }
    );

    customRevalidateTag("myads");
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export default async function PassiveAds() {
  const data = await fetchPassiveAds();
  // console.log(data);

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      {data?.map((item) => (
        <AdCard
          key={item.id}
          adItem={item}
          editable={true}
          deleteAd={deleteAd}
          updateAdStatus={updateAdStatusToActive}
        />
      ))}
    </div>
  );
}
