"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

const IconBackButton = () => {
    const router = useRouter();

  return (
    <div>
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => router.push("/home")}
          >
            <MoveLeftIcon className="w-8 h-8 text-primary-foreground" />
          </Button>
    </div>
  )
}

export default IconBackButton