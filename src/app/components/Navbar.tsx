import { SW_NAME } from "../constants";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
      <div className="flex gap-0.5 items-center">
        {/* Corrected code here: */}
        <div className="relative w-12 h-12">
          <Image
            src={logo}
            alt="SW Logo"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        {/* End of corrected code */}
        <div className="text-(--brand-brown) text-xl font-bold">{SW_NAME}</div>
      </div>
      <div className="flex gap-8 items-center">
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li>
            <a href="#about" className="hover:text-(--brand-brown)">
              About
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-(--brand-brown)">
              Pricing
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-(--brand-brown)">
              FAQ
            </a>
          </li>
          <li>
            <a href="#testimonials" className="hover:text-(--brand-brown)">
              Community
            </a>
          </li>
        </ul>
        <a
          href="#get-started"
          className="px-6 py-3 bg-orange-400 text-white rounded-lg font-semibold hover:bg-orange-500"
        >
          Join Free
        </a>
      </div>
    </nav>
  );
}
