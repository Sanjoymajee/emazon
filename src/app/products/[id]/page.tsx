import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Product } from "@prisma/client";
import Image from "next/image";
import { USDconversion } from "@/components/ProductCard";
import { cache } from "react";
import { Metadata } from "next";
import AddToCartButton from "./AddToCartButton";
import { increamentProductQuantity } from "./action";
import ImageItem from "./ImageItem";
interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product: Product = await getProduct(id);
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
  params: { id },
}: ProductPageProps) {
  const product: Product = await getProduct(id);
  return (
    <div className="card min-w-[300px] m-0 rounded-xl lg:card-side bg-neutral shadow-xl max-w-5xl lg:mx-auto lg:my-5">
      <ImageItem product={product} />
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
