"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCamera,
  faCircleCheck,
  faFloppyDisk,
  faLock,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
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

        if (data.imageUrl) setImageUrl(data.imageUrl);

        // Sync to localStorage
        localStorage.setItem(
          "whale_user_profile",
          JSON.stringify({
             displayName: data.displayName,
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
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setStatusMessage({ type: "success", text: "Profil berhasil disimpan ke database MongoDB!" });
        localStorage.setItem(
          "whale_user_profile",
          JSON.stringify({
             displayName: data.displayName,
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
    if (!confirm("Hapus foto profil?")) return;
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
          text: "Foto profil berhasil dihapus.",
        });
        localStorage.setItem(
          "whale_user_profile",
          JSON.stringify({
             displayName,
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
    <div className="profile-page mx-auto max-w-4xl space-y-10 sm:space-y-12">
      {/* ═══ HEADER ═══ */}
<header className="profile-intro flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
         <div>
           <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sage-deep">
             <FontAwesomeIcon icon={faUser} />
             <span>Pengaturan akun</span>
           </div>
           <h1 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.045em] text-ink sm:text-4xl">
             Kelola profil pengguna
           </h1>
           <p className="mt-3 max-w-[42rem] text-xs font-semibold leading-6 text-ink/70 sm:text-sm">
             Perbarui foto dan nama tampilan yang digunakan di MiBudge.
           </p>
         </div>
       </header>

        {/* ═══ STATUS TOAST BANNER ═══ */}

      {statusMessage && (
        <div
className={`profile-status flex items-center gap-3 rounded-xl border p-4 text-xs font-bold animate-in fade-in zoom-in-95 duration-200 sm:text-sm ${
             statusMessage.type === "success"
               ? "profile-status-success"
               : "profile-status-error"
           }`}
        >
          <FontAwesomeIcon icon={statusMessage.type === "success" ? faCircleCheck : faLock} />
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* ═══ CARD 1: PASANG (CROP), EDIT & HAPUS FOTO PROFIL (CLOUDINARY) ═══ */}
      <section className="profile-panel profile-photo-panel bg-[#f6ffd3] p-6 sm:p-9">
<div className="profile-panel-heading flex items-center justify-between border-b border-ink/10 pb-5">
           <div className="flex items-center gap-3">
             <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f6c5c1] font-bold text-xs text-ink">
               <FontAwesomeIcon icon={faCamera} />
             </span>
            <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
              Foto Profil
            </h2>
          </div>

        </div>

        <div className="profile-photo-body flex flex-col items-center gap-7 sm:flex-row sm:items-center">
          {/* Avatar Display Frame (Photo or Uppercase Initial) */}
          <div className="relative group">
            <div className="profile-avatar h-28 w-28 overflow-hidden rounded-2xl border border-ink/15 bg-[#f6c5c1] sm:h-32 sm:w-32">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Foto Profil"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#c2d772] font-display text-4xl font-black text-ink select-none sm:text-5xl">
                  {initialLetters}
                </div>
              )}
            </div>

            {uploading && (
              <div className="absolute inset-0 rounded-3xl bg-ink/60 flex flex-col items-center justify-center text-white text-xs font-bold gap-1 backdrop-blur-xs">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                <span>Mengunggah...</span>
              </div>
            )}
          </div>

          {/* Action Buttons for Photo */}
          <div className="profile-photo-copy min-w-0 flex-1 space-y-4 text-center sm:text-left">
            <div>
              <h3 className="font-display text-base font-bold tracking-[-0.02em] text-ink">
                {imageUrl ? "Foto profil aktif" : "Foto profil belum dipasang"}
              </h3>
              <p className="text-xs text-ink/70 mt-1 max-w-md">
                {imageUrl
                  ? "Foto tersimpan di Cloudinary dan dapat dipotong ulang atau diganti kapan saja."
                  : "Belum ada foto profil yang diunggah. Kamu bisa memasangnya kapan saja."}
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
                className="profile-action btn btn-primary min-h-11 px-4 text-xs flex items-center gap-1.5"
              >
<FontAwesomeIcon icon={faCamera} />
                 <span>{imageUrl ? "Crop & ganti foto" : "Crop & pasang foto"}</span>
              </button>

              {imageUrl && (
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleDeletePhoto}
                  className="btn btn-blush text-xs py-2 px-4 flex items-center gap-1.5"
                >
<FontAwesomeIcon icon={faTrashCan} />
                   <span>Hapus foto</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CARD 2: EDIT NAMA TAMPILAN ═══ */}
<form onSubmit={handleSaveProfile} className="profile-panel bg-[#fffef9] p-6 sm:p-9 space-y-7">
         <div className="flex items-center gap-3 border-b border-ink/10 pb-5">
           <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#c2d772] font-bold text-xs text-ink">
             <FontAwesomeIcon icon={faUser} />
           </span>
          <h2 className="font-display text-base sm:text-lg font-bold text-[#242f1b]">
            Identitas Pengguna
          </h2>
        </div>

        <div className="profile-fields grid max-w-3xl grid-cols-1 gap-5 pt-2 sm:grid-cols-2">
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

          </div>

          {/* Email Terdaftar */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-1">
              Email Terdaftar
            </label>
            <input
              value={session?.user?.email || "Email belum tersedia"}
              disabled
              className="field bg-ink/5 cursor-not-allowed opacity-75"
            />
          </div>

        </div>

<div className="border-t border-ink/10 pt-5 flex items-center gap-3">
           <button
             type="submit"
             disabled={loading}
             className="btn btn-primary min-h-11 w-full px-5 text-xs sm:w-auto sm:text-sm"
           >
             <FontAwesomeIcon icon={loading ? faCircleCheck : faFloppyDisk} className={loading ? "animate-pulse" : ""} />
             <span>{loading ? "Menyimpan..." : "Simpan perubahan"}</span>
           </button>
        </div>
      </form>

      {/* ═══ CARD 3: KEAMANAN & SESI ═══ */}
<section className="profile-panel bg-[#f6dbe2] p-6 sm:p-9 space-y-6">
         <div className="flex items-center gap-3 border-b border-ink/10 pb-5">
           <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f6c5c1] font-bold text-xs text-ink">
             <FontAwesomeIcon icon={faLock} />
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
<Link href="/reset" className="btn btn-ghost min-h-11 shrink-0 px-4 text-xs">
             Ganti kata sandi
           </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-ink/10">
          <div>
            <div className="font-display text-sm font-bold text-[#c44f45]">Keluar dari Akun</div>
            <p className="text-xs text-ink/60 mt-0.5">Akhiri sesi login di perangkat ini dengan aman.</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
className="btn btn-blush min-h-11 shrink-0 px-4 text-xs"
           >
             <FontAwesomeIcon icon={faArrowRightFromBracket} />
             Keluar sekarang
          </button>
        </div>
      </section>

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
