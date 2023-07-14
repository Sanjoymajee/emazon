"use client";

import { Product } from "@prisma/client";
import Image from "next/image";

interface ImageItemProps {
  product: Product;
}

export default function ImageItem({ product }: ImageItemProps) {
  return (
    <figure className="relative lg:w-1/2 max-h-[600px]">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={200}
      />
    </figure>
  );
}
