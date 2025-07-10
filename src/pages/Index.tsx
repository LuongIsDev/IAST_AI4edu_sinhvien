
import { useState } from 'react';
import { GraduationCap, LogIn, Menu, X, User, BookOpen, Upload, Zap, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContentUploader from '@/components/ContentUploader';
import AvatarSelector from '@/components/AvatarSelector';
import VideoPreview from '@/components/VideoPreview';
import ProjectDashboard from '@/components/ProjectDashboard';
import { Link } from 'react-router-dom';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('upload');
  const [project, setProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProjectCreated = (newProject: any) => {
    setProject(newProject);
    setTimeout(() => {
      setCurrentStep('avatar');
    }, 1000);
  };

  const handleProjectUpdated = (updatedProject: any) => {
    setProject(updatedProject);
  };

  const handleAvatarComplete = () => {
    setCurrentStep('generating');
    setTimeout(() => {
      setCurrentStep('preview');
    }, 3000);
  };

  const handleBackToUpload = () => {
    setCurrentStep('upload');
    setProject(null);
  };

  const handleViewProjects = () => {
    setCurrentStep('projects');
  };

  const handleBackFromProjects = () => {
    setCurrentStep('upload');
  };

  const handleProjectSelected = (selectedProject: any) => {
    setProject(selectedProject);
    setCurrentStep('preview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  EduAI Studio
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-blue-600 font-medium">Trang chủ</Link>
              <Link to="/features" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Tính năng</Link>
              <Link to="/guide" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Hướng dẫn</Link>
              <Link to="/about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Giới thiệu</Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleViewProjects}
                className="border-slate-300 hover:border-blue-400"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Dự Án
              </Button>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
                <LogIn className="h-4 w-4 mr-2" />
                Đăng nhập
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                <User className="h-4 w-4 mr-2" />
                Đăng ký
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-blue-600 font-medium">Trang chủ</Link>
                <Link to="/features" className="text-slate-600 hover:text-blue-600 font-medium">Tính năng</Link>
                <Link to="/guide" className="text-slate-600 hover:text-blue-600 font-medium">Hướng dẫn</Link>
                <Link to="/about" className="text-slate-600 hover:text-blue-600 font-medium">Giới thiệu</Link>
                <div className="flex flex-col space-y-2 pt-2 border-t border-slate-200">
                  <Button variant="outline" size="sm" onClick={handleViewProjects}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Dự Án
                  </Button>
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Đăng nhập
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <User className="h-4 w-4 mr-2" />
                    Đăng ký
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {currentStep !== 'projects' && (
          <>
            {/* Hero Section - Only show on upload step */}
            {currentStep === 'upload' && (
              <>
                <div className="text-center mb-16">
                  <div className="mb-12">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent leading-tight">
                      Tạo Bài Giảng Tương Tác
                      <br />
                      <span className="text-3xl md:text-4xl">Với Trí Tuệ Nhân Tạo</span>
                    </h2>
                    <p className="text-xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                      Chuyển đổi tài liệu học tập thành video bài giảng sinh động và chuyên nghiệp. 
                      Được tin tưởng bởi hàng nghìn giảng viên và sinh viên trên toàn quốc.
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                  <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-slate-800">5,000+</div>
                    <div className="text-sm text-slate-600">Giảng viên</div>
                  </div>
                  <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
                    <GraduationCap className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-slate-800">200+</div>
                    <div className="text-sm text-slate-600">Trường học</div>
                  </div>
                  <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
                    <Zap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-slate-800">50K+</div>
                    <div className="text-sm text-slate-600">Video tạo</div>
                  </div>
                  <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
                    <Award className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-slate-800">98%</div>
                    <div className="text-sm text-slate-600">Hài lòng</div>
                  </div>
                </div>
              </>
            )}

            {/* Back Button */}
            {currentStep !== 'upload' && (
              <div className="mb-6">
                <Button variant="outline" onClick={handleBackToUpload} className="border-slate-300 hover:border-blue-400">
                  ← Quay lại đầu
                </Button>
              </div>
            )}
          </>
        )}

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 'upload' && (
            <ContentUploader onProjectCreated={handleProjectCreated} />
          )}

          {currentStep === 'avatar' && (
            <AvatarSelector 
              project={project} 
              onProjectUpdated={handleProjectUpdated}
              onComplete={handleAvatarComplete}
            />
          )}

          {currentStep === 'generating' && (
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="pt-8">
                <div className="text-center py-16">
                  <div className="relative mb-8">
                    <div className="animate-spin w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full mx-auto animate-spin" style={{animationDelay: '0.5s', animationDuration: '1.5s'}}></div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    Đang tạo video bài giảng...
                  </h3>
                  <p className="text-slate-600 text-lg mb-6">
                    AI đang xử lý nội dung và tạo video chuyên nghiệp cho bạn
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 inline-block">
                    <p className="text-blue-700 font-semibold">Thời gian ước tính: 2-3 phút</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'preview' && (
            <VideoPreview project={project} />
          )}

          {currentStep === 'projects' && (
            <div>
              <div className="mb-6">
                <Button variant="outline" onClick={handleBackFromProjects} className="border-slate-300 hover:border-blue-400">
                  ← Quay lại
                </Button>
              </div>
              <ProjectDashboard onProjectSelected={handleProjectSelected} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">EduAI Studio</span>
              </div>
              <p className="text-slate-400 mb-4">
                Nền tảng giáo dục thông minh hàng đầu Việt Nam
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Tạo video AI</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Avatar 3D</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Text-to-Speech</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/guide" className="hover:text-white transition-colors">Hướng dẫn sử dụng</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Công ty</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tin tức</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 EduAI Studio. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
