import React from 'react';
import '../assets/styles/output.css';
import Navbar from '../components/Navbar';

const Homepage = () => {
    return (
        <div
            className="grid grid-cols-[1fr_1rem_repeat(2,min(37.5rem,calc(50%-1rem)))_1rem_1fr] bg-top bg-no-repeat [background-size:200vw] lg:[background-size:100%_62rem] [:where(&>*):[grid-column:3/5]]"
            style={{ backgroundImage: "url('src/assets/images/bg.webp')" }}
        >
            <Navbar />
            <div
                className="grid place-content-center items-center gap-y-6 overflow-hidden [grid-column:3/5] lg:h-[clamp(40rem,calc(100vh-4rem),50rem)] lg:justify-between lg:[grid-column:3/7] lg:[grid-template-columns:subgrid]">
                <div className="z-[1] flex flex-col items-start gap-6 py-6">
                    <h1 className="relative font-title text-[clamp(4rem,20vw,3.75rem)] leading-none">
                        Supercharge Your <br /><span className="font-bold">Job Applications</span> with AI
                    </h1>
                    <p className="text-lg [text-wrap:balance]">
                    Create professional resumes and cover letters in minutes with our AI-powered platform. Get noticed and land your next job fast!
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <a href="/signin" className="btn btn-accent px-10">Start now ✦</a>
                    </div>
                </div>
                <div
                    className="grid h-full max-h-[50rem] w-auto place-content-center [perspective-origin:50%_100%] [perspective:60rem] lg:[grid-column:2/4]">
                    <div
                        className="flex w-full flex-col items-center lg:flex-row lg:[transform:rotateX(2deg)rotateY(-10deg)rotateZ(5deg)]">
                        <div className="me-2 animate-[wiggle_10s_infinite_alternate] rounded-3xl bg-black/10 p-2">
                            <div x-data=""
                                className="w-[260px] animate-[wiggle_10s_infinite_alternate] rounded-2xl border border-primary/10 bg-gradient-to-tr from-white to-white/80 p-6 font-mono text-xs text-black shadow-[.1rem_0.1rem_oklch(0%_0_0/_0.02),.5rem_2rem_2rem_-1rem_oklch(0%_0_0/.18)] lg:min-w-[20rem] lg:text-sm">
                                <div className="w-0 animate-[command-1_10s_steps(27)_infinite] overflow-hidden whitespace-nowrap">
                                    <span className="text-success"> ❇︎</span> Running AIApplyAssistant
                                </div>
                                <div className="w-0 animate-[command-3_10s_steps(27)_infinite] overflow-hidden whitespace-nowrap">
                                    Generating resume <span className="text-success">✔︎</span>
                                </div>
                                <div className="w-0 animate-[command-4_10s_steps(27)_infinite] overflow-hidden whitespace-nowrap">
                                    Generating cover letter <span className="text-success">✔︎</span>
                                </div>
                                <div className="w-0 animate-[command-5_10s_steps(27)_infinite] overflow-hidden whitespace-nowrap">
                                    Generating followup email <span className="text-success">✔︎</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex rotate-90 flex-col max-lg:-my-12 lg:rotate-0 lg:text-white/60">
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className="animate-[path-1_30s_infinite]">
                                <path d="M98 2C45.5 2 56 98 2 98" stroke="currentColor" stroke-dasharray="4"
                                    className="animate-[dash_2s_linear_infinite]"></path>
                            </svg>
                            <svg width="100" height="6" viewBox="0 0 100 6" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className="animate-[path-2_30s_infinite]">
                                <path d="M98 3H2" stroke="currentColor" stroke-dasharray="4"
                                    className="animate-[dash_2s_linear_infinite]"></path>
                            </svg>
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className="animate-[path-3_30s_infinite]">
                                <path d="M98 98C54.5 98 44 2 2 2" stroke="currentColor" stroke-dasharray="4"
                                    className="animate-[dash_2s_linear_infinite]"></path>
                            </svg>
                        </div>
                        <div
                            className="whitespace-nowrap lg:[mask-image:linear-gradient(to_bottom,transparent_10%,black_15%,black_85%,transparent_90%)]">
                            <div
                                className="flex gap-x-2 gap-y-4 max-sm:-mx-20 max-sm:[scale:70%] lg:animate-[positions-vertical_10s_infinite_alternate] lg:flex-col lg:p-4">
                                <div
                                    className="rounded-2xl border border-base-content/10 bg-base-100/5 p-3 max-lg:hidden lg:border-white/20 lg:p-5 lg:text-white">
                                </div>
                                <div
                                    className="rounded-2xl border border-base-content/10 bg-base-100/5 p-3 lg:border-white/20 lg:p-5 lg:text-white">
                                    <div className="text-sm font-bold">Software Engineer</div>
                                    <div className="text-xs tracking-wider opacity-80">
                                    Remote, US
                                    </div>
                                </div>
                                <div
                                    className="rounded-2xl border border-base-content/10 bg-base-100/5 p-3 lg:border-white/20 lg:p-5 lg:text-white">
                                    <div className="text-sm font-bold">Backend Developer</div>
                                    <div className="text-xs tracking-wider opacity-80">
                                        Remote, Worldwide
                                    </div>
                                </div>
                                <div
                                    className="rounded-2xl border border-base-content/10 bg-base-100/5 p-3 lg:border-white/20 lg:p-5 lg:text-white">
                                    <div className="text-sm font-bold">Product Manager</div>
                                    <div className="text-xs tracking-wider opacity-80">
                                        Full-time, LA 
                                    </div>
                                </div>
                                <div
                                    className="rounded-2xl border border-base-content/10 bg-base-100/5 p-3 [xmask-image:linear-gradient(to_bottom,black,transparent_50%)] max-lg:hidden lg:border-white/20 lg:p-5 lg:text-white">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
            <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <a className="border-bottom" href="https://thefredcode.com">Fredcode</a>,  All Right Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Homepage;
