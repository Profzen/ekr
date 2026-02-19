import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Briefcase, 
  Settings, 
  Image, 
  LogOut 
} from "lucide-react";
import { Link, useNavigate } from "react-router";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AdminSidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: "general", label: "Général", icon: Settings },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "articles", label: "Articles", icon: FileText },
    { id: "team", label: "Équipe", icon: Users },
    { id: "partners", label: "Partenaires", icon: Users }, // Reusing Users icon
    { id: "gallery", label: "Galerie", icon: Image },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0 overflow-y-auto hidden md:flex">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-primary">EKR Admin</h2>
        <p className="text-xs text-muted-foreground mt-1">v1.0.0</p>
      </div>
      
      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
              activeTab === item.id 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-border">
        <button 
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </div>
  );
}
