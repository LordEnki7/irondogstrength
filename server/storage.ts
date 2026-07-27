import { 
  clients, 
  appointments, 
  agreements, 
  contactMessages,
  users,
  workoutPlans,
  progressTracking,
  payments,
  clientGoals,
  siteContent,
  type User, 
  type InsertUser,
  type Client, 
  type InsertClient,
  type Appointment, 
  type InsertAppointment,
  type Agreement, 
  type InsertAgreement,
  type ContactMessage, 
  type InsertContactMessage,
  type WorkoutPlan,
  type InsertWorkoutPlan,
  type ProgressTracking,
  type InsertProgressTracking,
  type Payment,
  type InsertPayment,
  type ClientGoal,
  type InsertClientGoal,
  type SiteContent,
  type InsertSiteContent
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Client methods
  getClient(id: number): Promise<Client | undefined>;
  getClientByEmail(email: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  getAllClients(): Promise<Client[]>;

  // Appointment methods
  getAppointment(id: number): Promise<Appointment | undefined>;
  getAppointmentsByClient(clientId: number): Promise<Appointment[]>;
  getAppointmentsByDate(date: string): Promise<Appointment[]>;
  getAllAppointments(): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: number, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  deleteAppointment(id: number): Promise<boolean>;
  getAvailableTimeSlots(date: string): Promise<string[]>;

  // Agreement methods
  getAgreement(id: number): Promise<Agreement | undefined>;
  getAgreementsByClient(clientId: number): Promise<Agreement[]>;
  createAgreement(agreement: InsertAgreement): Promise<Agreement>;

  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;

  // Workout plan methods
  getWorkoutPlan(id: number): Promise<WorkoutPlan | undefined>;
  getWorkoutPlansByClient(clientId: number): Promise<WorkoutPlan[]>;
  createWorkoutPlan(plan: InsertWorkoutPlan): Promise<WorkoutPlan>;
  updateWorkoutPlan(id: number, plan: Partial<InsertWorkoutPlan>): Promise<WorkoutPlan | undefined>;
  deleteWorkoutPlan(id: number): Promise<boolean>;

  // Progress tracking methods
  getProgressTracking(id: number): Promise<ProgressTracking | undefined>;
  getProgressByClient(clientId: number): Promise<ProgressTracking[]>;
  getProgressByAppointment(appointmentId: number): Promise<ProgressTracking[]>;
  createProgressTracking(progress: InsertProgressTracking): Promise<ProgressTracking>;
  updateProgressTracking(id: number, progress: Partial<InsertProgressTracking>): Promise<ProgressTracking | undefined>;

  // Payment methods
  getPayment(id: number): Promise<Payment | undefined>;
  getPaymentsByClient(clientId: number): Promise<Payment[]>;
  getPaymentsByAppointment(appointmentId: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: number, payment: Partial<InsertPayment>): Promise<Payment | undefined>;

  // Client goals methods
  getClientGoal(id: number): Promise<ClientGoal | undefined>;
  getGoalsByClient(clientId: number): Promise<ClientGoal[]>;
  createClientGoal(goal: InsertClientGoal): Promise<ClientGoal>;
  updateClientGoal(id: number, goal: Partial<InsertClientGoal>): Promise<ClientGoal | undefined>;
  deleteClientGoal(id: number): Promise<boolean>;

  // Content management methods
  getSiteContent(contentKey: string): Promise<SiteContent | undefined>;
  getAllSiteContent(): Promise<SiteContent[]>;
  getSiteContentBySection(section: string): Promise<SiteContent[]>;
  createSiteContent(content: InsertSiteContent): Promise<SiteContent>;
  updateSiteContent(contentKey: string, content: Partial<InsertSiteContent>): Promise<SiteContent | undefined>;
  deleteSiteContent(contentKey: string): Promise<boolean>;

  // Admin methods
  deleteClient(id: number): Promise<boolean>;
  updateAppointmentStatus(id: number, status: string): Promise<boolean>;
  getAllAgreements(): Promise<Agreement[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private clients: Map<number, Client>;
  private appointments: Map<number, Appointment>;
  private agreements: Map<number, Agreement>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentClientId: number;
  private currentAppointmentId: number;
  private currentAgreementId: number;
  private currentContactMessageId: number;

  // Available time slots for scheduling
  private timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  constructor() {
    this.users = new Map();
    this.clients = new Map();
    this.appointments = new Map();
    this.agreements = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentClientId = 1;
    this.currentAppointmentId = 1;
    this.currentAgreementId = 1;
    this.currentContactMessageId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Client methods
  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async getClientByEmail(email: string): Promise<Client | undefined> {
    return Array.from(this.clients.values()).find(client => client.email === email);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.currentClientId++;
    const client: Client = { 
      ...insertClient, 
      id, 
      createdAt: new Date(),
      address: insertClient.address || null,
      emergencyContact: insertClient.emergencyContact || null,
      emergencyPhone: insertClient.emergencyPhone || null,
      medicalConditions: insertClient.medicalConditions || null,
      goals: insertClient.goals || null
    };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: number, clientData: Partial<InsertClient>): Promise<Client | undefined> {
    const existingClient = this.clients.get(id);
    if (!existingClient) return undefined;

    const updatedClient = { ...existingClient, ...clientData };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }

  async getAllClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  // Appointment methods
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async getAppointmentsByClient(clientId: number): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.clientId === clientId
    );
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.date === date
    );
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.currentAppointmentId++;
    const appointment: Appointment = { 
      ...insertAppointment, 
      id, 
      createdAt: new Date(),
      status: insertAppointment.status || "scheduled",
      duration: insertAppointment.duration || 60,
      notes: insertAppointment.notes || null,
      clientId: insertAppointment.clientId || null
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async updateAppointment(id: number, appointmentData: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const existingAppointment = this.appointments.get(id);
    if (!existingAppointment) return undefined;

    const updatedAppointment = { ...existingAppointment, ...appointmentData };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  async deleteAppointment(id: number): Promise<boolean> {
    return this.appointments.delete(id);
  }

  async getAvailableTimeSlots(date: string): Promise<string[]> {
    const bookedAppointments = await this.getAppointmentsByDate(date);
    const bookedTimes = bookedAppointments
      .filter(apt => apt.status !== "cancelled")
      .map(apt => apt.time);
    
    return this.timeSlots.filter(time => !bookedTimes.includes(time));
  }

  // Agreement methods
  async getAgreement(id: number): Promise<Agreement | undefined> {
    return this.agreements.get(id);
  }

  async getAgreementsByClient(clientId: number): Promise<Agreement[]> {
    return Array.from(this.agreements.values()).filter(
      agreement => agreement.clientId === clientId
    );
  }

  async createAgreement(insertAgreement: InsertAgreement): Promise<Agreement> {
    const id = this.currentAgreementId++;
    const agreement: Agreement = { 
      ...insertAgreement, 
      id, 
      signedAt: new Date(),
      clientId: insertAgreement.clientId || null,
      ipAddress: insertAgreement.ipAddress || null
    };
    this.agreements.set(id, agreement);
    return agreement;
  }

  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date(),
      phone: insertMessage.phone || null,
      message: insertMessage.message || null,
      interests: insertMessage.interests || null
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).map(appointment => ({
      ...appointment,
      client: appointment.clientId ? this.clients.get(appointment.clientId) : undefined
    }));
  }

  async getAllAgreements(): Promise<Agreement[]> {
    return Array.from(this.agreements.values()).map(agreement => ({
      ...agreement,
      client: agreement.clientId ? this.clients.get(agreement.clientId) : undefined
    }));
  }

  async deleteClient(id: number): Promise<boolean> {
    const deleted = this.clients.delete(id);
    // Also remove related appointments and agreements
    Array.from(this.appointments.values())
      .filter(appointment => appointment.clientId === id)
      .forEach(appointment => this.appointments.delete(appointment.id));
    Array.from(this.agreements.values())
      .filter(agreement => agreement.clientId === id)
      .forEach(agreement => this.agreements.delete(agreement.id));
    return deleted;
  }

  async updateAppointmentStatus(id: number, status: string): Promise<boolean> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      appointment.status = status;
      this.appointments.set(id, appointment);
      return true;
    }
    return false;
  }
}

