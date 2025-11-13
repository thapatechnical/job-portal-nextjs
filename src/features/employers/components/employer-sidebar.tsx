import { logoutUserAction } from "@/features/auth/server/auth.actions";
import {
  LayoutDashboard,
  User,
  Plus,
  Briefcase,
  Bookmark,
  CreditCard,
  Building,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const base = "/employer-dashboard";

const navigationItems = [
  { name: "Overview", icon: LayoutDashboard, href: base + "/" },
  { name: "Employers Profile", icon: User },
  { name: "Post a Job", icon: Plus },
  { name: "My Jobs", icon: Briefcase },
  { name: "Saved Candidate", icon: Bookmark },
  { name: "Plans & Billing", icon: CreditCard },
  { name: "All Companies", icon: Building },
  { name: "Settings", icon: Settings, href: base + "/settings" },
];

const EmployerSidebar = () => {
  return (
    <div className="w-64 bg-card border-r border-border fixed bottom-0 top-0">
      <div className="p-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Employers Dashboard
        </h2>
      </div>

      <nav className="px-3 space-y-1">
        {navigationItems.map((curNav) => {
          const Icon = curNav.icon;
          return (
            <Link
              key={curNav.name}
              href={curNav.href || "#"}
              className=" flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            >
              <Icon />
              {curNav.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <button
          onClick={logoutUserAction}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Log-out
        </button>
      </div>
    </div>
  );
};

export default EmployerSidebar;
