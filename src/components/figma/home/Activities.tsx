import { Sprout, Box, Users, Truck, Leaf, TrendingUp, Ship } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  Sprout,
  Box,
  Users,
  Truck,
  Leaf,
  TrendingUp,
  Ship,
};

type ActivityProps = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

type ActivitiesProps = {
  activities: ActivityProps[];
};

export function Activities({ activities }: ActivitiesProps) {
  const colorMap: Record<number, string> = {
    0: "text-green-600 bg-green-50",
    1: "text-orange-600 bg-orange-50",
    2: "text-blue-600 bg-blue-50",
    3: "text-purple-600 bg-purple-50",
    4: "text-red-600 bg-red-50",
    5: "text-yellow-600 bg-yellow-50",
    6: "text-pink-600 bg-pink-50",
    7: "text-indigo-600 bg-indigo-50",
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-5 lg:px-6 max-w-[1500px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activities.map((activity, idx) => {
            const IconComponent = activity.icon && iconMap[activity.icon] ? iconMap[activity.icon] : Sprout;
            const colorClass = colorMap[idx % 8];
            
            return (
              <div
                key={activity.id}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all group"
              >
                <div
                  className={`p-4 rounded-full mb-3 ${colorClass} group-hover:scale-110 transition-transform`}
                >
                  <IconComponent size={24} />
                </div>
                <span className="font-semibold text-gray-700">{activity.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
