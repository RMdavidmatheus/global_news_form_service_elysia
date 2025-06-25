import { prisma } from "./../../context/db_service/prisma_service";
import { FormDataModel } from "../../models/form_data/form_data_model";
import { capitalizeFirstLetter, mapFormData, sendEmail } from "./utils/form_data_utils";
import { FormDataBody } from "../../models/form_data/form_data_body";

export class FormDataService {
  //* Inyect the db service
  constructor(private readonly db: typeof prisma) {}

  //* Get all form data
  async getAllFormData(): Promise<FormDataModel[]> {
    try {
      const formData = await this.db.formInfo.findMany({
        where: { isActive: true },
      });

      if (!formData || formData.length === 0) {
        console.error(
          "❌ Error al obtener todos los datos del formulario, no se encontraron datos"
        );
        return [];
      }

      return mapFormData(formData) as FormDataModel[];
    } catch (error) {
      console.error("❌ Error getting all form data", error);
      throw error;
    }
  }

  //* Get form data by id
  async getFormDataById(id: string): Promise<FormDataModel> {
    try {
      const formData = await this.db.formInfo.findUnique({
        where: { id: id, isActive: true },
      });

      if (!formData || !formData.id) {
        console.error("❌ Error getting form data by id, form not found");
        return {} as FormDataModel;
      }

      return mapFormData(formData) as FormDataModel;
    } catch (error) {
      console.error("❌ Error getting form data by id", error);
      throw error;
    }
  }

  //* Create form data
  async createFormData(body: FormDataBody): Promise<FormDataModel> {
    try {
      const formData = await this.db.formInfo.create({
        data: {
          emailClient: body.email_client.toLowerCase(),
          nameClient: capitalizeFirstLetter(body.name_client),
          nameCompany: capitalizeFirstLetter(body.name_company),
          sectorClient: capitalizeFirstLetter(body.sector_client),
        },
      });

      if (!formData) {
        console.error("❌ Error creating form data, form not created");
        throw new Error("Error creating form data, form not created");
      }

      //* Send email
      await sendEmail(formData.emailClient, formData.sectorClient);

      return mapFormData(formData) as FormDataModel;
    } catch (error) {
      console.error("❌ Error creating form data", error);
      throw error;
    }
  }

  //* Update form data
  async updateFormData(id: string, body: FormDataBody): Promise<FormDataModel> {
    try {
      const formData = await this.db.formInfo.update({
        where: { id: id, isActive: true },
        data: {
          emailClient: body.email_client.toLowerCase(),
          nameClient: capitalizeFirstLetter(body.name_client),
          nameCompany: capitalizeFirstLetter(body.name_company),
          sectorClient: capitalizeFirstLetter(body.sector_client),
          updatedAt: new Date(),
        },
      });

      if (!formData) {
        console.error("❌ Error updating form data, form not found");
        throw new Error("Error updating form data, form not found");
      }

      return mapFormData(formData) as FormDataModel;
    } catch (error) {
      console.error("❌ Error updating form data", error);
      throw new Error(`Error updating form data with id: ${id}`);
    }
  }

  //* Delete form data
  async deleteFormData(id: string): Promise<FormDataModel> {
    try {
      const formData = await this.db.formInfo.update({
        where: { id: id, isActive: true },
        data: {
          isActive: false,
          deletedAt: new Date(),
        },
      });

      if (!formData || !formData.id) {
        console.error("❌ Error deleting form data, form not found");
        throw new Error("Error deleting form data, form not found");
      }

      return mapFormData(formData) as FormDataModel;
    } catch (error) {
      console.error("❌ Error deleting form data", error);
      throw new Error(`Error deleting form data with id: ${id}`);
    }
  }
}
