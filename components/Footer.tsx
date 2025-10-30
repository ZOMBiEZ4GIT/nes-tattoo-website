import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-24 pb-8 mt-24">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">
              NES TATTOO
            </h3>
            <p className="text-sm text-gray-light italic">
              The art is the color
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-2">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-light hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-gray-light hover:text-white transition-colors duration-200"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-sm text-gray-light hover:text-white transition-colors duration-200"
                >
                  Book Now
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-light hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-2">
              Contact
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:contact@nestattoo.com"
                  className="text-sm text-gray-light hover:text-white transition-colors duration-200"
                >
                  contact@nestattoo.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-light hover:text-white transition-colors duration-200"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-2">
              Follow
            </h4>
            <ul className="flex gap-4">
              <li>
                <a
                  href="https://instagram.com/nestattoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-light hover:text-white transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/nestattoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-light hover:text-white transition-colors duration-200"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-light">
            &copy; {currentYear} NES TATTOO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
