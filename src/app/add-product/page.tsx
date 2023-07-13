import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

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
    <div className="rounded-none md:rounded-xl min-w-[365px] max-w-2xl flex flex-col bg-neutral p-8 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-200">Add Product</h1>
      <form action={addProduct} className="flex flex-col">
        <label className="text-gray-200 " htmlFor="name">
          Name
        </label>
        <input
          required
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          className="input border-none input-bordered input-primary w-full max-w-2xl mb-2"
        />
        <label htmlFor="price" className="text-gray-200">
          Price
        </label>
        <input
          required
          placeholder="Price"
          className="input border-none input-bordered input-primary w-full max-w-2xl mb-2"
          type="text"
          name="price"
          id="price"
        />
        <label className="text-gray-200" htmlFor="description">
          Description
        </label>
        <textarea
          required
          placeholder="Description"
          className="textarea border-none textarea-primary mb-2"
          name="description"
          id="description"
        ></textarea>
        <label htmlFor="image" className="text-gray-200">
          Image URL
        </label>
        <input
          required
          placeholder="Image URL"
          className="input border-none input-bordered input-primary w-full max-w-2xl mb-2"
          type="url"
          name="image"
          id="image"
        />
        <label htmlFor="brand" className="text-gray-200">
          Brand
        </label>
        <input
          required
          placeholder="Brand"
          className="input border-none input-bordered input-primary w-full max-w-2xl mb-2"
          type="text"
          name="brand"
          id="brand"
        />
        <label htmlFor="tags" className="text-gray-200">
          Tags
        </label>
        <div className="join">
          <input
            name="tags"
            id="tags"
            type="text"
            className="input border-none input-bordered join-item input-primary w-full max-w-2xl mb-2"
            placeholder="eg. electronics, gadgets, etc."
          />
          <button
            type="button"
            className="btn join-item rounded-r-full bg-base-100"
          >
            Add Tag
          </button>
        </div>
        <button
          className="btn btn-primary btn-xs sm:btn-sm md:btn-md mt-2"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
