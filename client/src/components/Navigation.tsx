import { Link, useLocation } from "wouter";
import { ChefHat, ShoppingCart, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shopping-list", label: "Shopping List", icon: ShoppingCart },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-border md:relative md:border-t-0 md:bg-transparent md:border-b md:flex md:items-center md:h-16 md:px-6">
      <div className="container mx-auto max-w-7xl flex items-center justify-between h-16 px-4 md:px-0">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <ChefHat className="w-6 h-6" />
          </div>
          <span className="text-xl font-display font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent hidden sm:block">
            SmartSaver
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
              location === item.href ? "text-primary" : "text-muted-foreground"
            )}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Nav (Items spaced out evenly) */}
        <div className="flex md:hidden w-full justify-around items-center h-full">
           {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
              location === item.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
            )}>
              <item.icon className={cn("w-5 h-5", location === item.href && "fill-current")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
