"use client";

import { useState } from "react";
import Link from "next/link";

// Sample voice data
const voiceData = [
  {
    id: 1,
    name: "Digital Dreamer",
    description: "Smooth and calming voice with a hint of warmth",
    gender: "Female",
    accent: "American",
    cryptoHash: "ETH-V0X-2F8A",
    apiKey: "eth_v0x_2f8a",
    provider: "Resemble AI",
    audioSrc: "/audio/cristi-clip-1.wav",
  },
  {
    id: 2,
    name: "Quantum Narrator",
    description: "Clear and authoritative voice with perfect enunciation",
    gender: "Male",
    accent: "British",
    cryptoHash: "ETH-V0X-3D9B",
    apiKey: "eth_v0x_3d9b",
    provider: "Eleven Labs",
    audioSrc: "/audio/cristi-clip-1.wav",
  },
  {
    id: 3,
    name: "Neon Whisper",
    description: "Soft and intimate voice with a slight electronic edge",
    gender: "Female",
    accent: "Australian",
    cryptoHash: "ETH-V0X-7C4E",
    apiKey: "eth_v0x_7c4e",
    provider: "Cartesia",
    audioSrc: "/audio/cristi-clip-1.wav",
  },
  {
    id: 4,
    name: "Cyber Sage",
    description: "Deep, resonant voice with a futuristic quality",
    gender: "Male",
    accent: "American",
    cryptoHash: "ETH-V0X-5A2D",
    apiKey: "eth_v0x_5a2d",
    provider: "Resemble AI",
    audioSrc: "/audio/cristi-clip-1.wav",
  },
  {
    id: 5,
    name: "Crystal Clear",
    description: "Bright, articulate voice with perfect clarity",
    gender: "Female",
    accent: "Canadian",
    cryptoHash: "ETH-V0X-9F1H",
    apiKey: "eth_v0x_9f1h",
    provider: "Eleven Labs",
    audioSrc: "/audio/cristi-clip-1.wav",
  },
];

const VoiceCard = ({ voice }: { voice: typeof voiceData[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showCryptoDetails, setShowCryptoDetails] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

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

  const copyApiKey = () => {
    const apiUrl = `api.ethicalvoice.ai/v1/voices/${voice.apiKey}`;
    navigator.clipboard.writeText(apiUrl);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2000);
  };

  return (
    <div className="voice-card overflow-hidden rounded-xl bg-dark-2 p-6 transition-all duration-300 hover:shadow-glow">
      <div className="relative mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{voice.name}</h3>
        </div>
        <p className="mt-2 text-sm text-gray-400">{voice.description}</p>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3">
          <span className="rounded-full bg-blue-900/30 px-2 py-1 text-xs text-blue-300">
            {voice.gender}
          </span>
          <span className="rounded-full bg-purple-900/30 px-2 py-1 text-xs text-purple-300">
            {voice.accent}
          </span>
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
      
      {/* API Key Section */}
      <div className="mt-6 border-t border-dark-3 pt-4">
        <div className="relative mb-1">
          <div className="flex items-center mb-2">
            <span className="text-xs text-gray-400 mr-2">API Endpoint</span>
            {copyNotification && (
              <span className="text-xs text-green-400 animate-fade-in-out">Copied!</span>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex-1 bg-dark-3 rounded-l-md border border-dark-4 px-3 py-2 flex items-center">
              <span className="text-xs text-blue-400 font-mono truncate">api.ethicalvoice.ai/v1/voices/{voice.apiKey}</span>
            </div>
            <button 
              onClick={copyApiKey}
              className="bg-blue-900/50 hover:bg-blue-800/50 border border-dark-4 border-l-0 rounded-r-md px-3 py-2 text-white"
              title="Copy API Key"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          Voice Provider: {voice.provider}
        </div>
        
        {/* Crypto Key with Dropdown */}
        <div className="mt-2">
          <div 
            className="flex items-center justify-between cursor-pointer" 
            onClick={() => setShowCryptoDetails(!showCryptoDetails)}
          >
            <span className="rounded-md bg-green-900/30 px-2 py-1 text-xs font-mono text-green-400">
              {voice.cryptoHash}
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              className={`text-gray-400 transition-transform duration-300 ${showCryptoDetails ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {showCryptoDetails && (
            <div className="mt-2 p-3 bg-dark-3 rounded-md text-xs">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-400">Blockchain:</span>
                <span className="text-white">Ethereum</span>
                
                <span className="text-gray-400">Verification Date:</span>
                <span className="text-white">May 15, 2023</span>
                
                <span className="text-gray-400">Token ID:</span>
                <span className="text-white font-mono">{voice.cryptoHash}</span>
                
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter voices based on search query
  const filteredVoices = voiceData.filter(voice => 
    voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voice.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voice.accent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voice.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black pb-20 pt-32">
      <div className="container">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white">Voice Marketplace</h1>
          <p className="text-lg text-gray-400">
            Browse our collection of premium, ethically-sourced voice talent
          </p>
        </div>

        {/* Simple search bar */}
        <div className="mb-10">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search voices..."
              className="w-full rounded-lg border-0 bg-dark-2 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
        
        {/* Voice grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVoices.map((voice) => (
            <VoiceCard key={voice.id} voice={voice} />
          ))}
        </div>
        
        {filteredVoices.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-lg text-gray-400">No voices found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
} 