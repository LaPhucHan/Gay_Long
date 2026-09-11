"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const bootLogs = [
      "[SYSTEM] Initializing Kernel v6.12.0-CYBER...",
      "[DEVOPS] Docker Containerizing Next.js Engine...",
      "[NETWORK] Connecting to Secure CI/CD Pipeline...",
      "[SECURITY] Bypassing Mainframe Firewalls...",
      "[DIAGNOSTIC] Analyzing Target System Status...",
      "[CRITICAL] DIAGNOSTIC COMPLETE. CORE REPORT READY.",
    ];

    bootLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, (index + 1) * 600);
    });

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-6 flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Background Matrix Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#00ff00_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

      {/* Main Terminal Window */}
      <div className="w-full max-w-4xl bg-zinc-950 border-2 border-green-500 shadow-[0_0_50px_rgba(0,255,0,0.3)] rounded-lg p-6 relative z-10 backdrop-blur-md">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-green-800 pb-4 mb-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
          </div>
          <p className="text-xs text-green-400 tracking-widest font-bold uppercase">
            ROOT@DEVOPS-SERVER:~ # MAIN_CONTROL_CENTER
          </p>
        </div>

        {/* System Logs Area */}
        <div className="space-y-2 text-sm md:text-base h-40 overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-green-500">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-green-700">&gt;</span>
              <span className="drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">{log}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs mb-1">
            <span>OVERALL DEPLOYMENT STATUS</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-zinc-900 border border-green-800 h-4 rounded overflow-hidden p-0.5">
            <div
              className="bg-green-500 h-full transition-all duration-75 shadow-[0_0_15px_#00ff00]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Dramatic Hân Cấn Section */}
        <div className="border-2 border-dashed border-green-500 bg-green-950/20 p-6 rounded-md text-center relative group hover:border-red-500 transition-colors duration-300">
          <p className="text-xs text-green-600 tracking-widest mb-2 font-bold">
            [ ALERT: CRITICAL OVERRIDE DETECTED ]
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-green-600 tracking-wider animate-pulse drop-shadow-[0_0_20px_rgba(0,255,0,0.8)]">
            LONG GAY SYSTEM
          </h1>
          <p className="mt-2 text-sm text-green-400 opacity-80">
            SYSTEM STATUS: <span className="text-red-500 font-bold underline animate-ping">CRITICAL OVERLOAD</span>
          </p>
        </div>

        {/* Terminal Footer */}
        <div className="mt-6 pt-4 border-t border-green-900 flex flex-wrap justify-between text-xs text-green-700">
          <span>PORT: 3000 // DOCKERIZED</span>
          <span>GITHUB ACTIONS: ONLINE</span>
          <span>DEPLOYED TO: PRODUCTION</span>
        </div>
      </div>
    </div>
  );
}