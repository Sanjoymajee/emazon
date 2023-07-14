"use client";

import { useTransition } from "react";
import AddTag from "./AddTag";
import InputField from "./InputField";

interface Form {
  addProduct: (formData: FormData) => Promise<void>;
}

export default function Form({ addProduct }: Form) {
  const [isPending, startTransition] = useTransition();
  const submitForm = async (formData: FormData) => {
    startTransition(async () => {
      await addProduct(formData);
    });
  };
  return (
    <form action={submitForm} className="flex flex-col">
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
      <button
        disabled={isPending}
        className="btn btn-primary btn-sm md:btn-md mt-2"
        type="submit"
      >
        {isPending ? (
          <span className="loading loading-bars loading-xs"></span>
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
}
