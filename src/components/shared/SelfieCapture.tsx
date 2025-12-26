"use client";

import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCcw, XCircle } from "lucide-react";

interface SelfieCaptureProps {
  onCapture: (file: File) => void;
  error?: string;
}

export default function SelfieCapture({ onCapture, error }: SelfieCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Convert Base64 (Webcam output) to File Object
  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
      const file = dataURLtoFile(imageSrc, "live-selfie.jpg");
      onCapture(file); // Send to Form
      setIsCameraOpen(false);
    }
  }, [webcamRef, onCapture]);

  const retake = () => {
    setImageSrc(null);
    setIsCameraOpen(true);
  };

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 min-h-[300px] flex flex-col items-center justify-center">
        
        {/* State 1: Show Captured Image */}
        {imageSrc ? (
          <img src={imageSrc} alt="Selfie" className="w-full h-full object-cover" />
        ) : isCameraOpen ? (
          // State 2: Live Camera
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{ facingMode: "user" }}
          />
        ) : (
          // State 3: Initial Placeholder
          <div className="text-center p-6">
            <div className="bg-white p-4 rounded-full inline-block mb-3 shadow-sm">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <p className="font-medium text-slate-700">Take a Live Selfie</p>
            <p className="text-xs text-slate-500 mb-4">Ensure your face is clearly visible</p>
            <Button type="button" onClick={() => setIsCameraOpen(true)}>
              Open Camera
            </Button>
          </div>
        )}

        {/* Camera Controls */}
        {isCameraOpen && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
             <Button type="button" variant="destructive" size="icon" onClick={() => setIsCameraOpen(false)}>
               <XCircle className="w-6 h-6" />
             </Button>
             <Button type="button" onClick={capture} className="bg-white text-black hover:bg-slate-100">
               <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white mr-2" />
               Capture
             </Button>
          </div>
        )}
      </div>

      {imageSrc && (
        <Button type="button" variant="outline" onClick={retake} className="w-full">
          <RefreshCcw className="w-4 h-4 mr-2" /> Retake Photo
        </Button>
      )}

      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
}