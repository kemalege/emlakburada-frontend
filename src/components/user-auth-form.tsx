"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { TuserAuthSchema, userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import apiFetch from "@/lib/api"
import { User } from "@/types/api"
import { Icons } from "./ui/icons"
import { useUser } from "@/app/context/UserContext"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}



export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TuserAuthSchema>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [checkUserExist, setCheckUserExist] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  const router = useRouter()
  const user = useUser()

  async function onSubmit(data: TuserAuthSchema) {
    setIsLoading(true)

    // const signInResult = await signIn("email", {
    //   email: data.email.toLowerCase(),
    //   redirect: false,
    //   callbackUrl: searchParams?.get("from") || "/dashboard",
    // })

    const result = await apiFetch<User>('/users/email', {
      method: 'POST',
      body: { email: data.email.toLowerCase() },
    });
  
    const { status, data: responseData, error } = result;

    console.log(result)
  
    if (status === 'SUCCESS') {
      const { id, name, email } = responseData;
      setCheckUserExist(true);
      // console.log(`User ${name} with email ${email} found with id ${id}`);
      user.setUser({ name });
      Cookies.set('authenticated', 'true');
      Cookies.set('userId', id.toString());
      router.push('/my-ads');
    } else {
      console.error('Error from server:', error);
      setError('email', {
        type: 'manual',
        message: error?.message,
      });
      setIsLoading(false);
      return toast({
        title: "Bir şeyler yanlış gitti.",
        description: "Giriş isteği başarısız oldu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
    setIsLoading(false);

  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="E-posta adresinizi giriniz"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            E-posta ile giriş yap
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            veya devam et
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true)
          signIn("github")
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  )
}