import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ComsumptionMethodOption from "./components/consumption-method-option";

interface RestauranPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestauranPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {/* LOGO E TITULO */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />

        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>

      {/* BEM VINDO */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="pt-24 text-center text-2xl">Seja Bem-vindo!.</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer
          praticidade e sabor em cada detalhe!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-14">
        <ComsumptionMethodOption
          imageAlt="Para comer aqui"
          buttonText="Comer aqui"
          imageUrl="/dine_in.png"
          option="DINE_IN"
          slug={slug}
        />
        <ComsumptionMethodOption
          imageAlt="Para Levar"
          buttonText="Para levar"
          imageUrl="/takeway.png"
          option="TAKEAWAY"
          slug={slug}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
