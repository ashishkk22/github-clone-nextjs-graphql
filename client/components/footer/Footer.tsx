import React from "react";
import Logo from "../navbar/Logo";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:flex-row bg-slate-900 lg:gap-4">
      <div className="flex items-center gap-4 pt-4 text-sm text-gray-600 lg:py-8">
        <Logo color="gray" /> © 2023 GitHub, Inc.
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 py-4 text-sm text-blue-400 lg:py-8 opacity-80">
        <button className="cursor-pointer">Terms</button>
        <button className="cursor-pointer">Privacy</button>
        <button className="cursor-pointer">Security</button>
        <button className="cursor-pointer">Status</button>
        <button className="cursor-pointer">Docs</button>
        <button className="cursor-pointer">Contact Github</button>
        <button className="cursor-pointer">Pricing</button>
        <button className="cursor-pointer">API</button>
        <button className="cursor-pointer">Training</button>
        <button className="cursor-pointer">Blog</button>
        <button className="cursor-pointer">About</button>
      </div>
    </div>
  );
};

export default Footer;
