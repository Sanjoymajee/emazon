"use server";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("image") as string;
  const brand = formData.get("brand") as string;
  const tags = formData.get("tags") as string;
  const tagArray = tags.split(" ").join("").split(",");
  if (!name || !price || !description || !imageUrl) redirect("/add-product");
  if (!Number(price)) redirect("/add-product");
  await prisma.product.create({
    data: {
      name,
      price: Number(price),
      description,
      imageUrl,
      brand,
      tags: tagArray,
    },
  });
  redirect("/products");
}
