"use server";
import { cookies } from "next/headers"

import apiFetch from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import { AdCard } from "@/components/AdCard"
import { Ad, AdListResponse } from "@/types/api";
import { revalidateTag } from "next/cache";
import { PaginationComponent } from "@/components/Pagination";

interface SearchParams {
  page: string;
  size: string;
}

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

function parsePageFromSearchParams(searchParams: SearchParams): number {
  if (!searchParams.hasOwnProperty('page')) {
    return 1;
  }
  const parsedPage = parseInt(searchParams["page"]);
  return Math.max(parsedPage, 1);
}

function parseSizeFromSearchParams(searchParams: SearchParams) {
  if (!searchParams["size"]) {
    return 4;
  }
  const parsedSize = parseInt(searchParams["size"]);
  return Math.max(parsedSize, 4);
}

export default async function Home({searchParams}:{searchParams:SearchParams}) {

  const page = parsePageFromSearchParams(searchParams);
  // console.log(page)
  const size = parseSizeFromSearchParams(searchParams);


  const result = await fetchAllAdsPagination(page, size);
  const pageCount = result?.pageCount ?? 1;
  const data = result?.data;

  return (
    <div className="flex container h-screen flex-col items-center justify-between p-24">
      <div>
        {data?.map((item:Ad) => (
          <AdCard key={item.id} adItem={item}/>
        ))}
      </div>
      <PaginationComponent pageCount={pageCount} />
    </div>
  );
}
