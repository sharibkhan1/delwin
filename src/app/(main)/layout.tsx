import React, { ReactNode } from "react";

const LayoutPage = ({ children }: { children: ReactNode }) => {

  return (
    <div className="w-screen max-h-screen bg-background min-h-screen justify-center flex flex-col items-center">

      {/* Content */}
      <div className="max-w-7xl bg-muted  border-2 shadow-lg shadow-black/50 border-black/80 rounded-2xl relative w-full">
          {children}
          </div>
    </div>
  );
};

export default LayoutPage;
