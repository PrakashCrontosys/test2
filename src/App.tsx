import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Facebook, Instagram, Twitter, Menu, X } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1511795409834-432f7b1728d8',
  'https://images.unsplash.com/photo-1519741497674-611481863552',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6',
];

const services = [
  {
    title: 'Exotic Flower Decoration',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9',
    description: 'Transform your event with our exquisite flower arrangements, featuring rare and beautiful blooms from around the world.',
  },
  {
    title: 'Engagement Decoration',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
    description: 'Create magical moments with our elegant engagement setups, designed to make your special day unforgettable.',
  },
  {
    title: 'Selfie Points',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce',
    description: 'Capture memories at our specially designed selfie points, perfect for creating lasting memories of your celebration.',
  },
  {
    title: 'Entry Gate',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
    description: 'Make a grand entrance with our stunning gate decorations that set the tone for your entire event.',
  },
];

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const ServiceCard = ({ title, image, description }: { title: string; image: string; description: string }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg overflow-hidden shadow-lg"
      >
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showConfetti && <Confetti />}
      
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-purple-600">Bhuvneshwar Mahadev Decorators</h1>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-purple-600">Home</a>
              <a href="#services" className="text-gray-600 hover:text-purple-600">Services</a>
              <a href="#contact" className="text-gray-600 hover:text-purple-600">Contact</a>
              <a href="#about" className="text-gray-600 hover:text-purple-600">About</a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white"
            >
              <div className="px-4 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Home</a>
                <a href="#services" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Services</a>
                <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Contact</a>
                <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-purple-600">About</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section with Image Scroller */}
      <div className="relative h-screen">
        <AnimatePresence mode='wait'>
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            alt="Decoration showcase"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Creating Magical Moments
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              Your Premier Event Decoration Partner
            </motion.p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-900 bg-opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="text-white mb-8">
            <p className="text-lg md:text-xl mb-6">
              Movies • Wedding • Reception • Engagement • Diksha • Religious Events • Hotels & Banquets
            </p>
          </div>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors">
            Contact Us Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                Creating memorable events with stunning decorations since 2010.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                123 Decoration Street<br />
                Mumbai, Maharashtra 400001<br />
                Phone: +91 98765 43210
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Bhuvneshwar Mahadev Decorators. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;