import { useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { siteContent, services, articles, team, partners } from "../../../lib/data";
import { toast } from "sonner";
import { Trash2, Edit, Plus, Save } from "lucide-react";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile

  // Content renderers
  const renderGeneral = () => (
    <div className="space-y-8">
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <h3 className="text-xl font-bold mb-4">Informations Principales</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Titre Hero</label>
            <input type="text" defaultValue={siteContent.hero.title} className="w-full p-2 border rounded" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Sous-titre Hero</label>
            <textarea defaultValue={siteContent.hero.subtitle} className="w-full p-2 border rounded h-24" />
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded mt-4" onClick={() => toast.success("Modifications enregistrées")}>
            <Save size={16} /> Enregistrer
          </button>
        </div>
      </div>
      
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <h3 className="text-xl font-bold mb-4">Coordonnées</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input type="email" defaultValue={siteContent.contact.email} className="w-full p-2 border rounded" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Téléphone</label>
            <input type="tel" defaultValue={siteContent.contact.phone} className="w-full p-2 border rounded" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Adresse</label>
            <input type="text" defaultValue={siteContent.contact.address} className="w-full p-2 border rounded" />
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded mt-4 col-span-2 w-fit" onClick={() => toast.success("Modifications enregistrées")}>
            <Save size={16} /> Enregistrer
          </button>
        </div>
      </div>
    </div>
  );

  const renderList = (title: string, data: any[], fields: string[]) => (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90" onClick={() => toast("Fonctionnalité d'ajout simulée")}>
          <Plus size={16} /> Ajouter
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              {fields.map(f => <th key={f} className="text-left p-3 font-medium text-muted-foreground capitalize">{f}</th>)}
              <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id} className="border-b border-border hover:bg-muted/10">
                {fields.map(f => (
                  <td key={f} className="p-3 max-w-xs truncate">{item[f]}</td>
                ))}
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-muted rounded text-blue-600" onClick={() => toast("Modification simulée")}>
                      <Edit size={16} />
                    </button>
                    <button className="p-2 hover:bg-muted rounded text-red-600" onClick={() => toast("Suppression simulée")}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
          <div className="md:hidden">
            {/* Mobile Menu Toggle would go here */}
          </div>
        </header>
        
        {activeTab === "general" && renderGeneral()}
        {activeTab === "services" && renderList("Services", services, ["title", "description"])}
        {activeTab === "articles" && renderList("Articles", articles, ["title", "date", "category"])}
        {activeTab === "team" && renderList("Équipe", team, ["name", "role"])}
        {activeTab === "partners" && renderList("Partenaires", partners, ["name"])}
        {activeTab === "gallery" && (
          <div className="p-12 text-center text-muted-foreground bg-card rounded-xl border border-border">
            <p>Gestion de la galerie (Drag & Drop) - À venir</p>
          </div>
        )}
      </main>
    </div>
  );
}
