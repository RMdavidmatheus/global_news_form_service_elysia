//* Form data db interface
export interface FormDataDbInterface {
  id: string;
  nameClient: string;
  nameCompany: string;
  emailClient: string;
  sectorClient: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
