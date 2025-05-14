import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#004828] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
        {/* About Section */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">About GreenPoint</h2>
          <p className="text-sm md:text-base">
            GreenPoint is dedicated to creating a sustainable future by incentivizing 
            recycling and waste reduction through our innovative points system.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className="mb-8 md:mb-0 md:w-1/4">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-2">Email: support@greenpoint.com</p>
          <p>Phone: +62 857 1903 6561</p>
        </div>

        {/* Social Media Section */}
        <div className="md:w-1/4">
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brand-tiktok">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}