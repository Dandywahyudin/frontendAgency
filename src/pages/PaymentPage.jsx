import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPackageById, submitPaymentProof, backendUrl } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const PaymentPage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [method, setMethod] = useState('BANK_TRANSFER');
  const [proof, setProof] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
        if (!packageId) return;
        try {
          setLoading(true);
          const res = await getPackageById(packageId);
          setPkg(res.data.data.package);
        } catch (err) {
          console.error("Gagal memuat detail package:", err);
          setError("Paket tidak ditemukan atau terjadi kesalahan.");
        } finally {
          setLoading(false);
        }
      };
      fetchPackage();
  }, [packageId]);

  const handleFileChange = (e) => {
    setProof(e.target.files[0]);
  };

  const handleSubmitProof = async (e) => {
    e.preventDefault();
    if (!proof) {
      alert("Silakan unggah bukti pembayaran Anda.");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('packageId', pkg.id);
    formData.append('amount', pkg.price);
    formData.append('method', method);
    formData.append('proof', proof);

    try {
      await submitPaymentProof(formData);
      setPaymentSubmitted(true);
    } catch (err) {
      console.error("Gagal mengirim bukti:", err);
      alert("Gagal mengirim bukti pembayaran. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-dark text-light"><p>Loading package details...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-dark text-light"><p className="text-red-500">{error}</p></div>;

  return (
    <div className="bg-dark text-light">
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <motion.div className="container mx-auto px-6 md:px-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-center">
            {paymentSubmitted ? 'Pembayaran Diterima' : 'Konfirmasi Pembayaran'}
          </h1>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Kolom Order Summary (Selalu Tampil) */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b border-neutral-700 pb-3">Order Summary</h2>
              {pkg && (
                <div className="bg-neutral-500 p-6 rounded-lg">
                  {pkg.image && <img src={`${backendUrl}${pkg.image}`} alt={pkg.name} className="w-full h-48 object-cover rounded-md mb-6" />}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                    <p className="text-2xl font-bold text-primary text-white">Rp {Number(pkg.price).toLocaleString('id-ID')}</p>
                  </div>
                  <p className="text-neutral-200 mb-6">{pkg.description}</p>
                  <ul className="space-y-3">
                    {pkg.features?.map((feature, index) => (
                      <li key={index} className="flex items-center text-neutral-300">
                        <span className="text-primary mr-3">✓</span>{feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Kolom Kanan: Tampilkan Form atau Pesan Sukses */}
            <div>
              {paymentSubmitted ? (
                // Tampilan SETELAH submit berhasil
                <div>
                  <h2 className="text-2xl font-semibold mb-4 border-b border-neutral-700 pb-3">Status</h2>
                  <div className="bg-neutral-800 p-8 rounded-lg text-center">
                    <h3 className="text-2xl font-bold mb-3 text-primary">Terima Kasih!</h3>
                    <p className="text-neutral-300 mb-6">Bukti pembayaran Anda telah kami terima dan akan segera diverifikasi dalam 1x24 jam.</p>
                    <Button onClick={() => navigate('/dashboard')}>Kembali ke Dashboard</Button>
                  </div>
                </div>
              ) : (
                // Tampilan SEBELUM submit (form)
                <div>
                  <h2 className="text-2xl font-semibold mb-4 border-b border-neutral-500 pb-3">Instruksi & Konfirmasi</h2>
                  <div className="bg-neutral-500 p-6 rounded-lg space-y-4 mb-8">
                    <p className='text-white'>Silakan lakukan pembayaran ke:</p>
                    <div>
                        <p className="font-bold text-white">BCA: 1234567890 (a.n. Digiency Kreatif)</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmitProof} className="space-y-6">
                    {/* ... form input (metode, upload, button) ... */}
                    <div>
                        <label className="block mb-2 font-semibold">Metode Pembayaran Anda</label>
                        <div className="flex gap-4">
                            <label className="flex items-center"><input type="radio" name="method" value="BANK_TRANSFER" checked={method === 'BANK_TRANSFER'} onChange={(e) => setMethod(e.target.value)} className="mr-2"/> Bank Transfer</label>
                            <label className="flex items-center"><input type="radio" name="method" value="EWALLET" checked={method === 'EWALLET'} onChange={(e) => setMethod(e.target.value)} className="mr-2"/> E-Wallet</label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Unggah Bukti Pembayaran</label>
                        <label className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-neutral-600 rounded-lg hover:bg-neutral-800">
                            <div className="text-center">
                            <Upload className="mx-auto text-neutral-400" />
                            <p className="mt-2 text-sm">{proof ? proof.name : 'Klik untuk memilih file'}</p>
                            </div>
                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" required/>
                        </label>
                    </div>
                    <Button size="lg" className="w-full mt-4" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Mengirim...' : 'Konfirmasi Pembayaran'}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;