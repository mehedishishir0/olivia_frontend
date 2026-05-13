"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = !!session;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // { name: "Courses", href: "/courses" },
    // { name: "Membership", href: "/membership" },
    { name: "Blogs", href: "/blog" },
    { name: "Mentors & Coaches", href: "/mentor-coaches/all" },
    { name: "Career Services ", href: "/career-services" },
    { name: "Find Your Opportunity", href: "/find-your-opportunity" },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="sktch Labs Logo" width={80} height={84} />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-[#0D3B3F] font-semibold"
                  : "text-gray-600 hover:text-[#0D3B3F]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link href={"/survey"}>
                <Button className="w-full bg-[#0D3B3F] hover:bg-[#164e53] text-white rounded-md text-xs">
                  Join Community
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white rounded-md px-6 text-xs gap-2"
              >
                <LogOut size={14} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href={`/survey`}>
                <Button className="bg-[#0D3B3F] hover:bg-[#164e53] text-white rounded-md px-6 text-xs">
                  Join Community
                </Button>
              </Link>
              <Button
                onClick={handleLogin}
                variant="outline"
                className="border-gray-300 text-gray-700 rounded-md px-6 text-xs"
              >
                Login Here
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors py-2 ${
                  isActive(link.href)
                    ? "text-[#0D3B3F] font-semibold"
                    : "text-gray-600 hover:text-[#0D3B3F]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link
                      href="/survey"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-[#0D3B3F] hover:bg-[#164e53] text-white rounded-md text-xs">
                        Join Community
                      </Button>
                    </Link>
                  </Link>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md text-xs gap-2"
                  >
                    <LogOut size={14} />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/survey"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-[#0D3B3F] hover:bg-[#164e53] text-white rounded-md text-xs">
                      Join Community
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 rounded-md text-xs"
                  >
                    Login Here
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
