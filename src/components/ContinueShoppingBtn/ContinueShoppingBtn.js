"use client";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

const ContinueShoppingBtn = () => {
  const router = useRouter();

  const handleContinueShopping = () => {
    localStorage.removeItem("cart");
    router.push("/");
  };

  return (
      <Button btnType="Primary" clicked={handleContinueShopping}>
        Continue Shopping
      </Button>
  );
};

export default ContinueShoppingBtn;
