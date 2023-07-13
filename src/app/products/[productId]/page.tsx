import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Product } from "@prisma/client";
import Image from "next/image";
import { USDconversion } from "@/components/ProductCard";
import { cache } from "react";
import { Metadata } from "next";
import AddToCartButton from "./AddToCartButton";
import { increamentProductQuantity } from "./action";
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
  // * Validate productId format
  if (!/^[0-9a-fA-F]{24}$/.test(productId)) notFound();
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
    <div className="card min-w-[300px] m-0 rounded-xl lg:card-side bg-neutral shadow-xl max-w-5xl lg:mx-auto lg:my-5">
      <figure className="lg:w-1/2 max-h-[600px]">
        <Image
          className="lg:hover:scale-125 transition-all duration-500 ease-in-out"
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={200}
        />
      </figure>
      <div className="card-body lg:w-1/2">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="flex flex-col card-actions justify-between gap-5">
          <div className="flex gap-5">
            <div className="badge badge-accent ">
              {USDconversion(product.price)}
            </div>
            <div className="badge badge-secondary line-through">
              {USDconversion(product.price * 1.2)}
            </div>
          </div>
          <AddToCartButton
            productId={product.id}
            increamentProductQuantity={increamentProductQuantity}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.tags.length > 0 &&
            product.tags.map((tag) => (
              <span key={tag} className="badge badge-primary badge-outline">
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
