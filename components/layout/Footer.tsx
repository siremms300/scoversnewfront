import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const footerLinks = {
    Services: [
      { name: 'University Search', href: '/universities' },
      { name: 'Scholarship Hub', href: '/scholarships' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'UPI Registration', href: '/upi-registration' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Partners', href: '/partners' },
      { name: 'Contact', href: '/contact' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center">
              <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <span className="ml-3 text-3xl font-bold">
                Scovers<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-300 max-w-md">
              Transforming Lives Through Education. For over a decade, we've been the trusted partner 
              for students seeking international education opportunities.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Scovers Education. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Subscribe to newsletter"
                  className="px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-secondary transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}