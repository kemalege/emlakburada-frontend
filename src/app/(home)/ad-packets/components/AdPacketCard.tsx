"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AdPacket } from "@/types/api"
import MostPopularFrame from "./MostPopularFrame"
import { useRouter } from "next/navigation"

const mostPopularAdId = 2

export function AdPacketCard({adPacket}:{adPacket:AdPacket}) {
  const router = useRouter()

  const redirectToPayment = () => {
    console.log("Redirecting to payment page")
    router.push(`/ad-packets/${adPacket.id}/purchase`)
  }

  return (
    <MostPopularFrame isMostPopular={adPacket.id === mostPopularAdId}>
      <Card className="w-[350px] text-white p-6 rounded-lg shadow-lg">
        <CardHeader className="text-center text-gray-900 mb-4">
          <CardTitle className="text-2xl font-bold">Paket #{adPacket.id}</CardTitle>
          <CardDescription className="text-gray-500 text-md"><span className="font-bold text-xl">{adPacket.adCount}</span> ilan yayınlama hakkı</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 text-gray-500">
              <Label className="text-md">Fiyat: <span className="font-bold text-xl">{adPacket.price} TL</span></Label>
              <Label className="text-md">Geçerlilik Süresi: <span className="font-bold text-xl">{adPacket.validityDays}</span> gün</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4 mt-4">
          <Button className="bg-gray-800 text-white px-6 py-2 rounded-md shadow-md w-full" onClick={redirectToPayment}>Satın Al</Button>
          <div className="text-gray-400 text-sm">
            <p>• Paket hakları geçerliliği devam eden tanımlı patetlere eklenir </p>
          </div>
        </CardFooter>
      </Card>
    </MostPopularFrame>
  )
}
