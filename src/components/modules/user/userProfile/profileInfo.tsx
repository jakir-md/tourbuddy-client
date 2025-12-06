'use client'
import { Edit, MapPin, Calendar, CheckCircle, Crown, Star, Shield } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Review {
  rating: number
}

interface Subscription {
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED'
  plan: {
    name: string
  }
}

interface UserProfileProps {
  user: {
    id: string
    name: string
    email: string
    profilePhoto?: string | null
    role: 'USER' | 'ADMIN' | 'MODERATOR'
    isVerified: boolean
    bio?: string | null
    age?: number | null
    gender?: string | null
    interests: string[]
    subscription?: Subscription | null
    reviewsReceived: Review[]
    createdAt?: Date // Assuming you have this
  }
  isOwnProfile?: boolean // To toggle "Edit" button
}

export default function UserProfileHeader({ user, isOwnProfile = false }: UserProfileProps) {
  
  // 2. Computed Logic
  const isPremium = user.subscription?.status === 'ACTIVE'
  const averageRating = user.reviewsReceived.length > 0
    ? (user.reviewsReceived.reduce((acc, curr) => acc + curr.rating, 0) / user.reviewsReceived.length).toFixed(1)
    : 'New'
  
  // Helper for Initials
  const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden border-slate-200 shadow-sm">
      {/* Cover Banner (Optional aesthetic touch) */}
      <div className={`h-32 w-full ${isPremium ? 'bg-gradient-to-r from-amber-500/20 to-purple-600/20' : 'bg-slate-100'}`} />

      <CardContent className="relative px-6 pb-6">
        
        {/* Top Section: Avatar & Main Info */}
        <div className="flex flex-col md:flex-row gap-6 -mt-12 items-center md:items-start">
          
          {/* Avatar with Conditional Premium Styling */}
          <div className="relative group">
            <div className={`rounded-full p-1 ${isPremium ? 'bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-500 shadow-lg' : 'bg-white'}`}>
              <Avatar className="h-32 w-32 border-4 border-white">
                <AvatarImage src={user.profilePhoto || ''} alt={user.name} className="object-cover" />
                <AvatarFallback className="text-2xl bg-slate-200 text-slate-600">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Verification Badge (Absolute positioned) */}
            {user.isVerified && (
              <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm" title="Verified Traveler">
                <CheckCircle className="w-6 h-6 text-blue-500 fill-blue-500 text-white" />
              </div>
            )}
          </div>

          {/* User Info Block */}
          <div className="flex-1 text-center md:text-left space-y-2 mt-2">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
              
              {/* Badges Row */}
              <div className="flex gap-2">
                {isPremium && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 gap-1">
                    <Crown className="w-3 h-3 fill-amber-700" />
                    Premium
                  </Badge>
                )}
                {user.role === 'ADMIN' && (
                  <Badge variant="destructive" className="gap-1">
                    <Shield className="w-3 h-3" /> Admin
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-muted-foreground text-sm">{user.email}</p>

            {/* Stats Row */}
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-600 pt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold text-slate-900">{averageRating}</span>
                <span className="text-slate-400">({user.reviewsReceived.length} reviews)</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Dhaka, Bangladesh</span> {/* You can add location to DB later */}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 md:mt-12">
            {isOwnProfile ? (
              <Button variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            ) : (
               <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                Message
              </Button>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Section: Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-semibold text-lg text-slate-900">About Me</h3>
            {user.bio ? (
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {user.bio}
              </p>
            ) : (
              <p className="text-slate-400 italic">No bio added yet.</p>
            )}
            
            {/* Interests Tags */}
            <div className="pt-4">
              <h4 className="text-sm font-medium text-slate-900 mb-3">Travel Interests</h4>
              <div className="flex flex-wrap gap-2">
                {user.interests.length > 0 ? (
                  user.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 text-slate-600 border-slate-200 bg-slate-50">
                      {interest}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">No interests selected.</span>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Personal Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-4">
              <h3 className="font-semibold text-slate-900">Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Age</span>
                  <span className="font-medium text-slate-900">{user.age || 'N/A'}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gender</span>
                  <span className="font-medium text-slate-900 capitalize">{user.gender || 'N/A'}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Member Since</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span className="font-medium text-slate-900">
                      {/* Mock date if createdAt is missing */}
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2024'} 
                    </span>
                  </div>
                </div>
                
                {/* Visual Subscription Status for Detail View */}
                {isPremium && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                     <div className="bg-amber-50 border border-amber-200 rounded-md p-2 text-center">
                        <p className="text-xs text-amber-800 font-semibold uppercase tracking-wider">Premium Member</p>
                        <p className="text-[10px] text-amber-600">Valid until Dec 2025</p>
                     </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}