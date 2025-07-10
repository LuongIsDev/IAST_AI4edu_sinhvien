
import { useState } from 'react';
import { GraduationCap, LogIn, Menu, X, User, BookOpen, Upload, Zap, Users, Award, Play, Bot, Wand2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Features = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleViewProjects = () => {
    // Navigate to projects - you can implement this navigation logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header - Same as Index */}
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
              <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Trang chủ</Link>
              <Link to="/features" className="text-blue-600 font-medium">Tính năng</Link>
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
                <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium">Trang chủ</Link>
                <Link to="/features" className="text-blue-600 font-medium">Tính năng</Link>
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Tính Năng Nổi Bật
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            Khám phá các công nghệ AI tiên tiến giúp bạn tạo ra những bài giảng chuyên nghiệp
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <CardTitle>AI Avatar 3D</CardTitle>
              <CardDescription>
                Chọn từ hơn 50 avatar 3D chuyên nghiệp với giọng nói tự nhiên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>• Hơn 50 avatar đa dạng</li>
                <li>• Giọng nói tự nhiên</li>
                <li>• Tùy chỉnh phong cách</li>
                <li>• Đồng bộ miệng môi</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Text-to-Speech AI</CardTitle>
              <CardDescription>
                Công nghệ chuyển đổi văn bản thành giọng nói tự nhiên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>• Giọng Việt Nam chuẩn</li>
                <li>• Tốc độ nói linh hoạt</li>
                <li>• Nhấn âm tự động</li>
                <li>• Chất lượng studio</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Xử Lý Tự Động</CardTitle>
              <CardDescription>
                AI phân tích và tối ưu nội dung học tập tự động
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>• Phân tích nội dung thông minh</li>
                <li>• Tạo slide tự động</li>
                <li>• Tối ưu thời lượng</li>
                <li>• Chất lượng 4K</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <Play className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Video Chuyên Nghiệp</CardTitle>
              <CardDescription>
                Xuất video chất lượng cao với nhiều định dạng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>• Chất lượng 4K/1080p</li>
                <li>• Định dạng MP4, AVI</li>
                <li>• Phụ đề tự động</li>
                <li>• Tùy chỉnh giao diện</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Đa Ngôn Ngữ</CardTitle>
              <CardDescription>
                Hỗ trợ nhiều ngôn ngữ cho bài giảng quốc tế
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>• Tiếng Việt, Anh, Trung</li>
                <li>• Phát âm chuẩn</li>
                <li>• Phụ đề đa ngôn ngữ</li>
                <li>• Tùy chỉnh giọng điệu</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Quản Lý Dự Án</CardTitle>
              <CardDescription>
                Hệ thống quản lý dự án mạnh mẽ và trực quan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>• Dashboard trực quan</li>
                <li>• Lưu trữ không giới hạn</li>
                <li>• Chia sẻ dễ dàng</li>
                <li>• Phân tích chi tiết</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer - Same as Index */}
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

export default Features;
