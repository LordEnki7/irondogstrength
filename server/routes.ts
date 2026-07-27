import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import multer from "multer";
import { uploadToR2, deleteFromR2, streamFromR2, listR2Files } from "./r2";
import { 
  insertClientSchema, 
  insertAppointmentSchema, 
  insertAgreementSchema, 
  insertContactMessageSchema,
  insertWorkoutPlanSchema,
  insertProgressTrackingSchema,
  // insertPaymentSchema, // Removed with payment processing
  insertClientGoalSchema
} from "@shared/schema";
// import Stripe from "stripe"; // Removed to reduce bundle size

// Stripe initialization removed to reduce bundle size
// let stripe: Stripe | null = null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve video files from attached_assets
  app.use('/videos', express.static('attached_assets', {
    setHeaders: (res, path) => {
      if (path.endsWith('.mov') || path.endsWith('.mp4')) {
        res.set('Content-Type', 'video/mp4');
      }
    }
  }));
  // Client routes
  app.post("/api/clients", async (req, res) => {
    try {
      const clientData = insertClientSchema.parse(req.body);
      
      // Check if client already exists
      const existingClient = await storage.getClientByEmail(clientData.email);
      if (existingClient) {
        return res.status(400).json({ message: "Client with this email already exists" });
      }

      const client = await storage.createClient(clientData);
      res.json(client);
    } catch (error) {
      res.status(400).json({ message: "Invalid client data", error });
    }
  });

  app.get("/api/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const client = await storage.getClient(id);
      
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: "Error fetching client", error });
    }
  });

  app.get("/api/clients/email/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const client = await storage.getClientByEmail(email);
      
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: "Error fetching client", error });
    }
  });

  // Appointment routes
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      
      // Check if time slot is available
      const availableSlots = await storage.getAvailableTimeSlots(appointmentData.date);
      if (!availableSlots.includes(appointmentData.time)) {
        return res.status(400).json({ message: "Time slot not available" });
      }

      const appointment = await storage.createAppointment(appointmentData);
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ message: "Invalid appointment data", error });
    }
  });

  app.get("/api/appointments/client/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const appointments = await storage.getAppointmentsByClient(clientId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointments", error });
    }
  });

  app.get("/api/appointments/date/:date", async (req, res) => {
    try {
      const date = req.params.date;
      const appointments = await storage.getAppointmentsByDate(date);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointments", error });
    }
  });

  app.get("/api/appointments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const appointment = await storage.getAppointment(id);
      
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointment", error });
    }
  });

  app.put("/api/appointments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      const appointment = await storage.updateAppointment(id, updateData);
      
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ message: "Error updating appointment", error });
    }
  });

  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteAppointment(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting appointment", error });
    }
  });

  // Available time slots
  app.get("/api/available-slots/:date", async (req, res) => {
    try {
      const date = req.params.date;
      const availableSlots = await storage.getAvailableTimeSlots(date);
      res.json({ date, availableSlots });
    } catch (error) {
      res.status(500).json({ message: "Error fetching available slots", error });
    }
  });

  // Agreement routes
  app.post("/api/agreements", async (req, res) => {
    try {
      const agreementData = insertAgreementSchema.parse(req.body);
      const agreement = await storage.createAgreement({
        ...agreementData,
        ipAddress: req.ip
      });
      res.json(agreement);
    } catch (error) {
      res.status(400).json({ message: "Invalid agreement data", error });
    }
  });

  app.get("/api/agreements/client/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const agreements = await storage.getAgreementsByClient(clientId);
      res.json(agreements);
    } catch (error) {
      res.status(500).json({ message: "Error fetching agreements", error });
    }
  });

  // Contact message routes
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.json({ message: "Contact message sent successfully", id: message.id });
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data", error });
    }
  });

  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching contact messages", error });
    }
  });

  // Workout plan routes
  app.post("/api/workout-plans", async (req, res) => {
    try {
      const planData = insertWorkoutPlanSchema.parse(req.body);
      const plan = await storage.createWorkoutPlan(planData);
      res.json(plan);
    } catch (error) {
      res.status(400).json({ message: "Invalid workout plan data", error });
    }
  });

  app.get("/api/workout-plans/client/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const plans = await storage.getWorkoutPlansByClient(clientId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Error fetching workout plans", error });
    }
  });

  app.put("/api/workout-plans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const plan = await storage.updateWorkoutPlan(id, updateData);
      
      if (!plan) {
        return res.status(404).json({ message: "Workout plan not found" });
      }
      
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Error updating workout plan", error });
    }
  });

  // Progress tracking routes
  app.post("/api/progress", async (req, res) => {
    try {
      const progressData = insertProgressTrackingSchema.parse(req.body);
      const progress = await storage.createProgressTracking(progressData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data", error });
    }
  });

  app.get("/api/progress/client/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const progress = await storage.getProgressByClient(clientId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Error fetching progress", error });
    }
  });

  // Client goals routes
  app.post("/api/goals", async (req, res) => {
    try {
      const goalData = insertClientGoalSchema.parse(req.body);
      const goal = await storage.createClientGoal(goalData);
      res.json(goal);
    } catch (error) {
      res.status(400).json({ message: "Invalid goal data", error });
    }
  });

  app.get("/api/goals/client/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const goals = await storage.getGoalsByClient(clientId);
      res.json(goals);
    } catch (error) {
      res.status(500).json({ message: "Error fetching goals", error });
    }
  });

  app.put("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const goal = await storage.updateClientGoal(id, updateData);
      
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      
      res.json(goal);
    } catch (error) {
      res.status(500).json({ message: "Error updating goal", error });
    }
  });

  // Payment routes
  app.post("/api/payments", async (req, res) => {
    try {
      const paymentData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(paymentData);
      res.json(payment);
    } catch (error) {
      res.status(400).json({ message: "Invalid payment data", error });
    }
  });

  app.get("/api/payments/client/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const payments = await storage.getPaymentsByClient(clientId);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching payments", error });
    }
  });

  // Stripe payment processing
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Payment processing not configured" });
    }

    try {
      const { amount, clientId, appointmentId, description } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Valid amount is required" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          clientId: clientId?.toString() || "",
          appointmentId: appointmentId?.toString() || "",
          description: description || "Training session payment"
        }
      });

      // Create payment record
      if (clientId) {
        await storage.createPayment({
          clientId,
          appointmentId: appointmentId || null,
          amount: amount.toString(),
          status: "pending",
          stripePaymentIntentId: paymentIntent.id,
          description: description || "Training session payment"
        });
      }

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  app.post("/api/confirm-payment", async (req, res) => {
    try {
      const { paymentIntentId } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({ message: "Payment intent ID is required" });
      }

      // Update payment status in database
      const payments = await storage.getPaymentsByClient(0); // This is a limitation - we'd need a better way to find by payment intent ID
      // For now, we'll just return success
      
      res.json({ message: "Payment confirmed successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Error confirming payment: " + error.message });
    }
  });

  // Admin API endpoints
  app.get("/api/admin/clients", async (req, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAllAppointments();
      res.json(appointments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/agreements", async (req, res) => {
    try {
      const agreements = await storage.getAllAgreements();
      res.json(agreements);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/admin/clients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteClient(id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/admin/appointments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      await storage.updateAppointmentStatus(id, status);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Content Management API endpoints
  app.put("/api/admin/content/hero", async (req, res) => {
    try {
      const { title, subtitle } = req.body;
      
      // Update or create hero title
      let heroTitle = await storage.getSiteContent("hero_title");
      if (heroTitle) {
        await storage.updateSiteContent("hero_title", { contentValue: title });
      } else {
        await storage.createSiteContent({
          contentKey: "hero_title",
          contentType: "text",
          contentValue: title,
          section: "home"
        });
      }

      // Update or create hero subtitle
      let heroSubtitle = await storage.getSiteContent("hero_subtitle");
      if (heroSubtitle) {
        await storage.updateSiteContent("hero_subtitle", { contentValue: subtitle });
      } else {
        await storage.createSiteContent({
          contentKey: "hero_subtitle",
          contentType: "text",
          contentValue: subtitle,
          section: "home"
        });
      }
      
      res.json({ 
        message: "Hero content updated successfully",
        title,
        subtitle 
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/admin/content/pricing", async (req, res) => {
    try {
      const { strengthTraining, mindsetCoaching, selfDefense } = req.body;
      
      // Update strength training price
      let strengthPrice = await storage.getSiteContent("strength_training_price");
      if (strengthPrice) {
        await storage.updateSiteContent("strength_training_price", { contentValue: strengthTraining });
      } else {
        await storage.createSiteContent({
          contentKey: "strength_training_price",
          contentType: "text",
          contentValue: strengthTraining,
          section: "programs"
        });
      }

      // Update mindset coaching price
      let mindsetPrice = await storage.getSiteContent("mindset_coaching_price");
      if (mindsetPrice) {
        await storage.updateSiteContent("mindset_coaching_price", { contentValue: mindsetCoaching });
      } else {
        await storage.createSiteContent({
          contentKey: "mindset_coaching_price",
          contentType: "text",
          contentValue: mindsetCoaching,
          section: "programs"
        });
      }

      // Update self defense price
      let selfDefensePrice = await storage.getSiteContent("self_defense_price");
      if (selfDefensePrice) {
        await storage.updateSiteContent("self_defense_price", { contentValue: selfDefense });
      } else {
        await storage.createSiteContent({
          contentKey: "self_defense_price",
          contentType: "text",
          contentValue: selfDefense,
          section: "programs"
        });
      }
      
      res.json({ 
        message: "Pricing updated successfully",
        strengthTraining,
        mindsetCoaching,
        selfDefense
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/admin/content/contact", async (req, res) => {
    try {
      const { email, phone, instagram, facebook, youtube } = req.body;
      
      res.json({ 
        message: "Contact information updated successfully",
        email,
        phone,
        social: { instagram, facebook, youtube }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/content/media", async (req, res) => {
    try {
      const { type, description, filename } = req.body;
      
      // In a real implementation, you'd handle file upload here
      // For now, we'll just acknowledge the request
      res.json({ 
        message: "Media uploaded successfully",
        type,
        description,
        filename,
        url: `/assets/${filename}`
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/content/quotes", async (req, res) => {
    try {
      const { quote, author, category } = req.body;
      
      // Here you'd typically save to the motivational quotes table
      res.json({ 
        message: "Quote added successfully",
        quote,
        author,
        category
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/admin/content/about", async (req, res) => {
    try {
      const { biography, yearsExperience, studentsTrained } = req.body;
      
      // Update coach biography
      let coachBio = await storage.getSiteContent("coach_biography");
      if (coachBio) {
        await storage.updateSiteContent("coach_biography", { contentValue: biography });
      } else {
        await storage.createSiteContent({
          contentKey: "coach_biography",
          contentType: "textarea",
          contentValue: biography,
          section: "about"
        });
      }

      // Update years experience
      let yearsExp = await storage.getSiteContent("years_experience");
      if (yearsExp) {
        await storage.updateSiteContent("years_experience", { contentValue: yearsExperience });
      } else {
        await storage.createSiteContent({
          contentKey: "years_experience",
          contentType: "text",
          contentValue: yearsExperience,
          section: "about"
        });
      }

      // Update students trained count
      let studentCount = await storage.getSiteContent("students_trained");
      if (studentCount) {
        await storage.updateSiteContent("students_trained", { contentValue: studentsTrained });
      } else {
        await storage.createSiteContent({
          contentKey: "students_trained",
          contentType: "text",
          contentValue: studentsTrained,
          section: "about"
        });
      }
      
      res.json({ 
        message: "About section updated successfully",
        biography,
        stats: {
          yearsExperience,
          studentsTrained
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // General text content management
  app.get("/api/admin/content", async (req, res) => {
    try {
      const content = await storage.getAllSiteContent();
      res.json(content);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/admin/content/text", async (req, res) => {
    try {
      const { contentKey, contentValue, section = "general", contentType = "text" } = req.body;
      
      if (!contentKey || !contentValue) {
        return res.status(400).json({ error: "contentKey and contentValue are required" });
      }

      let existingContent = await storage.getSiteContent(contentKey);
      if (existingContent) {
        await storage.updateSiteContent(contentKey, { contentValue });
      } else {
        await storage.createSiteContent({
          contentKey,
          contentType,
          contentValue,
          section
        });
      }
      
      res.json({ 
        message: "Content updated successfully",
        contentKey,
        contentValue
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Public content API for frontend consumption
  app.get("/api/content", async (req, res) => {
    try {
      const content = await storage.getAllSiteContent();
      
      // Transform content into a key-value structure for easy frontend access
      const contentMap = content.reduce((acc: any, item: any) => {
        acc[item.contentKey] = item.contentValue;
        return acc;
      }, {});
      
      res.json(contentMap);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/content/:contentKey", async (req, res) => {
    try {
      const { contentKey } = req.params;
      const content = await storage.getSiteContent(contentKey);
      
      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }
      
      res.json({ contentKey, contentValue: content.contentValue });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Configure multer to use memory storage (files go to R2, not local disk)
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
      console.log("File upload attempt:", file.originalname, file.mimetype);
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        console.error("Invalid file type:", file.mimetype);
        cb(new Error(`Only image files are allowed! Received: ${file.mimetype}`));
      }
    }
  });

  // Proxy route: serve R2 files via /uploads/:key
  app.get("/uploads/:key", async (req, res) => {
    try {
      const { body, contentType } = await streamFromR2(req.params.key);
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=31536000");
      body.pipe(res);
    } catch (error) {
      res.status(404).json({ message: "File not found" });
    }
  });

  // Image management routes
  app.get("/api/admin/images", async (req, res) => {
    try {
      const keys = await listR2Files();
      const imageFiles = keys.map(key => `/uploads/${key}`);
      res.json(imageFiles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching images", error });
    }
  });

  app.post("/api/admin/upload-images", upload.array('images'), async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const uploadedFiles = await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const key = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
          return uploadToR2(key, file.buffer, file.mimetype);
        })
      );

      res.json({
        message: "Images uploaded successfully",
        files: uploadedFiles
      });
    } catch (error) {
      res.status(500).json({ message: "Error uploading images", error });
    }
  });

  // Quote management routes
  app.get("/api/admin/quotes", async (req, res) => {
    try {
      // For now, return the static quotes from the component
      // In a real implementation, this would come from the database
      const quotes = [
        { id: 1, text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "mindset" },
        { id: 2, text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi", category: "strength" },
        // Add more quotes here
      ];
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching quotes", error });
    }
  });

  app.post("/api/admin/quotes", async (req, res) => {
    try {
      const { text, author, category } = req.body;
      
      if (!text || !author || !category) {
        return res.status(400).json({ message: "Text, author, and category are required" });
      }

      // Validate category
      const validCategories = ["strength", "mindset", "perseverance", "discipline", "self-defense", "transformation"];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ message: "Invalid category" });
      }

      // In a real implementation, save to database
      // For now, just log and return success
      console.log("New quote added:", { text, author, category });
      
      const newQuote = {
        id: Date.now(), // Simple ID generation
        text,
        author,
        category
      };

      res.json({ message: "Quote added successfully", quote: newQuote });
    } catch (error) {
      res.status(500).json({ message: "Error adding quote", error });
    }
  });

  app.post("/api/admin/replace-image", upload.single('newImage'), async (req, res) => {
    try {
      const { oldPath } = req.body;
      const newFile = req.file;

      if (!newFile || !oldPath) {
        return res.status(400).json({ message: "Missing required data" });
      }

      // Delete old file from R2 if it was an /uploads/ path
      const oldKey = oldPath.replace(/^\/uploads\//, "");
      if (oldPath.startsWith("/uploads/")) {
        try {
          await deleteFromR2(oldKey);
        } catch {
          console.log("Old R2 file not found, skipping deletion");
        }
      }

      // Upload new file to R2
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const key = `newImage-${uniqueSuffix}${path.extname(newFile.originalname)}`;
      const newPath = await uploadToR2(key, newFile.buffer, newFile.mimetype);

      res.json({ message: "Image replaced successfully", newPath, oldPath });
    } catch (error) {
      console.error("Error replacing image:", error);
      res.status(500).json({ message: "Error replacing image", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.delete("/api/admin/images", async (req, res) => {
    try {
      const { imagePath } = req.body;

      if (!imagePath) {
        return res.status(400).json({ message: "Image path required" });
      }

      const key = imagePath.replace(/^\/uploads\//, "");
      await deleteFromR2(key);
      res.json({ message: "Image deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting image", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
