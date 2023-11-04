import { CartOrder } from "@/hooks/use-cart";

import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  sizeId?: string;
  colorId?: string;

  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<CartOrder[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      sizeId: query.sizeId,
      colorId: query.colorId,
      isFeatured: query.isFeatured
    }
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;