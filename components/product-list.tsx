import { Product } from "@/types";

import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

interface ProductListProps {
  title: string;
  subtitle?: string;

  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
  title, 
  items,
  subtitle 
}) => {
  return (
    <div className="px-6 sm:px-0">
      <h3 className="font-bold text-3xl">
        {title}
      </h3>

      <h3
        className="pb-6 font-bold text-zinc-500 -mt-0.5"
      >
        {subtitle}
      </h3>

      {items.length === 0 && <NoResults />}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3
      lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard 
            key={item.id}
            data={item}
          />
        ))}
      </div>

      <hr 
        className="mt-4"
      />
    </div>
  )
}

export default ProductList;