"use server";
import { cookies } from "next/headers"

import apiFetch from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import { AdCard } from "@/components/AdCard"
import { Ad, AdListResponse } from "@/types/api";
import { revalidateTag } from "next/cache";
import { PaginationComponent } from "@/components/Pagination";
import { DataTable } from "@/components/DataTable";


const fetchAllAdsPagination = async (page: number, size: number) => {
  const result = await apiFetch<AdListResponse>(`/ads?&adStatus=ACTIVE&page=${page-1}&size=${size}`,{
    next: {
      tags: [
        'myads'
      ],
      revalidate: 360,
    },
    method: 'GET',
  } );
  if (result.status === 'SUCCESS') {

    const { data, totalRecords } = result;

    const pageCount = totalRecords && Math.ceil(totalRecords / size)

    return {pageCount, data: data}

  } else {
    console.error('Error from server:', result.error);
    toast({
      title: "Bir şeyler yanlış gitti.",
      variant: "destructive",
    });
  }
}

export default async function MyPackets() {

  return (
    <div className="flex container h-screen flex-col items-center justify-between p-24">
      <DataTable />
    </div>
  );
}
