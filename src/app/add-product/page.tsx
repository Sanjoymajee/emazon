import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import AddTag from "./AddTag";
import InputField from "./InputField";

async function addProduct(formData: FormData) {
  "use server";
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

export default function AddProduct() {
  return (
    <div className="rounded-none md:rounded-xl min-w-[300px] max-w-2xl flex flex-col bg-neutral p-8 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-200">Add Product</h1>
      <form action={addProduct} className="flex flex-col">
        <InputField
          name="name"
          className="input border-none input-bordered input-primary w-full max-w-2xl mb-2"
          label="Name"
          placeholder="Name"
          required={true}
          type="text"
        />
        <InputField
          name="price"
          className="input border-none input-bordered input-primary w-full max-w-2xl mb-2"
          label="Price"
          placeholder="Price"
          required={true}
          type="text"
        />
        <InputField
          name="description"
          className="textarea border-none textarea-primary mb-2"
          label="Description"
          placeholder="Description"
          required={true}
          type="text"
          textarea={true}
        />
        <InputField
          name="image"
          className="input border-none input-bordered input-primary w-full max-w-2xl mb-2"
          label="Image URL"
          placeholder="Image URL"
          required={true}
          type="text"
        />
        <InputField
          name="brand"
          className="input border-none input-bordered input-primary w-full max-w-2xl mb-2"
          label="Brand"
          placeholder="Brand"
          required={true}
          type="text"
        />
        <AddTag />
        <button className="btn btn-primary btn-sm md:btn-md mt-2" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
