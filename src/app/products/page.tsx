import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";

export const metadata = {
  title: "Products - Emazon",
  description: "Emazon products",
};

export default async function Products() {
  const products: Product[] = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex max-w-7xl mx-auto flex-col lg:p-5">
      <h1 className="text-3xl font-bold mb-5">Products</h1>
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
