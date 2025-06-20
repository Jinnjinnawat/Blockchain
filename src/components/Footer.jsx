import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
      <footer className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.3),transparent_50%)]"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto w-full max-w-screen-xl p-6 py-12 lg:py-16">
          {/* Main Content */}
          <div className="md:flex md:justify-between mb-12">
            {/* Brand Section */}
            <div className="mb-8 md:mb-0">
              <a href="#" className="group flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                    TaladKaset
                  </span>
                  <p className="text-sm text-emerald-200 mt-1">Modern Agricultural Marketplace</p>
                </div>
              </a>
              <p className="mt-4 text-emerald-100 max-w-md leading-relaxed">
                เชื่อมต่อเกษตรกรกับผู้บริโภค ด้วยเทคโนโลยีที่ทันสมัย เพื่ออนาคตที่ยั่งยืนของเกษตรไทย
              </p>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12">
              {/* Resources */}
              <div>
                <h3 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider relative">
                  Resources
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent"></div>
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Documentation</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">API Reference</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Tutorials</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Community */}
              <div>
                <h3 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider relative">
                  Community
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-transparent"></div>
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Discord</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Forums</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Newsletter</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider relative">
                  Legal
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-300 to-transparent"></div>
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-emerald-100 hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Cookie Policy</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-700"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 px-6">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm text-emerald-200">
                © 2024 TaladKaset. All rights reserved. Made with ❤️ in Thailand
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-4 mt-6 sm:mt-0">
              {[
                { icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z", label: "Twitter", color: "hover:text-emerald-300" },
                { icon: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z", label: "Twitter", color: "hover:text-emerald-300" },
                { icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.219-.438-.219-1.085c0-1.016.588-1.775 1.321-1.775.623 0 .924.466.924 1.025 0 .624-.396 1.559-.601 2.424-.171.718.359 1.304 1.066 1.304 1.279 0 2.263-1.35 2.263-3.302 0-1.726-1.240-2.933-3.008-2.933-2.049 0-3.252 1.538-3.252 3.129 0 .620.237 1.284.534 1.644a.309.309 0 01.071.295c-.078.324-.252 1.035-.287 1.181-.046.191-.145.233-.334.141-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.190 6.22-1.013 0-1.966-.527-2.291-1.155l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.990-5.367 11.990-11.987C24.007 5.367 18.641.001 12.017.001z", label: "Pinterest", color: "hover:text-green-300" },
                { icon: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701", label: "Apple", color: "hover:text-white" },
                { icon: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", label: "Google", color: "hover:text-emerald-300" },
                { icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", label: "LinkedIn", color: "hover:text-emerald-300" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center text-emerald-200 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-emerald-700/50 backdrop-blur-sm border border-emerald-600/30`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer