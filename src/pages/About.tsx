
import { useState } from 'react';
import { GraduationCap, LogIn, Menu, X, User, BookOpen, Target, Users, Award, Heart, Lightbulb, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const About = () => {
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
              <Link to="/guide" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Hướng dẫn</Link>
              <Link to="/about" className="text-blue-600 font-medium">Giới thiệu</Link>
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
                <Link to="/guide" className="text-slate-600 hover:text-blue-600 font-medium">Hướng dẫn</Link>
                <Link to="/about" className="text-blue-600 font-medium">Giới thiệu</Link>
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
            Về EduAI Studio
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            Chúng tôi cam kết mang đến những công nghệ giáo dục tiên tiến nhất cho cộng đồng học tập Việt Nam
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Sứ Mệnh</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                Tạo ra những công cụ AI thông minh và dễ sử dụng, giúp các nhà giáo dục tạo ra những bài giảng 
                chất lượng cao một cách nhanh chóng và hiệu quả. Chúng tôi tin rằng công nghệ có thể làm cho 
                việc giảng dạy trở nên thú vị và dễ tiếp cận hơn.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Tầm Nhìn</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                Trở thành nền tảng giáo dục AI hàng đầu tại Việt Nam và khu vực Đông Nam Á. Chúng tôi hướng 
                tới một tương lai nơi mỗi giảng viên đều có thể tạo ra những video bài giảng chuyên nghiệp 
                chỉ trong vài phút.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-800">Giá Trị Cốt Lõi</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Tận Tâm</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Chúng tôi luôn lắng nghe và thấu hiểu nhu cầu của người dùng để không ngừng cải thiện sản phẩm.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Sáng Tạo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Áp dụng những công nghệ AI tiên tiến nhất để tạo ra giải pháp giáo dục độc đáo và hiệu quả.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Chất Lượng</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Cam kết mang đến những sản phẩm chất lượng cao với độ tin cậy và bảo mật tuyệt đối.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team & Achievement */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Đội Ngũ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed mb-4">
                Đội ngũ EduAI Studio bao gồm những chuyên gia hàng đầu trong lĩnh vực AI, giáo dục và công nghệ.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• 20+ kỹ sư AI và phát triển phần mềm</li>
                <li>• 15+ chuyên gia giáo dục và sư phạm</li>
                <li>• 10+ chuyên viên thiết kế UX/UI</li>
                <li>• 5+ năm kinh nghiệm trung bình</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Thành Tựu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed mb-4">
                Những cột mốc quan trọng trong hành trình phát triển của chúng tôi:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• Top 10 Startup giáo dục Việt Nam 2024</li>
                <li>• Giải Nhất Cuộc thi AI Innovation 2023</li>
                <li>• 5,000+ giảng viên tin tưởng sử dụng</li>
                <li>• 200+ trường học hợp tác</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
          <CardContent className="py-12">
            <h3 className="text-3xl font-bold mb-4">Sẵn Sàng Bắt Đầu?</h3>
            <p className="text-xl mb-8 text-blue-100">
              Tham gia cùng hàng nghìn giảng viên đang sử dụng EduAI Studio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Dùng Thử Miễn Phí
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Liên Hệ Tư Vấn
              </Button>
            </div>
          </CardContent>
        </Card>
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

export default About;
