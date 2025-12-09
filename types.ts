
export enum StageStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED'
}

export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Stage {
  id: string;
  title: string;
  description: string;
  status: StageStatus;
  priority?: PriorityLevel;
  dueDate?: string;
  updatedAt?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: 'STATUS_CHANGE' | 'NOTE' | 'FILE' | 'ALERT' | 'CREATION' | 'INFO' | 'PAYMENT' | 'ACTIVITY';
  title: string;
  description?: string;
  author?: string; // 'Sistema', 'Admin', 'Cliente'
  iconName?: string; // For ACTIVITY type: 'Phone', 'Mail', etc.
}

export interface Client {
  id: string;
  type: 'FISICA' | 'MORAL';
  
  // Common Display Name (Calculated)
  name: string; 
  
  // Persona Física Fields
  firstName?: string;
  lastName?: string;
  curp?: string;
  
  // Persona Moral Fields
  legalName?: string; // Razón Social
  legalRep?: string; // Representante Legal
  constitutionDate?: string;
  notaryName?: string;
  notaryNumber?: string;
  
  // Common Fields
  rfc: string;
  taxRegime?: string;
  address?: string;
  email: string;
  phone?: string;
  commercialActivity?: string;
  
  status: 'ACTIVO' | 'INACTIVO' | 'PROSPECTO';
  portalAccess: boolean; 
  tags: string[];
  paymentMethod: string;
  billingType: string;
  
  fiscalZipCode?: string;
  cfdiUsage?: string;
  billingEmail?: string;

  createdAt: string;
}

export interface ClientDocument {
    id: string;
    clientId: string;
    name: string;
    type: string; // 'PDF', 'IMG', etc.
    size: string;
    uploadedAt: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface StageTemplate {
  title: string;
  description: string;
}

export interface ServiceTemplate {
  id: string;
  name: string;
  category: string; // Materia (e.g. Propiedad Intelectual, Migratorio)
  description: string;
  cost?: number;
  defaultStages: StageTemplate[];
}

export interface Payment {
  id: string;
  caseId: string;
  amount: number;
  date: string;
  method: string; // 'Transferencia', 'Efectivo', 'Tarjeta'
  concept: string; // 'Anticipo', 'Pago Final', 'Gastos'
  reference?: string;
  receiptFile?: string; // Base64 string of the PDF
  receiptFileName?: string;
}

export interface Feedback {
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
}

export interface ServiceCase {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  serviceCategory?: string;
  createdAt: string;
  updatedAt: string;
  stages: Stage[];
  notes?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  
  // Timeline History
  timeline: TimelineEvent[];
  
  // Financial Fields
  cost: number; // Precio acordado del servicio
  paidAmount: number; // Total pagado hasta la fecha
  payments?: Payment[]; // Historial de pagos

  // Satisfaction Survey
  feedback?: Feedback;
}

export interface CompanySettings {
    contactEmail: string;
    supportEmail: string;
    phoneNumber: string;
    whatsappNumber: string;
    address: string;
    website: string;
    bookingUrl?: string; // URL for Google Appointments or Calendly
}

export interface Resource {
    id: string;
    title: string;
    description: string;
    category: string; 
    // Advanced Targeting
    targetType: 'ALL' | 'TAG' | 'CLIENT'; 
    targetValue?: string; // The specific tag string or Client ID
    
    url?: string; 
    fileData?: string; 
    fileName?: string;
    createdAt: string;
}

export interface Appointment {
    id: string;
    clientId: string;
    clientName: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    type: 'VIDEO' | 'PHONE' | 'OFFICE';
    reason: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
    createdAt: string;
}

export interface Notification {
    id: string;
    clientId: string;
    title: string;
    message: string;
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
    read: boolean;
    createdAt: string;
}

export interface AIResponse {
  subject: string;
  body: string;
}
