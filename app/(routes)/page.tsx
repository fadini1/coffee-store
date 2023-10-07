import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

import getProducts from "@/actions/get-products";
import getBillboard from "@/actions/get-billboard";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("cab1dfb3-7b7d-410e-8a1e-54efc751346f");

  return (
    <Container>
      <div className="space-y-10 pb-10 dark:bg-zinc-900 dark:text-zinc-300">
        <Billboard 
          data={billboard}
        />
      
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList 
            title='Featured Products'
            items={products}
          />
        </div>
      </div>
    </Container>
  )
}

export default HomePage;