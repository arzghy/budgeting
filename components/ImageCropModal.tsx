"use client";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/cropImage";

interface ImageCropModalProps {
  imageSrc: string | null;
  isOpen: boolean;
  onClose: () => void;
  onCropped: (croppedBlob: Blob) => void;
  loading?: boolean;
}

export default function ImageCropModal({
  imageSrc,
  isOpen,
  onClose,
  onCropped,
  loading = false,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (newCrop: { x: number; y: number }) => {
    setCrop(newCrop);
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const onCropCompleteCallback = useCallback(
    (_croppedArea: any, pixelCrop: any) => {
      setCroppedAreaPixels(pixelCrop);
    },
    []
  );

  const handleApplyCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedBlob) {
        onCropped(croppedBlob);
      }
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-ink bg-paper p-5 sm:p-7 shadow-[0_25px_60px_rgba(74,84,64,0.25)] space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-ink/10 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sage text-base">
              ✂️
            </span>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
                Sesuaikan & Potong Foto (Crop)
              </h3>
              <p className="text-[11px] text-ink/60 font-semibold">
                Geser dan atur zoom untuk memposisikan foto profilmu.
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-ink/20 text-xs font-bold text-ink hover:bg-cream"
          >
            ✕
          </button>
        </div>

        {/* Cropper Box Container */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl border-2 border-ink bg-black/10">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={true}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteCallback}
          />
        </div>

        {/* Zoom Slider Control */}
        <div className="space-y-1.5 bg-cream/50 p-3 rounded-2xl border border-ink/10">
          <div className="flex items-center justify-between text-xs font-bold text-ink/75">
            <span>Perbesar / Zoom:</span>
            <span>{zoom.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-sage-deep border border-ink/20"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            disabled={loading}
            onClick={handleApplyCrop}
            className="btn btn-primary flex-1 text-xs sm:text-sm py-2.5"
          >
            {loading ? (
              <span>Mengunggah ke Cloudinary... ⏳</span>
            ) : (
              <span>✨ Pasang Foto Terpotong →</span>
            )}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="btn btn-ghost text-xs sm:text-sm py-2.5 px-4"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

