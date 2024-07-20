"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
  
  export function PaginationComponent({pageCount}:{pageCount:number}) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, String(value));
  
      return params.toString();
    },
    [searchParams]
  );

  const handleSelectChange = (currentIndex: number) => {
    router.push(`${pathname}?${createQueryString("page", currentIndex)}`);
  };

  const getCurrentPage = () => {
    const page = parseInt(searchParams.get("page") || "0");
    if (isNaN(page)) {
      return 1;
    }
    return page;
  };

  const getNextPage = () => {
    const currentPage = getCurrentPage();
    return currentPage + 1 > pageCount ? pageCount : currentPage + 1;
  };

  const getPrevPage = () => {
    const currentPage = getCurrentPage();
    return currentPage - 1 < 1 ? 1 : currentPage - 1;
  };

  const handleNextButtonClick = () => {
    router.push(`${pathname}?${createQueryString("page", getNextPage())}`);
  };

  const handlePrevButtonClick = () => {
    router.push(`${pathname}?${createQueryString("page", getPrevPage())}`);
  };
  
    return (
        <Pagination className="flex items-center justify-center space-x-2">
        <PaginationContent className="flex items-center space-x-2">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePrevButtonClick}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>
          
          {new Array(pageCount).fill(0).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => handleSelectChange(index + 1)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
    
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNextButtonClick}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  