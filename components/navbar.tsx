import Link from "next/link";

import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import Container from "@/components/ui/container";

import getCategories from "@/actions/get-categories";

import sunset from '@/public/images/sunset.png';
import Image from "next/image";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link 
            href='/' 
            className="ml-2 flex gap-x-2 items-center justify-center"
          >
            <p className="font-bold text-2xl md:text-3xl text-zinc-300 flex">
              <p className="store-name-letter">S</p>
              <p className="store-name-letter">u</p>
              <p className="store-name-letter">n</p>
              <p className="store-name-letter">s</p>
              <p className="store-name-letter">e</p>
              <p className="store-name-letter">t</p>
            </p>

            <div
              className="dark:hover:bg-zinc-100 hover:bg-zinc-200
              dark:bg-zinc-300 transition duration-300 rounded-full p-1 mb-1
              hidden md:block"
            >
              <Image 
                alt="logo"
                className="h-7 w-7 object-cover object-center rounded-full"
                src={sunset}
              />
            </div>

          </Link> 
          <MainNav 
            data={categories}
          />
          <NavbarActions />
        </div>
      </Container>
    </div>
  )
}

export default Navbar;