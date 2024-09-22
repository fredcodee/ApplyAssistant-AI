import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar px-0">
                <div className="flex-1" style={{paddingLeft: "2rem"}}>
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="112" height="31">
                            <g fill="none" fillRule="evenodd" transform="translate(.991 .3)">
                                <path
                                    fill="#FFF"
                                    fillRule="nonzero"
                                    d="M4.575 24.593c.583 0 1.183-.108 1.8-.325.617-.217 1.092-.575 1.425-1.075h.05c-.408.7-.408 1.05 0 1.05h5.225v-6.925c0-.917-.096-1.783-.287-2.6a5.554 5.554 0 0 0-1-2.15c-.476-.617-1.121-1.1-1.938-1.45-.817-.35-1.85-.525-3.1-.525-1.167 0-2.3.208-3.4.625-1.1.417-1.838.828-2.638 1.595-.71.861.177 1.871 2.663 3.03a6.12 6.12 0 0 1 1.263-.787 3.49 3.49 0 0 1 1.512-.338c.45 0 .813.096 1.087.288.276.191.413.487.413.887v.05c-.867 0-1.754.058-2.663.175a8.825 8.825 0 0 0-2.462.663 4.863 4.863 0 0 0-1.813 1.35C.238 18.706 0 19.45 0 20.368c0 .783.142 1.442.425 1.975.283.533.646.967 1.087 1.3a4.37 4.37 0 0 0 1.475.725c.542.15 1.071.225 1.588.225Z"
                                ></path>
                            </g>
                        </svg>
                    </a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal gap-0 max-sm:p-0 text-xs lg:text-sm">
                        <li>
                            <details>
                                <summary className="text-white font-bold">AI tools</summary>
                                <ul className="z-[2] w-max">
                                    <li><a href="/resume-builder">AI Resume builder</a></li>
                                    <li><a href="/ai-cover-letter-generator">AI Cover letter</a></li>
                                    <li><a href="/dashboard/jobs">Job Dashboard</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a href="/signin" className="font-bold hover:text-white bg-black">Login</a></li>
                    </ul>
                </div>
            </nav>
    </div>
  )
}

export default Navbar