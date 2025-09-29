import { motion } from "framer-motion";
import { AnimatedSection } from "../shared/AnimatedSection";
import { THEME } from "@/config/theme";
import { Button } from "@/components/ui/button";
// 1. Impor 'Loader2' dari lucide-react
import { Check, Loader2 } from "lucide-react"; 
import { useEffect, useState } from "react";
import { getPackages, backendUrl, checkOrderStatus } from "@/services/api";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const [checkingStatusId, setCheckingStatusId] = useState(null); 

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await getPackages();
        const pkgs = res?.data?.packages ?? res?.data?.data?.packages ?? [];
        setPackages(pkgs);
      } catch (err) {
        console.error("Gagal memuat packages:", err);
      }
    };
    loadPackages();
  }, []);

  // 2. Ganti nama parameter menjadi 'pkg' agar lebih jelas
  const handleChoosePlan = async (pkg) => { 
    setCheckingStatusId(pkg.id); // Gunakan pkg.id untuk loading status
    
    try {
      // 3. Kirim pkg.id ke fungsi checkOrderStatus
      const res = await checkOrderStatus(pkg.id); 
      
      if (res.data.hasActiveOrder) {
        // 4. Gunakan 'pkg.name' dari parameter untuk pesan alert
        alert(`Anda sudah memiliki pesanan untuk paket "${pkg.name}" dengan status: ${res.data.status}. Silakan selesaikan pembayaran atau tunggu verifikasi.`);
      } else {
        // 5. Navigasi menggunakan pkg.id
        navigate(`/payment/${pkg.id}`); 
      }
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        alert("Anda harus login terlebih dahulu untuk memilih paket.");
        navigate('/login');
      } else {
        console.error("Gagal memeriksa status order:", err);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setCheckingStatusId(null);
    }
  }

  return (
    <AnimatedSection id="pricing" className={`bg-[${THEME.colors.dark}] text-[${THEME.colors.light}]`}>
      <div className="container mx-auto px-6 md:px-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16">
          Flexible Pricing for Every Need
        </h2>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {packages.slice(0, 3).map((pkg, index) => (
            <motion.div
              key={pkg.id ?? index}
              className={`relative border p-8 h-full flex flex-col ${
                pkg.popular ? `border-[${THEME.colors.primary}]` : "border-neutral-700"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* ... sisa kode JSX Anda sudah benar ... */}
              {pkg.popular && (
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-[${THEME.colors.primary}] text-black px-4 py-1 text-sm font-bold tracking-wider`}
                >
                  MOST POPULAR
                </div>
              )}

              {pkg.image && (
                <img
                  src={`${backendUrl}${pkg.image}`}
                  alt={pkg.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}

              <h3 className="text-2xl font-semibold tracking-tight">{pkg.name}</h3>
              <p className="text-neutral-400 mt-2 mb-6">{pkg.description}</p>
              <p className="text-5xl font-bold my-4">Rp {Number(pkg.price ?? "Custom").toLocaleString("id-ID")}</p>

              <ul className="space-y-4 my-8 flex-grow">
                {Array.isArray(pkg.features) &&
                  pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <Check className={`w-5 h-5 mr-3 text-[${THEME.colors.primary}]`} />
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>

              <Button 
                variant={pkg.popular ? "default" : "outline"} 
                className="w-full mt-auto"
                onClick={() => handleChoosePlan(pkg)}
                disabled={checkingStatusId === pkg.id}
              >
                {checkingStatusId === pkg.id ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Choose Plan'
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Pricing;