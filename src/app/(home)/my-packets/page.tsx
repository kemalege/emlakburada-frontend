"use server";
import { cookies } from "next/headers"

import apiFetch from "@/lib/api"
import { AdListResponse } from "@/types/api";
import { PaginationComponent } from "@/components/Pagination";
import { GenericTable } from "@/components/GenericTable";
import { purchaseHistoryColumns } from "./columnDef/PurchaseHistory";
import { MyPacketCard } from "./components/UserPacketInformationCard";

const cookieStore = cookies();

const fetchPurchasedPackets = async () => {
  const userId = cookieStore.get("userId")?.value;

  const result = await apiFetch<any>(`/pay/list/user/${userId}`,{
    next: {
      tags: [
        'my-packets'
      ],
    },
    method: 'GET',
  } );
  if (result.status === 'SUCCESS') {
    return result.data;
  } else {
    console.error('Error from server:', result.error);
  }
}

const fetchUserPacket = async () => {
  const userId = cookieStore.get("userId")?.value;

  const result = await apiFetch<any>(`/packages/user/${userId}`,{
    next: {
      tags: [
        'my-packets'
      ],
    },
    method: 'GET',
  } );
  if (result.status === 'SUCCESS') {
    return result.data[0];
  } else {
    console.error('Error from server:', result.error);
  }
}

export default async function MyPackets() {

  const purchasedPackets = await fetchPurchasedPackets()
  const userPacket = await fetchUserPacket()

  return (
    <div className="flex container h-screen flex-col items-center justify-between p-24 gap-4">
      {userPacket ? <MyPacketCard userPacket={userPacket}/> : <div className="w-full text-center">Aktif bir paketiniz yoktur.</div>} 
      <div className="w-full text-left">
        <h1 className="text-start text-xl text-gray-600 font-semibold">Satın Alma Geçmişi</h1>
      </div>
      <div className="flex align-top w-full h-full">
        <GenericTable data={purchasedPackets} columns={purchaseHistoryColumns} />
      </div>
    </div>
  );
}
