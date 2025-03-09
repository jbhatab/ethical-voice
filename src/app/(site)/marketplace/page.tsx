"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Sample voice data
const voiceData = [
  {
    id: 1,
    name: "Ethereal Echo",
    description: "A smooth, calming voice with subtle reverb effects. Perfect for meditation apps and relaxation content.",
    tags: ["Calm", "Female", "English", "Meditation"],
    rating: 4.9,
    samples: 12,
    price: "$120/hr",
    audioSrc: "/audio/sample1.mp3",
    image: "/images/voices/voice1.jpg"
  },
  {
    id: 2,
    name: "Quantum Narrator",
    description: "Clear and authoritative voice with perfect enunciation. Ideal for educational content and documentaries.",
    tags: ["Authoritative", "Male", "English", "Educational"],
    rating: 4.8,
    samples: 15,
    price: "$150/hr",
    audioSrc: "/audio/sample2.mp3",
    image: "/images/voices/voice2.jpg"
  },
  {
    id: 3,
    name: "Neon Whisper",
    description: "Soft and intimate voice with a slight electronic edge. Great for ASMR and personal storytelling.",
    tags: ["Soft", "Female", "English", "ASMR"],
    rating: 4.7,
    samples: 8,
    price: "$110/hr",
    audioSrc: "/audio/sample3.mp3",
    image: "/images/voices/voice3.jpg"
  },
  {
    id: 4,
    name: "Cyber Sage",
    description: "Deep, resonant voice with a futuristic quality. Perfect for sci-fi narratives and tech presentations.",
    tags: ["Deep", "Male", "English", "Sci-Fi"],
    rating: 4.9,
    samples: 10,
    price: "$140/hr",
    audioSrc: "/audio/sample4.mp3",
    image: "/images/voices/voice4.jpg"
  },
  {
    id: 5,
    name: "Crystal Clear",
    description: "Bright, articulate voice with perfect clarity. Excellent for commercials and promotional content.",
    tags: ["Bright", "Female", "English", "Commercial"],
    rating: 4.8,
    samples: 14,
    price: "$130/hr",
    audioSrc: "/audio/sample5.mp3",
    image: "/images/voices/voice5.jpg"
  },
  {
    id: 6,
    name: "Digital Dreamer",
    description: "Warm and engaging voice with a slight digital texture. Ideal for podcasts and audiobooks.",
    tags: ["Warm", "Male", "English", "Podcast"],
    rating: 4.7,
    samples: 9,
    price: "$125/hr",
    audioSrc: "/audio/sample6.mp3",
    image: "/images/voices/voice6.jpg"
  },
];

// Filter categories
const categories = [
  { id: "all", name: "All Voices" },
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "commercial", name: "Commercial" },
  { id: "narrative", name: "Narrative" },
  { id: "character", name: "Character" },
];

const VoiceCard = ({ voice }: { voice: typeof voiceData[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audio) {
      const newAudio = new Audio(voice.audioSrc);
      newAudio.onended = () => setIsPlaying(false);
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="voice-card overflow-hidden rounded-xl bg-dark-2 transition-all duration-300 hover:shadow-glow">
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={voice.image} 
          alt={voice.name} 
          width={400} 
          height={200}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{voice.name}</h3>
            <div className="flex items-center text-sm text-gray-300">
              <span className="mr-2">★ {voice.rating}</span>
              <span>•</span>
              <span className="ml-2">{voice.samples} samples</span>
            </div>
          </div>
          <button
            onClick={togglePlay}
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              isPlaying ? "bg-red-500" : "bg-blue-600"
            } text-white transition-colors duration-300 hover:opacity-90`}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-3 text-sm text-gray-400 line-clamp-2">{voice.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {voice.tags.map((tag, index) => (
            <span key={index} className="rounded-full bg-blue-900/30 px-2 py-1 text-xs text-blue-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">{voice.price}</span>
          <Link
            href={`/marketplace/${voice.id}`}
            className="rounded-lg bg-blue-600/20 px-3 py-1 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-600/30"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-black pb-20 pt-32">
      <div className="container">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white">Voice Marketplace</h1>
          <p className="text-lg text-gray-400">
            Browse our collection of premium, ethically-sourced voice talent for your projects
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-6 lg:flex-row">
          {/* Search and filters */}
          <div className="w-full lg:w-1/4">
            <div className="rounded-xl bg-dark-2 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="mb-2 block text-sm font-medium text-gray-400">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search voices..."
                    className="w-full rounded-lg border-0 bg-dark-3 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-400">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        activeCategory === category.id
                          ? "bg-blue-600/20 text-blue-400"
                          : "text-gray-300 hover:bg-dark-3"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-400">Price Range</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    className="h-2 w-full appearance-none rounded-lg bg-dark-3 accent-blue-600"
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-400">
                  <span>$0</span>
                  <span>$300</span>
                </div>
              </div>
              
              {/* Rating */}
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-400">Minimum Rating</h3>
                <div className="flex items-center gap-1 text-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-yellow-400">
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Voice grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {voiceData.map((voice) => (
                <VoiceCard key={voice.id} voice={voice} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 