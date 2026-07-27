import { Link } from "wouter";
import { Dumbbell, Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-iron-blue-500 rounded-full flex items-center justify-center">
                <Dumbbell className="text-white" size={16} />
              </div>
              <div>
                <h3 className="font-bold text-white">Iron Dog Strength</h3>
                <p className="text-xs">Training & Conditioning</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Transform your body, mind, and spirit through proven training methods and motivational coaching.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/IrondDog7Strength" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors" title="Facebook">
                <Facebook size={16} className="text-white" />
              </a>
              <a href="https://instagram.com/irondog_strength" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-lg flex items-center justify-center transition-colors" title="Instagram">
                <Instagram size={16} className="text-white" />
              </a>
              <a href="https://youtube.com/@irondDog7" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors" title="YouTube">
                <Youtube size={16} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/programs" className="hover:text-iron-blue-400 transition-colors">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-iron-blue-400 transition-colors">
                  About Coach
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-iron-blue-400 transition-colors">
                  Schedule Session
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-iron-blue-400 transition-colors">
                  Client Portal
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-iron-blue-400 transition-colors">
                  Training Agreement
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact Info</h4>
            <div className="text-sm space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-iron-blue-400 mt-0.5" />
                <div>
                  <p className="font-semibold">Iron Dog 7 LLC</p>
                  <p className="text-xs text-slate-400">Located inside Power House Gym</p>
                  <p>35840 Chester Rd.</p>
                  <p>Avon, OH 44011</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-iron-blue-400" />
                <div>
                  <p>Master Dessie: (440) 281-7930</p>
                  <p>Jaden Matias: (440) 420-7694</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-iron-blue-400" />
                <p>train@irondogstrength.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 Iron Dog Strength. All rights reserved.</p>
          <div className="flex space-x-6 text-sm mt-4 sm:mt-0">
            <a href="#" className="hover:text-iron-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-iron-blue-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-iron-blue-400 transition-colors">
              Liability Waiver
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
