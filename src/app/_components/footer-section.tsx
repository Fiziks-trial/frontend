import Link from "next/link";
import { Swords } from "lucide-react";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/constants/marketing";
import { FooterColumn, SocialIcon } from "@/design-system";

export function FooterSection() {
  return (
    <footer className="bg-black rounded-4xl mx-2 sm:mx-4 mb-4 pt-16 sm:pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-8 sm:gap-12 mb-16 sm:mb-20">
          {/* Brand */}
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="size-8 bg-white rounded-full flex items-center justify-center text-black">
                <Swords size={16} />
              </div>
              <span className="text-xl font-bold font-serif text-white">
                Fiziks
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-xs">
              The competitive learning platform for the next generation of
              scholars. Built with precision for students worldwide.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, label }) => (
                <SocialIcon
                  key={label}
                  icon={<Icon size={18} />}
                  label={label}
                  variant="outline-dark"
                  size="lg"
                />
              ))}
            </div>
          </div>

          {/* Links */}
          {FOOTER_COLUMNS.map((column) => (
            <FooterColumn key={column.title} variant="dark" {...column} />
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 MindSport Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
