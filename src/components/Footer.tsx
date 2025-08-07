import { Link } from 'react-router-dom';
import { BriefcaseBusiness, Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-neutral-200 bg-neutral-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        {/* Logo */}
        <Link to="/home" className="text-xl font-semibold">
          <span className="text-green-500">Mern</span> Foods
        </Link>

        <div />

        {/* Social Icons */}
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger>
              <Link
                to={'https://www.linkedin.com/in/gilson-de-almeida/'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-green-500"
              >
                <Linkedin size={18} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>My LinkedIn</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link
                to={'https://github.com/Gilson96/mern-food'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-green-500"
              >
                <Github size={18} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>My Github</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link
                to={'https://new-portfolio-ten-orpin.vercel.app/'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-green-500"
              >
                <BriefcaseBusiness size={18} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>My Portfolio</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-neutral-200 py-4 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} Mern Foods. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
