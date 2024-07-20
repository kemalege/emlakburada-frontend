"use client";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { CustomAlertDialog } from "./CustomAlertDialog";
import { cn } from "@/lib/utils";

export function MyAdActionsMenu({ adId, deleteAd }: { adId: string, deleteAd: (id: string) => void }) {
  
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
              action={() => deleteAd(adId)}
            />
          </div>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />

          <MenubarSeparator />
          <MenubarItem>Yayina Al</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
