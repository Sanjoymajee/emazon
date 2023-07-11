"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { useState, useTransition } from "react";

interface RemoveFromCartButtonProps {
  itemId: string;
  removeItemFromCart: (itemId: string) => Promise<void>;
}

export default function RemoveFromCartButton({
  itemId,
  removeItemFromCart,
}: RemoveFromCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const removeCartItem = () => {
    setSuccess(false);
    startTransition(async () => {
      await removeItemFromCart(itemId);
      setSuccess(true);
    });
  };
  return (
    <button className="btn btn-primary" onClick={() => removeCartItem()}>
      {isPending && <span className="loading loading-dots loading-md"></span>}
      Remove from Cart
    </button>
  );
}
