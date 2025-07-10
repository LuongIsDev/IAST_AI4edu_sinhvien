import { useState, useCallback } from 'react';
import { Upload, FileText, File, Image, Loader2, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import * as mammoth from 'mammoth';

interface ContentUploaderProps {
  onProjectCreated: (project: any) => void;
}

const ContentUploader = ({ onProjectCreated }: ContentUploaderProps) => {
  const [uploadMode, setUploadMode] = useState<'file' | 'text'>('file');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [textContent, setTextContent] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  const GEMINI_API_KEY = 'AIzaSyChbEKfk-thr9DkdiEjwWkFedpAP1inZXA';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  const showToast = (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
    console.log(`${title}: ${description}`);
    setDebugInfo(`${title}: ${description}`);
  };

  // Enhanced file validation
  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return { isValid: false, error: 'File quá lớn (tối đa 50MB)' };
    }

    const allowedTypes = ['pdf', 'docx', 'doc', 'txt', 'rtf'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      return { isValid: false, error: 'Định dạng file không được hỗ trợ' };
    }

    return { isValid: true };
  };

  // Extract text from PDF using PDF.js (via CDN)
  const extractTextFromPDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = async function() {
        try {
          // Check if PDF.js is already loaded
          if (!(window as any).pdfjsLib) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = async () => {
              const pdfjsLib = (window as any).pdfjsLib;
              pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
              
              const typedarray = new Uint8Array(fileReader.result as ArrayBuffer);
              const pdf = await pdfjsLib.getDocument(typedarray).promise;
              let fullText = '';
              
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + '\n';
              }
              
              resolve(fullText);
            };
            script.onerror = () => reject(new Error('Failed to load PDF.js'));
            document.head.appendChild(script);
          } else {
            // PDF.js already loaded
            const pdfjsLib = (window as any).pdfjsLib;
            const typedarray = new Uint8Array(fileReader.result as ArrayBuffer);
            const pdf = await pdfjsLib.getDocument(typedarray).promise;
            let fullText = '';
            
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item: any) => item.str).join(' ');
              fullText += pageText + '\n';
            }
            
            resolve(fullText);
          }
        } catch (error) {
          reject(error);
        }
      };
      fileReader.onerror = () => reject(new Error('Không thể đọc file PDF'));
      fileReader.readAsArrayBuffer(file);
    });
  };

  // Enhanced Word document processing
  const extractTextFromWord = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          
          // Validate the file is not empty
          if (!arrayBuffer || arrayBuffer.byteLength === 0) {
            throw new Error('File rỗng hoặc không thể đọc được');
          }

          // Log file info for debugging
          console.log('File info:', {
            name: file.name,
            size: file.size,
            type: file.type,
            arrayBufferSize: arrayBuffer.byteLength
          });

          // Check for file signature (magic bytes)
          const uint8Array = new Uint8Array(arrayBuffer);
          const signature = Array.from(uint8Array.slice(0, 8))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

          console.log('File signature:', signature);

          // DOCX files should start with PK (ZIP signature: 50 4B)
          if (file.name.toLowerCase().endsWith('.docx')) {
            if (!signature.startsWith('504b')) {
              throw new Error('File không phải là DOCX hợp lệ (thiếu ZIP signature)');
            }
          }

          // Try to extract text using mammoth
          const options = {
            convertImage: (mammoth as any).images.ignore(),
            includeDefaultStyleMap: true,
            includeEmbeddedStyleMap: true
          };

          const result = await mammoth.extractRawText({ arrayBuffer });


          if (!result.value || result.value.trim().length === 0) {
            // Try alternative extraction method
            const htmlResult = await mammoth.convertToHtml({ arrayBuffer }, options);
            if (htmlResult.value) {
              // Extract text from HTML
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = htmlResult.value;
              const extractedText = tempDiv.textContent || tempDiv.innerText || '';
              resolve(extractedText);
            } else {
              throw new Error('Không thể trích xuất text từ file Word');
            }
          } else {
            resolve(result.value);
          }

          // Log any messages from mammoth
          if (result.messages.length > 0) {
            console.log('Mammoth messages:', result.messages);
          }

        } catch (error) {
          console.error('Error extracting from Word:', error);
          
          // Try fallback method for DOC files
          if (file.name.toLowerCase().endsWith('.doc')) {
            reject(new Error('File .DOC cũ không được hỗ trợ. Vui lòng chuyển đổi sang .DOCX'));
          } else {
            reject(new Error(`Lỗi xử lý file Word: ${error instanceof Error ? error.message : 'Unknown error'}`));
          }
        }
      };
      
      reader.onerror = () => reject(new Error('Lỗi đọc file'));
      reader.readAsArrayBuffer(file);
    });
  };

  // Extract text from plain text files with encoding detection
  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          if (!text || text.trim().length === 0) {
            reject(new Error('File văn bản rỗng'));
            return;
          }
          resolve(text);
        } catch (error) {
          reject(new Error('Không thể đọc file văn bản'));
        }
      };
      reader.onerror = () => reject(new Error('Lỗi đọc file'));
      
      // Try UTF-8 first, then fallback to other encodings
      reader.readAsText(file, 'utf-8');
    });
  };

  // Call Gemini API to generate educational content
  const generateEducationalContent = async (extractedText: string, projectTitle: string) => {
    const prompt = `
Bạn là một giáo viên chuyên nghiệp với nhiều năm kinh nghiệm giảng dạy. Hãy tạo một bài giảng hoàn chỉnh từ nội dung sau với 25-30 slide, định dạng như một file văn bản thuần túy (.txt) được trình bày khoa học và đẹp mắt:

NỘI DUNG NGUỒN:
${extractedText}

TIÊU ĐỀ BÀI GIẢNG: ${projectTitle}

YÊU CẦU:
1. Tạo 25-30 slide giảng dạy chuyên nghiệp.
2. Mỗi slide phải có nội dung khoa học, logic, dễ hiểu cho sinh viên.
3. Bao gồm slide chào mừng, giới thiệu, nội dung chính, và kết thúc.
4. Thời gian trình bày mỗi slide từ 2-4 phút.
5. Sử dụng toàn bộ nội dung từ tài liệu nguồn, không bỏ sót thông tin quan trọng.
6. Nội dung mỗi slide phải được định dạng như một file .txt được trình bày đẹp, với xuống dòng rõ ràng và thụt lề chính xác (sử dụng 2 dấu cách cho thụt lề, tương tự định dạng code).
7. Các phần như định nghĩa, công thức, ví dụ, hoặc lưu ý phải được tách biệt bằng xuống dòng và đánh dấu bằng "* " (dấu sao và một khoảng trắng) ở đầu mỗi phần. Công thức toán học phải được viết rõ ràng, giữ nguyên ký hiệu (như 𝑍(0), 𝑊𝑒), và đặt trên dòng riêng với thụt lề.
8. Không bao gồm keyPoints hay các phần thừa thãi, chỉ tập trung vào nội dung chính.
9. Trả về nội dung dưới dạng văn bản thuần túy (plain text), không sử dụng JSON.
10. Định dạng mỗi slide như sau:
   - Dòng đầu: "Slide <số thứ tự>: <Tiêu đề slide>"
   - Các dòng tiếp theo: Nội dung chi tiết (tối thiểu 200 từ), với các phần như định nghĩa, công thức, ví dụ được tách biệt bằng xuống dòng, đánh dấu bằng "* ", và thụt lề 2 dấu cách cho các công thức hoặc chi tiết phụ.
   - Dòng cuối: "Thời gian: <số giây> giây"
   - Ngăn cách giữa các slide bằng dòng: "----------"

Ví dụ định dạng slide:
Slide 1: Chào mừng
* Giới thiệu: Chào mừng đến với bài giảng về Vision Transformer.
* Mục tiêu: Hiểu cách Vision Transformer xử lý ảnh đầu vào.
* Nội dung chính: Tổng quan về mô hình và ứng dụng.
Thời gian: 120 giây
----------
Slide 2: Nhúng Patch
* Định nghĩa: Ảnh đầu vào được chia thành 𝑁 = 𝐻𝑊 / 𝑃² các patch có kích thước cố định 𝑃 × 𝑃 pixel.
* Công thức:
  𝑧(0)𝑖 = 𝑥𝑖 𝑊𝑒 + 𝑏𝑒, 𝑖 = 1, ..., 𝑁
  Trong đó 𝑊𝑒 ∈ R^(3𝑃² × 𝑑) và 𝑏𝑒 ∈ R^𝑑 là các tham số có thể học được.
* Ví dụ: Với ảnh 224x224 và 𝑃=16, số patch là 𝑁=196.
Thời gian: 180 giây
----------

Hãy tạo bài giảng với định dạng văn bản thuần túy, giống như một file .txt được trình bày khoa học hoặc code được thụt lề đúng chuẩn, đảm bảo xuống dòng và thụt lề rõ ràng để dễ dàng chuyển lên slide.
`;

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 8192,
            temperature: 0.7,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      return generatedText;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!projectTitle.trim()) {
      showToast("Lỗi", "Vui lòng nhập tên dự án trước khi tải file", "destructive");
      return;
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      showToast("Lỗi", validation.error!, "destructive");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setDebugInfo('');

    try {
      // Step 1: Extract text from file
      setProcessingMessage("Đang tải và phân tích file...");
      setProgress(10);
      
      let extractedText = '';
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      setProcessingMessage(`Đang xử lý file ${fileExtension?.toUpperCase()}...`);
      setProgress(20);
      
      if (fileExtension === 'pdf') {
        extractedText = await extractTextFromPDF(file);
      } else if (fileExtension === 'docx') {
        extractedText = await extractTextFromWord(file);
      } else if (fileExtension === 'doc') {
        throw new Error('File .DOC cũ không được hỗ trợ. Vui lòng chuyển đổi sang .DOCX');
      } else if (fileExtension === 'txt' || fileExtension === 'rtf') {
        extractedText = await extractTextFromFile(file);
      } else {
        throw new Error('Định dạng file không được hỗ trợ');
      }

      if (!extractedText || extractedText.trim().length < 50) {
        throw new Error('Không thể trích xuất đủ nội dung từ file hoặc file quá ngắn');
      }

      setProgress(40);
      setProcessingMessage("Đã trích xuất nội dung thành công. Đang gửi đến AI...");
      console.log('Extracted text length:', extractedText.length);

      // Step 2: Generate educational content using Gemini
      setProgress(50);
      setProcessingMessage("AI đang phân tích và tạo bài giảng...");
      
      const aiGeneratedContent = await generateEducationalContent(extractedText, projectTitle);
      
      setProgress(80);
      setProcessingMessage("Đang hoàn thiện bài giảng...");

      // Step 3: Create project
      const project = {
      id: Date.now(),
      title: projectTitle,
      fileName: file.name,
      fileType: file.type,
      content: {
        slides: aiGeneratedContent.split('----------').filter((s: string) => s.trim()).map((slideText: string, index: number) => {
          const lines = slideText.trim().split('\n');
          const title = lines[0].replace(/^Slide \d+: /, '');
          const durationMatch = lines[lines.length - 1].match(/Thời gian: (\d+) giây/);
          const duration = durationMatch ? parseInt(durationMatch[1]) : 180;
          const content = lines.slice(1, -1).join('\n');
          return { id: index + 1, title, content, duration };
        }),
        totalDuration: aiGeneratedContent.split('----------').filter((s: string) => s.trim()).reduce((sum: number, slideText: string) => {
          const durationMatch = slideText.match(/Thời gian: (\d+) giây/);
          return sum + (durationMatch ? parseInt(durationMatch[1]) : 180);
        }, 0),
        script: aiGeneratedContent.split('----------').filter((s: string) => s.trim()).map((slideText: string) => {
          const lines = slideText.trim().split('\n');
          const title = lines[0].replace(/^Slide \d+: /, '');
          const content = lines.slice(1, -1).join(' ');
          return `${title}. ${content}.`;
        }).join(' '),
        summary: 'Tóm tắt bài giảng được tạo từ nội dung nguồn.',
        language: "vi",
        estimatedViewTime: `${Math.round(aiGeneratedContent.split('----------').filter((s: string) => s.trim()).reduce((sum: number, slideText: string) => {
          const durationMatch = slideText.match(/Thời gian: (\d+) giây/);
          return sum + (durationMatch ? parseInt(durationMatch[1]) : 180);
        }, 0) / 60)} phút`,
        totalSlides: aiGeneratedContent.split('----------').filter((s: string) => s.trim()).length
      },
      createdAt: new Date().toISOString(),
      status: 'analyzed',
      source: 'file'
    };

      setProgress(100);
      setProcessingMessage("Hoàn thành!");
      
      onProjectCreated(project);
      
      showToast("Thành công!", `Đã tạo bài giảng với ${aiGeneratedContent.totalSlides} slide từ ${file.name}`);

    } catch (error) {
      console.error('Error processing file:', error);
      const errorMessage = error instanceof Error ? error.message : 'Không thể xử lý file';
      showToast("Lỗi", `Có lỗi xảy ra: ${errorMessage}`, "destructive");
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setProcessingMessage('');
    }
  };

  const handleTextSubmit = async () => {
    if (!projectTitle.trim() || !textContent.trim()) {
      showToast("Lỗi", "Vui lòng nhập đầy đủ tên dự án và nội dung", "destructive");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      setProcessingMessage("Đang phân tích nội dung văn bản...");
      setProgress(20);
      
      // Generate educational content using Gemini
      setProcessingMessage("AI đang tạo bài giảng chuyên nghiệp...");
      setProgress(40);
      
      const aiGeneratedContent = await generateEducationalContent(textContent, projectTitle);
      
      setProgress(80);
      setProcessingMessage("Đang hoàn thiện bài giảng...");

      const project = {
        id: Date.now(),
        title: projectTitle,
        fileName: `${projectTitle}.txt`,
        fileType: 'text/plain',
        content: {
          slides: aiGeneratedContent.slides,
          totalDuration: aiGeneratedContent.slides.reduce((sum: number, slide: any) => sum + slide.duration, 0),
          script: aiGeneratedContent.slides.map((slide: any) => 
            `${slide.title}. ${slide.content} ${slide.keyPoints.join('. ')}.`
          ).join(' '),
          summary: aiGeneratedContent.summary,
          language: "vi",
          estimatedViewTime: aiGeneratedContent.estimatedDuration,
          totalSlides: aiGeneratedContent.totalSlides
        },
        createdAt: new Date().toISOString(),
        status: 'analyzed',
        source: 'text'
      };

      setProgress(100);
      setProcessingMessage("Hoàn thành!");
      
      onProjectCreated(project);
      
      showToast("Thành công!", `Đã tạo bài giảng với ${aiGeneratedContent.totalSlides} slide từ nội dung văn bản`);

    } catch (error) {
      console.error('Error processing text:', error);
      const errorMessage = error instanceof Error ? error.message : 'Không thể xử lý nội dung';
      showToast("Lỗi", `Có lỗi xảy ra: ${errorMessage}`, "destructive");
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setProcessingMessage('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Debug Information */}
      {debugInfo && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>{debugInfo}</AlertDescription>
        </Alert>
      )}

      {/* Project Title Input */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Thông tin dự án
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project-title">Tên dự án</Label>
              <Input
                id="project-title"
                placeholder="Nhập tên cho bài giảng của bạn..."
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Mode Selection */}
      <div className="flex gap-4">
        <Button
          variant={uploadMode === 'file' ? 'default' : 'outline'}
          onClick={() => setUploadMode('file')}
          className={uploadMode === 'file' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
        >
          <Upload className="h-4 w-4 mr-2" />
          Tải file lên
        </Button>
        <Button
          variant={uploadMode === 'text' ? 'default' : 'outline'}
          onClick={() => setUploadMode('text')}
          className={uploadMode === 'text' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
        >
          <FileText className="h-4 w-4 mr-2" />
          Nhập văn bản
        </Button>
      </div>

      {/* File Upload */}
      {uploadMode === 'file' && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Tải lên nội dung</CardTitle>
            <CardDescription>
              Hỗ trợ PDF, DOCX, TXT. Lưu ý: File .DOC cũ không được hỗ trợ, vui lòng chuyển đổi sang .DOCX
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Kéo thả file vào đây hoặc click để chọn
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    PDF, DOCX, TXT (tối đa 50MB)
                  </p>
                </div>
                <Input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Chọn file</span>
                  </Button>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Text Input */}
      {uploadMode === 'text' && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Nhập nội dung văn bản</CardTitle>
            <CardDescription>
              Nhập hoặc dán nội dung bài giảng để AI tạo 25-30 slide chuyên nghiệp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Nhập nội dung bài giảng của bạn tại đây..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={10}
                className="resize-none"
              />
              <Button
                onClick={handleTextSubmit}
                disabled={isProcessing || !textContent.trim() || !projectTitle.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Đang tạo bài giảng...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Tạo bài giảng với AI
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Progress */}
      {isProcessing && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Đang tạo bài giảng chuyên nghiệp...</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                {processingMessage}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Support Information */}
      <Card className="border-0 shadow-sm bg-blue-50/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-900">Hỗ trợ định dạng file:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>PDF:</strong> Tài liệu PDF có thể trích xuất text</li>
                <li>• <strong>DOCX:</strong> Microsoft Word 2007+ (.docx)</li>
                <li>• <strong>TXT:</strong> File văn bản thuần túy</li>
              </ul>
              <p className="text-xs text-blue-700 mt-2">
                <strong>Lưu ý:</strong> File .DOC cũ (Word 97-2003) không được hỗ trợ. Vui lòng chuyển đổi sang .DOCX bằng Microsoft Word.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentUploader;