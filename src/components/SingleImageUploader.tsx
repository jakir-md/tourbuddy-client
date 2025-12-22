"use client";

import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useEffect, useState } from "react";

interface SingleImageUploaderProps {
  value?: File | string | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export default function SingleImageUploader({
  value,
  onChange,
  error,
}: SingleImageUploaderProps) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  const [
    { files, isDragging, errors: hookErrors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile: hookRemoveFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
    onFilesChange: (newFiles) => {
      if (newFiles.length > 0) {
        onChange(newFiles[0].file as File);
      } else {
        onChange(null);
      }
    },
  });

  const internalPreview = files[0]?.preview || preview;
  const displayPreview = typeof value === "string" ? value : internalPreview;

  const handleRemove = () => {
    if (files[0]) hookRemoveFile(files[0].id);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div
          className="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors hover:bg-accent/50 data-[dragging=true]:bg-accent/50"
          data-dragging={isDragging || undefined}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
        >
          <input {...getInputProps()} className="sr-only" />

          {displayPreview ? (
            <div className="absolute inset-0">
              <img
                alt="Preview"
                className="size-full object-cover"
                src={displayPreview}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
                <ImageUpIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 font-medium text-sm">Drop image here</p>
            </div>
          )}
        </div>

        {displayPreview && (
          <div className="absolute top-4 right-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              type="button"
              className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white"
            >
              <XIcon className="size-4" />
            </button>
          </div>
        )}
      </div>
      {(error || hookErrors.length > 0) && (
        <div className="flex items-center gap-1 text-destructive text-xs">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{error || hookErrors[0]}</span>
        </div>
      )}
    </div>
  );
}
