import { useState } from 'react';
import { useUpdateEBookAsset } from '../../hooks/useQueries';
import { ExternalBlob } from '../../backend';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { toast } from 'sonner';
import { Upload, Image, FileText } from 'lucide-react';

interface EBookAssetsUploaderProps {
  ebookId: string;
}

export default function EBookAssetsUploader({ ebookId }: EBookAssetsUploaderProps) {
  const [coverProgress, setCoverProgress] = useState(0);
  const [pdfProgress, setPdfProgress] = useState(0);
  const updateAsset = useUpdateEBookAsset();

  const handleFileUpload = async (file: File, assetType: 'cover' | 'pdf') => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        if (assetType === 'cover') {
          setCoverProgress(percentage);
        } else {
          setPdfProgress(percentage);
        }
      });

      await updateAsset.mutateAsync({ id: ebookId, assetType, blob });
      
      toast.success(`${assetType === 'cover' ? 'Cover image' : 'PDF file'} uploaded successfully`);
      
      if (assetType === 'cover') {
        setCoverProgress(0);
      } else {
        setPdfProgress(0);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload ${assetType}. Please try again.`);
      if (assetType === 'cover') {
        setCoverProgress(0);
      } else {
        setPdfProgress(0);
      }
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      handleFileUpload(file, 'cover');
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }
      handleFileUpload(file, 'pdf');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="cover-upload" className="mb-2 block">
          Cover Image
        </Label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('cover-upload')?.click()}
            disabled={coverProgress > 0}
          >
            <Image className="mr-2 h-4 w-4" />
            Upload Cover
          </Button>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="hidden"
          />
        </div>
        {coverProgress > 0 && (
          <div className="mt-2">
            <Progress value={coverProgress} className="h-2" />
            <p className="mt-1 text-sm text-muted-foreground">{coverProgress}% uploaded</p>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="pdf-upload" className="mb-2 block">
          PDF File
        </Label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('pdf-upload')?.click()}
            disabled={pdfProgress > 0}
          >
            <FileText className="mr-2 h-4 w-4" />
            Upload PDF
          </Button>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="hidden"
          />
        </div>
        {pdfProgress > 0 && (
          <div className="mt-2">
            <Progress value={pdfProgress} className="h-2" />
            <p className="mt-1 text-sm text-muted-foreground">{pdfProgress}% uploaded</p>
          </div>
        )}
      </div>
    </div>
  );
}
