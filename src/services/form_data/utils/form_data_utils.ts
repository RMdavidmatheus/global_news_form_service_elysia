import { FormDataDbInterface } from "../../../models/form_data/form_data_db_interface";
import { FormDataModel } from "../../../models/form_data/form_data_model";
import { DateTime } from "luxon";
import nodemailer from "nodemailer";

//* Method to assign the sector to the pdf
export const assignSectorToPdf = (sector: string): string[] => {
  switch (sector.toLowerCase()) {
    case "salud":
      return ["salud.pdf", "src/assets/exampleFormat.pdf"];
    case "banca":
      return ["banca.pdf", "src/assets/exampleFormat.pdf"];
    case "gobierno":
      return ["gobierno.pdf", "src/assets/exampleFormat.pdf"];
    case "energia":
      return ["energia.pdf", "src/assets/exampleFormat.pdf"];
    case "tecnologia":
      return ["tecnologia.pdf", "src/assets/exampleFormat.pdf"];
    default:
      return ["", ""];
  }
};

//* Method to config the transporter for send email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'globalnewsglobalmarketing@gmail.com',
      pass: 'aong yqnj pgki vbgt',
    },
  });

  //* Method to send email
  export const sendEmail = async (email: string, sector: string) => {
    //* Assign the sector to the pdf
    const sectorPdf = assignSectorToPdf(sector);

    //* Send email
    await transporter.sendMail({
      from: 'globalnewsglobalmarketing@gmail.com',
      to: email,
      subject: 'Reporte de interés - GlobalNews Group',
      html:
        sector.toLowerCase() === 'otros'
          ? `
              <div style="font-family: Arial, sans-serif; font-size: 14px; color: #000000;">
                <h1 style="font-weight: bold; font-size: 1.5em; margin-bottom: 20px;">
                  ¿Necesitas un informe más específico o adaptado a sus necesidades?
                </h1>
                <p style="margin-bottom: 16px; line-height: 1.6; text-align: justify;">
                  No dudes en responder a este correo.
                </p>
                <p style="margin-bottom: 24px; line-height: 1.6; text-align: justify;">
                  Estaremos encantados de brindarte un acompañamiento personalizado con información ajustada a tu sector y objetivos.
                </p>

                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right: 15px;">
                      <img src="cid:logo" width="150" alt="Logo"/>
                    </td>
                    <td style="font-size: 14px; color: #123A54;">
                      <strong style="font-size: 16px;">Departamento de Comunicaciones</strong><br>
                      <span style="color: #555;">GlobalNews Group</span><br><br>

                      📞 <a href="tel:+573167559409" style="color: #123A54; text-decoration: none;">316 755 9409</a><br>
                      📍 Calle 61 # 13 - 23 piso seis | Bogotá, Col<br>
                      ✉️ <a href="mailto:fabian.galindo@globalnews.com.co" style="color: #123A54; text-decoration: none;">fabian.galindo@globalnews.com.co</a><br>
                      🌐 <a href="https://www.globalnewsgroup.com" target="_blank" style="color: #123A54; text-decoration: none;">www.globalnewsgroup.com</a>
                    </td>
                  </tr>
                </table>
              </div>
            `
          : `
              <div style="font-family: Arial, sans-serif; font-size: 14px; color:rgb(10, 10, 10);">
                <p style="margin-bottom: 20px;">
                  Gracias por utilizar nuestro servicio, se adjunta el informe para el sector de ${sector.toLowerCase()}.
                </p>

                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right: 15px;">
                      <img src="cid:logo" width="150" alt="Logo"/>
                    </td>
                    <td>
                      <strong style="font-size: 16px; color: #123A54;">Departamento de Comunicaciones</strong><br>
                      <span style="color: #555;">GlobalNews Group</span><br><br>

                      📞 <a href="tel:+573167559409" style="color: #123A54; text-decoration: none;">316 755 9409</a><br>
                      📍 Calle 61 # 13 - 23 piso seis | Bogotá, Col<br>
                      ✉️ <a href="mailto:fabian.galindo@globalnews.com.co" style="color: #123A54; text-decoration: none;">fabian.galindo@globalnews.com.co</a><br>
                      🌐 <a href="https://www.globalnewsgroup.com" target="_blank" style="color: #123A54; text-decoration: none;">www.globalnewsgroup.com</a>
                    </td>
                  </tr>
                </table>
              </div>
            `,
      attachments: [
        ...(sectorPdf[0] && sectorPdf[1] !== ''
          ? [
              {
                filename: sectorPdf[0],
                path: sectorPdf[1],
              },
            ]
          : []),
        {
          filename: 'logo.png',
          path: 'src/assets/logo.png',
          cid: 'logo',
        },
      ],
    });
  }

//* Map form data
export const mapFormData = (
  data: FormDataDbInterface | FormDataDbInterface[]
): FormDataModel | FormDataModel[] | null => {
  if (!data) return null;

  const mappedData = (item: FormDataDbInterface): FormDataModel => ({
    id: item.id,
    name_client: item.nameClient,
    name_company: item.nameCompany,
    email_client: item.emailClient,
    sector_client: item.sectorClient,
    is_active: item.isActive,
    created_at: DateTime.fromJSDate(new Date(item.createdAt))
      .setZone("America/Bogota")
      .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"),
    updated_at: item.updatedAt
      ? DateTime.fromJSDate(new Date(item.updatedAt))
          .setZone("America/Bogota")
          .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
      : undefined,
    deleted_at: item.deletedAt
      ? DateTime.fromJSDate(new Date(item.deletedAt))
          .setZone("America/Bogota")
          .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
      : undefined,
  });

  if (Array.isArray(data)) {
    return data.map(mappedData);
  }

  return mappedData(data);
};

//* Method to capitalize the first letter of the every word
export const capitalizeFirstLetter = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
