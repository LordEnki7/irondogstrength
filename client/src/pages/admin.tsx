import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  Shield,
  Eye,
  Trash2,
  Edit,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  UserCheck,
  CalendarCheck,
  Upload,
  Image,
  X,
  RefreshCw
} from "lucide-react";

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  medicalConditions?: string;
  goals?: string;
  createdAt: string;
}

interface Appointment {
  id: number;
  clientId: number;
  date: string;
  time: string;
  status: string;
  notes?: string;
  createdAt: string;
  client?: Client;
}

interface Agreement {
  id: number;
  clientId: number;
  agreementType: string;
  signatureData: string;
  signedAt: string;
  client?: Client;
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  
  // Content management state
  const [heroTitle, setHeroTitle] = useState("TRANSFORM YOUR MIND AND BODY");
  const [heroSubtitle, setHeroSubtitle] = useState("Overcome Adversity. Build Inexorable Confidence.");
  const [livesTransformed, setLivesTransformed] = useState("500+");
  const [yearsExperience, setYearsExperience] = useState("15+");
  const [successRate, setSuccessRate] = useState("95%");
  const [meetCoachTitle, setMeetCoachTitle] = useState("Meet Your Coach");
  const [coachQuote, setCoachQuote] = useState("True strength comes from overcoming the battles within yourself. Every challenge is an opportunity to grow stronger.");
  
  // Program content state
  const [strengthTrainingTitle, setStrengthTrainingTitle] = useState("Strength Training");
  const [strengthTrainingDescription, setStrengthTrainingDescription] = useState("Build unbreakable physical and mental strength through progressive resistance training and mindset coaching.");
  const [strengthTrainingDuration, setStrengthTrainingDuration] = useState("Per Month");
  const [strengthTrainingFeature1, setStrengthTrainingFeature1] = useState("Personalized Training Plans");
  const [strengthTrainingFeature2, setStrengthTrainingFeature2] = useState("Nutrition Guidance");
  const [strengthTrainingFeature3, setStrengthTrainingFeature3] = useState("Progress Tracking");
  
  const [selfDefenseTitle, setSelfDefenseTitle] = useState("Self Defense");
  const [selfDefenseDescription, setSelfDefenseDescription] = useState("Master practical self-defense techniques while building confidence and situational awareness.");
  const [selfDefenseDuration, setSelfDefenseDuration] = useState("Flexible");
  const [selfDefenseFeature1, setSelfDefenseFeature1] = useState("Practical Combat Techniques");
  const [selfDefenseFeature2, setSelfDefenseFeature2] = useState("Situational Awareness");
  const [selfDefenseFeature3, setSelfDefenseFeature3] = useState("Confidence Building");
  
  const [mindsetCoachingTitle, setMindsetCoachingTitle] = useState("Mindset Coaching");
  const [mindsetCoachingDescription, setMindsetCoachingDescription] = useState("Overcome mental barriers and develop the warrior mindset needed for lasting transformation.");
  const [mindsetCoachingDuration, setMindsetCoachingDuration] = useState("Per Half Hour");
  
  // Schedule page content state
  const [schedulePageTitle, setSchedulePageTitle] = useState("Schedule Your Session");
  const [schedulePageSubtitle, setSchedulePageSubtitle] = useState("Take the first step towards your transformation. Select your preferred time and complete your booking.");
  const [scheduleStep1, setScheduleStep1] = useState("Select Time");
  const [scheduleStep2, setScheduleStep2] = useState("Your Details");
  const [scheduleStep3, setScheduleStep3] = useState("Agreement");
  const [scheduleTimeTitle, setScheduleTimeTitle] = useState("Choose Your Preferred Time");
  const [scheduleTimeDescription, setScheduleTimeDescription] = useState("Select a date from the calendar, then click on any available time slot to continue");
  const [scheduleInfoTitle, setScheduleInfoTitle] = useState("Your Information");
  const [scheduleInfoDescription, setScheduleInfoDescription] = useState("Tell us about yourself and your fitness goals");
  const [scheduleAgreementTitle, setScheduleAgreementTitle] = useState("Training Agreement");
  const [scheduleAgreementDescription, setScheduleAgreementDescription] = useState("Please review and sign the training agreement to complete your booking");
  const [sessionDuration, setSessionDuration] = useState("60 minutes");
  const [facilityAddress, setFacilityAddress] = useState("35840 Chester Rd., Avon, OH 44011");
  
  // Workout Motivation page content state
  const [motivationPageTitle, setMotivationPageTitle] = useState("Workout Motivation");
  const [motivationPageSubtitle, setMotivationPageSubtitle] = useState("Fuel your training sessions with powerful quotes from champions, warriors, and visionaries");
  const [motivationCategoryTitle, setMotivationCategoryTitle] = useState("Choose Your Inspiration");
  const [motivationGeneratorTitle, setMotivationGeneratorTitle] = useState("Daily Motivation Generator");
  const [motivationRitualTitle, setMotivationRitualTitle] = useState("Pre-Workout Ritual");
  const [motivationStep1Title, setMotivationStep1Title] = useState("Read Your Quote");
  const [motivationStep1Description, setMotivationStep1Description] = useState("Take a moment to absorb the message and let it fuel your determination.");
  const [motivationStep2Title, setMotivationStep2Title] = useState("Visualize Success");
  const [motivationStep2Description, setMotivationStep2Description] = useState("Picture yourself completing your workout with strength and confidence.");
  const [motivationStep3Title, setMotivationStep3Title] = useState("Set Your Intention");
  const [motivationStep3Description, setMotivationStep3Description] = useState("Focus on what you want to achieve in this session and beyond.");
  const [motivationStep4Title, setMotivationStep4Title] = useState("Begin with Power");
  const [motivationStep4Description, setMotivationStep4Description] = useState("Start your training with the mindset of a champion.");
  const [motivationAllQuotesTitle, setMotivationAllQuotesTitle] = useState("All Motivational Quotes");
  const [motivationCtaTitle, setMotivationCtaTitle] = useState("Ready to Transform?");
  const [motivationCtaDescription, setMotivationCtaDescription] = useState("Let these words fuel your journey. Book your next training session and turn inspiration into action.");
  
  // The Grind page content state
  const [grindPageTitle, setGrindPageTitle] = useState("THE GRIND");
  const [grindPageSubtitle, setGrindPageSubtitle] = useState("Witness the dedication, transformation, and relentless pursuit of excellence. These are the moments that define champions - the sweat, the effort, the grind that builds legends.");
  const [grindWorkoutsTitle, setGrindWorkoutsTitle] = useState("Gym Workouts");
  const [grindWorkoutsDescription, setGrindWorkoutsDescription] = useState("Intense training sessions that push limits and build champions");
  const [grindTransformationsTitle, setGrindTransformationsTitle] = useState("Client Transformations");
  const [grindTransformationsDescription, setGrindTransformationsDescription] = useState("Real results from dedicated clients who embraced the grind");
  const [grindCtaTitle, setGrindCtaTitle] = useState("Ready to Start Your Grind?");
  const [grindCtaDescription, setGrindCtaDescription] = useState("Join the ranks of champions who have transformed their lives through dedication, discipline, and the relentless pursuit of excellence.");
  const [grindCtaButton1, setGrindCtaButton1] = useState("Book Your Session");
  const [grindCtaButton2, setGrindCtaButton2] = useState("View Programs");
  const [grindContactTitle, setGrindContactTitle] = useState("Contact Iron Dog Strength");
  const [grindContactDescription, setGrindContactDescription] = useState("Ready to begin your transformation? Get in touch with our training team.");
  
  // Transformation stories state
  const [angelaName, setAngelaName] = useState("Angela Rodriguez");
  const [angelaProgram, setAngelaProgram] = useState("Complete Transformation");
  const [angelaTestimonial, setAngelaTestimonial] = useState("I lost 40 pounds, but what I really gained was my life back. The mindset coaching helped me overcome impossible obstacles.");
  const [jessicaName, setJessicaName] = useState("Jessica Davis");
  const [jessicaProgram, setJessicaProgram] = useState("Strength Training Graduate");
  const [jessicaTestimonial, setJessicaTestimonial] = useState("Master Cheers pushed me beyond what I thought was possible. I'm now lifting weights I never imagined and feeling stronger than ever.");
  const [cathyName, setCathyName] = useState("Cathy Nadolski");
  const [cathyProgram, setCathyProgram] = useState("11+ Year Transformation Journey");
  const [cathyTestimonial, setCathyTestimonial] = useState("My journey with Dessie and IDS began in 2013 at age 54. Over the years, Dessie has transformed me in ways that I didn't know I was capable of doing. He always believed in me! He would ask me 'why are you working out?' I told him I needed to be healthy for my special needs daughter and my aging mother as I care for them both. Over the years I was able to squat 205#, an accomplishment that still amazes me. A couple years ago I got the call from my mom stating she needed help because she fell and couldn't get up. I was able to help her because of my training with Dessie.");
  const [marcusName, setMarcusName] = useState("Marcus Thompson");
  const [marcusProgram, setMarcusProgram] = useState("Self Defense Student");
  const [marcusTestimonial, setMarcusTestimonial] = useState("The self-defense training gave me confidence I never knew I had. It taught me how to face any challenge in life with courage.");

  // Query existing content
  const { data: existingContent } = useQuery({
    queryKey: ["/api/content"],
    enabled: isAuthenticated,
  });

