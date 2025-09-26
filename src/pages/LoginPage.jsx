import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "@/services/api"; // fungsi axios login
import { useNavigate } from "react-router-dom";

const LoginPage = ({ navigateTo }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await loginUser(form); // panggil API login
      console.log("Login Success:", res);

      // simpan token ke localStorage
      localStorage.setItem("token", res.data.token);

      // redirect ke homepage
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Login gagal");
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
            className="text-3xl font-bold tracking-tighter transition-colors text-black mb-12 inline-block"
          >
            Digiency.
          </a>
          <motion.div
            className="space-y-8"
            key="login"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-left">
              <h1 className="text-4xl font-bold tracking-tighter">
                Welcome Back
              </h1>
              <p className="text-muted mt-2">
                Sign in to continue your journey with us.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button size="lg" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <p className="text-center text-muted">
              Don't have an account?{" "}
              <a
                href="/register"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
                className="font-semibold text-primary hover:underline"
              >
                Sign up
              </a>
            </p>
          </motion.div>
        </div>
      </div>
      <div
        className="hidden md:block bg-cover bg-center grayscale"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop)",
        }}
      ></div>
    </div>
  );
};

export default LoginPage;
