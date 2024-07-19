import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MyAdActionsMenu } from "./MyAdActionsMenu";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export function AdCard({ adItem }: { adItem: any }) {
  return (
    <Card
      key={adItem.id}
      className="w-full mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 flex items-center"
    >
      <Image
        src={adItem.image || "/no-image.png"}
        alt={adItem.title}
        width={120}
        height={80}
        className="rounded-md object-cover"
      />
      <div className="ml-4 flex-1">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-semibold text-blue-700">
            {adItem.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            <div>{adItem.description}</div>
            <div className="mt-2">{adItem.location}</div>
            <div className="mt-2">
              Son Yayınlanma Tarihi: {formatDate(adItem.createDate)}
            </div>
            <div className="mt-2">
              Yayından Kalktığı Tarih: {adItem.removedDate}
            </div>
          </CardDescription>
        </CardHeader>
      </div>
      <div className="ml-4 text-right">
        <div className="text-red-500 text-xl font-semibold">{adItem.price}</div>
        <CardFooter className="flex justify-end mt-4">
          {adItem.adStatus === "PASSIVE" && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
              Yayına Al
            </button>
          )}
          <MyAdActionsMenu />
        </CardFooter>
      </div>
    </Card>
  );
}
