"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { MyAdActionsMenu } from "./MyAdActionsMenu";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Ad } from "@/types/api";
import { Button } from "./ui/button";
import { AdStatus } from "@/types/enums";
import { revalidateTag } from "next/cache";
import { CustomAlertDialog } from "./CustomAlertDialog";
import Link from "next/link";

export function AdCard({
  editable = false,
  adItem,
  updateAdStatus = () => {},
  deleteAd = () => {},
}: {
  editable?: boolean;
  adItem: Ad;
  updateAdStatus?: (tag: string) => void;
  deleteAd?: (tag: string) => void;
}) {

  return (
    <Card
      key={adItem.id}
      className="w-[768px] mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 flex items-center"
    >
      <Image
        src={adItem.imageUrl || "/no-image.png"}
        alt={adItem.title}
        width={120}
        height={80}
        className="rounded-md object-cover"
      />
      <nav className="ml-4 flex-1">
        <CardHeader className="p-0">
          <Link href={`ad/${adItem.id}/details`} >
            <CardTitle className="text-md font-medium text-blue-700 hover:underline">
              {adItem.title}
            </CardTitle>
          </Link>
          <div className="text-sm text-gray-500">
            <div>{adItem.details}</div>
            <div className="mt-2">{adItem.location}</div>
            <div className="mt-2">
              Son Yayınlanma Tarihi: {formatDate(adItem.createDate)}
            </div>
          </div>
        </CardHeader>
      </nav>
      <div className="ml-4 text-right" >
        <div className="text-red-500 text-sm">
          {adItem.price} TL
        </div>
        {editable && <CardFooter className="flex justify-end mt-4">
          {adItem.adStatus === AdStatus.PASSIVE && (
            <CustomAlertDialog
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              buttonLabel="Yayına Al"
              title="İlanı Yayına"
              message="İlanı yayınlamak almak istediğinizden emin misiniz"
              action={() => updateAdStatus(adItem.id)}
            ></CustomAlertDialog>
          )}
          <MyAdActionsMenu adItem={adItem} deleteAd={deleteAd} />
        </CardFooter>}
      </div>
    </Card>
  );
}
