import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";

import Filter from "./components/filter";
import MobileFilters from "./components/mobile-filters";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    colorId: string;
    sizeId: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId
  });

  return (
    <div>
      <div
        className="pb-10"
      >
        <Billboard 
          billboardDescription="cock"
          data={category.billboard}
        />
      </div>

      <Container>
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-4">
            <MobileFilters 
              sizes={sizes}
              colors={colors}
            />

            <div className="hidden lg:block">
              <Filter 
                name='Sizes'
                valueKey='sizeId'
                data={sizes}
              />

              <Filter 
                name='Colors'
                valueKey='colorId'
                data={colors}
              />
            </div>

            <div className="mt-4 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}

              <div className="grid grid-cols-1 sm:grid-cols-2
              md:grid-cols-3 lg:grid-cols-4 gap-2">
                {products.map((item) => (
                  <ProductCard 
                    data={item}
                    key={item.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage;