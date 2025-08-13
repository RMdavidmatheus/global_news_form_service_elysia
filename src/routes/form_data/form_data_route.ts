import { FormDataSchema } from "./../../models/form_data/form_data_model";
import Elysia, { t } from "elysia";
import { FormDataController } from "../../controllers/form_data/form_data_controller";
import { FormDataService } from "../../services/form_data/form_data_service";
import { prisma } from "../../context/db_service/prisma_service";

//* Inyect the db
const db = prisma;

//* Inyect the service
const service = new FormDataService(db);

//* Inyect the controller
const controller = new FormDataController(service);

//* Response schema
const GetAllFormsResponseSchema = t.Object({
  data: t.Array(FormDataSchema),
});

//* Routes
export const formRoutes = new Elysia({ prefix: "/form-data" })
  //* Get all forms
  .get("/", controller.getAllForms, {
    detail: {
      tags: ["Application"],
      summary: "Obtener todos los formularios",
      description: "Retorna una lista de formularios registrados",
      responses: {
        200: {
          description: "Form list",
          content: {
            "application/json": {
              schema: GetAllFormsResponseSchema,
            },
          },
        },
        204: {
          description: "No content",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  })
  .get("/excel", controller.getExcel, {
    detail: {
      tags: ["Application"],
      summary: "Obtener todos los formularios en excel",
      description: "Retorna un archivo excel con todos los formularios registrados",
      responses: {
        200: {
          description: "Excel file",
          content: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
              schema: t.Object({
                type: t.Literal("buffer"),
              }),
            },
          },
        },
        204: {
          description: "No content",
        },
        500: {
          description: "Internal server error",
        },
      }
    }
  })
  //* Get form data by id
  .get("/form", controller.getFormDataById, {
    query: t.Object({
      id: t.String({
        description: "El id del formulario a obtener",
      }),
    }),
    detail: {
      tags: ["Application"],
      summary: "Obtener un formulario por id",
      description: "Retorna un formulario registrado",
      responses: {
        200: {
          description: "Form found",
          content: {
            "application/json": {
              schema: FormDataSchema,
            },
          },
        },
        404: {
          description: "Form not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  })
  //* Create form data
  .post("/", controller.createFormData, {
    body: t.Object({
      email_client: t.String(),
      name_client: t.String(),
      name_company: t.String(),
      sector_client: t.String(),
    }),
    detail: {
      tags: ["Application"],
      summary: "Crear un formulario",
      description: "Crea un formulario registrado",
      responses: {
        201: {
          description: "Form created and email sent",
        },
        400: {
          description: "Form not created",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  })
  .put("/form", controller.updateFormData, {
    query: t.Object({
      id: t.String({
        description: "El id del formulario a actualizar",
      }),
    }),
    body: t.Object({
      email_client: t.String(),
      name_client: t.String(),
      name_company: t.String(),
      sector_client: t.String(),
    }),
    detail: {
      tags: ["Application"],
      summary: "Actualizar un formulario",
      description: "Actualiza un formulario registrado",
      responses: {
        200: {
          description: "Form updated",
        },
        404: {
          description: "Form not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  })
  .delete("/form", controller.deleteFormData, {
    query: t.Object({
      id: t.String({
        description: "El id del formulario a eliminar",
      }),
    }),
    detail: {
      tags: ["Application"],
      summary: "Eliminar un formulario",
      description: "Elimina un formulario registrado",
      responses: {
        200: {
          description: "Form deleted",
        },
        404: {
          description: "Form not found",
        },
        500: {
          description: "Internal server error",
        }
      },
    },
  });
