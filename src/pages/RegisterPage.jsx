import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@/components/ui/button";
import { User, Mail, Lock } from "lucide-react";
import { registerUser } from "@/services/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ navigateTo }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await registerUser(form);
      console.log("Success:", res);
      alert("Register berhasil!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-light grid md:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("home");
            }}
            className="text-3xl font-bold tracking-tighter transition-colors text-white mb-12 inline-block"
          >
            Digiency.
          </a>
          <motion.div
            className="space-y-8"
            key="register"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-left">
              <h1 className="text-4xl font-bold tracking-tighter">Create Account</h1>
              <p className="text-muted mt-2">Start your creative journey with us today.</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                icon={<User className="text-neutral-500" />}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                icon={<Mail className="text-neutral-500" />}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                icon={<Lock className="text-neutral-500" />}
              />
              <Button size="lg" className="w-full" type="submit" disabled={loading}>
                {loading ? "Processing..." : "Create Account"}
              </Button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
            <p className="text-center text-muted">
              Already have an account?{" "}
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                className="font-semibold text-primary hover:underline"
              >
                Sign in
              </a>
            </p>
          </motion.div>
        </div>
      </div>
      <div
        className="hidden md:block bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop)",
        }}
      ></div>
    </div>
  );
};

export default RegisterPage;
