import { apiClient } from './axios';
import type {
  ApiResponse,
  PaginatedResponse,
  AdminDashboardStats,
  Lead,
  Ticket,
  Customer,
  Technician,
  InventoryItem,
  Payment,
  RevenueDataPoint,
  LeadSourceDataPoint,
} from '@/types';

export const adminApi = {
  // Dashboard
  getDashboard: () =>
    apiClient.get<ApiResponse<AdminDashboardStats>>('/admin/dashboard').then((r) => r.data),

  getRevenueChart: (days = 30) =>
    apiClient.get<ApiResponse<RevenueDataPoint[]>>('/admin/reports/revenue', { params: { days } }).then((r) => r.data),

  getLeadSourceChart: () =>
    apiClient.get<ApiResponse<LeadSourceDataPoint[]>>('/admin/reports/lead-sources').then((r) => r.data),

  // Leads
  getLeads: (params?: { status?: string; source?: string; page?: number; limit?: number; search?: string }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Lead>>>('/admin/leads', { params }).then((r) => r.data),

  createLead: (data: Partial<Lead>) =>
    apiClient.post<ApiResponse<Lead>>('/admin/leads', data).then((r) => r.data),

  updateLead: (id: string, data: Partial<Lead>) =>
    apiClient.put<ApiResponse<Lead>>(`/admin/leads/${id}`, data).then((r) => r.data),

  assignLead: (id: string, technicianId: string) =>
    apiClient.put<ApiResponse<Lead>>(`/admin/leads/${id}/assign`, { technicianId }).then((r) => r.data),

  // Tickets
  getTickets: (params?: { status?: string; page?: number; limit?: number; search?: string }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Ticket>>>('/admin/tickets', { params }).then((r) => r.data),

  updateTicket: (id: string, data: { status?: string; technicianId?: string; notes?: string }) =>
    apiClient.put<ApiResponse<Ticket>>(`/admin/tickets/${id}`, data).then((r) => r.data),

  // Customers
  getCustomers: (params?: { page?: number; limit?: number; search?: string }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Customer>>>('/admin/customers', { params }).then((r) => r.data),

  // Technicians
  getTechnicians: (params?: { page?: number; limit?: number }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Technician>>>('/admin/technicians', { params }).then((r) => r.data),

  createTechnician: (data: Partial<Technician>) =>
    apiClient.post<ApiResponse<Technician>>('/admin/technicians', data).then((r) => r.data),

  updateTechnician: (id: string, data: Partial<Technician>) =>
    apiClient.put<ApiResponse<Technician>>(`/admin/technicians/${id}`, data).then((r) => r.data),

  // Inventory
  getInventory: (params?: { page?: number; limit?: number; search?: string }) =>
    apiClient.get<ApiResponse<PaginatedResponse<InventoryItem>>>('/admin/inventory', { params }).then((r) => r.data),

  updateStock: (id: string, data: { quantity: number; type: 'IN' | 'OUT' }) =>
    apiClient.put<ApiResponse<InventoryItem>>(`/admin/inventory/${id}/stock`, data).then((r) => r.data),

  // Payments
  getPayments: (params?: { status?: string; page?: number; limit?: number }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Payment>>>('/admin/payments', { params }).then((r) => r.data),

  // Reports
  getReports: (params: { from: string; to: string; type: string }) =>
    apiClient.get<ApiResponse<Record<string, unknown>>>('/admin/reports', { params }).then((r) => r.data),
};
