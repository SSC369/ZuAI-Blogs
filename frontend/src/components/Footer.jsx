import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} ZuAI{" "}
            <span className="text-purple-800 font-semibold">Blogs</span>. All
            rights reserved.
          </p>
        </div>
        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-purple-800 mx-2">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-800 mx-2">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-800 mx-2">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
