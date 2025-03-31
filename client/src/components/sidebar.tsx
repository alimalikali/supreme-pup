"use client";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Home, Package, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarLink {
  icon: typeof Home;
  label: string;
  href: string;
}

const navLinks: SidebarLink[] = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Package, label: "Products", href: "/admin/products" },
  // { icon: Users, label: "Customers", href: "/customers" },
  // { icon: BarChart3, label: "Analytics", href: "/analytics" },
  // { icon: Settings, label: "Settings", href: "/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={cn("border-border bg-sidebar flex h-screen flex-col border-r transition-all duration-300", collapsed ? "w-20" : "w-64")}>
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <div className="flex items-center">
            <span className="text-xl font-bold text-black">PupShop</span>
          </div>
        )}
        <Button className={cn("ml-auto text-2xl text-white", collapsed ? "w-full" : undefined)} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="text-2xl" size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={cn("flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname === link.href ? "bg-black/10 text-black" : "text-black hover:bg-black/20", "justify-center", collapsed ? "justify-center" : "justify-start")}>
            <link.icon size={20} className={cn(collapsed ? "mr-0" : "mr-3")} />
            {!collapsed && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="border-border border-t p-4">
        <div className="flex items-center">
          <div className="bg-pupPurple flex h-8 w-8 items-center justify-center rounded-full text-white">A</div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-muted-foreground text-xs">admin@pupshop.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
