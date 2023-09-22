import { FieldErrors, UseFormRegister } from "react-hook-form";

import { STATES, TEXTS } from "../../constants";
import { DateInput } from "./DateInput";
import { ValidationSchemaValues } from "./schema";
import { SelectInput } from "./SelectInput";
import { TextInput } from "./TextInput";

interface ShippingForm {
  register: UseFormRegister<ValidationSchemaValues>;
  errors: FieldErrors<ValidationSchemaValues>;
}
export const ShippingForm = ({ register, errors }: ShippingForm) => {
  return (
    <form>
      <div className="flex gap-8">
        <TextInput
          id="name"
          label={TEXTS.shipping.labels.name}
          register={register("name")}
          error={errors.name}
          className="w-1/2"
        />
        <TextInput
          id="surname"
          label={TEXTS.shipping.labels.surname}
          register={register("surname")}
          error={errors.surname}
          className="w-1/2"
        />
      </div>

      <TextInput
        id="phone"
        label={TEXTS.shipping.labels.phoneNumber}
        register={register("phoneNumber")}
        error={errors.phoneNumber}
      />
      <TextInput id="email" label={TEXTS.shipping.labels.email} register={register("email")} error={errors.email} />
      <DateInput
        id="date"
        label={TEXTS.shipping.labels.dateOfBirth}
        register={register("dateOfBirth")}
        error={errors.dateOfBirth}
      />
      <TextInput
        id="address"
        label={TEXTS.shipping.labels.address}
        register={register("address")}
        error={errors.address}
      />
      <TextInput id="city" label={TEXTS.shipping.labels.city} register={register("city")} error={errors.city} />

      <div className="flex gap-8">
        <SelectInput
          id="state"
          label={TEXTS.shipping.labels.state}
          options={STATES}
          register={register("state")}
          error={errors.state}
          className="w-1/2"
        />
        <TextInput
          id="zip"
          label={TEXTS.shipping.labels.zipCode}
          register={register("zipCode")}
          error={errors.zipCode}
          className="w-1/2"
        />
      </div>
    </form>
  );
};
