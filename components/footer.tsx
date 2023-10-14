import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto py-10 flex items-center justify-center">
        <p className="text-center text-sm text-black dark:text-white">
          &copy; 2023 Sunset Inc. All Rights Reserved
        </p>
        
        <div
          className="flex pl-4 items-center gap-2"
        >
          <Link
            className="p-2 rounded-lg hover:scale-105 dark:bg-white
            text-black hover:bg-zinc-300 transition 
            dark:hover:bg-zinc-300"
            href='https://www.facebook.com/'
          >
            <Facebook 
              size={20}
            />
          </Link>

          <Link
            className="p-2 rounded-lg hover:scale-105 dark:bg-white
            text-black hover:bg-zinc-300 transition 
            dark:hover:bg-zinc-300"
            href='https://www.youtube.com/'
          >
            <Youtube 
              size={20}
            />
          </Link>

          <Link
            className="p-2 rounded-lg hover:scale-105 dark:bg-white
            text-black hover:bg-zinc-300 transition 
            dark:hover:bg-zinc-300"
            href='https://www.instagram.com/'
          >
            <Instagram 
              size={20}
            />
          </Link> 
        </div>
      </div>
    </footer>
  )
}

export default Footer;