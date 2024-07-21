'use client'
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { adFormSchema, TAdFormSchema } from "@/lib/validations/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  { value: "emlak", label: "Emlak" },
  { value: "vasita", label: "Vasıta" },
  { value: "yedekparca", label: "Yedek parça" },
];

export interface AdFormData {
    userId: number;
    location: string;
    title: string;
    price: number;
    details: string;
    category: string;
}

export function NewAdForm({ createNewAd }: { createNewAd: (data: TAdFormSchema) => Promise<any> }) {
    const form = useForm<TAdFormSchema>({
      resolver: zodResolver(adFormSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = form;

    const { toast } = useToast()
    const router = useRouter()
  
    async function onSubmit(data: TAdFormSchema) {
      console.log(data);
      const response = await createNewAd(data);

      if (response.status !== "FAILED") {
        toast({
          title: "İlan oluşturma başarılı",
          description: "İlanınız onaylanmak üzere incelemeye alınmıştır",
          className: "bg-green-300 text-white",
        });

        router.replace('/my-ads');
        
      } else {
        console.log("Error from server:", response.message);
        toast({
            title: response.message,
            description: "İlan oluşturmak için ek paket satın alabilirsiniz",
            action: <ToastAction altText="Ek paketler">
                <Link href={'/ad-packets'}>Ek paketler</Link>
            </ToastAction>,
            variant: "destructive",
            className: "bg-red-700 text-white",
          });
      }
    }
  
    return (
      <Form {...form}>
        <Card className="w-[350px] mt-24">
            <CardHeader>
            <CardTitle>İlan Oluştur</CardTitle>
            <CardDescription>İlan oluştur</CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Başlık</Label>
                    <Input id="title" {...register('title')} />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Fiyat</Label>
                    <Input id="price" {...register('price')} />
                    {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="city">Şehir</Label>
                    <Input id="city" {...register('location')} />
                    {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Kategori Seç" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.value} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                        />
                    {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                    id="description"
                    placeholder="Açıklama giriniz"
                    {...register('details')}
                    />
                    {errors.details && <span className="text-red-500 text-sm">{errors.details.message}</span>}
                </div>
                </div>
                <CardFooter className="mt-4 p-0">
                <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-lg"
                >
                    Onayla
                </button>
                </CardFooter>
            </form>
            </CardContent>
        </Card>
      </Form>

    );
  }