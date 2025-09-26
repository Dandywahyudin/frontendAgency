import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { backendUrl, getPackages, addPackage, updatePackage, deletePackage } from "@/services/api";
import { Package as PackageIcon } from "lucide-react";
import PackageFormModal from "@/components/modals/PackageFormModal";
import { motion } from "framer-motion";

const DashboardPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return; 
    }

    const load = async () => {
      try {
        const res = await getPackages();
        const pkgs = res?.data?.packages ?? res?.data?.data?.packages ?? [];
        setPackages(pkgs);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat packages");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const handleAddPackage = async (newPackage) => {
    try {
      const res = await addPackage(newPackage);
      const pkg = res.data.data;   
      setPackages([ pkg, ...packages]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan package: " + (err.response?.data?.message || err.message));
    }
  };

  const handleUpdatePackage = async (id, formData) => {
    try {
      const res = await updatePackage(id, formData);
      const updatedPkg = res.data?.data;
      if (updatedPkg && updatedPkg.id) {
        setPackages((prev) =>
          prev.map((pkg) => (pkg.id === id ? updatedPkg : pkg))
        );
      } else {
        const refetch = await getPackages();
        setPackages(refetch.data.data.packages);
      }
      setIsEditModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(
        "Gagal update package: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return; 
    try {
      await deletePackage(id);
      setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus package: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p className="text-center mt-8">Loading packages...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <PackageIcon className="w-7 h-7 text-primary" /> Packages
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>+ New Package</Button>
      </div>

      <PackageFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPackage}
        mode="create"
      />
      <PackageFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdatePackage}
        initialData={selectedPackage}
        mode="edit"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.length === 0 && <p>No packages found</p>}
        {packages.map((p, i) => (
          <motion.div 
            key={p.id ?? `pkg-${i}`} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.05 }}
          >
            <Card className="rounded-xl hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-lg">{p.name}</CardTitle>
                <p className="text-sm text-neutral-500">{p.description}</p>
              </CardHeader>
              <CardContent>
                {/* Tampilkan gambar jika ada */}
                {p.image && (
                  <img
                    src={`${backendUrl}${p.image}`} 
                    alt={p.name}
                    className="w-full h-40 object-cover rounded mt-2"
                  />
                )}
                <div className="flex flex-wrap gap-2 mb-2">
                  {/* Tampilkan features */}
                  {Array.isArray(p.features) && p.features.map((f, idx) => (
                    <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">Rp {Number(p.price ?? 0).toLocaleString("id-ID")}</div>
                    <div className="text-sm text-neutral-500 mt-1">Orders: {p._count?.orders ?? 0}</div>
                  </div>
                  <div className="text-right text-xs text-neutral-400">
                    {new Date(p.createdAt).toLocaleDateString("id-ID")}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => {
                    setSelectedPackage(p);
                    setIsEditModalOpen(true);
                  }}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeletePackage(p.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPackages;
