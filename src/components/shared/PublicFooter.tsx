"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* TOP SECTION: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Travel<span className="text-white">Buddy</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Connect with fellow travelers, share expenses, and create
              meaningful memories around the world. Your journey to finding the
              perfect travel companion starts here.
            </p>
            <div className="flex gap-4 pt-4">
              <SocialIcon href="#" icon={<Facebook className="w-5 h-5" />} />
              <SocialIcon href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon href="#" icon={<Instagram className="w-5 h-5" />} />
              <SocialIcon href="#" icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </div>

          {/* Spacer (Col 6) */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Newsletter (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Stay updated with new adventures
            </h3>
            <p className="text-slate-400 text-sm">
              Join our newsletter to get the latest trips, travel tips, and
              safety guides sent to your inbox.
            </p>
            <div className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-900 border-slate-800 focus-visible:ring-primary text-white"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white shrink-0">
                Subscribe <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-800 my-8" />

        {/* MIDDLE SECTION: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <FooterColumn title="Company">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/blog">Travel Blog</FooterLink>
            <FooterLink href="/press">Press & Media</FooterLink>
          </FooterColumn>

          <FooterColumn title="Community">
            <FooterLink href="/explore">Explore Trips</FooterLink>
            <FooterLink href="/success-stories">Success Stories</FooterLink>
            <FooterLink href="/meetups">Local Meetups</FooterLink>
            <FooterLink href="/community-guidelines">Guidelines</FooterLink>
          </FooterColumn>

          <FooterColumn title="Support">
            <FooterLink href="/help">Help Center</FooterLink>
            <FooterLink href="/safety">Safety & Trust</FooterLink>
            <FooterLink href="/cancellation">Cancellation Policy</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </FooterColumn>

          <FooterColumn title="Contact">
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Travel Lane, Dhaka 1212</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+880 1700 000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@travelbuddy.com</span>
              </div>
            </div>
          </FooterColumn>
        </div>

        <Separator className="bg-slate-800 my-8" />

        {/* BOTTOM SECTION: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} TravelBuddy Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components for Cleaner Code
function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="bg-slate-900 p-2 rounded-full text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-semibold text-white">{title}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-slate-400 hover:text-primary transition-colors w-fit"
    >
      {children}
    </Link>
  );
}
