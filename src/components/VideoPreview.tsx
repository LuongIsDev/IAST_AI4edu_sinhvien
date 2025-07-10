
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Download, Share, Settings, CheckCircle, SkipBack, SkipForward } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface VideoPreviewProps {
  project: any;
}

const VideoPreview = ({ project }: VideoPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [videoQuality, setVideoQuality] = useState('1080p');
  const [mouthAnimation, setMouthAnimation] = useState(0);
  const [volume, setVolume] = useState([80]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const duration = project?.content?.totalDuration || 100;

  // Mouth animation for talking avatar
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setMouthAnimation(prev => (prev + 1) % 4);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Start playback
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return duration;
          }
          
          // Change slides based on time
          const slideIndex = Math.floor((prev / duration) * (project?.content?.slides?.length || 5));
          setCurrentSlide(slideIndex);
          
          return prev + 1;
        });
      }, 1000);
    } else {
      // Pause playback
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const handleSeek = (newTime: number[]) => {
    const time = newTime[0];
    setCurrentTime(time);
    
    // Update slide based on new time
    const slideIndex = Math.floor((time / duration) * (project?.content?.slides?.length || 5));
    setCurrentSlide(slideIndex);
  };

  const handleSkipBack = () => {
    const newTime = Math.max(0, currentTime - 10);
    setCurrentTime(newTime);
    const slideIndex = Math.floor((newTime / duration) * (project?.content?.slides?.length || 5));
    setCurrentSlide(slideIndex);
  };

  const handleSkipForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    setCurrentTime(newTime);
    const slideIndex = Math.floor((newTime / duration) * (project?.content?.slides?.length || 5));
    setCurrentSlide(slideIndex);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!project) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chưa có dự án để xem trước
            </h3>
            <p className="text-gray-600">
              Vui lòng tạo dự án và chọn avatar trước khi xem trước video
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentSlideData = project.content?.slides?.[currentSlide] || project.content?.slides?.[0];

  return (
    <div className="space-y-6">
      {/* Video Preview */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Video bài giảng đã hoàn thành!
          </CardTitle>
          <CardDescription>
            Bài giảng của bạn đã được tạo thành công. Sử dụng các điều khiển bên dưới để xem và điều chỉnh video.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* Video Player */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
            {/* Video Content */}
            <div className="absolute inset-0 flex">
              {/* Main Content Area (Slides) */}
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-8 animate-fade-in">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      {currentSlideData?.title || "Tiêu đề slide"}
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p className="text-lg leading-relaxed">
                        {currentSlideData?.content || "Nội dung slide sẽ hiển thị tại đây..."}
                      </p>
                      {currentSlideData?.keyPoints && (
                        <div className="text-left space-y-2 mt-6">
                          <h4 className="font-semibold text-gray-900">Điểm chính:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {currentSlideData.keyPoints.map((point: string, index: number) => (
                              <li key={index} className="text-gray-700">{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Avatar Area */}
              <div className="w-80 p-6 flex flex-col justify-end">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="aspect-[3/4] bg-gradient-to-b from-blue-400 to-purple-500 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                    {/* Avatar with mouth animation */}
                    <div className="text-white text-center relative">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 relative">
                        <Play className="h-8 w-8" />
                        {/* Animated mouth */}
                        {isPlaying && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                            <div 
                              className={`w-4 h-1 bg-white/60 rounded-full transition-all duration-200 ${
                                mouthAnimation % 2 === 0 ? 'scale-x-100' : 'scale-x-75'
                              } ${
                                Math.floor(mouthAnimation/2) % 2 === 0 ? 'scale-y-100' : 'scale-y-150'
                              }`}
                            />
                          </div>
                        )}
                      </div>
                      <p className="font-medium">
                        {project.avatar?.name || "AI Avatar"}
                      </p>
                      {/* Voice wave animation */}
                      {isPlaying && (
                        <div className="flex justify-center space-x-1 mt-2">
                          {Array.from({length: 5}).map((_, i) => (
                            <div 
                              key={i}
                              className="w-1 bg-white/60 rounded-full animate-pulse"
                              style={{
                                height: `${8 + (mouthAnimation + i) % 4 * 4}px`,
                                animationDelay: `${i * 100}ms`
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {project.avatar && (
                    <div className="text-center">
                      <Badge variant="secondary" className="text-xs">
                        {project.avatar.description}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Subtitles */}
            {showSubtitles && isPlaying && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-lg max-w-4xl">
                <p className="text-center font-medium">
                  {currentSlideData?.content?.slice(0, 100) + "..." || "Xin chào các bạn, hôm nay chúng ta sẽ cùng tìm hiểu về chủ đề này..."}
                </p>
              </div>
            )}

            {/* Slide Counter */}
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentSlide + 1} / {project.content?.slides?.length || 5}
            </div>

            {/* Time Display */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Video Controls */}
          <div className="p-4 space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSkipBack}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSkipForward}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>

                <div className="w-24">
                  <Slider
                    value={volume}
                    max={100}
                    step={1}
                    onValueChange={setVolume}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="subtitles" className="text-sm">Phụ đề</Label>
                  <Switch
                    id="subtitles"
                    checked={showSubtitles}
                    onCheckedChange={setShowSubtitles}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Settings */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Cài đặt xuất video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Chất lượng video</Label>
              <div className="flex space-x-2">
                {['720p', '1080p', '4K'].map((quality) => (
                  <Button
                    key={quality}
                    variant={videoQuality === quality ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVideoQuality(quality)}
                    className={videoQuality === quality ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                  >
                    {quality}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Định dạng xuất</Label>
              <div className="flex space-x-2">
                {['MP4', 'MOV', 'AVI'].map((format) => (
                  <Button
                    key={format}
                    variant="outline"
                    size="sm"
                  >
                    {format}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Chia sẻ
          </Button>
        </div>
        
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8">
          <Download className="h-4 w-4 mr-2" />
          Tải xuống video
        </Button>
      </div>
    </div>
  );
};

export default VideoPreview;
