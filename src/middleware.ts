import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const verify = req.cookies.get("authenticated")?.value === "true";

  const url = req.url;

    // if (!verify){
    //     return NextResponse.redirect(
    //         new URL('/login', req.url)
    //     )
    // }

    if (!verify && (url.includes('/my-ads') || url.includes('/my-packets') || url.includes('/create-ad'))){
      return NextResponse.redirect("http://localhost:3000/login");
    }
  
    // if (verify && url === "http://localhost:3000/") {
    //   return NextResponse.redirect("http://localhost:3000/dashboard");

    // // return NextResponse.next()
    
    // }
}