  // Update state when content loads
  useEffect(() => {
    if (existingContent && typeof existingContent === 'object' && existingContent !== null) {
      const content = existingContent as any;
      setHeroTitle(content.hero_title || "TRANSFORM YOUR MIND AND BODY");
      setHeroSubtitle(content.hero_subtitle || "Overcome Adversity. Build Inexorable Confidence.");
      setLivesTransformed(content.lives_transformed || "500+");
      setYearsExperience(content.years_experience || "15+");
      setSuccessRate(content.success_rate || "95%");
      setMeetCoachTitle(content.meet_coach_title || "Meet Your Coach");
      setCoachQuote(content.coach_quote || "True strength comes from overcoming the battles within yourself. Every challenge is an opportunity to grow stronger.");
      
      // Load program content
      setStrengthTrainingTitle(content.strength_training_title || "Strength Training");
      setStrengthTrainingDescription(content.strength_training_description || "Build unbreakable physical and mental strength through progressive resistance training and mindset coaching.");
      setStrengthTrainingDuration(content.strength_training_duration || "Per Month");
      setStrengthTrainingFeature1(content.strength_training_feature_1 || "Personalized Training Plans");
      setStrengthTrainingFeature2(content.strength_training_feature_2 || "Nutrition Guidance");
      setStrengthTrainingFeature3(content.strength_training_feature_3 || "Progress Tracking");
      
      setSelfDefenseTitle(content.self_defense_title || "Self Defense");
      setSelfDefenseDescription(content.self_defense_description || "Master practical self-defense techniques while building confidence and situational awareness.");
      setSelfDefenseDuration(content.self_defense_duration || "Flexible");
      setSelfDefenseFeature1(content.self_defense_feature_1 || "Practical Combat Techniques");
      setSelfDefenseFeature2(content.self_defense_feature_2 || "Situational Awareness");
      setSelfDefenseFeature3(content.self_defense_feature_3 || "Confidence Building");
      
      setMindsetCoachingTitle(content.mindset_coaching_title || "Mindset Coaching");
      setMindsetCoachingDescription(content.mindset_coaching_description || "Overcome mental barriers and develop the warrior mindset needed for lasting transformation.");
      setMindsetCoachingDuration(content.mindset_coaching_duration || "Per Half Hour");
      
      // Load schedule page content
      setSchedulePageTitle(content.schedule_page_title || "Schedule Your Session");
      setSchedulePageSubtitle(content.schedule_page_subtitle || "Take the first step towards your transformation. Select your preferred time and complete your booking.");
      setScheduleStep1(content.schedule_step_1 || "Select Time");
      setScheduleStep2(content.schedule_step_2 || "Your Details");
      setScheduleStep3(content.schedule_step_3 || "Agreement");
      setScheduleTimeTitle(content.schedule_time_title || "Choose Your Preferred Time");
      setScheduleTimeDescription(content.schedule_time_description || "Select a date from the calendar, then click on any available time slot to continue");
      setScheduleInfoTitle(content.schedule_info_title || "Your Information");
      setScheduleInfoDescription(content.schedule_info_description || "Tell us about yourself and your fitness goals");
      setScheduleAgreementTitle(content.schedule_agreement_title || "Training Agreement");
      setScheduleAgreementDescription(content.schedule_agreement_description || "Please review and sign the training agreement to complete your booking");
      setSessionDuration(content.session_duration || "60 minutes");
      setFacilityAddress(content.facility_address || "35840 Chester Rd., Avon, OH 44011");
      
      // Load workout motivation page content
      setMotivationPageTitle(content.motivation_page_title || "Workout Motivation");
      setMotivationPageSubtitle(content.motivation_page_subtitle || "Fuel your training sessions with powerful quotes from champions, warriors, and visionaries");
      setMotivationCategoryTitle(content.motivation_category_title || "Choose Your Inspiration");
      setMotivationGeneratorTitle(content.motivation_generator_title || "Daily Motivation Generator");
      setMotivationRitualTitle(content.motivation_ritual_title || "Pre-Workout Ritual");
      setMotivationStep1Title(content.motivation_step_1_title || "Read Your Quote");
      setMotivationStep1Description(content.motivation_step_1_description || "Take a moment to absorb the message and let it fuel your determination.");
      setMotivationStep2Title(content.motivation_step_2_title || "Visualize Success");
      setMotivationStep2Description(content.motivation_step_2_description || "Picture yourself completing your workout with strength and confidence.");
      setMotivationStep3Title(content.motivation_step_3_title || "Set Your Intention");
      setMotivationStep3Description(content.motivation_step_3_description || "Focus on what you want to achieve in this session and beyond.");
      setMotivationStep4Title(content.motivation_step_4_title || "Begin with Power");
      setMotivationStep4Description(content.motivation_step_4_description || "Start your training with the mindset of a champion.");
      setMotivationAllQuotesTitle(content.motivation_all_quotes_title || "All Motivational Quotes");
      setMotivationCtaTitle(content.motivation_cta_title || "Ready to Transform?");
      setMotivationCtaDescription(content.motivation_cta_description || "Let these words fuel your journey. Book your next training session and turn inspiration into action.");
      
      // Load the grind page content
      setGrindPageTitle(content.grind_page_title || "THE GRIND");
      setGrindPageSubtitle(content.grind_page_subtitle || "Witness the dedication, transformation, and relentless pursuit of excellence. These are the moments that define champions - the sweat, the effort, the grind that builds legends.");
      setGrindWorkoutsTitle(content.grind_workouts_title || "Gym Workouts");
      setGrindWorkoutsDescription(content.grind_workouts_description || "Intense training sessions that push limits and build champions");
      setGrindTransformationsTitle(content.grind_transformations_title || "Client Transformations");
      setGrindTransformationsDescription(content.grind_transformations_description || "Real results from dedicated clients who embraced the grind");
      setGrindCtaTitle(content.grind_cta_title || "Ready to Start Your Grind?");
      setGrindCtaDescription(content.grind_cta_description || "Join the ranks of champions who have transformed their lives through dedication, discipline, and the relentless pursuit of excellence.");
      setGrindCtaButton1(content.grind_cta_button_1 || "Book Your Session");
      setGrindCtaButton2(content.grind_cta_button_2 || "View Programs");
      setGrindContactTitle(content.grind_contact_title || "Contact Iron Dog Strength");
      setGrindContactDescription(content.grind_contact_description || "Ready to begin your transformation? Get in touch with our training team.");
      setAngelaName(content.angela_name || "Angela Rodriguez");
      setAngelaProgram(content.angela_program || "Complete Transformation");
      setAngelaTestimonial(content.angela_testimonial || "I lost 40 pounds, but what I really gained was my life back. The mindset coaching helped me overcome impossible obstacles.");
      setJessicaName(content.jessica_name || "Jessica Davis");
      setJessicaProgram(content.jessica_program || "Strength Training Graduate");
      setJessicaTestimonial(content.jessica_testimonial || "Master Cheers pushed me beyond what I thought was possible. I'm now lifting weights I never imagined and feeling stronger than ever.");
      setCathyName(content.cathy_name || "Cathy Nadolski");
      setCathyProgram(content.cathy_program || "11+ Year Transformation Journey");
      setCathyTestimonial(content.cathy_testimonial || "My journey with Dessie and IDS began in 2013 at age 54. Over the years, Dessie has transformed me in ways that I didn't know I was capable of doing. He always believed in me! He would ask me 'why are you working out?' I told him I needed to be healthy for my special needs daughter and my aging mother as I care for them both. Over the years I was able to squat 205#, an accomplishment that still amazes me. A couple years ago I got the call from my mom stating she needed help because she fell and couldn't get up. I was able to help her because of my training with Dessie.");
      setMarcusName(content.marcus_name || "Marcus Thompson");
      setMarcusProgram(content.marcus_program || "Self Defense Student");
      setMarcusTestimonial(content.marcus_testimonial || "The self-defense training gave me confidence I never knew I had. It taught me how to face any challenge in life with courage.");
      
      // Load contact page content
      setContactPageTitle(content.contact_page_title || "GET IN TOUCH");
      setContactPageSubtitle(content.contact_page_subtitle || "Ready to Transform Your Life?");
      setContactFormDescription(content.contact_form_description || "Take the first step towards your transformation. Reach out today to learn about our programs and start your journey to a stronger, more confident you.");
      setContactFormButtonText(content.contact_form_button_text || "Send Message");
      setContactSuccessMessage(content.contact_success_message || "Message Sent! We'll get back to you within 24 hours.");
      
      // Load about coach page content
      setAboutPageTitle(content.about_page_title || "MEET YOUR COACH");
      setCoachName(content.coach_name || "Master Dessie L. Cheers");
      setCoachTitle(content.coach_title || "Master Motivator, Strength Coach & Private Self Defense Instructor");
      setExperienceDescription(content.experience_description || "15+");
      
      // Load home page content
      setWelcomeMessage(content.welcome_message || "Welcome to Iron Dog Strength, where transformation begins with mindset and commitment drives results.");
      
      // Load client portal content
      setPortalTitle(content.portal_title || "CLIENT PORTAL");
      setSearchPrompt(content.search_prompt || "Enter your email to access your profile");
      setDashboardTab(content.dashboard_tab || "Dashboard");
      setAppointmentsTab(content.appointments_tab || "Appointments");
      setProgressTab(content.progress_tab || "Progress");
      setProfileTab(content.profile_tab || "Profile");
      setWorkoutsTab(content.workouts_tab || "Workouts");
      setPaymentsTab(content.payments_tab || "Payments");
      setGoalsTab(content.goals_tab || "Goals");
      setPortalWelcome(content.portal_welcome || "Welcome to your personal training portal. Track your progress, view appointments, and access your customized workout plans.");
      
      // Load philosophy and book content
      setCoachBio(content.coach_bio || "Master Dessie L. Cheers is a dedicated fitness professional with over 15 years of experience transforming lives through strength training, self-defense, and mindset coaching. His unique approach combines physical training with mental resilience to create lasting transformation.");
      setPhilosophyTitle1(content.philosophy_title_1 || "Mind-Body Connection");
      setPhilosophyTitle2(content.philosophy_title_2 || "Overcoming Adversity");
      setPhilosophyTitle3(content.philosophy_title_3 || "Personal Excellence");
      setPhilosophyTitle4(content.philosophy_title_4 || "Holistic Wellness");
      setBookTitle(content.book_title || "Can't Weight For Loss");
      setBookDescription(content.book_description || "Transform Your Approach to Fitness and Wellness");
      
      // Load motivational quote content
      setQuotePageTitle(content.quote_page_title || "DAILY MOTIVATION");
      setQuoteSectionTitle(content.quote_section_title || "Fuel Your Fire");
      setGenerateButtonText(content.generate_button_text || "Get New Quote");
      setCategoryLabels(content.category_labels || "Strength, Mindset, Perseverance, Discipline, Self-Defense, Transformation");
      setQuoteDescription(content.quote_description || "Draw inspiration from the wisdom of champions, athletes, and visionaries. Let these powerful words fuel your transformation journey.");
      
      // Load footer content
      setCompanyName(content.company_name || "Iron Dog 7 LLC");
      setFooterTagline(content.footer_tagline || "Transform Your Mind and Body");
      setCopyrightText(content.copyright_text || "© 2025 Iron Dog 7 LLC. All rights reserved.");
      setQuickLinksHeader(content.quick_links_header || "Quick Links");
      
      // Load programs & services content
      setStrengthTrainingPrice(content.strength_training_price || "$125/month");
      setMindsetCoachingPrice(content.mindset_coaching_price || "$50/half hour");
      setSelfDefensePrice(content.self_defense_price || "$100/session");
      
      // Load contact information
      setContactEmail(content.contact_email || "train@irondogstrength.com");
      setContactPhone(content.contact_phone || "(555) 123-4567");
      setContactInstagram(content.contact_instagram || "irondog_strength");
      setContactFacebook(content.contact_facebook || "IrondDog7Strength");
      setContactYoutube(content.contact_youtube || "irondDog7");
      
      // Load additional contact page content
      setContactInfoHeader(content.contact_info_header || "Contact Information");
      setTrainingLocationTitle(content.training_location_title || "Training Location");
      setFacilityName(content.facility_name || "Iron Dog Strength Training Facility");
      setQuickResponseText(content.quick_response_text || "Quick Response");
      setFreeConsultationText(content.free_consultation_text || "Free Consultation");
      setNoObligationText(content.no_obligation_text || "No Obligation");
      setSendMessageHeader(content.send_message_header || "Send Us a Message");
      setWhyChooseHeader(content.why_choose_header || "Why Choose Iron Dog Strength?");
      setFirstNameLabel(content.first_name_label || "First Name *");
      setLastNameLabel(content.last_name_label || "Last Name *");
      setEmailLabel(content.email_label || "Email Address *");
      setPhoneLabel(content.phone_label || "Phone Number");
      
      // Load additional client portal content
      setPortalHeroTitle(content.portal_hero_title || "Client Portal");
      setPortalHeroSubtitle(content.portal_hero_subtitle || "Access your training schedule, view progress, and manage your appointments");
      setAccessPortalHeader(content.access_portal_header || "Access Your Portal");
      setAccessPortalDescription(content.access_portal_description || "Enter the email address you used when booking your appointment");
      setEmailInputLabel(content.email_input_label || "Email Address");
      setEmailPlaceholder(content.email_placeholder || "Enter your email address");
      setAccessButtonText(content.access_button_text || "Access Portal");
      setNoAccountText(content.no_account_text || "Don't have an account?");
      setCreateAccountText(content.create_account_text || "Create your account");
      setBookSessionText(content.book_session_text || "book a session");
    }
  }, [existingContent]);
  

  const [newQuote, setNewQuote] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [quoteCategory, setQuoteCategory] = useState("strength");
  const [yearsExp, setYearsExp] = useState("15+");
  const [studentsTrained, setStudentsTrained] = useState("500+");
  const [mediaDescription, setMediaDescription] = useState("");
  
  // Contact page state
  const [contactPageTitle, setContactPageTitle] = useState("GET IN TOUCH");
  const [contactPageSubtitle, setContactPageSubtitle] = useState("Ready to Transform Your Life?");
  const [contactFormDescription, setContactFormDescription] = useState("Take the first step towards your transformation. Reach out today to learn about our programs and start your journey to a stronger, more confident you.");
  const [contactFormButtonText, setContactFormButtonText] = useState("Send Message");
  const [contactSuccessMessage, setContactSuccessMessage] = useState("Message Sent! We'll get back to you within 24 hours.");
  
  // About coach page state
  const [aboutPageTitle, setAboutPageTitle] = useState("MEET YOUR COACH");
  const [coachName, setCoachName] = useState("Master Dessie L. Cheers");
  const [coachTitle, setCoachTitle] = useState("Master Motivator, Strength Coach & Private Self Defense Instructor");
  const [experienceDescription, setExperienceDescription] = useState("15+ Years Experience");
  
  // Home page welcome message state
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to Iron Dog Strength, where transformation begins with mindset and commitment drives results.");
  
  // Client portal content state
  const [portalTitle, setPortalTitle] = useState("CLIENT PORTAL");
  const [searchPrompt, setSearchPrompt] = useState("Enter your email to access your profile");
  const [dashboardTab, setDashboardTab] = useState("Dashboard");
  const [appointmentsTab, setAppointmentsTab] = useState("Appointments");
  const [progressTab, setProgressTab] = useState("Progress");
  const [profileTab, setProfileTab] = useState("Profile");
  const [workoutsTab, setWorkoutsTab] = useState("Workouts");
  const [paymentsTab, setPaymentsTab] = useState("Payments");
  const [goalsTab, setGoalsTab] = useState("Goals");
  const [portalWelcome, setPortalWelcome] = useState("Welcome to your personal training portal. Track your progress, view appointments, and access your customized workout plans.");
  
  // Philosophy and book content state
  const [coachBio, setCoachBio] = useState("Master Dessie L. Cheers is a dedicated fitness professional with over 15 years of experience transforming lives through strength training, self-defense, and mindset coaching. His unique approach combines physical training with mental resilience to create lasting transformation.");
  const [philosophyTitle1, setPhilosophyTitle1] = useState("Mind-Body Connection");
  const [philosophyTitle2, setPhilosophyTitle2] = useState("Overcoming Adversity");
  const [philosophyTitle3, setPhilosophyTitle3] = useState("Personal Excellence");
  const [philosophyTitle4, setPhilosophyTitle4] = useState("Holistic Wellness");
  const [bookTitle, setBookTitle] = useState("Can't Weight For Loss");
  const [bookDescription, setBookDescription] = useState("Transform Your Approach to Fitness and Wellness");
  
  // Motivational quote system state
  const [quotePageTitle, setQuotePageTitle] = useState("DAILY MOTIVATION");
  const [quoteSectionTitle, setQuoteSectionTitle] = useState("Fuel Your Fire");
  const [generateButtonText, setGenerateButtonText] = useState("Get New Quote");
  const [categoryLabels, setCategoryLabels] = useState("Strength, Mindset, Perseverance, Discipline, Self-Defense, Transformation");
  const [quoteDescription, setQuoteDescription] = useState("Draw inspiration from the wisdom of champions, athletes, and visionaries. Let these powerful words fuel your transformation journey.");
  
  // Footer content state
  const [companyName, setCompanyName] = useState("Iron Dog 7 LLC");
  const [footerTagline, setFooterTagline] = useState("Transform Your Mind and Body");
  const [copyrightText, setCopyrightText] = useState("© 2025 Iron Dog 7 LLC. All rights reserved.");
  const [quickLinksHeader, setQuickLinksHeader] = useState("Quick Links");
  
  // Programs & services state
  const [strengthTrainingPrice, setStrengthTrainingPrice] = useState("$125/month");
  const [mindsetCoachingPrice, setMindsetCoachingPrice] = useState("$50/half hour");
  const [selfDefensePrice, setSelfDefensePrice] = useState("$100/session");
  
  // Contact information state for save buttons
  const [contactEmail, setContactEmail] = useState("train@irondogstrength.com");
  const [contactPhone, setContactPhone] = useState("(555) 123-4567");
  const [contactInstagram, setContactInstagram] = useState("irondog_strength");
  const [contactFacebook, setContactFacebook] = useState("IrondDog7Strength");
  const [contactYoutube, setContactYoutube] = useState("irondDog7");
  
  // Additional Contact Page Content
  const [contactInfoHeader, setContactInfoHeader] = useState("Contact Information");
  const [trainingLocationTitle, setTrainingLocationTitle] = useState("Training Location");
  const [facilityName, setFacilityName] = useState("Iron Dog Strength Training Facility");
  const [quickResponseText, setQuickResponseText] = useState("Quick Response");
  const [freeConsultationText, setFreeConsultationText] = useState("Free Consultation");
  const [noObligationText, setNoObligationText] = useState("No Obligation");
  const [sendMessageHeader, setSendMessageHeader] = useState("Send Us a Message");
  const [whyChooseHeader, setWhyChooseHeader] = useState("Why Choose Iron Dog Strength?");
  const [firstNameLabel, setFirstNameLabel] = useState("First Name *");
  const [lastNameLabel, setLastNameLabel] = useState("Last Name *");
  const [emailLabel, setEmailLabel] = useState("Email Address *");
  const [phoneLabel, setPhoneLabel] = useState("Phone Number");
  
