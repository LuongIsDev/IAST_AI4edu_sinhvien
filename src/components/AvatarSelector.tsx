import { useState } from 'react';
import { Users, Play, Settings, CheckCircle, Mic, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AvatarSelectorProps {
  project: any;
  onProjectUpdated: (project: any) => void;
  onComplete: () => void;
}

const AvatarSelector = ({ project, onProjectUpdated, onComplete }: AvatarSelectorProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [voiceSpeed, setVoiceSpeed] = useState([1.0]);
  const [voicePitch, setVoicePitch] = useState([1.0]);
  const { toast } = useToast();

  const avatars = [
    {
      id: 'anna',
      name: 'Anna',
      gender: 'female',
      age: 'young',
      style: 'professional',
      description: 'Giáo viên trẻ, chuyên nghiệp',
      premium: false
    },
    {
      id: 'david',
      name: 'David',
      gender: 'male',
      age: 'middle',
      style: 'friendly',
      description: 'Thầy giáo thân thiện, kinh nghiệm',
      premium: false
    },
    {
      id: 'sarah',
      name: 'Sarah',
      gender: 'female',
      age: 'middle',
      style: 'authoritative',
      description: 'Chuyên gia, uy tín',
      premium: true
    },
    {
      id: 'michael',
      name: 'Michael',
      gender: 'male',
      age: 'senior',
      style: 'wise',
      description: 'Giáo sư kinh nghiệm, thông thái',
      premium: true
    },
    {
      id: 'lisa',
      name: 'Lisa',
      gender: 'female',
      age: 'young',
      style: 'energetic',
      description: 'Năng động, sôi nổi',
      premium: true
    },
    {
      id: 'james',
      name: 'James',
      gender: 'male',
      age: 'young',
      style: 'casual',
      description: 'Thoải mái, dễ gần',
      premium: false
    }
  ];

  const voices = [
    { id: 'vi-female-1', name: 'Minh Anh (Nữ)', gender: 'female', accent: 'north', premium: false },
    { id: 'vi-male-1', name: 'Đức Minh (Nam)', gender: 'male', accent: 'north', premium: false },
    { id: 'vi-female-2', name: 'Thu Hương (Nữ)', gender: 'female', accent: 'south', premium: true },
    { id: 'vi-male-2', name: 'Văn Hải (Nam)', gender: 'male', accent: 'south', premium: true },
    { id: 'vi-female-3', name: 'Lan Phương (Nữ)', gender: 'female', accent: 'central', premium: true },
    { id: 'vi-male-3', name: 'Quang Huy (Nam)', gender: 'male', accent: 'central', premium: false }
  ];

  const handleAvatarSelect = (avatar: any) => {
    setSelectedAvatar(avatar);
    
    toast({
      title: "Đã chọn Avatar",
      description: `Avatar ${avatar.name} đã được chọn cho dự án.`,
    });
  };

  const handleVoicePreview = async (voiceId: string) => {
    toast({
      title: "Đang phát giọng đọc mẫu",
      description: "Đang tải và phát giọng đọc mẫu...",
    });
    
    // Simulate voice preview
    setTimeout(() => {
      toast({
        title: "Đã phát xong",
        description: "Bạn có thích giọng đọc này không?",
      });
    }, 3000);
  };

  const handleCreateVideo = () => {
    if (!selectedAvatar || !selectedVoice) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng chọn avatar và giọng đọc",
        variant: "destructive",
      });
      return;
    }

    const updatedProject = {
      ...project,
      avatar: selectedAvatar,
      voice: {
        id: selectedVoice,
        speed: voiceSpeed[0],
        pitch: voicePitch[0]
      },
      status: 'configured'
    };
    
    onProjectUpdated(updatedProject);
    
    toast({
      title: "Bắt đầu tạo video",
      description: "Đang tạo video bài giảng với avatar và giọng đọc đã chọn...",
    });

    onComplete();
  };

  if (!project) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chưa có dự án
            </h3>
            <p className="text-gray-600">
              Vui lòng tải lên nội dung trước khi chọn avatar
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Chọn Avatar và Giọng Đọc
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lựa chọn avatar giảng viên và giọng đọc phù hợp với phong cách bài giảng của bạn
        </p>
      </div>

      {/* Avatar Selection */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Chọn AI Avatar
          </CardTitle>
          <CardDescription>
            Chọn avatar giảng viên phù hợp với phong cách bài giảng của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedAvatar?.id === avatar.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
                onClick={() => handleAvatarSelect(avatar)}
              >
                {selectedAvatar?.id === avatar.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
                
                {avatar.premium && (
                  <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
                    Pro
                  </Badge>
                )}
                
                <div className="aspect-[4/5] bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                  {/* Animated Avatar Preview */}
                  <div className="w-full h-full relative bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/40 flex items-center justify-center animate-pulse">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    {/* Talking animation effect */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-2 bg-white/30 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900">{avatar.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{avatar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Selection */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-purple-600" />
            Chọn giọng đọc
          </CardTitle>
          <CardDescription>
            Lựa chọn giọng đọc AI phù hợp với avatar và nội dung
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {voices.map((voice) => (
              <div
                key={voice.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  selectedVoice === voice.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-4 h-4 rounded-full border-2 cursor-pointer ${
                      selectedVoice === voice.id
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedVoice(voice.id)}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{voice.name}</span>
                      {voice.premium && (
                        <Badge variant="secondary" className="text-xs">Pro</Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 capitalize">
                      {voice.accent === 'north' ? 'Miền Bắc' : 
                       voice.accent === 'south' ? 'Miền Nam' : 'Miền Trung'}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVoicePreview(voice.id)}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Nghe thử
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Settings */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-600" />
            Cài đặt giọng đọc
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Tốc độ đọc</Label>
            <div className="px-2">
              <Slider
                value={voiceSpeed}
                onValueChange={setVoiceSpeed}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Chậm (0.5x)</span>
                <span>Bình thường ({voiceSpeed[0]}x)</span>
                <span>Nhanh (2x)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Cao độ giọng</Label>
            <div className="px-2">
              <Slider
                value={voicePitch}
                onValueChange={setVoicePitch}
                max={1.5}
                min={0.5}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Thấp (0.5)</span>
                <span>Bình thường ({voicePitch[0]})</span>
                <span>Cao (1.5)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Video Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleCreateVideo}
          disabled={!selectedAvatar || !selectedVoice}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-8"
        >
          <Play className="h-5 w-5 mr-2" />
          Tạo Video
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AvatarSelector;
