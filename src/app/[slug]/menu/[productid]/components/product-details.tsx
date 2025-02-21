"use client"

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: { 
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true
        }
      }
    }
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if(prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col relative overflow-hidden z-50 mt-[-1.5rem] rounded-t-3xl p-5 flex-auto">
       <div className="flex-auto overflow-hidden">
         {/* RESTAURANTE */}
        <div className="flex items-center gap-1.5">
          <Image 
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <div className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </div>
        </div>

        {/* NOME DO PRODUTO */}
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        {/* PREÇO E QUANTIDADE */}
        <div className="flex items-center justify-between mt-3">
         <h3 className="text-xl font-semibold">
           {formatCurrency(product.price)}
         </h3>
         <div className="flex items-center gap-3 text-center">
          <Button className="w-8 h-8 p-1 rounded-xl" variant="outline" onClick={handleDecreaseQuantity}>
            <ChevronLeftIcon />
          </Button>
          <p className="w-4">{quantity}</p>
          <Button className="w-8 h-8 p-1 rounded-xl" variant="destructive" onClick={handleIncreaseQuantity}>
            <ChevronRightIcon />
          </Button>
         </div>
        </div>

       <ScrollArea className="h-full">
         {/* SOBRE */}
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Sobre</h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        {/* INGREDIENTES */}
        <div className="mt-6 space-y-3">
          <div className="5 flex items-center gap-1">
            <ChefHatIcon size={18}/>
            <h4 className="font-semibold">Ingredientes</h4>
          </div>
          <ul className="list-disc px-5 text-sm text-muted-foreground">
            {product.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>           
        </div>
       </ScrollArea>
      </div>
        
        <Button className=" w-full rounded-full">Adicionar à sacola</Button>
    </div>
  );
}
 
export default ProductDetails;