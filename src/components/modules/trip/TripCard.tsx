'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Interface matching your Prisma Schema
interface TripCardProps {
  trip: {
    id: string
    destination: string
    startDate: string | Date
    endDate: string | Date
    budget: number
    type: string
    image: string
    host: {
      name: string
      image?: string | null
      isVerified: boolean
    }
  }
}

export function TripCard({ trip }: TripCardProps) {
  // Format Date (e.g., "12 Oct - 18 Oct")
  const formatDate = (date: string | Date) => new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })

  return (
    <Link href={`/trips/${trip.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-primary/20 flex flex-col">
        
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img 
            src={trip.image} 
            alt={trip.destination} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-3 right-3 bg-white/90 text-slate-900 hover:bg-white font-bold shadow-sm backdrop-blur-md">
            ${trip.budget} / person
          </Badge>
          <Badge variant="secondary" className="absolute bottom-3 left-3 bg-black/60 text-white border-0 backdrop-blur-md">
            {trip.type}
          </Badge>
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 p-5 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                {trip.destination}
              </h3>
              <div className="flex items-center text-slate-500 text-sm mt-1">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">View Itinerary</span>
          </div>
        </CardContent>

        {/* Footer: Host & Action */}
        <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-slate-50 mt-auto">
          <div className="flex items-center gap-2 mt-4">
            <Avatar className="w-8 h-8 border border-slate-200">
              <AvatarImage src={trip.host.image || ''} />
              <AvatarFallback className="text-xs">{trip.host.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-700">Hosted by</span>
              <span className="text-xs text-slate-500 max-w-[80px] truncate">{trip.host.name}</span>
            </div>
          </div>

          <Button size="sm" variant="ghost" className="mt-4 text-primary group-hover:bg-primary/10">
            Details <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardFooter>

      </Card>
    </Link>
  )
}