  // Client Portal Additional Content
  const [portalHeroTitle, setPortalHeroTitle] = useState("Client Portal");
  const [portalHeroSubtitle, setPortalHeroSubtitle] = useState("Access your training schedule, view progress, and manage your appointments");
  const [accessPortalHeader, setAccessPortalHeader] = useState("Access Your Portal");
  const [accessPortalDescription, setAccessPortalDescription] = useState("Enter the email address you used when booking your appointment");
  const [emailInputLabel, setEmailInputLabel] = useState("Email Address");
  const [emailPlaceholder, setEmailPlaceholder] = useState("Enter your email address");
  const [accessButtonText, setAccessButtonText] = useState("Access Portal");
  const [noAccountText, setNoAccountText] = useState("Don't have an account?");
  const [createAccountText, setCreateAccountText] = useState("Create your account");
  const [bookSessionText, setBookSessionText] = useState("book a session");
  
  // Image management state
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageGallery, setImageGallery] = useState<string[]>([]);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  // Authentication
  const handleAdminLogin = () => {
    // Simple password check - in production, use proper authentication
    if (adminPassword === "irondog2025") {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the Iron Dog Strength Admin Dashboard",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin password",
        variant: "destructive",
      });
    }
  };

  // Data fetching
  const { data: clients = [], isLoading: clientsLoading } = useQuery({
    queryKey: ["/api/admin/clients"],
    enabled: isAuthenticated,
  });

  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
    queryKey: ["/api/admin/appointments"],
    enabled: isAuthenticated,
  });

  const { data: agreements = [], isLoading: agreementsLoading } = useQuery({
    queryKey: ["/api/admin/agreements"],
    enabled: isAuthenticated,
  });

  // Image gallery query
  const { data: galleryImages = [], isLoading: galleryLoading } = useQuery({
    queryKey: ["/api/admin/images"],
    enabled: isAuthenticated,
  });

  // Delete mutations
  const deleteClientMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/clients/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/clients"] });
      toast({ title: "Client deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete client", variant: "destructive" });
    },
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/appointments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/appointments"] });
      toast({ title: "Appointment deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete appointment", variant: "destructive" });
    },
  });

  // Update appointment status
  const updateAppointmentMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => 
      apiRequest("PATCH", `/api/admin/appointments/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/appointments"] });
      toast({ title: "Appointment updated successfully" });
    },
  });

  // Content management mutations
  const updateTextContentMutation = useMutation({
    mutationFn: ({ contentKey, contentValue, section = "general" }: { contentKey: string; contentValue: string; section?: string }) => 
      apiRequest("PUT", "/api/admin/content/text", { contentKey, contentValue, section }),
    onSuccess: () => {
      toast({ title: "Content updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update content", variant: "destructive" });
    },
  });

  const updateHeroMutation = useMutation({
    mutationFn: () => Promise.all([
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "hero_title", contentValue: heroTitle, section: "home" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "hero_subtitle", contentValue: heroSubtitle, section: "home" })
    ]),
    onSuccess: () => {
      toast({ title: "Hero content updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update hero content", variant: "destructive" });
    },
  });

  const updatePricingMutation = useMutation({
    mutationFn: () => apiRequest("PUT", "/api/admin/content/pricing", { 
      strengthTraining: strengthTrainingPrice,
      mindsetCoaching: mindsetCoachingPrice,
      selfDefense: selfDefensePrice
    }),
    onSuccess: () => {
      toast({ title: "Pricing updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update pricing", variant: "destructive" });
    },
  });



  const addQuoteMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/content/quotes", { 
      quote: newQuote,
      author: quoteAuthor,
      category: quoteCategory
    }),
    onSuccess: () => {
      toast({ title: "Quote added successfully" });
      setNewQuote("");
      setQuoteAuthor("");
      setQuoteCategory("strength");
    },
    onError: () => {
      toast({ title: "Failed to add quote", variant: "destructive" });
    },
  });

  const updateAboutMutation = useMutation({
    mutationFn: () => apiRequest("PUT", "/api/admin/content/about", { 
      biography: coachBio,
      yearsExperience: yearsExp,
      studentsTrained: studentsTrained
    }),
    onSuccess: () => {
      toast({ title: "About section updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update about section", variant: "destructive" });
    },
  });

  const updateTransformationStoriesMutation = useMutation({
    mutationFn: () => Promise.all([
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "angela_name", contentValue: angelaName, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "angela_program", contentValue: angelaProgram, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "angela_testimonial", contentValue: angelaTestimonial, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "jessica_name", contentValue: jessicaName, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "jessica_program", contentValue: jessicaProgram, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "jessica_testimonial", contentValue: jessicaTestimonial, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "cathy_name", contentValue: cathyName, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "cathy_program", contentValue: cathyProgram, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "cathy_testimonial", contentValue: cathyTestimonial, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "marcus_name", contentValue: marcusName, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "marcus_program", contentValue: marcusProgram, section: "testimonials" }),
      apiRequest("PUT", "/api/admin/content/text", { contentKey: "marcus_testimonial", contentValue: marcusTestimonial, section: "testimonials" })
    ]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      toast({ title: "Transformation stories updated successfully", description: "Changes are now live on the website" });
    },
    onError: () => {
      toast({ title: "Failed to update transformation stories", variant: "destructive" });
    },
  });

  // Image management functions
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  const uploadImagesMutation = useMutation({
    mutationFn: async (images: File[]) => {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });
      
      return fetch("/api/admin/upload-images", {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: () => {
      toast({ title: "Images uploaded successfully" });
      setSelectedImages([]);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/images"] });
    },
    onError: () => {
      toast({ title: "Failed to upload images", variant: "destructive" });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: (imagePath: string) => 
      apiRequest("DELETE", "/api/admin/images", { imagePath }),
    onSuccess: () => {
      toast({ title: "Image deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/images"] });
    },
    onError: () => {
      toast({ title: "Failed to delete image", variant: "destructive" });
    },
  });

  const replaceImageMutation = useMutation({
    mutationFn: async ({ oldPath, newFile }: { oldPath: string; newFile: File }) => {
      console.log("Replacing image:", { oldPath, fileName: newFile.name });
      const formData = new FormData();
      formData.append("newImage", newFile);
      formData.append("oldPath", oldPath);
      
      const response = await fetch("/api/admin/replace-image", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Replace image error:", errorData);
        throw new Error(`Failed to replace image: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Image replacement successful:", data);
      toast({ title: "Image replaced successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/images"] });
    },
    onError: (error) => {
      console.error("Replace image mutation error:", error);
      toast({ title: "Failed to replace image", variant: "destructive" });
    },
  });

  // Statistics calculations
  const stats = {
    totalClients: Array.isArray(clients) ? clients.length : 0,
    totalAppointments: Array.isArray(appointments) ? appointments.length : 0,
    completedAppointments: Array.isArray(appointments) ? appointments.filter((apt: any) => apt.status === "completed").length : 0,
    pendingAppointments: Array.isArray(appointments) ? appointments.filter((apt: any) => apt.status === "scheduled").length : 0,
    totalRevenue: Array.isArray(appointments) ? appointments.filter((apt: any) => apt.status === "completed").length * 375 : 0, // Assuming $375 per session
    signedAgreements: Array.isArray(agreements) ? agreements.length : 0,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.9) 0%, 
          rgba(147, 197, 253, 0.8) 50%,
          rgba(186, 230, 253, 0.9) 100%)`
      }}>
        <Card className="w-full max-w-md border-2 border-iron-blue-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="text-white" size={32} />
            </div>
            <CardTitle className="text-2xl text-gray-900">Admin Access</CardTitle>
            <p className="text-gray-800">Enter admin password to continue</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
              className="text-gray-900 placeholder:text-gray-600 bg-white border-gray-300 focus:border-gray-500"
            />
            <Button 
              onClick={handleAdminLogin}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold"
            >
              Access Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.8) 0%, 
        rgba(219, 234, 254, 0.4) 50%,
        rgba(255, 255, 255, 0.9) 100%)`
    }}>
      {/* Header */}
      <div className="border-b border-iron-blue-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-800">Iron Dog Strength Management</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
              className="border-gray-400 text-gray-800 hover:bg-gray-100"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="mr-2" size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center">
              <Edit className="mr-2" size={16} />
              Content
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center">
              <Users className="mr-2" size={16} />
              Clients
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center">
              <Calendar className="mr-2" size={16} />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="agreements" className="flex items-center">
              <FileText className="mr-2" size={16} />
              Agreements
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2" size={16} />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-iron-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Total Clients</CardTitle>
                  <UserCheck className="h-4 w-4 text-iron-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalClients}</div>
                  <p className="text-xs text-gray-700">Active members</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-iron-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Total Appointments</CardTitle>
                  <CalendarCheck className="h-4 w-4 text-iron-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</div>
                  <p className="text-xs text-gray-700">All time bookings</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-iron-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-iron-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-gray-700">Completed sessions</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-iron-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-iron-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.pendingAppointments}</div>
                  <p className="text-xs text-gray-700">Upcoming sessions</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-iron-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Completed</CardTitle>
                  <TrendingUp className="h-4 w-4 text-iron-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.completedAppointments}</div>
                  <p className="text-xs text-gray-700">Finished sessions</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-iron-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-900">Agreements</CardTitle>
                  <FileText className="h-4 w-4 text-iron-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.signedAgreements}</div>
                  <p className="text-xs text-gray-700">Signed documents</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-2 border-iron-blue-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Recent Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="space-y-2">
                    {Array.isArray(appointments) ? appointments.slice(0, 5).map((appointment: any) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 border border-iron-blue-100 rounded">
                        <div>
                          <p className="font-medium text-gray-900">
                            {appointment.client?.firstName} {appointment.client?.lastName}
                          </p>
                          <p className="text-sm text-gray-700">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </p>
                        </div>
                        <Badge variant={appointment.status === "completed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                      </div>
                    )) : <p>No appointments found</p>}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Hero Content Management */}
              <Card className="border-2 border-iron-blue-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center">
                    <Edit className="mr-2" size={16} />
                    Hero Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Main Hero Title</label>
                    <Input
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      placeholder="OVERCOME ADVERSITY. BUILD INEXORABLE CONFIDENCE."
                      className="border-iron-blue-200 focus:border-iron-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Hero Subtitle</label>
                    <Input
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      placeholder="Transform your mind and body with Iron Dog Strength"
                      className="border-iron-blue-200 focus:border-iron-blue-400"
                    />
                  </div>
                  <Button 
                    onClick={() => updateHeroMutation.mutate()}
                    disabled={updateHeroMutation.isPending}
                    className="w-full !bg-gray-800 hover:!bg-gray-900 !text-white font-semibold"
                  >
                    {updateHeroMutation.isPending ? "Updating..." : "Update Hero Content"}
                  </Button>
                </CardContent>
              </Card>

              {/* Program Pricing Management */}
              <Card className="border-2 border-iron-blue-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center">
                    <DollarSign className="mr-2" size={16} />
                    Program Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Strength Training (Monthly)</label>
                    <Input
                      value={strengthTrainingPrice}
                      onChange={(e) => setStrengthTrainingPrice(e.target.value)}
                      placeholder="$125"
                      className="border-iron-blue-200 focus:border-iron-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Mindset Coaching (Per Session)</label>
                    <Input
                      value={mindsetCoachingPrice}
                      onChange={(e) => setMindsetCoachingPrice(e.target.value)}
                      placeholder="$50"
                      className="border-iron-blue-200 focus:border-iron-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Self Defense Program</label>
                    <Input
                      value={selfDefensePrice}
                      onChange={(e) => setSelfDefensePrice(e.target.value)}
                      placeholder="Custom Pricing"
                      className="border-iron-blue-200 focus:border-iron-blue-400"
                    />
                  </div>
                  <Button 
                    onClick={() => updatePricingMutation.mutate()}
                    disabled={updatePricingMutation.isPending}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold"
                  >
                    {updatePricingMutation.isPending ? "Updating..." : "Update Pricing"}
                  </Button>
                </CardContent>
              </Card>



              {/* Media Management */}
              <Card className="border-2 border-iron-blue-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center">
                    <Eye className="mr-2" size={16} />
                    Media Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Upload New Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full p-2 border border-iron-blue-200 rounded-md bg-white text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Upload New Audio</label>
                    <input
                      type="file"
                      accept="audio/*"
                      className="w-full p-2 border border-iron-blue-200 rounded-md bg-white text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Description/Alt Text</label>
                    <Input
                      placeholder="Describe the media for accessibility"
                      className="border-iron-blue-200 focus:border-iron-blue-400"
                    />
                  </div>
                  <Button className="w-full !bg-gray-800 hover:!bg-gray-900 !text-white font-semibold">
                    Upload Media
                  </Button>
                </CardContent>
              </Card>

            </div>

            {/* Motivational Quotes Management */}
            <Card className="border-2 border-iron-blue-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <FileText className="mr-2" size={16} />
                  Motivational Quotes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">New Quote</label>
                    <textarea
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      placeholder="Enter an inspiring quote..."
                      rows={3}
                      className="w-full p-3 border border-iron-blue-200 rounded-md bg-white text-gray-700 resize-none focus:border-iron-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Author</label>
                    <Input
                      value={quoteAuthor}
                      onChange={(e) => setQuoteAuthor(e.target.value)}
                      placeholder="Quote author"
                      className="border-iron-blue-200 focus:border-iron-blue-400 mb-3"
                    />
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                    <select 
                      value={quoteCategory}
                      onChange={(e) => setQuoteCategory(e.target.value)}
                      className="w-full p-2 border border-iron-blue-200 rounded-md bg-white text-gray-700"
                    >
                      <option value="strength">Strength</option>
                      <option value="mindset">Mindset</option>
                      <option value="perseverance">Perseverance</option>
                      <option value="discipline">Discipline</option>
                      <option value="self-defense">Self Defense</option>
                      <option value="transformation">Transformation</option>
                    </select>
                  </div>
                </div>
                <Button 
                  onClick={() => addQuoteMutation.mutate()}
                  disabled={addQuoteMutation.isPending || !newQuote || !quoteAuthor}
                  className="w-full mt-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold"
                >
                  {addQuoteMutation.isPending ? "Adding..." : "Add Quote"}
                </Button>
              </CardContent>
            </Card>

            {/* About Coach Content */}
            <Card className="border-2 border-iron-blue-200">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Users className="mr-2" size={16} />
                  About Coach Section
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Coach Biography</label>
                  <textarea
                    value={coachBio}
                    onChange={(e) => setCoachBio(e.target.value)}
                    placeholder="Update the coach biography text..."
                    rows={6}
                    className="w-full p-3 border border-iron-blue-200 rounded-md bg-white text-gray-700 resize-none focus:border-iron-blue-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Years Experience</label>
                    <Input
                      value={yearsExp}
                      onChange={(e) => setYearsExp(e.target.value)}
                      placeholder="15+"
                      className="border-iron-blue-200 focus:border-iron-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Students Trained</label>
                    <Input
                      value={studentsTrained}
                      onChange={(e) => setStudentsTrained(e.target.value)}
                      placeholder="500+"
                      className="border-iron-blue-200 focus:border-iron-blue-400"
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => updateAboutMutation.mutate()}
                  disabled={updateAboutMutation.isPending}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold"
                >
                  {updateAboutMutation.isPending ? "Updating..." : "Update About Section"}
                </Button>
              </CardContent>
            </Card>
            
            {/* Asset Replacement Guide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <RefreshCw className="mr-2" size={16} />
                    How to Replace Assets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-green-700">
                    <div className="flex items-start space-x-2">
                      <span className="font-semibold text-green-800">1.</span>
                      <span>Find the image in the <strong>Image Gallery</strong> below</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-semibold text-green-800">2.</span>
                      <span>Hover over it and click the <strong>🔄 Replace</strong> button</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-semibold text-green-800">3.</span>
                      <span>Select your new file - it replaces automatically</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-semibold text-green-800">4.</span>
                      <span>Changes appear immediately across the website</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center">
                    <Image className="mr-2" size={16} />
                    Key Assets to Replace
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div><strong>irondog-logo.jpg</strong> - Header logo</div>
                    <div><strong>founder-photo.jpg</strong> - About page coach image</div>
                    <div><strong>client-transformation-1.jpg</strong> - Progress showcase</div>
                    <div><strong>book-cover.jpg</strong> - "Can't Weight For Loss" book</div>
                    <div><strong>egyptian-silhouette.jpg</strong> - Background image</div>
                    <div><strong>group-training.mp4</strong> - Workout videos</div>
                    <div><strong>daily-motivation.m4a</strong> - Audio content</div>
                    <div className="pt-2 text-blue-600 font-medium">
                      💡 Tip: New files keep the same name but update content
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Image Management Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Image Upload */}
              <Card className="border-2 border-iron-blue-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center">
                    <Upload className="mr-2" size={16} />
                    Upload New Images
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Select Images</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="w-full p-2 border border-iron-blue-200 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-iron-blue-50 file:text-iron-blue-700 hover:file:bg-iron-blue-100"
                    />
                  </div>
                  {selectedImages.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-700 mb-2">Selected Files:</p>
                      <ul className="space-y-1">
                        {selectedImages.map((file, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-center">
                            <Image className="mr-2" size={12} />
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button 
                    onClick={() => uploadImagesMutation.mutate(selectedImages)}
                    disabled={selectedImages.length === 0 || uploadImagesMutation.isPending}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold"
                  >
                    {uploadImagesMutation.isPending ? "Uploading..." : "Upload Images"}
                  </Button>
                </CardContent>
              </Card>

              {/* Content Management System */}
              <Card className="border-2 border-iron-blue-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center">
                    <RefreshCw className="mr-2" size={16} />
                    Content Management
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Select what you want to replace in your app</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Content Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      
                      {/* Header Logo */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Header Logo</h4>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Logo</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Iron Dog Strength logo in header navigation</p>
                        <p className="text-xs text-iron-blue-600 mb-3">Location: All pages → Top header</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open('/', '_blank')}
                            className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                          >
                            🔗 View
                          </button>
                          <label className="flex-1 cursor-pointer">
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                console.log("Replacing header logo with:", file.name);
                                // Handle logo replacement logic here
                              }
                            }} />
                            <div className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-center transition-colors">
                              Replace
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* About Page Coach Photo */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Coach Photo</h4>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Image</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Master Dessie's profile photo</p>
                        <p className="text-xs text-iron-blue-600 mb-3">Location: About page → Biography section</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open('/about', '_blank')}
                            className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                          >
                            🔗 View
                          </button>
                          <label className="flex-1 cursor-pointer">
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                console.log("Replacing coach photo with:", file.name);
                                // Handle coach photo replacement logic here
                              }
                            }} />
                            <div className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-center transition-colors">
                              Replace
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Book Cover */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Book Cover</h4>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Image</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">"Can't Weight For Loss" book cover</p>
                        <p className="text-xs text-iron-blue-600 mb-3">Location: About page → Published Works</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open('/about', '_blank')}
                            className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                          >
                            🔗 View
                          </button>
                          <label className="flex-1 cursor-pointer">
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                console.log("Replacing book cover with:", file.name);
                                // Handle book cover replacement logic here
                              }
                            }} />
                            <div className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-center transition-colors">
                              Replace
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* The Grind Videos */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Training Videos</h4>
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Video</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Workout and training videos</p>
                        <p className="text-xs text-iron-blue-600 mb-3">Location: The Grind page → Video section</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open('/the-grind', '_blank')}
                            className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                          >
                            🔗 View
                          </button>
                          <label className="flex-1 cursor-pointer">
                            <input type="file" accept="video/*" className="hidden" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                console.log("Replacing training video with:", file.name);
                                // Handle video replacement logic here
                              }
                            }} />
                            <div className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-center transition-colors">
                              Replace
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Client Transformation Images */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Transformation Photos</h4>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Image</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Client before/after photos</p>
                        <p className="text-xs text-iron-blue-600 mb-3">Location: The Grind page → Transformations</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open('/the-grind', '_blank')}
                            className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                          >
                            🔗 View
                          </button>
                          <label className="flex-1 cursor-pointer">
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                console.log("Replacing transformation photo with:", file.name);
                                // Handle transformation photo replacement logic here
                              }
                            }} />
                            <div className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-center transition-colors">
                              Replace
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Hero Text Content */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Hero Text</h4>
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Text</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Main homepage message</p>
                        <p className="text-xs text-iron-blue-600 mb-3">Location: Home page → Hero section</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open('/', '_blank')}
                            className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                          >
                            🔗 View
                          </button>
                          <button 
                            className="flex-1 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors"
                            onClick={() => {
                              const newText = prompt("Enter new hero text:", "TRANSFORM YOUR MIND AND BODY");
                              if (newText) {
                                console.log("Updating hero text to:", newText);
                                // Handle text update logic here
                              }
                            }}
                          >
                            Edit Text
                          </button>
                        </div>
                      </div>

                      {/* Motivational Quotes */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Motivational Quotes</h4>
                          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Content</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Quote generator content</p>
                        <p className="text-xs text-iron-blue-600 mb-3">Location: Motivation page & Client Portal</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open('/motivation', '_blank')}
                            className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                          >
                            🔗 View
                          </button>
                          <button 
                            className="flex-1 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors"
                            onClick={async () => {
                              const quote = prompt("Enter new motivational quote:");
                              const author = prompt("Enter quote author:");
                              const category = prompt("Enter category (strength/mindset/perseverance/discipline/self-defense/transformation):");
                              if (quote && author && category) {
                                try {
                                  const response = await fetch("/api/admin/quotes", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ text: quote, author, category })
                                  });
                                  
                                  if (response.ok) {
                                    const data = await response.json();
                                    console.log("Quote added successfully:", data);
                                    toast({ title: "Quote added successfully", description: "Your new quote has been added to the collection" });
                                  } else {
                                    const error = await response.json();
                                    toast({ title: "Error", description: error.message, variant: "destructive" });
                                  }
                                } catch (error) {
                                  console.error("Error adding quote:", error);
                                  toast({ title: "Error", description: "Failed to add quote", variant: "destructive" });
                                }
                              }
                            }}
                          >
                            Add Quote
                          </button>
                        </div>
                      </div>

                      {/* Audio Content */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Audio Motivation</h4>
                          <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">Audio</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Master Dessie's daily motivation audio</p>
                        <p className="text-xs text-iron-blue-600 mb-3">Location: Home, About & Client Portal pages</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open('/', '_blank')}
                            className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                          >
                            🔗 View
                          </button>
                          <label className="flex-1 cursor-pointer">
                            <input type="file" accept="audio/*" className="hidden" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                console.log("Replacing audio with:", file.name);
                                // Handle audio replacement logic here
                              }
                            }} />
                            <div className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-center transition-colors">
                              Replace
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Contact Info</h4>
                          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">Text</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Phone numbers, email, location</p>
                        <p className="text-xs text-iron-blue-600 mb-3">Location: Contact page & Footer</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open('/contact', '_blank')}
                            className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                          >
                            🔗 View
                          </button>
                          <button 
                            className="flex-1 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors"
                            onClick={() => {
                              const phone = prompt("Enter new phone number:", "(440) 281-7930");
                              const email = prompt("Enter new email:", "train@irondogstrength.com");
                              const location = prompt("Enter new location:", "35840 Chester Rd. Avon OH 44011");
                              if (phone || email || location) {
                                console.log("Updating contact info:", { phone, email, location });
                                // Handle contact update logic here
                              }
                            }}
                          >
                            Edit Info
                          </button>
                        </div>
                      </div>

                      {/* Program Pricing */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Program Pricing</h4>
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Text</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Service prices and descriptions</p>
                        <p className="text-xs text-iron-blue-600 mb-3">Location: Programs page</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open('/programs', '_blank')}
                            className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                          >
                            🔗 View
                          </button>
                          <button 
                            className="flex-1 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors"
                            onClick={() => {
                              const strengthPrice = prompt("Enter Strength Training price:", "$125/month");
                              const mindsetPrice = prompt("Enter Mindset Coaching price:", "$50/half hour");
                              if (strengthPrice || mindsetPrice) {
                                console.log("Updating pricing:", { strengthPrice, mindsetPrice });
                                // Handle pricing update logic here
                              }
                            }}
                          >
                            Edit Pricing
                          </button>
                        </div>
                      </div>

                      {/* Social Media Management */}
                      <div className="border border-iron-blue-200 rounded-lg p-4 bg-white hover:bg-iron-blue-50 transition-colors col-span-full">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">Social Media Management</h4>
                          <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">Links</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Manage all social media accounts</p>
                        <p className="text-xs text-iron-blue-600 mb-4">Location: Footer & Contact page</p>
                        
                        {/* Individual Social Media Platforms */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          {/* Instagram */}
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm font-medium whitespace-nowrap">Instagram</span>
                              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded truncate">@irondog_strength</span>
                            </div>
                            <button 
                              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded transition-colors ml-2 whitespace-nowrap"
                              onClick={() => {
                                const handle = prompt("Enter Instagram handle (without @):", "irondog_strength");
                                if (handle) {
                                  console.log("Updating Instagram:", handle);
                                }
                              }}
                            >
                              Edit
                            </button>
                          </div>

                          {/* Facebook */}
                          <div className="flex items-center justify-between p-3 bg-blue-600 rounded text-white">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm font-medium whitespace-nowrap">Facebook</span>
                              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded truncate">IrondDog7Strength</span>
                            </div>
                            <button 
                              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded transition-colors ml-2 whitespace-nowrap"
                              onClick={() => {
                                const page = prompt("Enter Facebook page name:", "IrondDog7Strength");
                                if (page) {
                                  console.log("Updating Facebook:", page);
                                }
                              }}
                            >
                              Edit
                            </button>
                          </div>

                          {/* YouTube */}
                          <div className="flex items-center justify-between p-3 bg-red-600 rounded text-white">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm font-medium whitespace-nowrap">YouTube</span>
                              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded truncate">irondDog7</span>
                            </div>
                            <button 
                              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded transition-colors ml-2 whitespace-nowrap"
                              onClick={() => {
                                const channel = prompt("Enter YouTube channel name:", "irondDog7");
                                if (channel) {
                                  console.log("Updating YouTube:", channel);
                                }
                              }}
                            >
                              Edit
                            </button>
                          </div>

                          {/* TikTok */}
                          <div className="flex items-center justify-between p-3 bg-black rounded text-white">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm font-medium whitespace-nowrap">TikTok</span>
                              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded truncate">@irondog_strength</span>
                            </div>
                            <button 
                              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded transition-colors ml-2 whitespace-nowrap"
                              onClick={() => {
                                const handle = prompt("Enter TikTok handle (without @):", "irondog_strength");
                                if (handle) {
                                  console.log("Updating TikTok:", handle);
                                }
                              }}
                            >
                              Edit
                            </button>
                          </div>

                          {/* Twitter/X */}
                          <div className="flex items-center justify-between p-3 bg-gray-900 rounded text-white">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm font-medium whitespace-nowrap">Twitter/X</span>
                              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded truncate">@irondog_strength</span>
                            </div>
                            <button 
                              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded transition-colors ml-2 whitespace-nowrap"
                              onClick={() => {
                                const handle = prompt("Enter Twitter/X handle (without @):", "irondog_strength");
                                if (handle) {
                                  console.log("Updating Twitter/X:", handle);
                                }
                              }}
                            >
                              Edit
                            </button>
                          </div>

                          {/* LinkedIn */}
                          <div className="flex items-center justify-between p-3 bg-blue-700 rounded text-white">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm font-medium whitespace-nowrap">LinkedIn</span>
                              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded truncate">dessie-cheers</span>
                            </div>
                            <button 
                              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded transition-colors ml-2 whitespace-nowrap"
                              onClick={() => {
                                const profile = prompt("Enter LinkedIn profile URL or username:", "dessie-cheers");
                                if (profile) {
                                  console.log("Updating LinkedIn:", profile);
                                }
                              }}
                            >
                              Edit
                            </button>
                          </div>

                          {/* Snapchat */}
                          <div className="flex items-center justify-between p-3 bg-yellow-400 rounded text-black">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm font-medium whitespace-nowrap">Snapchat</span>
                              <span className="text-xs bg-black bg-opacity-20 px-2 py-1 rounded text-white truncate">irondog_fitness</span>
                            </div>
                            <button 
                              className="text-xs bg-black bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded text-white transition-colors ml-2 whitespace-nowrap"
                              onClick={() => {
                                const handle = prompt("Enter Snapchat username:", "irondog_fitness");
                                if (handle) {
                                  console.log("Updating Snapchat:", handle);
                                }
                              }}
                            >
                              Edit
                            </button>
                          </div>

                          {/* WhatsApp Business */}
                          <div className="flex items-center justify-between p-3 bg-green-500 rounded text-white">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-sm font-medium whitespace-nowrap">WhatsApp</span>
                              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded truncate">(440) 281-7930</span>
                            </div>
                            <button 
                              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded transition-colors ml-2 whitespace-nowrap"
                              onClick={() => {
                                const number = prompt("Enter WhatsApp Business number:", "(440) 281-7930");
                                if (number) {
                                  console.log("Updating WhatsApp Business:", number);
                                }
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </div>

                        {/* Bulk Actions */}
                        <div className="pt-3 border-t border-iron-blue-200">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => window.open('/contact', '_blank')}
                              className="flex-1 text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-3 py-2 rounded transition-colors"
                            >
                              🔗 View All Links
                            </button>
                            <button 
                              className="flex-1 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition-colors"
                              onClick={() => {
                                const newPlatform = prompt("Add new social media platform:", "Platform Name");
                                const newHandle = prompt("Enter handle/username:");
                                if (newPlatform && newHandle) {
                                  console.log("Adding new platform:", { platform: newPlatform, handle: newHandle });
                                  toast({ title: "Platform added", description: `${newPlatform} has been added to your social media` });
                                }
                              }}
                            >
                              Add Platform
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Image Gallery (for reference) - Moved to separate section */}
              <Card className="border-2 border-iron-blue-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center">
                    <Image className="mr-2" size={16} />
                    Advanced Image Management
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Advanced</span>
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Danger Zone: Delete uploaded images (use with caution)</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      ⚠️ This section allows you to permanently delete uploaded images. Use with extreme caution.
                    </p>
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                        🔽 Show Advanced Image Controls (Click to expand)
                      </summary>
                      <div className="mt-3 pt-3 border-t border-yellow-200">
                        {galleryLoading ? (
                          <LoadingSpinner />
                        ) : (
                          <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                      {Array.isArray(galleryImages) ? galleryImages.map((imagePath: string, index: number) => {
                        // Extract filename and determine usage
                        const filename = imagePath.split('/').pop() || '';
                        const getImageInfo = (path: string) => {
                          const name = path.toLowerCase();
                          if (name.includes('logo')) return { 
                            title: 'Website Logo', 
                            usage: 'Header navigation, branding',
                            location: 'All pages → Top header navigation bar',
                            pageRoute: '/',
                            description: 'Official Iron Dog Strength logo displayed in site header'
                          };
                          if (name.includes('founder') || name.includes('coach')) return { 
                            title: 'Coach Photo', 
                            usage: 'About page, biography section',
                            location: 'About page → Coach biography section',
                            pageRoute: '/about',
                            description: 'Main profile image of Master Dessie L. Cheers'
                          };
                          if (name.includes('transformation') || name.includes('before') || name.includes('after')) return { 
                            title: 'Client Transformation', 
                            usage: 'Progress showcase, testimonials',
                            location: 'The Grind page → Client Transformations',
                            pageRoute: '/the-grind',
                            description: 'Before/after photos showcasing client progress'
                          };
                          if (name.includes('book') || name.includes('cover')) return { 
                            title: 'Book Cover', 
                            usage: 'Programs page, book sales',
                            location: 'About page → Published Works section',
                            pageRoute: '/about',
                            description: '"Can\'t Weight For Loss" book cover'
                          };
                          if (name.includes('egyptian') || name.includes('silhouette')) return { 
                            title: 'Background Image', 
                            usage: 'Site-wide background element',
                            location: 'All pages → Background decoration',
                            pageRoute: '/',
                            description: 'Egyptian silhouette background imagery'
                          };
                          if (name.includes('group') || name.includes('training')) return { 
                            title: 'Training Video Thumbnail', 
                            usage: 'The Grind section',
                            location: 'The Grind page → Workout Videos',
                            pageRoute: '/the-grind',
                            description: 'Thumbnail images for training videos'
                          };
                          return { 
                            title: 'Gallery Image', 
                            usage: 'General content, multimedia',
                            location: 'Various sections throughout the site',
                            pageRoute: '/',
                            description: 'Supporting imagery for content'
                          };
                        };
                        const imageInfo = getImageInfo(imagePath);
                        
                        return (
                          <div key={index} className="border border-iron-blue-200 rounded-lg p-3 bg-white">
                            <div className="flex gap-3">
                              <div className="relative group flex-shrink-0">
                                <img
                                  src={imagePath}
                                  alt={imageInfo.title}
                                  className="w-20 h-20 object-cover rounded-md border border-iron-blue-100"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center space-x-1">
                                  <Button
                                    size="sm"
                                    className="!bg-blue-600 hover:!bg-blue-700 !text-white !border-blue-600 font-semibold shadow-lg"
                                    onClick={() => setSelectedGalleryImage(imagePath)}
                                  >
                                    <Eye size={12} />
                                  </Button>
                                  <div className="relative">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      id={`file-input-${index}`}
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          console.log("File selected:", file.name, file.type, file.size);
                                          // Validate file type on frontend
                                          if (!file.type.startsWith('image/')) {
                                            toast({ title: "Please select an image file", variant: "destructive" });
                                            return;
                                          }
                                          replaceImageMutation.mutate({ oldPath: imagePath, newFile: file });
                                        }
                                        // Reset the input value to allow selecting the same file again
                                        e.target.value = '';
                                      }}
                                    />
                                    <Button
                                      size="sm"
                                      className="!bg-green-600 hover:!bg-green-700 !text-white !border-green-600 font-semibold shadow-lg"
                                      type="button"
                                      onClick={() => {
                                        console.log("Replace button clicked for:", imagePath);
                                        const fileInput = document.getElementById(`file-input-${index}`) as HTMLInputElement;
                                        if (fileInput) {
                                          fileInput.click();
                                        }
                                      }}
                                    >
                                      <RefreshCw size={12} />
                                    </Button>
                                  </div>
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <div className="bg-red-600 hover:bg-red-700 text-white border-red-600 font-semibold shadow-lg px-2 py-1 rounded cursor-pointer transition-colors">
                                        <Trash2 size={12} />
                                      </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>⚠️ Delete Image</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          <div className="space-y-2">
                                            <p className="font-medium text-red-600">DANGER: This will permanently delete this image!</p>
                                            <p>Image: {imageInfo.title}</p>
                                            <p>Used in: {imageInfo.location}</p>
                                            <p className="text-sm text-gray-600">This action cannot be undone and may break your website if this image is being used.</p>
                                          </div>
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => deleteImageMutation.mutate(imagePath)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Yes, Delete Forever
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{imageInfo.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{imageInfo.usage}</p>
                                    <p className="text-xs text-iron-blue-600 mt-1 font-medium">{imageInfo.location}</p>
                                    <p className="text-xs text-gray-700 mt-1 italic">{imageInfo.description}</p>
                                    <p className="text-xs text-gray-500 mt-2 font-mono">{filename}</p>
                                    <div className="mt-2">
                                      <a 
                                        href={imageInfo.pageRoute} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-xs bg-iron-blue-100 hover:bg-iron-blue-200 text-iron-blue-700 px-2 py-1 rounded transition-colors"
                                      >
                                        🔗 View in App
                                      </a>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="inline-block px-2 py-1 bg-iron-blue-100 text-iron-blue-700 text-xs rounded-full">
                                      Active
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }) : <div className="text-center py-4 text-gray-500">No images found</div>}
                          </div>
                        )}
                      </div>
                    </details>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Image Preview Modal */}
            {selectedGalleryImage && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedGalleryImage(null)}>
                <div className="max-w-4xl max-h-full p-4">
                  <img
                    src={selectedGalleryImage}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                  <Button
                    className="absolute top-4 right-4 bg-white text-black hover:bg-gray-200"
                    onClick={() => setSelectedGalleryImage(null)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Text Content Editor */}
            <Card className="border-2 border-iron-blue-200 col-span-full">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Edit className="mr-2" size={16} />
                  Text Content Editor
                </CardTitle>
                <p className="text-sm text-gray-600">Edit any text content across your app and see changes instantly</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Home Page Text */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    Home Page Content
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={heroTitle}
                          className="text-sm"
                          onChange={(e) => setHeroTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "hero_title", 
                            contentValue: heroTitle, 
                            section: "home" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Home page main header</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                      <div className="flex gap-2">
                        <Input 
                          value={heroSubtitle}
                          className="text-sm"
                          onChange={(e) => setHeroSubtitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "hero_subtitle", 
                            contentValue: heroSubtitle, 
                            section: "home" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Home page hero section</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={welcomeMessage}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                          onChange={(e) => setWelcomeMessage(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "welcome_message", 
                            contentValue: welcomeMessage, 
                            section: "home" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 self-start"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Home page introduction</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lives Transformed</label>
                      <div className="flex gap-2">
                        <Input 
                          value={livesTransformed}
                          className="text-sm"
                          onChange={(e) => setLivesTransformed(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "lives_transformed", 
                            contentValue: livesTransformed, 
                            section: "home" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Home page stats section</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
                      <div className="flex gap-2">
                        <Input 
                          value={yearsExperience}
                          className="text-sm"
                          onChange={(e) => setYearsExperience(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "years_experience", 
                            contentValue: yearsExperience, 
                            section: "home" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Home page stats section</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Success Rate</label>
                      <div className="flex gap-2">
                        <Input 
                          value={successRate}
                          className="text-sm"
                          onChange={(e) => setSuccessRate(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "success_rate", 
                            contentValue: successRate, 
                            section: "home" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Home page stats section</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meet Coach Section Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={meetCoachTitle}
                          className="text-sm"
                          onChange={(e) => setMeetCoachTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "meet_coach_title", 
                            contentValue: meetCoachTitle, 
                            section: "home" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Home page "Meet Your Coach" section title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Coach Quote</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={coachQuote}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                          onChange={(e) => setCoachQuote(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "coach_quote", 
                            contentValue: coachQuote, 
                            section: "home" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Home page coach quote in blockquote</p>
                    </div>
                  </div>
                </div>

                {/* Programs Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Programs & Services Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Strength Training Program */}
                    <div className="bg-blue-50 p-4 rounded col-span-full">
                      <h4 className="font-medium text-blue-900 mb-3">Strength Training Program</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Program Title</label>
                          <div className="flex gap-2">
                            <Input 
                              value={strengthTrainingTitle}
                              className="text-sm"
                              onChange={(e) => setStrengthTrainingTitle(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "strength_training_title", 
                                contentValue: strengthTrainingTitle, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                          <div className="flex gap-2">
                            <Input 
                              value={strengthTrainingDuration}
                              className="text-sm"
                              onChange={(e) => setStrengthTrainingDuration(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "strength_training_duration", 
                                contentValue: strengthTrainingDuration, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <div className="flex gap-2">
                            <textarea 
                              value={strengthTrainingDescription}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                              onChange={(e) => setStrengthTrainingDescription(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "strength_training_description", 
                                contentValue: strengthTrainingDescription, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Feature 1</label>
                          <div className="flex gap-2">
                            <Input 
                              value={strengthTrainingFeature1}
                              className="text-sm"
                              onChange={(e) => setStrengthTrainingFeature1(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "strength_training_feature_1", 
                                contentValue: strengthTrainingFeature1, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Feature 2</label>
                          <div className="flex gap-2">
                            <Input 
                              value={strengthTrainingFeature2}
                              className="text-sm"
                              onChange={(e) => setStrengthTrainingFeature2(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "strength_training_feature_2", 
                                contentValue: strengthTrainingFeature2, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Feature 3</label>
                          <div className="flex gap-2">
                            <Input 
                              value={strengthTrainingFeature3}
                              className="text-sm"
                              onChange={(e) => setStrengthTrainingFeature3(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "strength_training_feature_3", 
                                contentValue: strengthTrainingFeature3, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Self Defense Program */}
                    <div className="bg-red-50 p-4 rounded col-span-full">
                      <h4 className="font-medium text-red-900 mb-3">Self Defense Program</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Program Title</label>
                          <div className="flex gap-2">
                            <Input 
                              value={selfDefenseTitle}
                              className="text-sm"
                              onChange={(e) => setSelfDefenseTitle(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "self_defense_title", 
                                contentValue: selfDefenseTitle, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                          <div className="flex gap-2">
                            <Input 
                              value={selfDefenseDuration}
                              className="text-sm"
                              onChange={(e) => setSelfDefenseDuration(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "self_defense_duration", 
                                contentValue: selfDefenseDuration, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <div className="flex gap-2">
                            <textarea 
                              value={selfDefenseDescription}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                              onChange={(e) => setSelfDefenseDescription(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "self_defense_description", 
                                contentValue: selfDefenseDescription, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Feature 1</label>
                          <div className="flex gap-2">
                            <Input 
                              value={selfDefenseFeature1}
                              className="text-sm"
                              onChange={(e) => setSelfDefenseFeature1(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "self_defense_feature_1", 
                                contentValue: selfDefenseFeature1, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Feature 2</label>
                          <div className="flex gap-2">
                            <Input 
                              value={selfDefenseFeature2}
                              className="text-sm"
                              onChange={(e) => setSelfDefenseFeature2(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "self_defense_feature_2", 
                                contentValue: selfDefenseFeature2, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Feature 3</label>
                          <div className="flex gap-2">
                            <Input 
                              value={selfDefenseFeature3}
                              className="text-sm"
                              onChange={(e) => setSelfDefenseFeature3(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "self_defense_feature_3", 
                                contentValue: selfDefenseFeature3, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mindset Coaching Program */}
                    <div className="bg-purple-50 p-4 rounded col-span-full">
                      <h4 className="font-medium text-purple-900 mb-3">Mindset Coaching Program</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Program Title</label>
                          <div className="flex gap-2">
                            <Input 
                              value={mindsetCoachingTitle}
                              className="text-sm"
                              onChange={(e) => setMindsetCoachingTitle(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "mindset_coaching_title", 
                                contentValue: mindsetCoachingTitle, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                          <div className="flex gap-2">
                            <Input 
                              value={mindsetCoachingDuration}
                              className="text-sm"
                              onChange={(e) => setMindsetCoachingDuration(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "mindset_coaching_duration", 
                                contentValue: mindsetCoachingDuration, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <div className="flex gap-2">
                            <textarea 
                              value={mindsetCoachingDescription}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                              onChange={(e) => setMindsetCoachingDescription(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "mindset_coaching_description", 
                                contentValue: mindsetCoachingDescription, 
                                section: "programs" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Coach Page Content */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                    About Coach Page Content
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={aboutPageTitle}
                          className="text-sm"
                          onChange={(e) => setAboutPageTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "about_page_title", 
                            contentValue: aboutPageTitle, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page main header</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Coach Name</label>
                      <div className="flex gap-2">
                        <Input 
                          value={coachName}
                          className="text-sm"
                          onChange={(e) => setCoachName(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "coach_name", 
                            contentValue: coachName, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page coach name</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Coach Title/Designation</label>
                      <div className="flex gap-2">
                        <Input 
                          value={coachTitle}
                          className="text-sm"
                          onChange={(e) => setCoachTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "coach_title", 
                            contentValue: coachTitle, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page coach title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience Description</label>
                      <div className="flex gap-2">
                        <Input 
                          value={experienceDescription}
                          className="text-sm"
                          onChange={(e) => setExperienceDescription(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "experience_description", 
                            contentValue: experienceDescription, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page experience text</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Coach Biography</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={coachBio}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-24 resize-none"
                          onChange={(e) => setCoachBio(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "coach_bio", 
                            contentValue: coachBio, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 self-start"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page coach biography</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Philosophy Title 1</label>
                      <div className="flex gap-2">
                        <Input 
                          value={philosophyTitle1}
                          className="text-sm"
                          onChange={(e) => setPhilosophyTitle1(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "philosophy_title_1", 
                            contentValue: philosophyTitle1, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page philosophy section</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Philosophy Title 2</label>
                      <div className="flex gap-2">
                        <Input 
                          value={philosophyTitle2}
                          className="text-sm"
                          onChange={(e) => setPhilosophyTitle2(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "philosophy_title_2", 
                            contentValue: philosophyTitle2, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page philosophy section</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Philosophy Title 3</label>
                      <div className="flex gap-2">
                        <Input 
                          value={philosophyTitle3}
                          className="text-sm"
                          onChange={(e) => setPhilosophyTitle3(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "philosophy_title_3", 
                            contentValue: philosophyTitle3, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page philosophy section</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Philosophy Title 4</label>
                      <div className="flex gap-2">
                        <Input 
                          value={philosophyTitle4}
                          className="text-sm"
                          onChange={(e) => setPhilosophyTitle4(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "philosophy_title_4", 
                            contentValue: philosophyTitle4, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page philosophy section</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Book Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={bookTitle}
                          className="text-sm"
                          onChange={(e) => setBookTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "book_title", 
                            contentValue: bookTitle, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page book section</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Book Description</label>
                      <div className="flex gap-2">
                        <Input 
                          value={bookDescription}
                          className="text-sm"
                          onChange={(e) => setBookDescription(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "book_description", 
                            contentValue: bookDescription, 
                            section: "about" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: About page book section</p>
                    </div>
                  </div>
                </div>

                {/* Contact Page Content */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                    Contact Page Content
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={contactPageTitle}
                          className="text-sm"
                          onChange={(e) => setContactPageTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "contact_page_title", 
                            contentValue: contactPageTitle, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Contact page main header</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                      <div className="flex gap-2">
                        <Input 
                          value={contactPageSubtitle}
                          className="text-sm"
                          onChange={(e) => setContactPageSubtitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "contact_page_subtitle", 
                            contentValue: contactPageSubtitle, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Contact page subtitle</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Form Description</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={contactFormDescription}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                          onChange={(e) => setContactFormDescription(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "contact_form_description", 
                            contentValue: contactFormDescription, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 self-start"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Contact form description text</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Form Button Text</label>
                      <div className="flex gap-2">
                        <Input 
                          value={contactFormButtonText}
                          className="text-sm"
                          onChange={(e) => setContactFormButtonText(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "contact_form_button_text", 
                            contentValue: contactFormButtonText, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Contact form submit button</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Success Message</label>
                      <div className="flex gap-2">
                        <Input 
                          value={contactSuccessMessage}
                          className="text-sm"
                          onChange={(e) => setContactSuccessMessage(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "contact_success_message", 
                            contentValue: contactSuccessMessage, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Success message after form submission</p>
                    </div>
                  </div>
                </div>

                {/* Client Portal Content */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                    Client Portal Content
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Portal Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={portalTitle}
                          className="text-sm"
                          onChange={(e) => setPortalTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "portal_title", 
                            contentValue: portalTitle, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Client portal page title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Search Prompt</label>
                      <div className="flex gap-2">
                        <Input 
                          value={searchPrompt}
                          className="text-sm"
                          onChange={(e) => setSearchPrompt(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "search_prompt", 
                            contentValue: searchPrompt, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Client search input placeholder</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Tab</label>
                      <div className="flex gap-2">
                        <Input 
                          value={dashboardTab}
                          className="text-sm"
                          onChange={(e) => setDashboardTab(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "dashboard_tab", 
                            contentValue: dashboardTab, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Dashboard tab label</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Appointments Tab</label>
                      <div className="flex gap-2">
                        <Input 
                          value={appointmentsTab}
                          className="text-sm"
                          onChange={(e) => setAppointmentsTab(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "appointments_tab", 
                            contentValue: appointmentsTab, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Appointments tab label</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Progress Tab</label>
                      <div className="flex gap-2">
                        <Input 
                          value={progressTab}
                          className="text-sm"
                          onChange={(e) => setProgressTab(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "progress_tab", 
                            contentValue: progressTab, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Progress tab label</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Workouts Tab</label>
                      <div className="flex gap-2">
                        <Input 
                          value={workoutsTab}
                          className="text-sm"
                          onChange={(e) => setWorkoutsTab(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "workouts_tab", 
                            contentValue: workoutsTab, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Workouts tab label</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payments Tab</label>
                      <div className="flex gap-2">
                        <Input 
                          value={paymentsTab}
                          className="text-sm"
                          onChange={(e) => setPaymentsTab(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "payments_tab", 
                            contentValue: paymentsTab, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Payments tab label</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Goals Tab</label>
                      <div className="flex gap-2">
                        <Input 
                          value={goalsTab}
                          className="text-sm"
                          onChange={(e) => setGoalsTab(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "goals_tab", 
                            contentValue: goalsTab, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Goals tab label</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={portalWelcome}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                          onChange={(e) => setPortalWelcome(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "portal_welcome", 
                            contentValue: portalWelcome, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 self-start"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Client portal welcome message</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Portal Hero Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={portalHeroTitle}
                          className="text-sm"
                          onChange={(e) => setPortalHeroTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "portal_hero_title", 
                            contentValue: portalHeroTitle, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Portal hero section title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Portal Hero Subtitle</label>
                      <div className="flex gap-2">
                        <Input 
                          value={portalHeroSubtitle}
                          className="text-sm"
                          onChange={(e) => setPortalHeroSubtitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "portal_hero_subtitle", 
                            contentValue: portalHeroSubtitle, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Portal hero section subtitle</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Access Portal Header</label>
                      <div className="flex gap-2">
                        <Input 
                          value={accessPortalHeader}
                          className="text-sm"
                          onChange={(e) => setAccessPortalHeader(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "access_portal_header", 
                            contentValue: accessPortalHeader, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Access portal form header</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Access Portal Description</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={accessPortalDescription}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                          onChange={(e) => setAccessPortalDescription(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "access_portal_description", 
                            contentValue: accessPortalDescription, 
                            section: "client_portal" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 self-start"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Access portal form description</p>
                    </div>
                  </div>
                </div>

                {/* Contact Page Additional Content */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                    Contact Page Additional Content
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Info Header</label>
                      <div className="flex gap-2">
                        <Input 
                          value={contactInfoHeader}
                          className="text-sm"
                          onChange={(e) => setContactInfoHeader(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "contact_info_header", 
                            contentValue: contactInfoHeader, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Contact information section header</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Training Location Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={trainingLocationTitle}
                          className="text-sm"
                          onChange={(e) => setTrainingLocationTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "training_location_title", 
                            contentValue: trainingLocationTitle, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Training location section title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Facility Name</label>
                      <div className="flex gap-2">
                        <Input 
                          value={facilityName}
                          className="text-sm"
                          onChange={(e) => setFacilityName(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "facility_name", 
                            contentValue: facilityName, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Gym facility name</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Send Message Header</label>
                      <div className="flex gap-2">
                        <Input 
                          value={sendMessageHeader}
                          className="text-sm"
                          onChange={(e) => setSendMessageHeader(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "send_message_header", 
                            contentValue: sendMessageHeader, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Contact form section header</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quick Response Text</label>
                      <div className="flex gap-2">
                        <Input 
                          value={quickResponseText}
                          className="text-sm"
                          onChange={(e) => setQuickResponseText(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "quick_response_text", 
                            contentValue: quickResponseText, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Hero section benefit text</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Free Consultation Text</label>
                      <div className="flex gap-2">
                        <Input 
                          value={freeConsultationText}
                          className="text-sm"
                          onChange={(e) => setFreeConsultationText(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "free_consultation_text", 
                            contentValue: freeConsultationText, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Hero section benefit text</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Why Choose Header</label>
                      <div className="flex gap-2">
                        <Input 
                          value={whyChooseHeader}
                          className="text-sm"
                          onChange={(e) => setWhyChooseHeader(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "why_choose_header", 
                            contentValue: whyChooseHeader, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Why choose section header</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name Label</label>
                      <div className="flex gap-2">
                        <Input 
                          value={firstNameLabel}
                          className="text-sm"
                          onChange={(e) => setFirstNameLabel(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "first_name_label", 
                            contentValue: firstNameLabel, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Contact form first name field</p>
                    </div>
                  </div>
                </div>

                {/* Motivational Quote System */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    Motivational Quote System
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quote Page Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={quotePageTitle}
                          className="text-sm"
                          onChange={(e) => setQuotePageTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "quote_page_title", 
                            contentValue: quotePageTitle, 
                            section: "quotes" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Motivational quotes page title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quote Section Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={quoteSectionTitle}
                          className="text-sm"
                          onChange={(e) => setQuoteSectionTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "quote_section_title", 
                            contentValue: quoteSectionTitle, 
                            section: "quotes" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Quote section header</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Generate Button Text</label>
                      <div className="flex gap-2">
                        <Input 
                          value={generateButtonText}
                          className="text-sm"
                          onChange={(e) => setGenerateButtonText(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "generate_button_text", 
                            contentValue: generateButtonText, 
                            section: "quotes" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Quote generator button</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category Labels</label>
                      <div className="flex gap-2">
                        <Input 
                          value={categoryLabels}
                          className="text-sm"
                          onChange={(e) => setCategoryLabels(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "category_labels", 
                            contentValue: categoryLabels, 
                            section: "quotes" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Quote category filters</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quote Description</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={quoteDescription}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                          onChange={(e) => setQuoteDescription(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "quote_description", 
                            contentValue: quoteDescription, 
                            section: "quotes" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 self-start"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Quote page description</p>
                    </div>
                  </div>
                </div>

                {/* Footer Content */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-slate-500 rounded-full"></span>
                    Footer Content
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <div className="flex gap-2">
                        <Input 
                          value={companyName}
                          className="text-sm"
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "company_name", 
                            contentValue: companyName, 
                            section: "footer" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Footer company name</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                      <div className="flex gap-2">
                        <Input 
                          value={footerTagline}
                          className="text-sm"
                          onChange={(e) => setFooterTagline(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "footer_tagline", 
                            contentValue: footerTagline, 
                            section: "footer" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Footer tagline</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                      <div className="flex gap-2">
                        <Input 
                          value={copyrightText}
                          className="text-sm"
                          onChange={(e) => setCopyrightText(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "copyright_text", 
                            contentValue: copyrightText, 
                            section: "footer" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Footer copyright</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quick Links Header</label>
                      <div className="flex gap-2">
                        <Input 
                          value={quickLinksHeader}
                          className="text-sm"
                          onChange={(e) => setQuickLinksHeader(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "quick_links_header", 
                            contentValue: quickLinksHeader, 
                            section: "footer" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Footer quick links</p>
                    </div>
                  </div>
                </div>

                {/* Programs Page Text */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    Programs & Services
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Strength Training Price</label>
                      <div className="flex gap-2">
                        <Input 
                          value={strengthTrainingPrice}
                          className="text-sm"
                          onChange={(e) => setStrengthTrainingPrice(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "strength_training_price", 
                            contentValue: strengthTrainingPrice, 
                            section: "programs" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Programs page pricing</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mindset Coaching Price</label>
                      <div className="flex gap-2">
                        <Input 
                          value={mindsetCoachingPrice}
                          className="text-sm"
                          onChange={(e) => setMindsetCoachingPrice(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "mindset_coaching_price", 
                            contentValue: mindsetCoachingPrice, 
                            section: "programs" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Programs page pricing</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Self Defense Price</label>
                      <div className="flex gap-2">
                        <Input 
                          value={selfDefensePrice}
                          className="text-sm"
                          onChange={(e) => setSelfDefensePrice(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "self_defense_price", 
                            contentValue: selfDefensePrice, 
                            section: "programs" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Programs page pricing</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Phone</label>
                      <div className="flex gap-2">
                        <Input 
                          value={contactPhone}
                          className="text-sm"
                          onChange={(e) => setContactPhone(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "contact_phone", 
                            contentValue: contactPhone, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Contact page, footer</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="flex gap-2">
                        <Input 
                          type="email" 
                          value={contactEmail}
                          className="text-sm"
                          onChange={(e) => setContactEmail(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "contact_email", 
                            contentValue: contactEmail, 
                            section: "contact" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Contact page, footer</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                      <textarea 
                        defaultValue="Iron Dog 7 LLC&#10;Inside Power House Gym&#10;35840 Chester Rd.&#10;Avon, OH 44011"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                        onChange={(e) => console.log("Business address:", e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">Location: Contact page, footer</p>
                    </div>
                  </div>
                </div>

                {/* Programs Page Detailed Text */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                    Programs Page Details
                  </h4>
                  
                  {/* Strength Training Program */}
                  <div className="mb-6 border-l-4 border-emerald-500 pl-4 bg-emerald-50 p-4 rounded-r">
                    <h5 className="font-medium text-gray-900 mb-3">Strength Training Program</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Program Title</label>
                        <Input 
                          defaultValue="Strength Training"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Strength training title:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Program Subtitle</label>
                        <Input 
                          defaultValue="Build Inexorable Strength"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Strength training subtitle:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Price</label>
                        <Input 
                          defaultValue="$125/month"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Strength training price:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
                        <Input 
                          defaultValue="Ongoing Monthly Training"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Strength training duration:", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Program Description</label>
                        <textarea 
                          defaultValue="Transform your body and mind through progressive strength training designed to build lasting power, confidence, and resilience. Our comprehensive approach develops both physical capabilities and mental fortitude."
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs h-20 resize-none"
                          onChange={(e) => console.log("Strength training description:", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Self Defense Training Program */}
                  <div className="mb-6 border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r">
                    <h5 className="font-medium text-gray-900 mb-3">Self Defense Training Program</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Program Title</label>
                        <Input 
                          defaultValue="Self Defense Training"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Self defense title:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Program Subtitle</label>
                        <Input 
                          defaultValue="Develop Unshakeable Confidence"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Self defense subtitle:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Price</label>
                        <Input 
                          defaultValue="$75/session"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Self defense price:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
                        <Input 
                          defaultValue="Per Session Training"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Self defense duration:", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Program Description</label>
                        <textarea 
                          defaultValue="Master practical self-defense techniques while building unshakeable confidence. Learn to protect yourself and develop the warrior mindset needed to face any challenge with courage and determination."
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs h-20 resize-none"
                          onChange={(e) => console.log("Self defense description:", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mindset Coaching Program */}
                  <div className="mb-6 border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r">
                    <h5 className="font-medium text-gray-900 mb-3">Mindset Coaching Program</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Program Title</label>
                        <Input 
                          defaultValue="Mindset Coaching"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Mindset coaching title:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Program Subtitle</label>
                        <Input 
                          defaultValue="Overcome Mental Barriers"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Mindset coaching subtitle:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Price</label>
                        <Input 
                          defaultValue="$50/session"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Mindset coaching price:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
                        <Input 
                          defaultValue="30-Minute Sessions"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Mindset coaching duration:", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Program Description</label>
                        <textarea 
                          defaultValue="Break through mental barriers and develop the mindset of a champion. Our coaching sessions focus on building mental resilience, overcoming limiting beliefs, and developing the psychological strength needed for lasting transformation."
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs h-20 resize-none"
                          onChange={(e) => console.log("Mindset coaching description:", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Package Deals Section */}
                  <div className="mb-6 border-l-4 border-orange-500 pl-4 bg-orange-50 p-4 rounded-r">
                    <h5 className="font-medium text-gray-900 mb-3">Package Deals</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Section Title</label>
                        <Input 
                          defaultValue="Package Deals"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Package deals title:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Section Subtitle</label>
                        <Input 
                          defaultValue="Combine programs for maximum results and savings"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Package deals subtitle:", e.target.value)}
                        />
                      </div>
                      
                      {/* Elite Transformation Package */}
                      <div className="md:col-span-2 bg-yellow-50 p-3 rounded border">
                        <h6 className="font-medium text-gray-800 mb-2">Elite Transformation Package</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Package Title</label>
                            <Input 
                              defaultValue="Elite Transformation Package"
                              className="text-xs h-7"
                              onChange={(e) => console.log("Elite package title:", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Original Price</label>
                            <Input 
                              defaultValue="$275/month"
                              className="text-xs h-7"
                              onChange={(e) => console.log("Elite original price:", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Package Price</label>
                            <Input 
                              defaultValue="$199/month"
                              className="text-xs h-7"
                              onChange={(e) => console.log("Elite package price:", e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Package Description</label>
                            <textarea 
                              defaultValue="Complete transformation combining strength training, self-defense, and mindset coaching for the ultimate fitness journey."
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs h-16 resize-none"
                              onChange={(e) => console.log("Elite package description:", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Warrior Mindset Package */}
                      <div className="md:col-span-2 bg-red-50 p-3 rounded border">
                        <h6 className="font-medium text-gray-800 mb-2">Warrior Mindset Package</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Package Title</label>
                            <Input 
                              defaultValue="Warrior Mindset Package"
                              className="text-xs h-7"
                              onChange={(e) => console.log("Warrior package title:", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Original Price</label>
                            <Input 
                              defaultValue="$175/month"
                              className="text-xs h-7"
                              onChange={(e) => console.log("Warrior original price:", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Package Price</label>
                            <Input 
                              defaultValue="$149/month"
                              className="text-xs h-7"
                              onChange={(e) => console.log("Warrior package price:", e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Package Description</label>
                            <textarea 
                              defaultValue="Build both physical and mental strength with combined self-defense training and mindset coaching for complete confidence development."
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs h-16 resize-none"
                              onChange={(e) => console.log("Warrior package description:", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Training Terms & Policies */}
                  <div className="mb-6 border-l-4 border-slate-500 pl-4 bg-slate-50 p-4 rounded-r">
                    <h5 className="font-medium text-gray-900 mb-3">Training Terms & Policies</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Section Title</label>
                        <Input 
                          defaultValue="Training Terms & Policies"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Terms section title:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Section Subtitle</label>
                        <Input 
                          defaultValue="Clear guidelines to ensure the best training experience for everyone"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Terms section subtitle:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Scheduling Policies Title</label>
                        <Input 
                          defaultValue="Scheduling Policies"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Scheduling policies title:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Safety & Liability Title</label>
                        <Input 
                          defaultValue="Safety & Liability"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Safety liability title:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Final CTA Title</label>
                        <Input 
                          defaultValue="Ready to Start Your Transformation?"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Final CTA title:", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Final Button Text</label>
                        <Input 
                          defaultValue="Book Your Session Today"
                          className="text-sm h-8"
                          onChange={(e) => console.log("Final button text:", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Final CTA Description</label>
                        <textarea 
                          defaultValue="Take the first step towards building inexorable confidence and strength."
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs h-16 resize-none"
                          onChange={(e) => console.log("Final CTA description:", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Grind Page Content */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                    The Grind Page Content
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                      <Input 
                        defaultValue="THE GRIND"
                        className="text-sm"
                        onChange={(e) => console.log("Grind page title:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
                      <Input 
                        defaultValue="Where Champions Are Forged"
                        className="text-sm"
                        onChange={(e) => console.log("Grind subtitle:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Description</label>
                      <textarea 
                        defaultValue="Experience the intensity and dedication that transforms ordinary individuals into extraordinary champions."
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                        onChange={(e) => console.log("Grind description:", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Schedule Page Content */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule Page Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={schedulePageTitle}
                          className="text-sm"
                          onChange={(e) => setSchedulePageTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_page_title", 
                            contentValue: schedulePageTitle, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Schedule page main title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={schedulePageSubtitle}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-16 resize-none"
                          onChange={(e) => setSchedulePageSubtitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_page_subtitle", 
                            contentValue: schedulePageSubtitle, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Schedule page subtitle text</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Step 1 Label</label>
                      <div className="flex gap-2">
                        <Input 
                          value={scheduleStep1}
                          className="text-sm"
                          onChange={(e) => setScheduleStep1(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_step_1", 
                            contentValue: scheduleStep1, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Schedule progress step 1</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Step 2 Label</label>
                      <div className="flex gap-2">
                        <Input 
                          value={scheduleStep2}
                          className="text-sm"
                          onChange={(e) => setScheduleStep2(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_step_2", 
                            contentValue: scheduleStep2, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Schedule progress step 2</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Step 3 Label</label>
                      <div className="flex gap-2">
                        <Input 
                          value={scheduleStep3}
                          className="text-sm"
                          onChange={(e) => setScheduleStep3(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_step_3", 
                            contentValue: scheduleStep3, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Schedule progress step 3</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Selection Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={scheduleTimeTitle}
                          className="text-sm"
                          onChange={(e) => setScheduleTimeTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_time_title", 
                            contentValue: scheduleTimeTitle, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Time selection section title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Selection Description</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={scheduleTimeDescription}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-16 resize-none"
                          onChange={(e) => setScheduleTimeDescription(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_time_description", 
                            contentValue: scheduleTimeDescription, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Time selection instructions</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Information Form Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={scheduleInfoTitle}
                          className="text-sm"
                          onChange={(e) => setScheduleInfoTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_info_title", 
                            contentValue: scheduleInfoTitle, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Information form section title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Information Form Description</label>
                      <div className="flex gap-2">
                        <Input 
                          value={scheduleInfoDescription}
                          className="text-sm"
                          onChange={(e) => setScheduleInfoDescription(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_info_description", 
                            contentValue: scheduleInfoDescription, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Information form instructions</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Agreement Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={scheduleAgreementTitle}
                          className="text-sm"
                          onChange={(e) => setScheduleAgreementTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_agreement_title", 
                            contentValue: scheduleAgreementTitle, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Agreement section title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Agreement Description</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={scheduleAgreementDescription}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-16 resize-none"
                          onChange={(e) => setScheduleAgreementDescription(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "schedule_agreement_description", 
                            contentValue: scheduleAgreementDescription, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Agreement instructions</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration</label>
                      <div className="flex gap-2">
                        <Input 
                          value={sessionDuration}
                          className="text-sm"
                          onChange={(e) => setSessionDuration(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "session_duration", 
                            contentValue: sessionDuration, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Session information duration</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Facility Address</label>
                      <div className="flex gap-2">
                        <Input 
                          value={facilityAddress}
                          className="text-sm"
                          onChange={(e) => setFacilityAddress(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "facility_address", 
                            contentValue: facilityAddress, 
                            section: "schedule" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Session information location</p>
                    </div>
                  </div>
                </div>

                {/* Workout Motivation Page Content */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Workout Motivation Page Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={motivationPageTitle}
                          className="text-sm"
                          onChange={(e) => setMotivationPageTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "motivation_page_title", 
                            contentValue: motivationPageTitle, 
                            section: "motivation" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Motivation page main title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={motivationPageSubtitle}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-16 resize-none"
                          onChange={(e) => setMotivationPageSubtitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "motivation_page_subtitle", 
                            contentValue: motivationPageSubtitle, 
                            section: "motivation" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Motivation page subtitle text</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category Selection Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={motivationCategoryTitle}
                          className="text-sm"
                          onChange={(e) => setMotivationCategoryTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "motivation_category_title", 
                            contentValue: motivationCategoryTitle, 
                            section: "motivation" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Category selection section title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quote Generator Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={motivationGeneratorTitle}
                          className="text-sm"
                          onChange={(e) => setMotivationGeneratorTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "motivation_generator_title", 
                            contentValue: motivationGeneratorTitle, 
                            section: "motivation" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Quote generator section title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pre-Workout Ritual Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={motivationRitualTitle}
                          className="text-sm"
                          onChange={(e) => setMotivationRitualTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "motivation_ritual_title", 
                            contentValue: motivationRitualTitle, 
                            section: "motivation" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Pre-workout ritual card title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">All Quotes Section Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={motivationAllQuotesTitle}
                          className="text-sm"
                          onChange={(e) => setMotivationAllQuotesTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "motivation_all_quotes_title", 
                            contentValue: motivationAllQuotesTitle, 
                            section: "motivation" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Quote collection section when "All" is selected</p>
                    </div>

                    {/* Pre-Workout Steps */}
                    <div className="bg-blue-50 p-4 rounded col-span-full">
                      <h4 className="font-medium text-blue-900 mb-3">Pre-Workout Ritual Steps</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        
                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Step 1 Title</label>
                          <div className="flex gap-2">
                            <Input 
                              value={motivationStep1Title}
                              className="text-sm"
                              onChange={(e) => setMotivationStep1Title(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "motivation_step_1_title", 
                                contentValue: motivationStep1Title, 
                                section: "motivation" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Step 1 Description</label>
                          <div className="flex gap-2">
                            <Input 
                              value={motivationStep1Description}
                              className="text-sm"
                              onChange={(e) => setMotivationStep1Description(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "motivation_step_1_description", 
                                contentValue: motivationStep1Description, 
                                section: "motivation" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Step 2 Title</label>
                          <div className="flex gap-2">
                            <Input 
                              value={motivationStep2Title}
                              className="text-sm"
                              onChange={(e) => setMotivationStep2Title(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "motivation_step_2_title", 
                                contentValue: motivationStep2Title, 
                                section: "motivation" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Step 2 Description</label>
                          <div className="flex gap-2">
                            <Input 
                              value={motivationStep2Description}
                              className="text-sm"
                              onChange={(e) => setMotivationStep2Description(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "motivation_step_2_description", 
                                contentValue: motivationStep2Description, 
                                section: "motivation" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Step 3 Title</label>
                          <div className="flex gap-2">
                            <Input 
                              value={motivationStep3Title}
                              className="text-sm"
                              onChange={(e) => setMotivationStep3Title(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "motivation_step_3_title", 
                                contentValue: motivationStep3Title, 
                                section: "motivation" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Step 3 Description</label>
                          <div className="flex gap-2">
                            <Input 
                              value={motivationStep3Description}
                              className="text-sm"
                              onChange={(e) => setMotivationStep3Description(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "motivation_step_3_description", 
                                contentValue: motivationStep3Description, 
                                section: "motivation" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Step 4 Title</label>
                          <div className="flex gap-2">
                            <Input 
                              value={motivationStep4Title}
                              className="text-sm"
                              onChange={(e) => setMotivationStep4Title(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "motivation_step_4_title", 
                                contentValue: motivationStep4Title, 
                                section: "motivation" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Step 4 Description</label>
                          <div className="flex gap-2">
                            <Input 
                              value={motivationStep4Description}
                              className="text-sm"
                              onChange={(e) => setMotivationStep4Description(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "motivation_step_4_description", 
                                contentValue: motivationStep4Description, 
                                section: "motivation" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Call to Action Section */}
                    <div className="bg-purple-50 p-4 rounded col-span-full">
                      <h4 className="font-medium text-purple-900 mb-3">Call to Action Section</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Title</label>
                          <div className="flex gap-2">
                            <Input 
                              value={motivationCtaTitle}
                              className="text-sm"
                              onChange={(e) => setMotivationCtaTitle(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "motivation_cta_title", 
                                contentValue: motivationCtaTitle, 
                                section: "motivation" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Description</label>
                          <div className="flex gap-2">
                            <textarea 
                              value={motivationCtaDescription}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-16 resize-none"
                              onChange={(e) => setMotivationCtaDescription(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "motivation_cta_description", 
                                contentValue: motivationCtaDescription, 
                                section: "motivation" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Grind Page Content */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">The Grind Page Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={grindPageTitle}
                          className="text-sm"
                          onChange={(e) => setGrindPageTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "grind_page_title", 
                            contentValue: grindPageTitle, 
                            section: "grind" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Grind page main title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                      <div className="flex gap-2">
                        <textarea 
                          value={grindPageSubtitle}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-20 resize-none"
                          onChange={(e) => setGrindPageSubtitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "grind_page_subtitle", 
                            contentValue: grindPageSubtitle, 
                            section: "grind" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Grind page subtitle text</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gym Workouts Section Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={grindWorkoutsTitle}
                          className="text-sm"
                          onChange={(e) => setGrindWorkoutsTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "grind_workouts_title", 
                            contentValue: grindWorkoutsTitle, 
                            section: "grind" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Gym workouts section title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gym Workouts Description</label>
                      <div className="flex gap-2">
                        <Input 
                          value={grindWorkoutsDescription}
                          className="text-sm"
                          onChange={(e) => setGrindWorkoutsDescription(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "grind_workouts_description", 
                            contentValue: grindWorkoutsDescription, 
                            section: "grind" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Gym workouts section description</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Client Transformations Title</label>
                      <div className="flex gap-2">
                        <Input 
                          value={grindTransformationsTitle}
                          className="text-sm"
                          onChange={(e) => setGrindTransformationsTitle(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "grind_transformations_title", 
                            contentValue: grindTransformationsTitle, 
                            section: "grind" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Client transformations section title</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Client Transformations Description</label>
                      <div className="flex gap-2">
                        <Input 
                          value={grindTransformationsDescription}
                          className="text-sm"
                          onChange={(e) => setGrindTransformationsDescription(e.target.value)}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => updateTextContentMutation.mutate({ 
                            contentKey: "grind_transformations_description", 
                            contentValue: grindTransformationsDescription, 
                            section: "grind" 
                          })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3"
                        >
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Location: Client transformations section description</p>
                    </div>

                    {/* Call to Action Section */}
                    <div className="bg-orange-50 p-4 rounded col-span-full">
                      <h4 className="font-medium text-orange-900 mb-3">Call to Action Section</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Title</label>
                          <div className="flex gap-2">
                            <Input 
                              value={grindCtaTitle}
                              className="text-sm"
                              onChange={(e) => setGrindCtaTitle(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "grind_cta_title", 
                                contentValue: grindCtaTitle, 
                                section: "grind" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Description</label>
                          <div className="flex gap-2">
                            <textarea 
                              value={grindCtaDescription}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm h-16 resize-none"
                              onChange={(e) => setGrindCtaDescription(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "grind_cta_description", 
                                contentValue: grindCtaDescription, 
                                section: "grind" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button 1 Text</label>
                          <div className="flex gap-2">
                            <Input 
                              value={grindCtaButton1}
                              className="text-sm"
                              onChange={(e) => setGrindCtaButton1(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "grind_cta_button_1", 
                                contentValue: grindCtaButton1, 
                                section: "grind" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button 2 Text</label>
                          <div className="flex gap-2">
                            <Input 
                              value={grindCtaButton2}
                              className="text-sm"
                              onChange={(e) => setGrindCtaButton2(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "grind_cta_button_2", 
                                contentValue: grindCtaButton2, 
                                section: "grind" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-blue-50 p-4 rounded col-span-full">
                      <h4 className="font-medium text-blue-900 mb-3">Contact Section</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Title</label>
                          <div className="flex gap-2">
                            <Input 
                              value={grindContactTitle}
                              className="text-sm"
                              onChange={(e) => setGrindContactTitle(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "grind_contact_title", 
                                contentValue: grindContactTitle, 
                                section: "grind" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Description</label>
                          <div className="flex gap-2">
                            <Input 
                              value={grindContactDescription}
                              className="text-sm"
                              onChange={(e) => setGrindContactDescription(e.target.value)}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => updateTextContentMutation.mutate({ 
                                contentKey: "grind_contact_description", 
                                contentValue: grindContactDescription, 
                                section: "grind" 
                              })}
                              className="bg-green-600 hover:bg-green-700 text-white px-3"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonials Content */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                    Testimonials & Reviews
                  </h4>
                  
                  {/* Section Headers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                      <Input 
                        defaultValue="Transformation Stories"
                        className="text-sm"
                        onChange={(e) => console.log("Testimonials title:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
                      <Input 
                        defaultValue="Real results from real people who chose to transform their lives"
                        className="text-sm"
                        onChange={(e) => console.log("Testimonials subtitle:", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Individual Testimonials */}
                  <div className="space-y-6">
                    {/* Cathy Nadolski Testimonial */}
                    <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r">
                      <h5 className="font-medium text-gray-900 mb-3">{cathyName} - {cathyProgram}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Client Name</label>
                          <Input 
                            value={cathyName}
                            className="text-sm h-8"
                            onChange={(e) => setCathyName(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Program Description</label>
                          <Input 
                            value={cathyProgram}
                            className="text-sm h-8"
                            onChange={(e) => setCathyProgram(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Testimonial Text</label>
                          <textarea 
                            value={cathyTestimonial}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs h-20 resize-none"
                            onChange={(e) => setCathyTestimonial(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Jessica Davis Testimonial */}
                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r">
                      <h5 className="font-medium text-gray-900 mb-3">{jessicaName} - {jessicaProgram}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Client Name</label>
                          <Input 
                            value={jessicaName}
                            className="text-sm h-8"
                            onChange={(e) => setJessicaName(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Program Description</label>
                          <Input 
                            value={jessicaProgram}
                            className="text-sm h-8"
                            onChange={(e) => setJessicaProgram(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Testimonial Text</label>
                          <textarea 
                            value={jessicaTestimonial}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs h-16 resize-none"
                            onChange={(e) => setJessicaTestimonial(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Marcus Thompson Testimonial */}
                    <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r">
                      <h5 className="font-medium text-gray-900 mb-3">{marcusName} - {marcusProgram}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Client Name</label>
                          <Input 
                            value={marcusName}
                            className="text-sm h-8"
                            onChange={(e) => setMarcusName(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Program Description</label>
                          <Input 
                            value={marcusProgram}
                            className="text-sm h-8"
                            onChange={(e) => setMarcusProgram(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Testimonial Text</label>
                          <textarea 
                            value={marcusTestimonial}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs h-16 resize-none"
                            onChange={(e) => setMarcusTestimonial(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Angela Rodriguez Testimonial */}
                    <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 p-4 rounded-r">
                      <h5 className="font-medium text-gray-900 mb-3">{angelaName} - {angelaProgram}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Client Name</label>
                          <Input 
                            value={angelaName}
                            className="text-sm h-8"
                            onChange={(e) => setAngelaName(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Program Description</label>
                          <Input 
                            value={angelaProgram}
                            className="text-sm h-8"
                            onChange={(e) => setAngelaProgram(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Testimonial Text</label>
                          <textarea 
                            value={angelaTestimonial}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs h-16 resize-none"
                            onChange={(e) => setAngelaTestimonial(e.target.value)}
                            onBlur={() => updateTransformationStoriesMutation.mutate()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Save Transformation Stories Button */}
                  <div className="flex justify-end mt-6">
                    <Button 
                      onClick={() => updateTransformationStoriesMutation.mutate()}
                      disabled={updateTransformationStoriesMutation.isPending}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {updateTransformationStoriesMutation.isPending ? "Saving..." : "Save Transformation Stories"}
                    </Button>
                  </div>
                </div>

                {/* Schedule & Booking Text */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-violet-500 rounded-full"></span>
                    Schedule & Booking Content
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Page Title</label>
                      <Input 
                        defaultValue="Book Your Session"
                        className="text-sm"
                        onChange={(e) => console.log("Schedule title:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Booking Instructions</label>
                      <Input 
                        defaultValue="Select your preferred date and time"
                        className="text-sm"
                        onChange={(e) => console.log("Booking instructions:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Agreement Section Title</label>
                      <Input 
                        defaultValue="Digital Agreement"
                        className="text-sm"
                        onChange={(e) => console.log("Agreement title:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirmation Message</label>
                      <Input 
                        defaultValue="Your session is confirmed!"
                        className="text-sm"
                        onChange={(e) => console.log("Confirmation message:", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Button Text */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    Button & Navigation Text
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Book Session Button</label>
                      <Input 
                        defaultValue="Book Your Session"
                        className="text-sm"
                        onChange={(e) => console.log("Book session button:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">View Programs Button</label>
                      <Input 
                        defaultValue="View Programs"
                        className="text-sm"
                        onChange={(e) => console.log("View programs button:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Us Button</label>
                      <Input 
                        defaultValue="Contact Us"
                        className="text-sm"
                        onChange={(e) => console.log("Contact us button:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sign Up Button</label>
                      <Input 
                        defaultValue="Sign Up"
                        className="text-sm"
                        onChange={(e) => console.log("Sign up button:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Get Started Button</label>
                      <Input 
                        defaultValue="Get Started Today"
                        className="text-sm"
                        onChange={(e) => console.log("Get started button:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Learn More Button</label>
                      <Input 
                        defaultValue="Learn More"
                        className="text-sm"
                        onChange={(e) => console.log("Learn more button:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Client Portal Button</label>
                      <Input 
                        defaultValue="Client Portal"
                        className="text-sm"
                        onChange={(e) => console.log("Client portal button:", e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Submit Button</label>
                      <Input 
                        defaultValue="Submit"
                        className="text-sm"
                        onChange={(e) => console.log("Submit button:", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Update Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <Button 
                      className="!bg-blue-600 hover:!bg-blue-700 !text-white"
                      onClick={() => {
                        console.log("Saving all text changes...");
                        toast({ title: "Text Updated", description: "All text changes have been saved successfully" });
                      }}
                    >
                      Save All Changes
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-gray-300"
                      onClick={() => {
                        console.log("Previewing changes...");
                        window.open('/', '_blank');
                      }}
                    >
                      Preview Changes
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                      onClick={() => {
                        if (confirm("Reset all text to default values?")) {
                          console.log("Resetting text to defaults...");
                          window.location.reload();
                        }
                      }}
                    >
                      Reset to Default
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card className="border-2 border-iron-blue-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Client Management</CardTitle>
              </CardHeader>
              <CardContent>
                {clientsLoading ? (
                  <LoadingSpinner />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-800">Name</TableHead>
                        <TableHead className="text-gray-800">Email</TableHead>
                        <TableHead className="text-gray-800">Phone</TableHead>
                        <TableHead className="text-gray-800">Joined</TableHead>
                        <TableHead className="text-gray-800">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(clients) ? clients.map((client: any) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium text-gray-900">
                            {client.firstName} {client.lastName}
                          </TableCell>
                          <TableCell className="text-gray-800">{client.email}</TableCell>
                          <TableCell className="text-gray-800">{client.phone}</TableCell>
                          <TableCell className="text-gray-800">{new Date(client.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye size={14} className="mr-1" />
                                View
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger>
                                  <div className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium cursor-pointer transition-colors flex items-center">
                                    <Trash2 size={14} className="mr-1" />
                                    Delete
                                  </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Client</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete {client.firstName} {client.lastName}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => deleteClientMutation.mutate(client.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      )) : <tr><td colSpan={5}>No clients found</td></tr>}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card className="border-2 border-iron-blue-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Appointment Management</CardTitle>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <LoadingSpinner />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-800">Client</TableHead>
                        <TableHead className="text-gray-800">Date</TableHead>
                        <TableHead className="text-gray-800">Time</TableHead>
                        <TableHead className="text-gray-800">Status</TableHead>
                        <TableHead className="text-gray-800">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(appointments) ? appointments.map((appointment: any) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium text-gray-900">
                            {appointment.client?.firstName} {appointment.client?.lastName}
                          </TableCell>
                          <TableCell className="text-gray-800">{new Date(appointment.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-gray-800">{appointment.time}</TableCell>
                          <TableCell>
                            <Badge variant={appointment.status === "completed" ? "default" : "secondary"}>
                              {appointment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateAppointmentMutation.mutate({
                                  id: appointment.id,
                                  status: appointment.status === "scheduled" ? "completed" : "scheduled"
                                })}
                              >
                                {appointment.status === "scheduled" ? "Mark Complete" : "Mark Pending"}
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger>
                                  <div className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded cursor-pointer transition-colors flex items-center justify-center">
                                    <Trash2 size={14} />
                                  </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this appointment? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => deleteAppointmentMutation.mutate(appointment.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      )) : <tr><td colSpan={5}>No appointments found</td></tr>}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agreements Tab */}
          <TabsContent value="agreements" className="space-y-6">
            <Card className="border-2 border-iron-blue-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Digital Agreements</CardTitle>
              </CardHeader>
              <CardContent>
                {agreementsLoading ? (
                  <LoadingSpinner />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-800">Client</TableHead>
                        <TableHead className="text-gray-800">Agreement Type</TableHead>
                        <TableHead className="text-gray-800">Signed Date</TableHead>
                        <TableHead className="text-gray-800">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(agreements) ? agreements.map((agreement: any) => (
                        <TableRow key={agreement.id}>
                          <TableCell className="font-medium text-gray-900">
                            {agreement.client?.firstName} {agreement.client?.lastName}
                          </TableCell>
                          <TableCell className="text-gray-800">{agreement.agreementType}</TableCell>
                          <TableCell className="text-gray-800">{new Date(agreement.signedAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Eye size={14} className="mr-1" />
                              View Signature
                            </Button>
                          </TableCell>
                        </TableRow>
                      )) : <tr><td colSpan={4}>No agreements found</td></tr>}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-2 border-iron-blue-200">
              <CardHeader>
                <CardTitle className="text-gray-900">System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Business Name</label>
                      <Input defaultValue="Iron Dog Strength" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Coach Name</label>
                      <Input defaultValue="Master Dessie L. Cheers" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Session Pricing</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Single Session</label>
                      <Input defaultValue="$50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">16 Session Package</label>
                      <Input defaultValue="$375" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">32 Session Package</label>
                      <Input defaultValue="$675" />
                    </div>
                  </div>
                </div>

                <Button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}