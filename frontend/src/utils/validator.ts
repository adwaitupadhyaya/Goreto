import { Schema } from "joi";
import { IForm } from "../interface/form";

export function validateForm(formData: IForm, schema: Schema) {
  const { error } = schema.validate(formData);
  return error ? error.details : null;
}