export class DatabaseStorage implements IStorage {

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getClient(id: number): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || undefined;
  }

  async getClientByEmail(email: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.email, email));
    return client || undefined;
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db
      .insert(clients)
      .values(insertClient)
      .returning();
    return client;
  }

  async updateClient(id: number, updateData: Partial<InsertClient>): Promise<Client | undefined> {
    const [client] = await db
      .update(clients)
      .set(updateData)
      .where(eq(clients.id, id))
      .returning();
    return client || undefined;
  }

  async getAllClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }

  async getAppointment(id: number): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment || undefined;
  }

  async getAppointmentsByClient(clientId: number): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.clientId, clientId));
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.date, date));
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const [appointment] = await db
      .insert(appointments)
      .values(insertAppointment)
      .returning();
    return appointment;
  }

  async updateAppointment(id: number, updateData: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const [appointment] = await db
      .update(appointments)
      .set(updateData)
      .where(eq(appointments.id, id))
      .returning();
    return appointment || undefined;
  }

  async deleteAppointment(id: number): Promise<boolean> {
    const result = await db.delete(appointments).where(eq(appointments.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  private getTimeSlotsForDay(date: string): string[] {
    const dayOfWeek = new Date(date).getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    switch (dayOfWeek) {
      case 0: // Sunday: 1:30pm-5pm
      case 6: // Saturday: 1:30pm-5pm
        return ["13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
      case 1: // Monday: 8pm-10pm
        return ["20:00", "20:30", "21:00", "21:30", "22:00"];
      case 2: // Tuesday: 6:30pm-8pm
        return ["18:30", "19:00", "19:30", "20:00"];
      case 3: // Wednesday: off
        return [];
      case 4: // Thursday: 8pm-10pm
        return ["20:00", "20:30", "21:00", "21:30", "22:00"];
      case 5: // Friday: 6:30pm-8:30pm
        return ["18:30", "19:00", "19:30", "20:00", "20:30"];
      default:
        return [];
    }
  }

  async getAvailableTimeSlots(date: string): Promise<string[]> {
    const availableSlots = this.getTimeSlotsForDay(date);
    const bookedAppointments = await this.getAppointmentsByDate(date);
    const bookedTimes = bookedAppointments.map(apt => apt.time);
    return availableSlots.filter(slot => !bookedTimes.includes(slot));
  }

  async getAgreement(id: number): Promise<Agreement | undefined> {
    const [agreement] = await db.select().from(agreements).where(eq(agreements.id, id));
    return agreement || undefined;
  }

  async getAgreementsByClient(clientId: number): Promise<Agreement[]> {
    return await db.select().from(agreements).where(eq(agreements.clientId, clientId));
  }

  async createAgreement(insertAgreement: InsertAgreement): Promise<Agreement> {
    const [agreement] = await db
      .insert(agreements)
      .values(insertAgreement)
      .returning();
    return agreement;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  // Workout plan methods
  async getWorkoutPlan(id: number): Promise<WorkoutPlan | undefined> {
    const [plan] = await db.select().from(workoutPlans).where(eq(workoutPlans.id, id));
    return plan || undefined;
  }

  async getWorkoutPlansByClient(clientId: number): Promise<WorkoutPlan[]> {
    return await db.select().from(workoutPlans).where(eq(workoutPlans.clientId, clientId));
  }

  async createWorkoutPlan(insertPlan: InsertWorkoutPlan): Promise<WorkoutPlan> {
    const [plan] = await db
      .insert(workoutPlans)
      .values(insertPlan)
      .returning();
    return plan;
  }

  async updateWorkoutPlan(id: number, updateData: Partial<InsertWorkoutPlan>): Promise<WorkoutPlan | undefined> {
    const [plan] = await db
      .update(workoutPlans)
      .set(updateData)
      .where(eq(workoutPlans.id, id))
      .returning();
    return plan || undefined;
  }

  async deleteWorkoutPlan(id: number): Promise<boolean> {
    const result = await db.delete(workoutPlans).where(eq(workoutPlans.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Progress tracking methods
  async getProgressTracking(id: number): Promise<ProgressTracking | undefined> {
    const [progress] = await db.select().from(progressTracking).where(eq(progressTracking.id, id));
    return progress || undefined;
  }

  async getProgressByClient(clientId: number): Promise<ProgressTracking[]> {
    return await db.select().from(progressTracking).where(eq(progressTracking.clientId, clientId));
  }

  async getProgressByAppointment(appointmentId: number): Promise<ProgressTracking[]> {
    return await db.select().from(progressTracking).where(eq(progressTracking.appointmentId, appointmentId));
  }

  async createProgressTracking(insertProgress: InsertProgressTracking): Promise<ProgressTracking> {
    const [progress] = await db
      .insert(progressTracking)
      .values(insertProgress)
      .returning();
    return progress;
  }

  async updateProgressTracking(id: number, updateData: Partial<InsertProgressTracking>): Promise<ProgressTracking | undefined> {
    const [progress] = await db
      .update(progressTracking)
      .set(updateData)
      .where(eq(progressTracking.id, id))
      .returning();
    return progress || undefined;
  }

  // Payment methods
  async getPayment(id: number): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment || undefined;
  }

  async getPaymentsByClient(clientId: number): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.clientId, clientId));
  }

  async getPaymentsByAppointment(appointmentId: number): Promise<Payment[]> {
    return await db.select().from(payments).where(eq(payments.appointmentId, appointmentId));
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db
      .insert(payments)
      .values(insertPayment)
      .returning();
    return payment;
  }

  async updatePayment(id: number, updateData: Partial<InsertPayment>): Promise<Payment | undefined> {
    const [payment] = await db
      .update(payments)
      .set(updateData)
      .where(eq(payments.id, id))
      .returning();
    return payment || undefined;
  }

  // Client goals methods
  async getClientGoal(id: number): Promise<ClientGoal | undefined> {
    const [goal] = await db.select().from(clientGoals).where(eq(clientGoals.id, id));
    return goal || undefined;
  }

  async getGoalsByClient(clientId: number): Promise<ClientGoal[]> {
    return await db.select().from(clientGoals).where(eq(clientGoals.clientId, clientId));
  }

  async createClientGoal(insertGoal: InsertClientGoal): Promise<ClientGoal> {
    const [goal] = await db
      .insert(clientGoals)
      .values(insertGoal)
      .returning();
    return goal;
  }

  async updateClientGoal(id: number, updateData: Partial<InsertClientGoal>): Promise<ClientGoal | undefined> {
    const [goal] = await db
      .update(clientGoals)
      .set(updateData)
      .where(eq(clientGoals.id, id))
      .returning();
    return goal || undefined;
  }

  async deleteClientGoal(id: number): Promise<boolean> {
    const result = await db.delete(clientGoals).where(eq(clientGoals.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Content management methods
  async getSiteContent(contentKey: string): Promise<SiteContent | undefined> {
    const [content] = await db.select().from(siteContent).where(eq(siteContent.contentKey, contentKey));
    return content || undefined;
  }

  async getAllSiteContent(): Promise<SiteContent[]> {
    return await db.select().from(siteContent);
  }

  async getSiteContentBySection(section: string): Promise<SiteContent[]> {
    return await db.select().from(siteContent).where(eq(siteContent.section, section));
  }

  async createSiteContent(insertContent: InsertSiteContent): Promise<SiteContent> {
    const [content] = await db
      .insert(siteContent)
      .values(insertContent)
      .returning();
    return content;
  }

  async updateSiteContent(contentKey: string, updateData: Partial<InsertSiteContent>): Promise<SiteContent | undefined> {
    const [content] = await db
      .update(siteContent)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(siteContent.contentKey, contentKey))
      .returning();
    return content || undefined;
  }

  async deleteSiteContent(contentKey: string): Promise<boolean> {
    const result = await db.delete(siteContent).where(eq(siteContent.contentKey, contentKey));
    return (result.rowCount ?? 0) > 0;
  }

  // Admin methods
  async deleteClient(id: number): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async updateAppointmentStatus(id: number, status: string): Promise<boolean> {
    const result = await db
      .update(appointments)
      .set({ status })
      .where(eq(appointments.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getAllAgreements(): Promise<Agreement[]> {
    return await db.select().from(agreements);
  }
}

export const storage = new DatabaseStorage();
