import Link from "next/link";

import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import Container from "@/components/ui/container";

import getCategories from "@/actions/get-categories";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href='/' className="ml-2 flex gap-x-2">
            <p className="font-bold text-xl">
              HyLink
            </p>
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