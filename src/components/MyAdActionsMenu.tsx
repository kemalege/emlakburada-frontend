"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { CustomAlertDialog } from "./CustomAlertDialog";
import { cn } from "@/lib/utils";
import { Ad } from "@/types/api";
import { AdStatus } from "@/types/enums";

export function MyAdActionsMenu({ adItem, deleteAd }: { adItem: Ad, deleteAd: (id: string) => void }) {
  
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>İşlemler</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href={"/"}>Düzenle</Link>
            <MenubarShortcut></MenubarShortcut>
          </MenubarItem>
          <div
            className={cn(
              "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            )}
          >
            <CustomAlertDialog
              buttonLabel="İlanı sil"
              title="İlanı sil"
              message="İlanı silmek istediğinize emin misiniz?"
              action={() => deleteAd(adItem.id)}
            />
          </div>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />

          <MenubarSeparator />
          {adItem.adStatus === AdStatus.PASSIVE && <MenubarItem>Yayına Al</MenubarItem>}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
