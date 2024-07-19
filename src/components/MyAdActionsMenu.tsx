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
  } from "@/components/ui/menubar"
import Link from "next/link"
  
  export function MyAdActionsMenu() {
    return (
        <Menubar>
         <MenubarMenu>
          <MenubarTrigger>İşlemler</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
                <Link href={'/'}>Düzenle</Link>
               <MenubarShortcut></MenubarShortcut>
            </MenubarItem>
            <MenubarItem color="red">
              İlanı Sil 
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
           
            <MenubarSeparator />
            <MenubarItem>
              Yayina Al
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
        
    )
  }
  