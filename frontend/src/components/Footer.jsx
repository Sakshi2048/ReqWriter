import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="text-gray-600 bg-slate-950 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="ml-3 text-xl text-blue-500">ReqWriter</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2025 Hack-o-Hire —
            <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@hackathon</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
            <a className="ml-3 text-gray-500" href="https://github.com" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.385.6.113.793-.261.793-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.547-1.387-1.337-1.756-1.337-1.756-1.092-.747.083-.732.083-.732 1.207.085 1.842 1.24 1.842 1.24 1.073 1.84 2.815 1.307 3.502.998.11-.777.42-1.307.763-1.608-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.467-2.382 1.235-3.221-.124-.304-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.55 11.55 0 013.004-.404c1.02.005 2.047.137 3.004.404 2.29-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.872.118 3.176.77.839 1.233 1.911 1.233 3.221 0 4.61-2.807 5.624-5.48 5.921.43.372.814 1.102.814 2.222 0 1.606-.014 2.898-.014 3.29 0 .319.192.694.8.576C20.565 21.797 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Footer
