import { Context } from "elysia";
import { FormDataModel } from "../../models/form_data/form_data_model";
import { FormDataService } from "../../services/form_data/form_data_service";
import { FormDataBody } from "../../models/form_data/form_data_body";
import { ApiMessage } from "../../context/api_message/api_message";

export class FormDataController {
  //* Inyect the service
  constructor(private readonly service: FormDataService) {}

  getAllForms = async ({
    set,
  }: Pick<Context, "set">): Promise<FormDataModel[] | ApiMessage> => {
    try {
      const formData: FormDataModel[] = await this.service.getAllFormData();

      if (!formData || formData.length === 0) {
        set.status = 204;
        return { message: "The database is empty" };
      }

      set.status = 200;
      return formData;
    } catch (error) {
      console.error("❌ Error getting all form data", error);
      set.status = 500;
      throw error;
    }
  };

  //* Get form data by id
  getFormDataById = async ({
    set,
    query,
  }: Pick<Context, "set" | "query">): Promise<FormDataModel | ApiMessage> => {
    try {
      const formData: FormDataModel = await this.service.getFormDataById(
        query.id
      );

      if (!formData || !formData.id) {
        set.status = 404;
        return { message: `Form not found with id: ${query.id}` };
      }

      set.status = 200;
      return formData;
    } catch (error) {
      console.error("❌ Error getting form data by id", error);
      set.status = 500;
      throw error;
    }
  };

  //* Create form data
  createFormData = async ({
    set,
    body,
  }: Pick<Context, "set" | "body">): Promise<ApiMessage> => {
    try {
      const formData: FormDataModel = await this.service.createFormData(
        body as FormDataBody
      );

      if (!formData || !formData.id) {
        set.status = 400;
        return { message: "Form not created please try again" };
      }

      set.status = 201;
      return {
        message: `Form data created successfully with id: ${formData.id}`,
      };
    } catch (error) {
      console.error("❌ Error creating form data", error);
      set.status = 500;
      throw error;
    }
  };

  //* Update form data
  updateFormData = async ({
    set,
    body,
    query,
  }: Pick<Context, "set" | "body" | "query">): Promise<ApiMessage> => {
    try {
      const response: FormDataModel = await this.service.updateFormData(
        query.id,
        body as FormDataBody
      );

      if (!response || !response.id) {
        set.status = 404;
        return { message: `Form not found with id: ${query.id}` };
      }

      set.status = 200;
      return {
        message: `Form data updated successfully with id: ${response.id}`,
      };
    } catch (error) {
      console.error("❌ Error updating form data", error);
      set.status = 500;
      throw error;
    }
  };

  //* Delete form data
  deleteFormData = async ({
    set,
    query,
  }: Pick<Context, "set" | "query">): Promise<ApiMessage> => {
    try {
      const response: FormDataModel = await this.service.deleteFormData(
        query.id
      );

      if (!response || !response.id) {
        set.status = 404;
        return { message: `Form not found with id: ${query.id}` };
      }

      set.status = 200;
      return {
        message: `Form data deleted successfully with id: ${response.id}`,
      };
    } catch (error) {
      console.error("❌ Error deleting form data", error);
      set.status = 500;
      throw error;
    }
  };
}
