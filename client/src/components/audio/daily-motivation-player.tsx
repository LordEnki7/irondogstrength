import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DailyMotivationPlayerProps {
  className?: string;
}

export function DailyMotivationPlayer({ className = "" }: DailyMotivationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/master-cheers-daily-motivation.m4a"
        preload="metadata"
      />
      
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        {!isExpanded ? (
          // Collapsed floating button
          <Button
            onClick={() => setIsExpanded(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-iron-blue-600 to-iron-blue-700 hover:from-iron-blue-700 hover:to-iron-blue-800 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <MessageCircle size={24} />
          </Button>
        ) : (
          // Expanded audio player
          <Card className="w-80 bg-gradient-to-br from-iron-blue-50 to-iron-blue-100 border-2 border-iron-blue-200 shadow-2xl backdrop-blur-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold text-iron-blue-900 text-sm">Daily Motivation</h4>
                  <p className="text-xs text-iron-blue-700">Master Dessie L. Cheers</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="text-iron-blue-600 hover:text-iron-blue-800 h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlayPause}
                  className="text-iron-blue-700 hover:text-iron-blue-900 hover:bg-iron-blue-200 h-8 w-8 p-0"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-iron-blue-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-iron-blue-600 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-iron-blue-700 hover:text-iron-blue-900 hover:bg-iron-blue-200 h-8 w-8 p-0"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </Button>
              </div>
              
              <div className="flex justify-between text-xs text-iron-blue-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              
              <div className="mt-3 text-xs text-iron-blue-700 leading-relaxed">
                Start your day with words of wisdom, attitude, and effort from Master Cheers.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}