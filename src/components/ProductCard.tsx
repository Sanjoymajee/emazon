import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const USDconversion = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(price / 100);
};

export default function ProductCard({ product }: { product: Product }) {
  const bestSeller = false;
  return (
    <div className="card card-compact md:card-normal group min-w-[300px] w-full bg-neutral shadow-xl">
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="max-h-64 w-full object-cover lg:group-hover:scale-125 transition-all duration-500 ease-in-out"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-between flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="badge badge-accent ">
              {USDconversion(product.price)}
            </div>
            <div className="badge badge-secondary line-through">
              {USDconversion(product.price * 1.2)}
            </div>
          </div>
          <Link href={`/products/${product.id}`} className="btn btn-primary">
            Check it
          </Link>
        </div>
      </div>
    </div>
  );
}
