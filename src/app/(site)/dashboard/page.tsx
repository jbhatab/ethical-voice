"use client";

import { useState, useRef } from "react";
import Image from "next/image";

// Sample voice data
const voiceData = [
  {
    id: 1,
    name: "Ethereal Echo",
    description: "A smooth, calming voice with subtle reverb effects. Perfect for meditation apps and relaxation content.",
    audioSrc: "/audio/sample1.mp3",
  },
  {
    id: 2,
    name: "Quantum Narrator",
    description: "Clear and authoritative voice with perfect enunciation. Ideal for educational content and documentaries.",
    audioSrc: "/audio/sample2.mp3",
  },
  {
    id: 3,
    name: "Neon Whisper",
    description: "Soft and intimate voice with a slight electronic edge. Great for ASMR and personal storytelling.",
    audioSrc: "/audio/sample3.mp3",
  },
  {
    id: 4,
    name: "Cyber Sage",
    description: "Deep, resonant voice with a futuristic quality. Perfect for sci-fi narratives and tech presentations.",
    audioSrc: "/audio/sample4.mp3",
  },
  {
    id: 5,
    name: "Crystal Clear",
    description: "Bright, articulate voice with perfect clarity. Excellent for commercials and promotional content.",
    audioSrc: "/audio/sample5.mp3",
  },
  {
    id: 6,
    name: "Digital Dreamer",
    description: "Warm and engaging voice with a slight digital texture. Ideal for podcasts and audiobooks.",
    audioSrc: "/audio/sample6.mp3",
  },
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
    <div className="voice-card rounded-xl bg-dark-2 p-6 transition-all duration-300 hover:shadow-glow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-white">{voice.name}</h3>
          <p className="text-sm text-gray-400">{voice.description}</p>
        </div>
        <button
          onClick={togglePlay}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            isPlaying ? "bg-red-500" : "bg-primary"
          } text-white transition-colors duration-300 hover:opacity-90`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [showCryptoDetails, setShowCryptoDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Ethereum key for verification
  const ethereumKey = "0x7F9A2C5B3E4D1F8A6B0D9E2F1C3A5B7D9E1F3A5B";
  const apiKey = "api.ethicalvoice.ai/v1/voices/eth_v0x_2f8a";
  
  // Voice provider options
  const voiceProviders = ["Resemble AI", "Eleven Labs", "Cartesia"];
  const [currentProvider] = useState(voiceProviders[Math.floor(Math.random() * voiceProviders.length)]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const audioFiles = Array.from(files).filter(file => file.type.startsWith('audio/'));
    
    if (audioFiles.length === 0) {
      alert('Please upload audio files only (MP3, WAV, etc.)');
      return;
    }
    
    // Simulate upload progress
    audioFiles.forEach(file => {
      setUploadProgress(prev => ({...prev, [file.name]: 0}));
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = Math.min((prev[file.name] || 0) + 10, 100);
          
          if (newProgress === 100) {
            clearInterval(interval);
          }
          
          return {...prev, [file.name]: newProgress};
        });
      }, 300);
    });
    
    setUploadedFiles(prev => [...prev, ...audioFiles]);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    alert('API key copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-black pb-20 pt-32">
      <div className="container">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-white">Creator Dashboard</h1>
          <p className="text-lg text-gray-400">
            Upload your voice samples and manage your voice profile
          </p>
        </div>
        
        {/* Crypto Voice Verification Section */}
        <div className="mb-10 overflow-hidden rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 inline-block rounded-md bg-green-900/30 px-3 py-1 text-sm font-medium text-green-400">
                Verified
              </div>
              <h2 className="text-2xl font-bold text-white">Crypto Voice Verification</h2>
              <p className="text-gray-400">Your voice is securely registered on the Ethereum blockchain</p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="rounded-xl bg-dark-2 p-6">
          <h2 className="mb-6 text-2xl font-bold text-white">Upload Your Voice</h2>
          
          {/* Upload area */}
          <div 
            className={`mb-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-900/10' : 'border-gray-700 hover:border-gray-500'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="audio/*" 
              multiple 
              onChange={handleFileInput}
            />
            
            <div className="mb-4 rounded-full bg-blue-900/20 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            <h3 className="mb-2 text-lg font-medium text-white">Drag & Drop Audio Files</h3>
            <p className="mb-4 text-center text-sm text-gray-400">
              Upload MP3, WAV, or other audio formats.<br />
              Each file should be under 50MB.
            </p>
            
            <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Browse Files
            </button>
          </div>
          
          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-medium text-white">Uploaded Files</h3>
              
              <div className="space-y-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="rounded-lg bg-dark-3 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 rounded-full bg-blue-900/20 p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-white">{file.name}</p>
                          <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {uploadProgress[file.name] === 100 ? (
                          <span className="rounded-full bg-green-900/30 px-2 py-1 text-xs text-green-400">
                            Complete
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">
                            {uploadProgress[file.name] || 0}%
                          </span>
                        )}
                        
                        <button className="rounded p-1 text-gray-400 hover:bg-dark-2 hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {uploadProgress[file.name] !== 100 && (
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-dark-2">
                        <div 
                          className="h-full bg-blue-600 transition-all duration-300" 
                          style={{ width: `${uploadProgress[file.name] || 0}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {uploadedFiles.some(file => uploadProgress[file.name] === 100) && (
                <div className="mt-6 flex justify-end">
                  <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                    Process Voice Samples
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Voice recording option */}
          <div className="mt-8 rounded-xl border border-gray-700 p-6">
            <h3 className="mb-4 text-lg font-medium text-white">Record Your Voice</h3>
            <p className="mb-6 text-sm text-gray-400">
              Don't have audio files? You can record your voice directly in the browser.
            </p>
            
            <button className="flex items-center rounded-lg bg-purple-600/20 px-6 py-3 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-600/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Start Recording
            </button>
          </div>
          
          {/* API Key and Crypto Key Section */}
          <div className="mt-8 rounded-xl border border-gray-700 p-6">
            <h3 className="mb-4 text-lg font-medium text-white">Voice API Access</h3>
            
            {/* API Key */}
            <div className="mb-6">
              <p className="mb-2 text-sm text-gray-400">API Endpoint</p>
              <div className="flex items-center justify-between rounded-lg bg-dark-3 p-3">
                <code className="font-mono text-sm text-blue-400">{apiKey}</code>
                <button 
                  onClick={copyApiKey}
                  className="ml-2 rounded-md bg-dark-2 p-1 text-gray-400 hover:text-white"
                  title="Copy to clipboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">Voice Provider: {currentProvider}</p>
            </div>
            
            {/* Crypto Key with Dropdown */}
            <div>
              <div 
                className="flex cursor-pointer items-center justify-between rounded-lg bg-dark-3 p-3"
                onClick={() => setShowCryptoDetails(!showCryptoDetails)}
              >
                <div className="flex items-center">
                  <span className="mr-2 rounded-full bg-green-900/30 h-2 w-2"></span>
                  <code className="font-mono text-sm text-green-400">{ethereumKey}</code>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-gray-400 transition-transform ${showCryptoDetails ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {showCryptoDetails && (
                <div className="mt-3 rounded-lg bg-dark-4 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Blockchain</p>
                      <p className="text-sm text-white">Ethereum</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Verification Date</p>
                      <p className="text-sm text-white">May 15, 2023</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Token ID</p>
                      <p className="text-sm text-white">ETH-V0X-2F8A</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-sm text-green-400">Active</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 