
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, FileCheck, Clock } from "lucide-react";

interface DocumentCardProps {
  document: {
    id: string;
    title: string;
    status: string;
    lastUpdated: string;
    createdBy: {
      name: string;
      avatar: string;
    };
    collaborators: Array<{
      name: string;
      avatar: string;
    }>;
  };
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700">
            <Clock className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        );
      case "review":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        );
      case "signed":
        return (
          <Badge variant="outline" className="bg-green-50 text-success border-success">
            <FileCheck className="h-3 w-3 mr-1" />
            Signed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md group-hover:border-primary">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="mr-2">
            <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
              {document.title}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {format(new Date(document.lastUpdated), "MMM d, yyyy")}
            </p>
          </div>
          <div>
            {getStatusBadge(document.status)}
          </div>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={document.createdBy.avatar} alt={document.createdBy.name} />
              <AvatarFallback>{document.createdBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-slate-500">{document.createdBy.name}</span>
          </div>
          
          {document.collaborators.length > 0 && (
            <div className="flex -space-x-2">
              {document.collaborators.slice(0, 3).map((collaborator, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {document.collaborators.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-600 border-2 border-white">
                  +{document.collaborators.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DocumentCard;
