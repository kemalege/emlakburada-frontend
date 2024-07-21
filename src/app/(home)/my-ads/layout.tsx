import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex container flex-row mt-24 ">
      <nav>
        <div className="w-64 bg-white shadow-md rounded-lg mr-6">
          {/* <div className="px-4 py-2 border-b">
            <h2 className="text-lg font-semibold">Özet</h2>
          </div> */}
          <div className="px-4 py-2 bg-blue-100 border-b">
            <h2 className="text-lg font-semibold text-blue-700">İlanlar</h2>
          </div>
          <div className="px-4 py-2 border-b">
            <div className="flex justify-between items-center">
              <Link href="/my-ads">Yayında olan ilanlar</Link>
              <span className="text-sm text-gray-500"></span>
            </div>
          </div>
          <div className="px-4 py-2">
            <div className="flex justify-between items-center">
              <Link href="/my-ads/passive">Eski ilanlar</Link>
              <span className="text-sm text-gray-500"></span>
            </div>
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
}
