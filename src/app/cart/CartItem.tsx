import { USDconversion } from "@/components/ProductCard";
import { CartItemWithProduct } from "@/lib/db/cart";
import Image from "next/image";
import { increamentProductQuantity, decreamentProductQuantity } from "./action";
import QuantityController from "./QuantityController";

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
          className="max-h-44 w-full object-cover lg:group-hover:scale-125 transition-all duration-500 ease-in-out"
        ></Image>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.product.name}</h2>
        <div className="card-actions justify-between gap-3 flex flex-col">
          <div className="flex gap-5">
            <div className="badge badge-accent ">
              {USDconversion(item.product.price)}
            </div>
            <div className="badge badge-secondary line-through">
              {USDconversion(item.product.price * 1.2)}
            </div>
          </div>
          <QuantityController
            item={item}
            increamentProductQuantity={increamentProductQuantity}
            decreamentProductQuantity={decreamentProductQuantity}
          />
        </div>
      </div>
    </div>
  );
}
