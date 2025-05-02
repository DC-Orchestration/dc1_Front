
import {
  Archive,
  Clock,
  FileText,
  Home,
  Settings,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const SidebarLink = ({
  to,
  icon: Icon,
  children,
}: {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-x-2 px-3 py-2 text-sm rounded-md",
        isActive
          ? "bg-primary text-primary-foreground font-medium"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )
    }
  >
    <Icon className="h-4 w-4" />
    <span>{children}</span>
  </NavLink>
);

const Sidebar = ({ isOpen }: SidebarProps) => {
  if (!isOpen) return null;

  return (
    <div className="w-64 border-r border-slate-200 bg-white p-4 flex flex-col h-full overflow-auto">
      <div className="space-y-1">
        <h2 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Documents</h2>
        <SidebarLink to="/" icon={Home}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/recent" icon={Clock}>
          Recent
        </SidebarLink>
        <SidebarLink to="/starred" icon={Star}>
          Starred
        </SidebarLink>
        <SidebarLink to="/shared" icon={Users}>
          Shared with me
        </SidebarLink>
        <SidebarLink to="/archived" icon={Archive}>
          Archived
        </SidebarLink>
        <SidebarLink to="/Teams" icon={Shield}>
          Teams
        </SidebarLink>
      </div>

      

      <div className="mt-auto pt-6 space-y-1">
        <SidebarLink to="/settings" icon={Settings}>
          Settings
        </SidebarLink>
      </div>
    </div>
  );
};

export default Sidebar;
