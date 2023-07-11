"use server";

import { getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const increamentProductQuantity = async (productId: string) => {
  const cart = await getCart();
  if (!cart) throw new Error("Cart not found");
  const itemInCart = cart.items.find((item) => item.productId === productId);
  if (!itemInCart) throw new Error("Item not found in cart");
  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: {
        update: {
          where: {
            id: itemInCart.id,
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        },
      },
    },
  });

  revalidatePath("/cart");
};

export const decreamentProductQuantity = async (productId: string) => {
  const cart = await getCart();
  if (!cart) throw new Error("Cart not found");
  const itemInCart = cart.items.find((item) => item.productId === productId);
  if (!itemInCart) throw new Error("Item not found in cart");
  if (itemInCart.quantity === 1) {
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          delete: {
            id: itemInCart.id,
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: {
              id: itemInCart.id,
            },
            data: {
              quantity: {
                decrement: 1,
              },
            },
          },
        },
      },
    });
  }

  revalidatePath("/cart");
};
