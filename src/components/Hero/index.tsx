import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-black pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container">
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Ethical Voice Marketplace
                </h1>
            <p className="mx-auto mb-8 max-w-[700px] text-lg font-medium text-gray-300">
              The premier platform connecting voice creators with companies and LLMs
              for ethical, transparent, and high-quality voice solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* For Companies + LLMs Section */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-900/40 to-black p-8 shadow-glow transition-all duration-300 hover:shadow-blue-900/30">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white md:text-3xl">For Companies + LLMs</h2>
                <div className="rounded-full bg-blue-600/20 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                </div>
              </div>
              <ul className="mb-8 space-y-4 text-gray-300">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 flex-shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Access ethically sourced, high-quality voice talent</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 flex-shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Transparent licensing and fair compensation models</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 flex-shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Integrate diverse voices into your AI and digital products</span>
                </li>
              </ul>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="button"
                aria-label="Go to marketplace page"
              >
                Explore Voice Library
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
              </Link>
                </div>

            {/* For Voice Creators Section */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 to-black p-8 shadow-glow transition-all duration-300 hover:shadow-purple-900/30">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white md:text-3xl">For Voice Creators</h2>
                <div className="rounded-full bg-purple-600/20 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <ul className="mb-8 space-y-4 text-gray-300">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 flex-shrink-0 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Monetize your voice with fair compensation</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 flex-shrink-0 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Control how your voice is used with transparent licensing</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 flex-shrink-0 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Get a crypto-backed identity for your voice on the blockchain</span>
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Upload Your Voice
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* <div className="mt-16 text-center">
            <p className="mb-6 text-lg font-medium text-gray-400">Trusted by leading companies and voice professionals</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
              <Image src="/images/brands/google.svg" alt="Google" width={120} height={40} className="h-8 w-auto" />
              <Image src="/images/brands/openai.svg" alt="OpenAI" width={120} height={40} className="h-8 w-auto" />
              <Image src="/images/brands/anthropic.svg" alt="Anthropic" width={120} height={40} className="h-8 w-auto" />
              <Image src="/images/brands/spotify.svg" alt="Spotify" width={120} height={40} className="h-8 w-auto" />
              <Image src="/images/brands/adobe.svg" alt="Adobe" width={120} height={40} className="h-8 w-auto" />
            </div>
          </div> */}
        </div>

        {/* Background gradient effects */}
   
      </section>
    </>
  );
};

export default Hero;
