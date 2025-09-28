import { type PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  LogOut,
  DollarSign,
  Layers,
} from "lucide-react";

export const AdminLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    router.push("/login");
  };

  const navItems = [
    {
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
      label: "Customers",
    },
    {
      href: "/admin/budgets",
      icon: <DollarSign className="h-5 w-5" />,
      label: "Budgets",
    },
    {
      href: "/admin/invoices",
      icon: <CreditCard className="h-5 w-5" />,
      label: "Invoices",
    },
    {
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full">
      <aside className="flex w-64 flex-col border-border border-r bg-card">
        <div className="flex h-16 items-center gap-4 px-6 border-b border-border">
          <div className="h-8 w-8 text-primary">
            <Layers className="h-8 w-8" />
          </div>
          <h2 className="font-bold text-foreground text-lg">
            LiteClient
          </h2>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2 font-medium text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>
      <main className="flex-1 bg-background">
        {children}
      </main>
    </div>
  );
};