import IconBackButton from "@/components/global/iconback";
import React, { ReactNode } from "react";

const LayoutPage = ({ children }: { children: ReactNode }) => {

  return (
    <div className="w-screen min-h-screen h-max flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full h-[100px] fixed top-0 left-0 z-50 bg-secondary shadow-md">
        <div className="max-w-7xl  mx-auto flex items-center justify-between h-full py-3 px-4">
          {/* Back Button */}
          
          <IconBackButton/>
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold">My Details</h1>

          {/* Placeholder for spacing or future actions */}
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mt-32 relative w-full">{children}</div>

    </div>
  );
};

export default LayoutPage;
