import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

import getProducts from "@/actions/get-products";
import getBillboard from "@/actions/get-billboard";
import AboutUs from "@/components/about-us";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("e57a83bb-cdc3-4d38-a7a5-c1f3a7e0be15");

  return (
    <div>
      <div
        className="pb-10"
      >
        <Billboard 
          data={billboard}
        />
      </div>
      
      <Container>
        <div className="space-y-10 pb-10">
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList 
              title='Featured Products'
              subtitle="A selection of our best-selling products"
              items={products}
            />
          </div>

          <AboutUs />

          <Testimonials />

          <Contact />
        </div>
      </Container>
    </div>
  )
}

export default HomePage;