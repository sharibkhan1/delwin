import IconBackadminButton from "@/components/global/iconadminback";
import React, { ReactNode } from "react";

const LayoutPage = ({ children }: { children: ReactNode }) => {

  return (
    <div className="w-screen min-h-screen bg-[#e9e3dd] h-max flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full h-[100px] fixed top-0 left-0 z-10 bg-secondary shadow-md">
        <div className="max-w-7xl  mx-auto flex items-center justify-between h-full py-3 px-4">
          {/* Back Button */}
          
          <IconBackadminButton/>
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold">Project Detail</h1>

          {/* Placeholder for spacing or future actions */}
          <div className=" w-0 md:w-10" />
        </div>
      </div>

      {/* Content */}
      <div className=" mt-[40%] md:mt-28 relative max-w-7xl w-full">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60vw] h-[50vh] md:w-[70vw] md:h-[70vh] bg-gradient-to-t from-[#3d2e25] via-[#7a5e47] to-[#f7f4f1] rounded-full blur-3xl opacity-70"></div>

          {children}
          </div>
    </div>
  );
};

export default LayoutPage;
