import { Type as t } from "@sinclair/typebox";
import { Static } from "elysia";

//* Form data schema
export const FormDataSchema = t.Object({
  id: t.String(),
  name_client: t.String(),
  name_company: t.String(),
  email_client: t.String(),
  sector_client: t.String(),
  is_active: t.Boolean(),
  created_at: t.String({ format: "date-time" }),
  updated_at: t.Optional(t.String({ format: "date-time" })),
  deleted_at: t.Optional(t.String({ format: "date-time" })),
});

//* Form data model
export type FormDataModel = Static<typeof FormDataSchema>;
