import { Product } from "@prisma/client";
import Image from "next/image";

export const USDconversion = (price: number) => {
  return `$${price / 100 + (price % 100 === 0 ? ".00" : "")}`;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group min-w-[365px] card w-full bg-base-100 shadow-xl image-full">
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="group-hover:scale-150 transition-all 
          duration-500 ease-in-out rounded-lg w-3/4"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-between">
          <div className="badge badge-accent badge-outline">
            {USDconversion(product.price)}
          </div>
          <a href={`/products/${product.id}`} className="btn btn-primary">
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
