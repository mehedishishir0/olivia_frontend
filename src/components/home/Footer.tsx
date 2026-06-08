import React from "react";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#EEF4F5] pt-16 pb-8 px-6 md:px-20 border-t border-gray-200">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="sktch Labs Logo"
                width={80}
                height={84}
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Access opportunities, expand your network, and drive change in the
              climate space.
            </p>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className=" text-[#004242] mb-6">Resources</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <Link
                  href="/event"
                  className="text-[#004242] hover:text-green-600"
                >
                  Event
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-[#004242] hover:text-green-600"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/media"
                  className="text-[#004242] hover:text-green-600"
                >
                  Media
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#004242] hover:text-green-600"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className=" text-[#004242] mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <a
                  href="/support-our-work"
                  className="text-[#004242] hover:text-green-600"
                >
                  Support Our Work
                </a>
              </li>
              <li>
                <a
                  href="/membership"
                  className="text-[#004242] hover:text-green-600"
                >
                  Become a Member
                </a>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-[#004242] hover:text-green-600"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[#004242] hover:text-green-600"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Contact */}
          <div className="space-y-8 ">
            <div>
              <h4 className=" text-[#004242] mb-6">Follow us</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-[#004242] text-white rounded-md">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="p-2 bg-[#004242] text-white rounded-md">
                  <Twitter size={18} />
                </a>
                <a href="#" className="p-2 bg-[#004242] text-white rounded-md">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className=" text-[#004242] mb-4">Contact us</h4>
              <div className="bg-[#004242] text-white  text-sm py-2  rounded-md text-center">
                info@actonclimate.net
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t  border-gray-300 pt-8 flex md:row justify-between items-center text-[16px] text-gray-400">
          <p>© Copyright 2024. All Rights Reserved</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#">Privacy policy</a>
            <span>•</span>
            <a href="#">Terms & conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
