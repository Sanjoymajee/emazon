import { USDconversion } from "@/components/ProductCard";
import { CartItemWithProduct } from "@/lib/db/cart";
import Image from "next/image";
interface CartItemProps {
  item: CartItemWithProduct;
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className="group card max-w-40 bg-neutral shadow-xl">
      <figure>
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          width={500}
          height={500}
          className="max-h-44 w-full object-cover group-hover:scale-125 transition-all duration-500 ease-in-out"
        ></Image>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.product.name}</h2>
        <div className="card-actions justify-between gap-3">
          <div className="flex gap-5">
            <div className="badge badge-accent ">
              {USDconversion(item.product.price)}
            </div>
            <div className="badge badge-secondary line-through">
              {USDconversion(item.product.price * 1.2)}
            </div>
          </div>
          <button className="btn btn-primary">Remove from Cart</button>
        </div>
      </div>
    </div>
  );
}
