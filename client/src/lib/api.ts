import { apiRequest } from "./queryClient";
import type { 
  InsertClient, 
  Client, 
  InsertAppointment, 
  Appointment, 
  InsertAgreement, 
  Agreement, 
  InsertContactMessage 
} from "@shared/schema";

// Client API
export const clientApi = {
  create: async (data: InsertClient): Promise<Client> => {
    const response = await apiRequest("POST", "/api/clients", data);
    return response.json();
  },
  
  getById: async (id: number): Promise<Client> => {
    const response = await apiRequest("GET", `/api/clients/${id}`);
    return response.json();
  },
  
  getByEmail: async (email: string): Promise<Client> => {
    const response = await apiRequest("GET", `/api/clients/email/${email}`);
    return response.json();
  }
};

// Appointment API
export const appointmentApi = {
  create: async (data: InsertAppointment): Promise<Appointment> => {
    const response = await apiRequest("POST", "/api/appointments", data);
    return response.json();
  },
  
  getById: async (id: number): Promise<Appointment> => {
    const response = await apiRequest("GET", `/api/appointments/${id}`);
    return response.json();
  },
  
  getByClient: async (clientId: number): Promise<Appointment[]> => {
    const response = await apiRequest("GET", `/api/appointments/client/${clientId}`);
    return response.json();
  },
  
  getByDate: async (date: string): Promise<Appointment[]> => {
    const response = await apiRequest("GET", `/api/appointments/date/${date}`);
    return response.json();
  },
  
  update: async (id: number, data: Partial<InsertAppointment>): Promise<Appointment> => {
    const response = await apiRequest("PUT", `/api/appointments/${id}`, data);
    return response.json();
  },
  
  delete: async (id: number): Promise<void> => {
    await apiRequest("DELETE", `/api/appointments/${id}`);
  },
  
  getAvailableSlots: async (date: string): Promise<{ date: string; availableSlots: string[] }> => {
    const response = await apiRequest("GET", `/api/available-slots/${date}`);
    return response.json();
  }
};

// Agreement API
export const agreementApi = {
  create: async (data: InsertAgreement): Promise<Agreement> => {
    const response = await apiRequest("POST", "/api/agreements", data);
    return response.json();
  },
  
  getByClient: async (clientId: number): Promise<Agreement[]> => {
    const response = await apiRequest("GET", `/api/agreements/client/${clientId}`);
    return response.json();
  }
};

// Contact API
export const contactApi = {
  send: async (data: InsertContactMessage): Promise<{ message: string; id: number }> => {
    const response = await apiRequest("POST", "/api/contact", data);
    return response.json();
  }
};
