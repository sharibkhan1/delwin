import IconBackButton from "@/components/global/iconback";
import React, { ReactNode } from "react";

const LayoutPage = ({ children }: { children: ReactNode }) => {

  return (
    <div className="w-screen max-h-screen bg-[#dbcec1] h-full flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full h-[100px] fixed top-0 left-0 z-10 bg-secondary shadow-md">
        <div className="max-w-7xl  mx-auto flex items-center justify-between h-full py-3 px-4">
          {/* Back Button */}
          
          <IconBackButton/>
          {/* Page Title */}
          <h1 className=" text-3xl md:text-4xl font-semibold">Portfolio Details</h1>

          {/* Placeholder for spacing or future actions */}
          <div className=" w-0 md:w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl bg-[#e9e3dd] mt-[40%] md:mt-28 border-2 shadow-lg shadow-black/50 border-black/80 rounded-2xl relative w-full">
          {children}
          </div>
    </div>
  );
};

export default LayoutPage;
