// components/layout/AdminSidebar.tsx
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function AdminSidebar() {
  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" }
  ];

  return (
    <Sheet>
      <SheetTrigger><Menu /></SheetTrigger>
      <SheetContent side="left">
        <nav>
          {menuItems.map(item => (
            <a key={item.href} href={item.href}>
              {item.name}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}