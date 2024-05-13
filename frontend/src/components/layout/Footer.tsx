import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-5 w-full">
      <div className="container mx-auto flex justify-between items-center w-full">
        <div>
          <span>Copyright © 2024 Scoville-Enseigner</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="https://github.com/dotM87/eva-pw-reboot" className="hover:text-blue-500">Github Repo</Link>
          <Link to="#" className="hover:text-blue-500">Team</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;