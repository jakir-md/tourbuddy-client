"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Globe,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  Map,
  LogIn,
  Crown,
  Shield,
  Bell,
  MessageCircle,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logOut } from "@/services/auth/logout";

// 1. Type Definitions (Matches your Auth Logic)
interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: "USER" | "ADMIN" | "MODERATOR";
  isVerified?: boolean;
  subscriptionStatus?: "FREE" | "PREMIUM";
}

interface NavbarProps {
  user?: User | null; // Null if guest
}

export default function PublicNavbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // 2. Scroll Effect (Glassmorphism trigger)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper for Active Link Styles
  const isActive = (path: string) => pathname === path;
  const linkStyles = (path: string) => `
    text-sm font-medium transition-colors hover:text-primary 
    ${isActive(path) ? "text-primary font-bold" : "text-muted-foreground"}
  `;

  const handleLogout = async () => {
    console.log("logged out clicked");
    await logOut();
  };
  // 3. Navigation Links Config
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore Trips" },
    { href: "/about", label: "How it Works" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Travel<span className="text-primary">Buddy</span>
          </span>
        </Link>

        {/* CENTER: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkStyles(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT: Auth & Mobile Toggle */}

        <div className="flex items-center gap-4">
          {user && user.email ? (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Link href={"/dashboard/create-trip"}>
                  <Button
                    size="sm"
                    className="hidden lg:flex bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Create Trip
                  </Button>
                </Link>

                <Link
                  href="/messages"
                  className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  {/* Unread Badge (Conditional) */}
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                </Link>

                {/* 3. Notifications (Icon + Badge) */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {/* Notification Items */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar
                      className={`h-10 w-10 border-2 ${
                        user.subscriptionStatus === "PREMIUM"
                          ? "border-amber-400"
                          : "border-slate-100"
                      }`}
                    >
                      <AvatarImage src={user.image || ""} alt={user.name} />
                      <AvatarFallback className="bg-slate-100 font-medium">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Role Based Links */}
                  <DropdownMenuItem asChild>
                    <Link
                      href={
                        user.role === "ADMIN"
                          ? "/admin/dashboard"
                          : "/dashboard"
                      }
                      className="cursor-pointer"
                    >
                      {user.role === "ADMIN" ? (
                        <Shield className="mr-2 h-4 w-4" />
                      ) : (
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                      )}
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href={`/profile/${user.id}`}
                      className="cursor-pointer"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>

                  {user.subscriptionStatus === "FREE" && (
                    <DropdownMenuItem
                      asChild
                      className="text-amber-600 focus:text-amber-700 focus:bg-amber-50"
                    >
                      <Link
                        href="/pricing"
                        className="cursor-pointer font-medium"
                      >
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade to Premium
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            // If Guest
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {/* MOBILE MENU (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6 px-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl"
                >
                  <Globe className="h-6 w-6 text-primary" />
                  TravelBuddy
                </Link>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="h-px bg-slate-200 my-2" />

                  {user?.email ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-lg font-medium"
                      >
                        <LayoutDashboard className="h-5 w-5" /> Dashboard
                      </Link>
                      <Link
                        href="/trips/create"
                        className="flex items-center gap-2 text-lg font-medium text-primary"
                      >
                        <Map className="h-5 w-5" /> Create Trip
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-lg font-medium text-red-600 text-left mt-2"
                      >
                        <LogOut className="h-5 w-5" /> Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Link href="/login">
                          <LogIn className="mr-2 h-4 w-4" /> Log in
                        </Link>
                      </Button>
                      <Button asChild className="w-full justify-start">
                        <Link href="/register">Sign up</Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
