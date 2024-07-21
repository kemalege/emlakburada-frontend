import * as React from "react";

export default function MostPopularFrame({
  children,
  isMostPopular,
}: {
  children: React.ReactNode;
  isMostPopular: boolean;
}) {
  return isMostPopular ? (
    <div className="relative border-2 border-gray-800 rounded-lg shadow-lg align-baseline">
      <div className="bg-gray-800 text-white text-center text-sm font-semibold">
        <p className="text-Mmd pb-2 pt-1">EN POPÜLER</p>
      </div>
      {children}
    </div>
  ) : (
    <>{children}</>
  );
}
