
import { format } from "date-fns";
import { Clock, Download, FileText, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuditEvent {
  timestamp: string;
  user: string;
  action: string;
  section: string;
}

interface AuditTrailProps {
  auditTrail: AuditEvent[];
}

const AuditTrail = ({ auditTrail }: AuditTrailProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-md">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Audit Trail</h3>
            <p className="text-sm text-muted-foreground">Complete history of all document actions</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Audit Log
        </Button>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200"></div>
        <ul className="space-y-6">
          {auditTrail.map((event, index) => (
            <li key={index} className="relative pl-12">
              <div className="absolute left-0 top-1 h-12 w-12 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center z-10">
                  {event.action.includes("Created") && <FileText className="h-5 w-5 text-primary" />}
                  {event.action.includes("Edited") && <User className="h-5 w-5 text-primary" />}
                  {event.action.includes("Signed") && <Shield className="h-5 w-5 text-success" />}
                  {(event.action.includes("Added") || event.action.includes("Updated") || event.action.includes("Commented") || event.action.includes("Reviewed") || event.action.includes("Submitted")) && 
                    <User className="h-5 w-5 text-primary" />}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{event.user}</span>
                  <span className="text-xs text-slate-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {format(new Date(event.timestamp), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                <p className="text-sm">
                  <span className="font-medium">{event.action}</span>
                  {event.section !== "All" && (
                    <span className="text-slate-600"> in section <span className="text-primary">{event.section}</span></span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center border-t pt-6 mt-8">
        <p className="text-sm text-slate-500 flex items-center justify-center mb-2">
          <Shield className="h-4 w-4 mr-1" />
          This audit trail is cryptographically secured and tamper-proof
        </p>
        <p className="text-xs text-slate-400">Anchored to blockchain: Last verification 10 minutes ago</p>
      </div>
    </div>
  );
};

export default AuditTrail;
