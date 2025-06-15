import { ReactNode } from "react";
import Link from "next/link";
import { Home, Guitar, Calendar, User } from "lucide-react";

interface BottomNavProps {
  activeItem?: "home" | "services" | "schedule" | "profile";
}

export function BottomNav({ activeItem = "home" }: BottomNavProps) {
  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      id: "home",
    },
    {
      name: "Serviços",
      href: "/services",
      icon: Guitar,
      id: "services",
    },
    {
      name: "Agendamento",
      href: "/schedule",
      icon: Calendar,
      id: "schedule",
    },
    {
      name: "Perfil",
      href: "/profile",
      icon: User,
      id: "profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-border z-50">
      <div className="flex justify-around items-center p-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center py-1"
          >
            <item.icon
              className={`w-6 h-6 ${
                activeItem === item.id ? "text-primary" : "text-foreground"
              }`}
            />
            <span
              className={`text-xs mt-1 ${
                activeItem === item.id ? "text-primary" : "text-foreground"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

interface PageContainerProps {
  children: ReactNode;
  activeNavItem?: "home" | "services" | "schedule" | "profile";
  showNav?: boolean;
}

export function PageContainer({
  children,
  activeNavItem,
  showNav = true,
}: PageContainerProps) {
  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-4">{children}</div>
      {showNav && <BottomNav activeItem={activeNavItem} />}
    </div>
  );
}

