import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Product } from "@prisma/client";
import Image from "next/image";
import { USDconversion } from "@/components/ProductCard";
interface ProductPageProps {
  params: {
    productId: string;
  };
}

const getProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {id: productId},
  });
  if (!product) notFound();
  return product;
};

export default async function ProductPage({
  params: { productId },
}: ProductPageProps) {
  const product: Product = await getProduct(productId);
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure><Image className="hover:scale-125 transition-all duration-500 ease-in-out" src={product.imageUrl} alt={product.name} width={800} height={400}/></figure>
        <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.description}</p>
            <div className="card-actions justify-between">
            <div className="badge badge-secondary">{USDconversion(product.price)}</div>
            <button className="btn btn-primary">Buy</button>
            </div>
        </div>
    </div>
  );
}
