import "unfetch/polyfill";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ShippingForm, validationSchema, ValidationSchemaValues } from "../components/ShippingForm";
import { Summary } from "../components/Summary";
import { TEXTS } from "../constants";
import { drawnMinifigsAtom, selectedMinifigAtom } from "../store";

function ShippingView() {
  const navigate = useNavigate();
  const [_drawnMinifigs, setDrawnMinifigs] = useAtom(drawnMinifigsAtom);
  const [selectedMinifig] = useAtom(selectedMinifigAtom);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ValidationSchemaValues>({
    mode: "onTouched",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: ValidationSchemaValues) => {
    console.log({ data });
    fetch("/fake-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key ${import.meta.env.VITE_REBRICKABLE_API_KEY}`,
      },
      body: JSON.stringify({
        productId: selectedMinifig?.set_num,
        shippingDetails: {
          ...data,
        },
      }),
    });

    setDrawnMinifigs(RESET);
    navigate("/");
  };

  if (!selectedMinifig) {
    navigate("/select");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-3 lg:h-screen lg:flex-row lg:p-6">
      <div className="w-full lg:flex lg:h-full lg:w-3/5 lg:flex-col lg:justify-center">
        <h1 className="mb-12 text-3xl font-extrabold uppercase">{TEXTS.shipping.title}</h1>
        <ShippingForm register={register} errors={errors} />
      </div>

      <div className="w-full lg:h-full lg:w-2/5">
        <Summary selectedMinifig={selectedMinifig} onSubmit={handleSubmit(onSubmit)} isSubmitDisabled={!isValid} />
      </div>
    </div>
  );
}

export default ShippingView;
