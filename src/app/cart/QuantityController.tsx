"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { useState, useTransition } from "react";

interface RemoveFromCartButtonProps {
  item: CartItemWithProduct;
  increamentProductQuantity: (productId: string) => Promise<void>;
  decreamentProductQuantity: (productId: string) => Promise<void>;
}

export default function QuantityController({
  item,
  increamentProductQuantity,
  decreamentProductQuantity,
}: RemoveFromCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(item.quantity);

  const increamentProductItem = () => {
    startTransition(async () => {
      await increamentProductQuantity(item.product.id);
      setQuantity(quantity + 1);
    });
  };

  const decreamentProductItem = () => {
    startTransition(async () => {
      await decreamentProductQuantity(item.product.id);
      setQuantity(quantity - 1);
    });
  };
  return (
    <div className="join">
      <button
        className="join-item btn text-xl"
        onClick={() => decreamentProductItem()}
      >
        {quantity === 1 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="20"
            height="20"
            className="fill-white"
          >
            <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
          </svg>
        ) : (
          "-"
        )}
      </button>

      {isPending ? (
        <span className="loading loading-dots loading-md mx-2"></span>
      ) : (
        <button className="join-item btn">{item.quantity}</button>
      )}
      <button
        className="join-item btn text-xl"
        onClick={() => increamentProductItem()}
      >
        +
      </button>
    </div>
  );
}
