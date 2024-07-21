import * as z from "zod"

export const paymentSchema = z.object({
    fullName: z.string().min(1, { message: "İsim soyisim gerekli." }),
    cardNumber: z.string().min(12, 'Geçerli bir kart numarası girin'),
    cardExpiration: z.string().min(1, { message: 'Kart geçerlilik tarihi gerekli'}),
    cvv: z.string().length(3, 'CVV kodu 3 karakter olmalı'),
  });

export const adFormSchema = z.object({
    location: z.string().min(1, { message: "Lokasyon gerekli." }),
    title: z.string().min(1, { message: "Başlık gerekli." }),
    price: z.string().min(1, { message: "Geçerli bir fiyat girin." }),
    details: z.string().min(1, { message: "Detaylar gerekli." }),
    category: z.string().min(0, { message: "Kategori gerekli." }),
});


export const userAuthSchema = z.object({
  email: z.string().min(1, { message: "E-posta adresinizi girin." }) ,
  
})

export type TuserAuthSchema = z.infer<typeof userAuthSchema>

export type TPaymentSchema = z.infer<typeof paymentSchema>

export type TAdFormSchema = z.infer<typeof adFormSchema>;
