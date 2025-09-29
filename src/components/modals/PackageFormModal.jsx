import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const PackageFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({ name: "", description: "", price: "", features: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // isi form otomatis kalau ada initialData (edit mode)
  useEffect(() => {
  if (initialData) {
    let features = initialData.features || [];
    if (typeof features === "string") {
      try {
        features = JSON.parse(features);
      } catch {
        features = [];
      }
    }

    setForm({
      name: initialData.name || "",
      description: initialData.description || "",
      price: initialData.price || "",
      features: features.join(", "),
    });

    setPreview(initialData.image || null);
    setImage(null);
  } else {
    setForm({ name: "", description: "", price: "", features: "" });
    setImage(null);
    setPreview(null);
  }
}, [initialData]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "features") {
        // Alternatif: Kirim sebagai array jika backend mendukungnya
        const featuresArray = value.split(",").map(f => f.trim()).filter(f => f);
        featuresArray.forEach(feature => {
          formData.append('features[]', feature);
        });
      } else {
        formData.append(key, value);
      }
    });

    if (image) {
      formData.append("image", image);
    }

    if (initialData) {
      onSubmit(initialData.id, formData); // EDIT → id dulu, baru formData
    } else {
      onSubmit(formData); // CREATE → cukup formData
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg w-full max-w-md relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            {/* Tombol close */}
            <button
              className="absolute top-3 right-3 p-1 rounded hover:bg-gray-200"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {initialData ? "Edit Package" : "Tambah Package"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Nama package"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Deskripsi"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Harga"
                value={form.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="features"
                placeholder="Features (pisahkan dengan koma)"
                value={form.features}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full p-2 border rounded"
                onChange={handleFileChange}
              />

              {/* Preview image */}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded mt-2"
                />
              )}

              <div className="mt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Batal
                </Button>
                <Button type="submit">
                  {initialData ? "Update" : "Simpan"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PackageFormModal;
