import { Link } from "react-router-dom";
import { BsTelegram, BsTwitter } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";

interface FooterProps {
  className?: React.CSSProperties | string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <div
      className={`p-4 flex items-center justify-between bg-white ${className}`}
    >
      <Link to="" className="mx-4 inline-block">
        <BsTelegram fill="#3CAEEA" size={32} />
      </Link>
      <Link to="" className="mx-4 inline-block">
        <SiDiscord fill="#8A9CFC" size={32} />
      </Link>
      <Link to="" className="mx-4 inline-block">
        <BsTwitter fill="#328EE6" size={32} />
      </Link>
      <Link to="" className="mx-4 inline-block">
        <img src="/opensea.svg" alt="" className="w-8 h-8" />
      </Link>
    </div>
  );
};

export default Footer;
