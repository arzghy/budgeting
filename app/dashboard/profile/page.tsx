"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ImageCropModal from "@/components/ImageCropModal";

function getInitials(name: string) {
  if (!name || !name.trim()) return "W";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [displayName, setDisplayName] = useState("");
  const [motto, setMotto] = useState("Menuju financial freedom bareng Paus 🐋");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // ── Image Cropper State ──
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch profile directly from MongoDB
  async function fetchProfile() {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.displayName) setDisplayName(data.displayName);
        if (data.motto) setMotto(data.motto);
        if (data.imageUrl) setImageUrl(data.imageUrl);

        // Sync to localStorage
        localStorage.setItem(
          "whale_user_profile",
          JSON.stringify({
            displayName: data.displayName,
            motto: data.motto,
            imageUrl: data.imageUrl,
          })
        );
      }
    } catch (err) {
      console.error("Fetch profile error:", err);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  // Save Text Profile (Display Name & Motto)
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName.trim() || session?.user?.name || "Teman Paus",
          motto: motto.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setStatusMessage({ type: "success", text: "Profil berhasil disimpan ke database MongoDB!" });
        localStorage.setItem(
          "whale_user_profile",
          JSON.stringify({
            displayName: data.displayName,
            motto: data.motto,
            imageUrl: imageUrl || data.imageUrl,
          })
        );
      } else {
        setStatusMessage({ type: "error", text: "Gagal menyimpan profil." });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: "error", text: "Terjadi kesalahan jaringan." });
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  // Step 1: When user selects a file, open crop modal
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatusMessage({ type: "error", text: "Mohon pilih file gambar yang valid (JPG/PNG/WEBP)." });
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setTempImageSrc(reader.result?.toString() || null);
      setCropModalOpen(true);
    });
    reader.readAsDataURL(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Step 2: Upload Cropped Blob to Cloudinary -> Save URL to MongoDB
  const handleCroppedUpload = async (croppedBlob: Blob) => {
    setUploading(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("file", croppedBlob, "profile.jpg");

    try {
      const res = await fetch("/api/profile/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.imageUrl) {
        setImageUrl(data.imageUrl);
        setCropModalOpen(false);
        setTempImageSrc(null);
        setStatusMessage({
          type: "success",
          text: "Foto profil yang dipotong berhasil diunggah ke Cloudinary dan disimpan ke MongoDB!",
        });
        localStorage.setItem(
          "whale_user_profile",
          JSON.stringify({
            displayName,
            motto,
            imageUrl: data.imageUrl,
          })
        );
      } else {
        setStatusMessage({ type: "error", text: data.error || "Gagal mengunggah foto profil." });
      }
    } catch (err) {
      console.error("Upload error:", err);
      setStatusMessage({ type: "error", text: "Terjadi kesalahan saat mengunggah foto." });
    } finally {
      setUploading(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  // Delete Custom Photo (Remove from Cloudinary + Clear MongoDB field)
  const handleDeletePhoto = async () => {
    if (!confirm("Hapus foto profil dan gunakan inisial huruf kapital nama tampilan?")) return;
    setUploading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/profile/photo", {
        method: "DELETE",
      });

      if (res.ok) {
        setImageUrl("");
        setStatusMessage({
          type: "success",
          text: "Foto profil berhasil dihapus. Inisial huruf kapital nama tampilan kini aktif!",
        });
        localStorage.setItem(
          "whale_user_profile",
          JSON.stringify({
            displayName,
            motto,
            imageUrl: "",
          })
        );
      } else {
        setStatusMessage({ type: "error", text: "Gagal menghapus foto profil." });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: "error", text: "Terjadi kesalahan saat menghapus foto." });
    } finally {
      setUploading(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const initialLetters = getInitials(displayName || session?.user?.name || "Faza Izzaturrafi");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ═══ HEADER ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-bold text-ink shadow-sm">
            <span>👤</span>
            <span>Pengaturan Akun & Identitas</span>
          </div>
          <h1 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-[#242f1b]">
            Kelola Profil Pengguna
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-ink/70">
            Pasang foto profil dengan fitur crop, atau gunakan inisial huruf kapital nama tampilan.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="btn btn-ghost text-xs self-start sm:self-center"
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      {/* ═══ STATUS TOAST BANNER ═══ */}
      {statusMessage && (
        <div
          className={`flex items-center gap-2.5 rounded-2xl border-2 p-4 text-xs sm:text-sm font-bold animate-in fade-in zoom-in-95 duration-200 ${
            statusMessage.type === "success"
              ? "border-sage/50 bg-sage/20 text-[#242f1b]"
              : "border-coral/50 bg-coral/20 text-[#c44f45]"
          }`}
        >
          <span>{statusMessage.type === "success" ? "✨" : "⚠️"}</span>
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* ═══ CARD 1: PASANG (CROP), EDIT & HAPUS FOTO PROFIL (CLOUDINARY) ═══ */}
      <div className="card bg-paper p-5 sm:p-7 border-2 border-ink shadow-sticker space-y-6">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sage font-bold text-xs">
              📸
            </span>
            <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
              Foto Profil
            </h2>
          </div>
          <span className="rounded-full bg-cream border border-ink/10 px-3 py-0.5 text-[10px] font-bold text-ink/70">
            {imageUrl ? "Cloudinary CDN Active" : "Inisial Huruf Kapital"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar Display Frame (Photo or Uppercase Initial) */}
          <div className="relative group">
            <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-3xl border-3 border-ink bg-gradient-to-br from-cream via-blush to-sage overflow-hidden flex items-center justify-center shadow-[0_6px_0_rgba(74,84,64,0.2)]">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Foto Profil"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-sage via-[#c2d772] to-pistachio flex items-center justify-center font-display font-black text-ink select-none text-4xl sm:text-5xl">
                  {initialLetters}
                </div>
              )}
            </div>

            {uploading && (
              <div className="absolute inset-0 rounded-3xl bg-ink/60 flex flex-col items-center justify-center text-white text-xs font-bold gap-1 backdrop-blur-xs">
                <span className="animate-spin text-lg">⏳</span>
                <span>Mengunggah...</span>
              </div>
            )}
          </div>

          {/* Action Buttons for Photo */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div>
              <h3 className="font-display text-base font-bold text-[#242f1b]">
                {imageUrl ? "Foto Profil Kustom Aktif" : `Inisial Nama: ${initialLetters}`}
              </h3>
              <p className="text-xs text-ink/70 mt-1 max-w-md">
                {imageUrl
                  ? "Foto tersimpan rapi di Cloudinary CDN dan URL tercatat di MongoDB. Anda dapat memotong ulang atau mengganti foto kapan saja."
                  : "Belum ada foto profil kustom yang diunggah. Tampilan avatar otomatis menggunakan huruf kapital dari nama tampilan Anda."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="profile-photo-input"
              />

              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <span>✂️</span>
                <span>{imageUrl ? "Crop & Ganti Foto" : "Crop & Pasang Foto"}</span>
              </button>

              {imageUrl && (
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleDeletePhoto}
                  className="btn btn-blush text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <span>🗑️</span>
                  <span>Hapus Foto (Gunakan Inisial)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CARD 2: EDIT NAMA TAMPILAN & MOTTO ═══ */}
      <form onSubmit={handleSaveProfile} className="card bg-paper p-5 sm:p-7 border-2 border-ink shadow-sticker space-y-5">
        <div className="flex items-center gap-2 border-b border-ink/10 pb-3">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-sage font-bold text-xs">
            ✨
          </span>
          <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
            Identitas Pengguna
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
          {/* Nama Panggilan */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Nama Tampilan / Panggilan *
            </label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Contoh: Faza Izzaturrafi"
              required
              className="field"
            />
            <span className="text-[11px] text-ink/60 mt-1 block">
              Inisial kapital otomatis: <span className="font-bold text-ink">{getInitials(displayName || "Faza")}</span>
            </span>
          </div>

          {/* Email Terdaftar */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Email Terdaftar
            </label>
            <input
              value={session?.user?.email || "email@sanctuary.com"}
              disabled
              className="field bg-ink/5 cursor-not-allowed opacity-75"
            />
          </div>

          {/* Motto Sanctuary */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Motto Finansial Sanctuary
            </label>
            <input
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              placeholder="Contoh: Menuju financial freedom bareng Paus 🐋"
              className="field"
            />
          </div>
        </div>

        <div className="pt-3 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary text-xs sm:text-sm px-6 py-2.5"
          >
            <span>{loading ? "Menyimpan..." : "💾 Simpan Perubahan Identitas"}</span>
            <span>→</span>
          </button>
        </div>
      </form>

      {/* ═══ CARD 3: KEAMANAN & SESI ═══ */}
      <div className="card bg-paper p-5 sm:p-7 border-2 border-ink/15 space-y-4">
        <div className="flex items-center gap-2 border-b border-ink/10 pb-3">
          <span className="grid h-7 w-7 place-items-center rounded-xl bg-peach font-bold text-xs">
            🔒
          </span>
          <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
            Keamanan Akun
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-display text-sm font-bold text-ink">Ganti Kata Sandi</div>
            <p className="text-xs text-ink/60 mt-0.5">Akses halaman pemulihan sandi jika ingin mengganti password akunmu.</p>
          </div>
          <Link href="/reset" className="btn btn-ghost text-xs shrink-0">
            Ganti Kata Sandi ↗
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-ink/10">
          <div>
            <div className="font-display text-sm font-bold text-[#c44f45]">Keluar dari Akun</div>
            <p className="text-xs text-ink/60 mt-0.5">Akhiri sesi login di perangkat ini dengan aman.</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="btn btn-blush text-xs shrink-0"
          >
            Keluar Sekarang 🚪
          </button>
        </div>
      </div>

      {/* ═══ IMAGE CROP MODAL ═══ */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={tempImageSrc}
        onClose={() => {
          setCropModalOpen(false);
          setTempImageSrc(null);
        }}
        onCropped={handleCroppedUpload}
        loading={uploading}
      />
    </div>
  );
}
