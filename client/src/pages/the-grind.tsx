import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Play, X, MapPin, Clock, Phone, Mail } from "lucide-react";
import { useContent, getContentValue } from "@/hooks/use-content";

// Video file URLs - served statically from public folder (not bundled)
const workout1 = "/videos/VIDEO-2025-07-19-20-36-16_1752972990246.mov";
const workout2 = "/videos/VIDEO-2025-07-19-20-37-23_1752972990246.mov";
const workout3 = "/videos/VIDEO-2025-07-19-20-41-14_1752972990247.mov";
const workout4 = "/videos/VIDEO-2025-07-19-20-43-15_1752972990247.mov";

const workoutVideos = [
  {
    id: 1,
    title: "Strength Training Session",
    description: "Intense lower body workout focusing on compound movements",
    videoUrl: "/videos/WhatsApp Video 2025-07-28 at 11.18.41_f20ed152_1753716257416.mp4",
    thumbnail: "/thumbnails/strength-training-new.jpg",
    overlayText: "315 x 3",
  },
  {
    id: 2,
    title: "Core Power Training",
    description: "Advanced core strengthening and stability exercises",
    videoUrl: workout2,
    thumbnail: "/thumbnails/workout2.jpg",
    overlayText: "Core Blast",
  },
  {
    id: 3,
    title: "Functional Movement",
    description: "Dynamic movements for real-world strength application",
    videoUrl: workout3,
    thumbnail: "/thumbnails/workout3.jpg",
    overlayText: "Movement Flow",
  },
  {
    id: 4,
    title: "Explosive Movements",
    description: "High Intensity Training",
    videoUrl: workout4,
    thumbnail: "/thumbnails/workout4.jpg",
    overlayText: "Competition Ready",
  },
];

const clientContent = [
  {
    id: 1,
    name: "Client Progress - Month 3",
    description: "Amazing transformation through dedication",
    imageUrl: "/client-transformation-1.jpg",
    type: "image",
  },
  {
    id: 2,
    name: "Group Training Session",
    description: "Team building through fitness challenges",
    videoUrl: "/videos/group training 2_1752977229371.mp4",
    thumbnail: "/thumbnails/group-training.jpg",
    type: "video",
    overlayText: "Group Power",
  },
  {
    id: 3,
    name: "Rene's Personal Best",
    description: "Breaking personal records in strength training",
    videoUrl: "/videos/Rene personal best_1752977434207.mp4",
    thumbnail: "/thumbnails/rene-personal-best.jpg",
    type: "video",
    overlayText: "Personal Record",
  },
  {
    id: 4,
    name: "Jaden Matias - Assistant Trainer IDS",
    description: "Assistant trainer demonstrating advanced training techniques",
    videoUrl: "/videos/WhatsApp Video 2025-07-19 at 22.45.43_8f4a6328_1752984266686.mp4",
    thumbnail: "/thumbnails/jaden-assistant-trainer.jpg",
    type: "video",
    overlayText: "Assistant Trainer",
  },
  {
    id: 5,
    name: "Self Defense Training",
    description: "Advanced self-defense techniques and conditioning",
    videoUrl: "/videos/Self Defense Training 2_1752985240655.mp4",
    thumbnail: "/thumbnails/self-defense-training.jpg",
    type: "video",
    overlayText: "Self Defense",
  },
];

