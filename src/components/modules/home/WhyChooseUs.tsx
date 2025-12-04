'use client'

import React from 'react'
import { ShieldCheck, HeartHandshake, Wallet, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Community',
    desc: 'Travel with confidence. Our rigorous ID verification process ensures you are meeting real, trusted travelers.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: HeartHandshake,
    title: 'AI-Powered Matching',
    desc: 'Stop scrolling through endless profiles. Our algorithm matches you based on travel style, budget, and interests.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    icon: Wallet,
    title: 'Smart Cost Splitting',
    desc: 'Save money by sharing accommodation and transport costs. We help you find buddies with the same budget.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Sparkles,
    title: 'Unforgettable Memories',
    desc: 'Turn solo trips into shared adventures. Discover local hidden gems that only a group of explorers can find.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Why Travelers Love Us ❤️
          </h2>
          <p className="text-slate-600 text-lg">
            We are not just a travel agency; we are a community-first platform built to make 
            solo travel safer, cheaper, and more fun.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <Card className="h-full border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center text-center gap-6">
                  
                  {/* Decorative Background Blob */}
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-transform group-hover:scale-150 ${feature.bg.replace('50', '200')}`} />

                  {/* Icon */}
                  <div className={`p-4 rounded-2xl ${feature.bg} ${feature.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className="w-8 h-8" />
                  </div>

                  {/* Text */}
                  <div className="space-y-3 z-10">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                </CardContent>
              </Card>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}