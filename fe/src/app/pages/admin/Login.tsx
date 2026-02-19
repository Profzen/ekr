import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Lock, User } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (email === "admin" && password === "admin") {
      toast.success("Connexion réussie");
      navigate("/admin");
    } else {
      toast.error("Identifiants incorrects (admin/admin)");
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-border/50">
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Espace Administration</h1>
            <p className="text-muted-foreground mt-2">Veuillez vous authentifier pour continuer</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User size={16} /> Identifiant
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="admin"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock size={16} /> Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mt-4"
            >
              Se connecter
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Utilisez <span className="font-mono bg-muted px-1 rounded">admin</span> / <span className="font-mono bg-muted px-1 rounded">admin</span> pour la démo</p>
          </div>
        </div>
        <div className="bg-muted/50 p-4 text-center text-xs text-muted-foreground border-t border-border/50">
          EKR Africa Agrovision Group &copy; 2024
        </div>
      </div>
    </div>
  );
}
