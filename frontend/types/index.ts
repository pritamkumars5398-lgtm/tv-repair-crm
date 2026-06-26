export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'technician' | 'manager' | 'admin';
}

export interface Ticket {
  id: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  device: string;
  customerName: string;
  scheduledAt: string;
}
