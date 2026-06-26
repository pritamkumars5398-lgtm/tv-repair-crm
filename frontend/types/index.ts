export type UserRole = 'customer' | 'technician' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export type ServiceType =
  | 'TV_REPAIR'
  | 'SPEAKER_REPAIR'
  | 'HOME_VISIT'
  | 'SPEAKER_INSTALL'
  | 'HOME_THEATER';

export type LeadSource =
  | 'WEBSITE'
  | 'WHATSAPP'
  | 'CHATBOT'
  | 'PHONE_CALL'
  | 'FACEBOOK'
  | 'GOOGLE'
  | 'REFERRAL';

export type TicketStatus =
  | 'tv_received'
  | 'diagnosis_completed'
  | 'parts_ordered'
  | 'repair_in_progress'
  | 'quality_check'
  | 'ready_for_delivery'
  | 'delivered';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'INSPECTION_SCHEDULED'
  | 'TV_RECEIVED'
  | 'REPAIR_IN_PROGRESS'
  | 'QUALITY_CHECK'
  | 'READY'
  | 'DELIVERED'
  | 'CLOSED';

export type PaymentStatus = 'PENDING' | 'CAPTURED' | 'FAILED' | 'REFUNDED';

export interface Ticket {
  id: string;
  ticketId: string;
  serviceType: ServiceType;
  status: TicketStatus;
  device: string;
  customerName: string;
  customerPhone: string;
  address: string;
  scheduledAt: string;
  createdAt: string;
  technicianName?: string;
}

export interface StatusHistoryEntry {
  status: TicketStatus;
  note?: string;
  createdAt: string;
}

export interface TrackTicketResponse {
  ticketId: string;
  serviceType: string;
  status: TicketStatus;
  statusHistory: StatusHistoryEntry[];
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: LeadSource;
  status: LeadStatus;
  serviceType?: ServiceType;
  message?: string;
  assignedTo?: string;
  createdAt: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  preferredDate: string;
  preferredTime: string;
  issueDescription: string;
  photos: File[];
  address: string;
  area: string;
  city: string;
  pincode: string;
  isPickup: boolean;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  message: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: string[];
  priceRange: string;
  imageUrl?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  serviceType: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface BookingResponse {
  razorpayOrderId: string;
  bookingId: string;
  amount: number;
}

export interface BookingVerifyResponse {
  ticketId: string;
  success: boolean;
}
