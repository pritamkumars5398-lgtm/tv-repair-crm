import { apiClient } from './axios';
import type { ApiResponse, AuthResponse, OtpResponse } from '@/types';

export const authApi = {
  sendOtp: (phone: string) =>
    apiClient.post<ApiResponse<OtpResponse>>('/auth/send-otp', { phone }).then((r) => r.data),

  verifyOtp: (phone: string, otp: string, role?: string) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/verify-otp', { phone, otp, role }).then((r) => r.data),

  register: (data: { name: string; phone: string; email?: string; otp: string }) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data).then((r) => r.data),

  logout: () =>
    apiClient.post('/auth/logout').then((r) => r.data),

  getSession: () =>
    apiClient.get<ApiResponse<AuthResponse['user']>>('/auth/session').then((r) => r.data),
};
