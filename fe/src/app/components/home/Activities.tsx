import { Sprout, Box, Users, Truck } from "lucide-react";

export function Activities() {
  const activities = [
    { title: "Culture", icon: Sprout, color: "text-green-600 bg-green-50" },
    { title: "Transformation", icon: Box, color: "text-orange-600 bg-orange-50" },
    { title: "Logistique", icon: Truck, color: "text-blue-600 bg-blue-50" },
    { title: "Formation", icon: Users, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all group">
              <div className={`p-4 rounded-full mb-3 ${activity.color} group-hover:scale-110 transition-transform`}>
                <activity.icon size={24} />
              </div>
              <span className="font-semibold text-gray-700">{activity.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
