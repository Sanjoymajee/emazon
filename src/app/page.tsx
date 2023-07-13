import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const product = await prisma.product.findMany();
  const featuredProducts = product.splice(0, 5);
  return (
    <div className="min-w-[300px] max-w-7xl mx-auto bg-neutral p-4 rounded-xl lg:p-8 lg:rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
      <div className="bg-base-100 carousel carousel-center w-full md:p-4 space-x-4 rounded-box">
        {featuredProducts.map((featuredProduct) => (
          <div
            key={featuredProduct.id}
            className="group carousel-item w-full card card-compact lg:card-normal min-w-[300px] max-w-[500px] shadow-xl image-full"
          >
            <figure>
              <Image
                src={featuredProduct.imageUrl}
                alt={featuredProduct.name}
                width={500}
                height={200}
                className="md:group-hover:scale-125 transition-all duration-500 ease-in-out"
              />
            </figure>
            <div className="card-body">
              <div className="flex gap-2 flex-col">
                <h2 className="card-title">{featuredProduct.name}</h2>
                <span className="badge badge-primary badge-outline">
                  Featured
                </span>
              </div>
              <p>{featuredProduct.description}</p>
              <div className="card-actions justify-end">
                <Link
                  href={`/products/${featuredProduct.id}`}
                  className="btn btn-primary"
                >
                  check it
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
