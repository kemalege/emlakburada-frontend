import PaymentPage from '@/components/PaymentPage';
import apiFetch from '@/lib/api';
import { TPaymentSchema } from '@/lib/validations/payment';
import { AdPacket, PaymentDetails } from '@/types/api';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import React from 'react'

interface pageParams {
    packageId: number;
}

interface PurchasePackageRequest {
    userId: number;
    packageId: number;
    paymentDetails: {
        cardNumber: string;
        expiryDate: string;
        cvv: number;
    };
}

const fetchAdPackage = async (packageId: number) => {
    const result = await apiFetch<AdPacket>(`/packages/${packageId}`,{
      method: 'GET',
    } );
    if (result.status === 'SUCCESS') {
        return result.data;
    } else {
      console.error('Error from server:', result.error);
    }
  }

  const purchasePacket = async (data: PurchasePackageRequest) => {
    'use server'
    const result = await apiFetch(`/packages`,{
      method: 'POST',
      body: {
        packageId: data.packageId,
        userId: data.userId,
        paymentDetails: data.paymentDetails,
      }
    } );
    revalidateTag('my-packets');
  }

export default async function PurschasePacketPage({params}: {params: pageParams}) {
    
    const data = await fetchAdPackage(params.packageId);

    return (
        data && <PaymentPage<AdPacket> product={data} onSubmitPayment={purchasePacket} />
    )
}