import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/95 mt-auto relative z-10 text-white font-sans">
      <div className="w-full h-px bg-gray-300 m-0"></div>

      <div className="py-6 md:py-8">
        <div className="w-100 mx-5 px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
            <div className="flex gap-3 items-center md:items-start">
              <span className="text-sm md:text-base text-white mr-7">©2025 All rights reserved</span>
              <div className="flex gap-4 text-sm md:text-base flex-wrap justify-center md:justify-start">
                <a href="#" className="text-white no-underline transition-opacity duration-300 hover:opacity-70">Privacy policy</a>
                <a href="#" className="text-white no-underline transition-opacity duration-300 hover:opacity-70">Terms of service</a>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <a href="mailto:contact@example.com" className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white no-underline transition-all duration-300 border-none hover:bg-[#3a3a3a] hover:-translate-y-0.5" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white no-underline transition-all duration-300 border-none hover:bg-[#3a3a3a] hover:-translate-y-0.5" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

