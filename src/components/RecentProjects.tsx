
import { useState } from 'react';
import { Clock, Play, Download, MoreVertical, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface RecentProjectsProps {
  onProjectSelected?: (project: any) => void;
}

const RecentProjects = ({ onProjectSelected }: RecentProjectsProps) => {
  const [recentProjects] = useState([
    {
      id: 1,
      title: "Lịch sử Việt Nam - Chương 3",
      createdAt: "2024-01-15",
      duration: 45,
      status: "completed",
      thumbnail: "/api/placeholder/200/120",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Marketing Digital Cơ Bản",
      createdAt: "2024-01-14",
      duration: 32,
      status: "completed",
      thumbnail: "/api/placeholder/200/120",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Toán Học Cao Cấp",
      createdAt: "2024-01-13",
      duration: 58,
      status: "processing",
      thumbnail: "/api/placeholder/200/120",
      downloadUrl: null
    },
    {
      id: 4,
      title: "Tiếng Anh Giao Tiếp",
      createdAt: "2024-01-12",
      duration: 41,
      status: "completed",
      thumbnail: "/api/placeholder/200/120",
      downloadUrl: "#"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 text-xs">Hoàn thành</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Đang xử lý</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">Không xác định</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleDownload = (project: any) => {
    if (project.downloadUrl) {
      // Simulate download
      console.log('Downloading:', project.title);
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <span>Dự Án Gần Đây</span>
        </CardTitle>
        <CardDescription>
          Các video bài giảng bạn đã tạo gần đây
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div key={project.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              {/* Thumbnail */}
              <div className="w-20 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>

              {/* Project Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-slate-800 truncate">{project.title}</h3>
                  {getStatusBadge(project.status)}
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{project.duration} phút</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {project.status === 'completed' && (
                  <>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => console.log('Playing:', project.title)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownload(project)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onProjectSelected?.(project)}>
                      Mở dự án
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => console.log('View all projects')}>
            Xem tất cả dự án
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentProjects;