export default function TheGrind() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [selectedClientVideo, setSelectedClientVideo] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isClientVideoModalOpen, setIsClientVideoModalOpen] = useState(false);
  const { data: content } = useContent();

  const handleVideoClick = (videoId: number) => {
    setSelectedVideo(videoId);
    setIsVideoModalOpen(true);
  };

  const handleClientVideoClick = (contentId: number) => {
    setSelectedClientVideo(contentId);
    setIsClientVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsVideoModalOpen(false);
  };

  const closeClientVideoModal = () => {
    setSelectedClientVideo(null);
    setIsClientVideoModalOpen(false);
  };

  const currentVideo = workoutVideos.find(video => video.id === selectedVideo);
  const currentClientVideo = clientContent.find(content => content.id === selectedClientVideo && content.type === 'video');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-cyan-100/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <img 
                src="/iron-dog-logo.jpg" 
                alt="Iron Dog Strength Logo" 
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg object-cover"
              />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {getContentValue(content, "grind_page_title", "THE GRIND")}
            </h1>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              {getContentValue(content, "grind_page_subtitle", "Witness the dedication, transformation, and relentless pursuit of excellence. These are the moments that define champions - the sweat, the effort, the grind that builds legends.")}
            </p>
          </div>
        </div>
      </div>

      {/* Workout Videos Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getContentValue(content, "grind_workouts_title", "Gym Workouts")}
            </h2>
            <p className="text-lg text-gray-800">
              {getContentValue(content, "grind_workouts_description", "Intense training sessions that push limits and build champions")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workoutVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative group" onClick={() => handleVideoClick(video.id)}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-80 object-contain bg-gray-900"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
                  
                  {/* Overlay Text */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 text-white px-3 py-1 rounded-lg font-bold text-lg">
                      {video.overlayText}
                    </span>
                  </div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Play className="text-gray-900 ml-1" size={24} />
                    </div>
                  </div>
                  
                  {/* Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24" />
                  <div className="absolute bottom-6 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg">
                      {video.title}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-700">
                    {video.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Progress Images Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getContentValue(content, "grind_transformations_title", "Client Transformations")}
            </h2>
            <p className="text-lg text-gray-800">
              {getContentValue(content, "grind_transformations_description", "Real results from dedicated clients who embraced the grind")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientContent.map((content) => (
              <Card key={content.id} className="overflow-hidden bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  {content.type === 'video' ? (
                    <div 
                      className="relative cursor-pointer"
                      onClick={() => handleClientVideoClick(content.id)}
                    >
                      <img
                        src={content.thumbnail}
                        alt={content.name}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300">
                          <Play className="text-white" size={24} />
                        </div>
                      </div>
                      {content.overlayText && (
                        <div className="absolute top-4 left-4 bg-iron-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {content.overlayText}
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {content.name}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {content.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={content.imageUrl}
                        alt={content.name}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {content.name}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {content.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              {getContentValue(content, "grind_cta_title", "Ready to Start Your Grind?")}
            </h2>
            <p className="text-lg mb-6 text-gray-300">
              {getContentValue(content, "grind_cta_description", "Join the ranks of champions who have transformed their lives through dedication, discipline, and the relentless pursuit of excellence.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                {getContentValue(content, "grind_cta_button_1", "Book Your Session")}
              </Button>
              <Button size="lg" className="bg-gradient-to-r from-iron-blue-600 to-iron-blue-700 hover:from-iron-blue-700 hover:to-iron-blue-800 text-white font-bold border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                {getContentValue(content, "grind_cta_button_2", "View Programs")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{
        background: `linear-gradient(135deg, 
          rgba(219, 234, 254, 0.9) 0%, 
          rgba(147, 197, 253, 0.8) 25%,
          rgba(191, 219, 254, 0.85) 50%,
          rgba(186, 230, 253, 0.9) 100%)`
      }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-iron-blue-900 mb-4">{getContentValue(content, "grind_contact_title", "Contact Iron Dog Strength")}</h2>
            <p className="text-lg text-iron-blue-700">
              {getContentValue(content, "grind_contact_description", "Ready to begin your transformation? Get in touch with our training team.")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Location & Hours */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border-2 border-iron-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-iron-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <MapPin className="text-iron-blue-600" size={20} />
                </div>
                <h3 className="text-xl font-bold text-iron-blue-900">Training Location</h3>
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-lg text-iron-blue-900">{getContentValue(content, "facility_name", "Iron Dog Strength Training Facility")}</h4>
                <p className="text-iron-blue-700">
                  {getContentValue(content, "facility_address", "35840 Chester Rd.\nAvon, OH 44011").split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index === 0 && <br />}
                    </span>
                  ))}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-iron-blue-700">
                  <Clock className="text-iron-blue-500 mr-3" size={16} />
                  <span>Saturday-Sunday: 1:30 PM - 5:00 PM</span>
                </div>
                <div className="flex items-center text-iron-blue-700">
                  <Clock className="text-iron-blue-500 mr-3" size={16} />
                  <span>Monday: 8:00 PM - 10:00 PM</span>
                </div>
                <div className="flex items-center text-iron-blue-700">
                  <Clock className="text-iron-blue-500 mr-3" size={16} />
                  <span>Tuesday: 6:30 PM - 8:00 PM</span>
                </div>
                <div className="flex items-center text-iron-blue-700">
                  <Clock className="text-iron-blue-500 mr-3" size={16} />
                  <span>Wednesday: Closed</span>
                </div>
                <div className="flex items-center text-iron-blue-700">
                  <Clock className="text-iron-blue-500 mr-3" size={16} />
                  <span>Thursday: 8:00 PM - 10:00 PM</span>
                </div>
                <div className="flex items-center text-iron-blue-700">
                  <Clock className="text-iron-blue-500 mr-3" size={16} />
                  <span>Friday: 6:30 PM - 8:30 PM</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border-2 border-iron-blue-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-iron-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="text-iron-blue-600" size={20} />
                </div>
                <h3 className="text-xl font-bold text-iron-blue-900">Contact Numbers</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-iron-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <Phone className="text-iron-blue-600" size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-iron-blue-900">Master Dessie L. Cheers</div>
                    <div className="text-iron-blue-700">(440) 281-7930</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-iron-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <Phone className="text-iron-blue-600" size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-iron-blue-900">Jaden Matias - Assistant Trainer</div>
                    <div className="text-iron-blue-700">(440) 420-7694</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-iron-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="text-iron-blue-600" size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-iron-blue-900">Email</div>
                    <div className="text-iron-blue-700">train@irondogstrength.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-black">
          <DialogHeader className="sr-only">
            <DialogTitle>{currentVideo?.title || "Workout Video"}</DialogTitle>
            <DialogDescription>{currentVideo?.description || "Watch this workout video"}</DialogDescription>
          </DialogHeader>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={closeVideoModal}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
          >
            <X size={24} />
          </Button>
          
          {currentVideo && (
            <div className="w-full h-full flex items-center justify-center p-4">
              <video
                className={`${currentVideo.id === 4 ? 'w-full h-auto max-h-[70vh] object-contain' : 'max-w-full max-h-full object-contain'}`}
                controls
                autoPlay
                preload="metadata"
                onError={(e) => console.error('Video error:', e)}
              >
                <source src={currentVideo.videoUrl} type="video/quicktime" />
                <source src={currentVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          
          {currentVideo && (
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">{currentVideo.title}</h3>
              <p className="text-gray-300">{currentVideo.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Client Video Modal */}
      <Dialog open={isClientVideoModalOpen} onOpenChange={setIsClientVideoModalOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-black">
          <DialogHeader className="sr-only">
            <DialogTitle>{currentClientVideo?.name || "Client Video"}</DialogTitle>
            <DialogDescription>{currentClientVideo?.description || "Watch this client video"}</DialogDescription>
          </DialogHeader>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={closeClientVideoModal}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
          >
            <X size={24} />
          </Button>
          
          {currentClientVideo && (
            <div className="w-full h-full flex items-center justify-center">
              <video
                className="max-w-full max-h-full object-contain"
                controls
                autoPlay
                preload="metadata"
                onError={(e) => {
                  console.error('Client video error:', e);
                  console.error('Video URL:', currentClientVideo.videoUrl);
                  console.error('Video ID:', currentClientVideo.id);
                }}
                onLoadStart={() => console.log('Video loading started for:', currentClientVideo.videoUrl)}
              >
                <source src={currentClientVideo.videoUrl} type="video/mp4" />
                <source src={currentClientVideo.videoUrl} type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          
          {currentClientVideo && (
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">{currentClientVideo.name}</h3>
              <p className="text-gray-300">{currentClientVideo.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}