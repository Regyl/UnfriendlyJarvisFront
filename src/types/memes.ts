export interface Meme {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  mimeType?: string;
  uploadedAt: string;
  uploadedBy?: string;
  presignedUri: string;
}

export interface MemeUploadResponse {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  presignedUri: string;
}

