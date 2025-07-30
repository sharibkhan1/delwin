// pages/404.tsx
"use client";

import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#f2f2f2] text-center px-4">
      {/* Icon */}
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="80"
          viewBox="0 0 24 24"
          width="80"
          fill="#5f6368"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M11 15h2v2h-2zm0-8h2v6h-2zm-9 4c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2 2 6.48 2 11zm18 0c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8 8 3.59 8 8z" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-medium text-[#5f6368] mb-2">Aw, Snap!</h1>

      {/* Description */}
      <p className="text-[#5f6368] mb-4 text-base max-w-md">
        Something went wrong while displaying this webpage. Error code: <strong>404</strong>
      </p>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => location.reload()}
          className="bg-white text-sm text-[#5f6368] border border-[#dadce0] px-4 py-2 rounded hover:bg-[#f1f3f4]"
        >
          Reload
        </button>
        <Link
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          className="bg-white text-sm text-[#5f6368] border border-[#dadce0] px-4 py-2 rounded hover:bg-[#f1f3f4]"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
