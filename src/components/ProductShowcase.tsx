import React, { useState } from 'react';
import { Bot, MessageSquare, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductShowcaseProps {
  isWalletConnected: boolean;
  isVerified: boolean;
}

function ProductShowcase({ isWalletConnected, isVerified }: ProductShowcaseProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const characters = [
    {
      name: "Luffy",
      description: "The ambitious Straw Hat captain with the power of the Gomu Gomu no Mi",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80"
    },
    {
      name: "Zoro",
      description: "The legendary swordsman with unmatched determination",
      image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&q=80"
    },
    {
      name: "Nami",
      description: "The skilled navigator with a passion for cartography",
      image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % characters.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + characters.length) % characters.length);
  };

  const getActionButton = () => {
    if (!isWalletConnected) {
      return (
        <button className="bg-gray-700 cursor-not-allowed w-full py-3 rounded-lg flex items-center justify-center space-x-2">
          <Lock className="w-5 h-5" />
          <span>Connect Wallet to Chat</span>
        </button>
      );
    }
    
    if (!isVerified) {
      return (
        <Link to="/referrals" className="w-full">
          <button className="bg-pink-500 hover:bg-pink-600 w-full py-3 rounded-lg flex items-center justify-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Enter Referral Code to Access</span>
          </button>
        </Link>
      );
    }

    return (
      <button className="bg-purple-600 hover:bg-purple-700 w-full py-3 rounded-lg flex items-center justify-center space-x-2">
        <MessageSquare className="w-5 h-5" />
        <span>Start Chatting</span>
      </button>
    );
  };

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-purple-900">Experience One Piece AI Chat</h2>
          <p className="text-purple-800 max-w-2xl mx-auto">
            Connect with your favorite One Piece characters through advanced AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-pink-200">
            <div className="flex items-center space-x-4 mb-6">
              <Bot className="w-8 h-8 text-pink-500" />
              <h3 className="text-2xl font-bold text-purple-900">AI Chatbot</h3>
            </div>
            <p className="text-purple-800 mb-6">
              Engage in natural conversations with AI-powered One Piece characters
            </p>
            {getActionButton()}
          </div>

          <div className="relative">
            <div className="relative h-[400px] rounded-xl overflow-hidden group">
              {characters.map((character, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex flex-col justify-end p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">{character.name}</h3>
                      <p className="text-pink-100">{character.description}</p>
                    </div>
                    {getActionButton()}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-purple-900 p-2 rounded-full backdrop-blur-lg transition-colors"
              aria-label="Previous character"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-purple-900 p-2 rounded-full backdrop-blur-lg transition-colors"
              aria-label="Next character"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {characters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;