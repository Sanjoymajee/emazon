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
    <div className="group min-w-[365px] card w-full bg-base-100 shadow-xl image-full">
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="group-hover:scale-150 transition-all duration-500 ease-in-out rounded-lg w-3/4"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-accent text-2xl">{product.name}</h2>
        {bestSeller && <div className="badge badge-primary">Best Seller</div>}
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
          <Link href={`/products/${product.id}`} className="btn btn-primary">
            Check it
          </Link>
        </div>
      </div>
    </div>
  );
}
