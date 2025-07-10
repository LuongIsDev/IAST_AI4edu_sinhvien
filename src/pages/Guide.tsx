
import { useState } from 'react';
import { GraduationCap, LogIn, Menu, X, User, BookOpen, Upload, FileText, Wand2, Download, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Guide = () => {
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
              <Link to="/features" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Tính năng</Link>
              <Link to="/guide" className="text-blue-600 font-medium">Hướng dẫn</Link>
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
                <Link to="/features" className="text-slate-600 hover:text-blue-600 font-medium">Tính năng</Link>
                <Link to="/guide" className="text-blue-600 font-medium">Hướng dẫn</Link>
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
            Hướng Dẫn Sử Dụng
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            Làm theo 3 bước đơn giản để tạo ra video bài giảng chuyên nghiệp
          </p>
        </div>

        {/* Step by Step Guide */}
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  1
                </div>
                <h3 className="text-3xl font-bold text-slate-800">Tải Lên Nội Dung</h3>
              </div>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  Tải lên tài liệu học tập của bạn dưới các định dạng được hỗ trợ:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />PDF, DOC, DOCX</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />PowerPoint (PPT, PPTX)</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Văn bản thuần túy (TXT)</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Hình ảnh (JPG, PNG)</li>
                </ul>
              </div>
            </div>
            <div className="flex-1">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Upload className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <p className="text-slate-600">Kéo thả hoặc click để tải lên</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-8 w-8 text-slate-400" />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  2
                </div>
                <h3 className="text-3xl font-bold text-slate-800">Chọn Avatar AI</h3>
              </div>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  Lựa chọn avatar phù hợp với phong cách bài giảng của bạn:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Hơn 50 avatar đa dạng</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Giọng nói tự nhiên</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Phong cách chuyên nghiệp</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Tùy chỉnh tông giọng</li>
                </ul>
              </div>
            </div>
            <div className="flex-1">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Wand2 className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                    <p className="text-slate-600">Chọn avatar và giọng nói</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-8 w-8 text-slate-400" />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  3
                </div>
                <h3 className="text-3xl font-bold text-slate-800">Tải Xuống Video</h3>
              </div>
              <div className="space-y-4 text-slate-600">
                <p className="text-lg">
                  AI sẽ xử lý và tạo video bài giảng chuyên nghiệp cho bạn:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Chất lượng 4K/1080p</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Định dạng MP4, AVI</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Phụ đề tự động</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Thời gian xử lý: 2-3 phút</li>
                </ul>
              </div>
            </div>
            <div className="flex-1">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Download className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <p className="text-slate-600">Video hoàn thành sẵn sàng tải xuống</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-20">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-2xl text-center">💡 Mẹo Sử Dụng Hiệu Quả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800">Chuẩn bị nội dung:</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Cấu trúc nội dung rõ ràng</li>
                    <li>• Sử dụng đầu mục và tiểu mục</li>
                    <li>• Giới hạn 10-15 slide mỗi video</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800">Tối ưu chất lượng:</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Chọn avatar phù hợp với chủ đề</li>
                    <li>• Điều chỉnh tốc độ nói vừa phải</li>
                    <li>• Kiểm tra trước khi xuất video</li>
                  </ul>
                </div>
              </div>
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

export default Guide;
