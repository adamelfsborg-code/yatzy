"use client"

import CustomNavbar from "@/components/CustomNavbar";
import { NextUIProvider } from "@nextui-org/react";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Page = (props: PageProps) => {
  return (
    <NextUIProvider>
      <h4>Hello</h4>
    </NextUIProvider>
  );
}

export default Page;