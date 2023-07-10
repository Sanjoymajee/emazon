import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Product } from "@prisma/client";
import Image from "next/image";
import { USDconversion } from "@/components/ProductCard";
import { cache } from "react";
import { Metadata } from "next";
interface ProductPageProps {
  params: {
    productId: string;
  };
}

export async function generateMetadata({
  params: { productId },
}: ProductPageProps): Promise<Metadata> {
  const product: Product = await getProduct(productId);
  return {
    title: product.name + " - Emazon",
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.imageUrl,
        },
      ],
    },
  };
}

const getProduct = cache(async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) notFound();
  return product;
});

export default async function ProductPage({
  params: { productId },
}: ProductPageProps) {
  const product: Product = await getProduct(productId);
  return (
    <div className="card min-w-[365px] rounded-none m-0 lg:rounded-xl lg:card-side bg-neutral shadow-xl max-w-5xl lg:mx-auto lg:my-5">
      <figure className="lg:w-1/2 max-h-[600px]">
        <Image
          className="hover:scale-125 transition-all duration-500 ease-in-out"
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={200}
        />
      </figure>
      <div className="card-body lg:w-1/2">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-between">
          <div className="flex gap-5">
            <div className="badge badge-accent ">
              {USDconversion(product.price)}
            </div>
            <div className="badge badge-secondary line-through">
              {USDconversion(product.price * 1.2)}
            </div>
          </div>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
