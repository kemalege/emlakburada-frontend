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
import { UserPacket } from "@/types/api"
import { formatDate } from "@/lib/utils"
import { useRouter } from "next/navigation"


export function MyPacketCard({userPacket}:{userPacket: UserPacket}) {

  const router = useRouter()

  return (
      <Card className="w-[350px] text-white p-6 rounded-lg shadow-lg">
        <CardHeader className="text-center text-gray-900 mb-4">
          <CardTitle className="text-2xl font-bold">Kalan kullanımlarım</CardTitle>
          <CardDescription className="text-gray-500 text-md"><span className="font-bold text-xl">{userPacket.remainingCount}</span> ilan yayınlama hakkı</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 text-gray-500">
              <Label className="text-md">Geçerlilik Tarihi: <span className="font-bold text-xl">{formatDate(userPacket.expiryDate)}</span></Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4 mt-4">
          <Button className="bg-gray-800 text-white px-6 py-2 rounded-md shadow-md w-full" onClick={()=> router.push(`/ad-packets`)} >Ek paket al</Button>
        </CardFooter>
      </Card>
  )
}
