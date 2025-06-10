"use client"
import React from 'react'
import { MoveRightIcon } from "lucide-react"
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { cards } from '@/lib/cardse'

const SmService = () => {
  const router = useRouter()

  return (
    <section className="px-4 py-8 md:hidden">
      <div className="text-center mb-10">
        <h1 className="volkhov-bold text-4xl font-bold text-foreground">
          Our <span className="text-primary/50">Projects</span>
        </h1>
      </div>

      <div className="grid gap-6">
        {cards.map((card, index) => (
          <div 
            key={index}
            className={`rounded-xl overflow-hidden shadow-lg ${
              index % 2 === 0 ? 'bg-secondary' : 'bg-popover'
            }`}
          >
            <div className="relative aspect-video">
              <img
                src={`${card.src}?w=600&q=70`}
                alt={card.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h2 className="absolute bg-primary rounded-lg px-4 bottom-4 left-4 text-2xl font-bold text-primary-foreground">
                {card.title}
              </h2>
            </div>

            <div className="p-6">
              <p className={`mb-4 text-lg ${
                index % 2 === 0 ? 'text-secondary-foreground' : 'text-popover-foreground'
              }`}>
                {card.copy}
              </p>
              
              <Button
                variant="link"
                onClick={() => router.push(card.link)}
                className={`p-0 text-lg font-semibold flex items-center gap-2 ${
                  index % 2 === 0 ? 'text-secondary-foreground/80 hover:text-secondary-foreground' 
                                 : 'text-popover-foreground/80 hover:text-popover-foreground'
                }`}
              >
                Explore project
                <MoveRightIcon size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SmService