const LoginPage = ({ navigateTo }) => (
    <div className="min-h-screen bg-dark text-light flex items-center justify-center">
        <motion.div 
            className="w-full max-w-md p-8 space-y-8 bg-dark border border-neutral-800 rounded-2xl shadow-2xl shadow-primary/10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tighter">Welcome Back</h1>
                <p className="text-muted mt-2">Sign in to continue your journey with us.</p>
            </div>
            <form className="space-y-6">
                <Input type="email" placeholder="Email" icon={<Mail className="text-neutral-500"/>} />
                <Input type="password" placeholder="Password" icon={<Lock className="text-neutral-500"/>} />
                <Button size="lg" className="w-full">Login</Button>
            </form>
            <p className="text-center text-muted">
                Don't have an account?{' '}
                <a href="#" onClick={(e) => {e.preventDefault(); navigateTo('register')}} className="font-semibold text-primary hover:underline">
                    Sign up
                </a>
            </p>
        </motion.div>
    </div>
);

export default LoginPage;