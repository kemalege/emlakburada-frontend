'use client'
import { paymentSchema, TPaymentSchema } from '@/lib/validations/payment';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from "js-cookie"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';

const userId = Cookies.get("userId");

interface Product {
    id: number;
    price?: number;
}

interface PaymentPageProps<T> {
    product: T;
    onSubmitPayment: (data: any) => Promise<any>;
}

export default function PaymentPage<T extends Product>({ product, onSubmitPayment }: PaymentPageProps<T>) {
    const { toast } = useToast();
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<TPaymentSchema>({
        resolver: zodResolver(paymentSchema),
      })

      async function onSubmit(data: TPaymentSchema) {
        await onSubmitPayment({
            paymentDetails: {
                cardNumber: data.cardNumber,
                expiryDate: data.cardExpiration,
                cvv: data.cvv,
            },
            packageId: product.id,
            userId: userId,
        })
        toast({
            title: "Ödeme Başarılı ",
            className: "bg-green-400 text-white",
            description: "İlanlarım sayfasına yönlendiriliyorsunuz.",
          })
         router.replace("/my-packets") 
      }
  
    return (
      <div className='mt-8'>
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Öde ve Bitir</h2>
  
              <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">İsim Soyisim (kart üzerindeki isim)* </label>
                      <input 
                        type="text" 
                        id="full_name" 
                        {...register('fullName')} 
                        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 ${errors.fullName ? 'border-red-500' : 'focus:border-primary-500 focus:ring-primary-500'} dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`} 
                        placeholder="İsim Soyisim" 
                      />
                      {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
                    </div>
  
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kart numarası* </label>
                      <input 
                        type="text" 
                        id="card-number-input" 
                        {...register('cardNumber')} 
                        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 ${errors.cardNumber ? 'border-red-500' : 'focus:border-primary-500 focus:ring-primary-500'} dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`} 
                        placeholder="xxxx-xxxx-xxxx-xxxx" 
                      />
                      {errors.cardNumber && <span className="text-red-500 text-sm">{errors.cardNumber.message}</span>}
                    </div>
  
                    <div>
                      <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Kart geçerlilik tarihi* </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                          <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input 
                          datepicker-format="mm/yy" 
                          id="card-expiration-input" 
                          {...register('cardExpiration')} 
                          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 ${errors.cardExpiration ? 'border-red-500' : 'focus:border-primary-500 focus:ring-primary-500'} dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`} 
                          placeholder="12/23" 
                        />
                        {errors.cardExpiration && <span className="text-red-500 text-sm">{errors.cardExpiration.message}</span>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                        CVV*
                        <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                          <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.017a1 1 0 1 0-1.996-.082 1 1 0 0 0 1.996.082ZM12 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-5a1 1 0 0 0-1-1Zm0 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" clip-rule="evenodd" />
                          </svg>
                          <span className="sr-only">Bilgi</span>
                        </button>
                        <div id="cvv-desc" role="tooltip" className="tooltip invisible absolute z-10 inline-block max-w-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 opacity-0 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          CVV Kodu kartın arkasındaki 3 haneli numaradır.
                          <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                      </label>
                      <input 
                        type="text" 
                        id="cvv-input" 
                        {...register('cvv')} 
                        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 ${errors.cvv ? 'border-red-500' : 'focus:border-primary-500 focus:ring-primary-500'} dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`} 
                        placeholder="CVV" 
                      />
                      {errors.cvv && <span className="text-red-500 text-sm">{errors.cvv.message}</span>}
                    </div>
                  </div>
  
                  <div className="mt-4 flex w-full">
                    <button type="submit" className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-lg">
                      Şimdi Öde
                    </button>
                  </div>
                </form>
                <div className="mt-6 grow sm:mt-8 lg:mt-0">
                    <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                        <div className="space-y-2">
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Fiyat</dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">{product.price} TL</dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                <dd className="text-base font-medium text-green-500">-0</dd>
                            </dl>
                        </div>
                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">Toplam</dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">{product.price} TL</dd>
                        </dl>
                    </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }