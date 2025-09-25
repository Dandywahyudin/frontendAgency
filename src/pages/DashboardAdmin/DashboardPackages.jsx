import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPackages, addPackage } from "@/services/api";
import { Package as PackageIcon } from "lucide-react";
import PackageFormModal from "@/components/modals/PackageFormModal"; // import modal
import { motion } from "framer-motion";

const DashboardPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleAddPackage = async (newPackage) => {
    try {
      const res = await addPackage(newPackage); // panggil API backend
      setPackages([...packages, res.data]);      // update state
      setIsModalOpen(false);
                         // tutup modal
    } catch (err) {
      console.log("Error adding package:", token);
        console.error(err);
      alert("Gagal menambahkan package");
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
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.length === 0 && <p>No packages found</p>}
        {packages.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="rounded-xl hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-lg">{p.name}</CardTitle>
                <p className="text-sm text-neutral-500">{p.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">Rp {parseInt(p.price).toLocaleString("id-ID")}</div>
                    <div className="text-sm text-neutral-500 mt-1">Orders: {p._count?.orders ?? 0}</div>
                  </div>
                  <div className="text-right text-xs text-neutral-400">
                    {new Date(p.createdAt).toLocaleDateString("id-ID")}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="destructive">Delete</Button>
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
