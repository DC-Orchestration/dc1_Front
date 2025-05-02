
import { useState } from "react";
import { FilePlus, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import DocumentCard from "@/components/DocumentCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock document data
const mockDocuments = [
  {
    id: "comp-1",
    title: "Annual Compliance Report 2025",
    status: "draft",
    lastUpdated: "2025-04-15T10:30:00Z",
    createdBy: {
      name: "Compliance Officer",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CO",
    },
    collaborators: [
      { name: "Alex Johnson", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AJ" },
    ],
    framework: "ISO 27001",
    dueDate: "2025-06-30"
  },
  {
    id: "comp-2",
    title: "GDPR Data Processing Impact Assessment",
    status: "review",
    lastUpdated: "2025-04-10T14:45:00Z",
    createdBy: {
      name: "Data Protection Officer",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DP",
    },
    collaborators: [
      { name: "Legal Team", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=LT" },
    ],
    framework: "GDPR",
    dueDate: "2025-05-15"
  },
  {
    id: "comp-3",
    title: "SOC 2 Audit Preparation",
    status: "draft",
    lastUpdated: "2025-04-28T09:15:00Z",
    createdBy: {
      name: "Security Team",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ST",
    },
    collaborators: [
      { name: "Compliance Officer", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CO" },
      { name: "Alex Johnson", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AJ" },
    ],
    framework: "SOC 2",
    dueDate: "2025-07-01"
  },
];

const ComplianceDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [frameworkFilter, setFrameworkFilter] = useState("All");
  
  const filteredDocuments = mockDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (frameworkFilter === "All" || doc.framework === frameworkFilter)
  );

  const today = new Date();
  const isApproachingDeadline = (dueDate: string) => {
    const deadline = new Date(dueDate);
    const daysUntilDue = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDue <= 30 && daysUntilDue > 0;
  };

  const isPastDeadline = (dueDate: string) => {
    const deadline = new Date(dueDate);
    return today > deadline;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Compliance Documents</h1>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-medium">Compliance Center</h2>
          <p className="text-slate-500 text-sm">Manage regulatory compliance documentation</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              className="pl-10"
              placeholder="Search compliance documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select onValueChange={setFrameworkFilter} defaultValue={frameworkFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Frameworks</SelectItem>
              <SelectItem value="ISO 27001">ISO 27001</SelectItem>
              <SelectItem value="GDPR">GDPR</SelectItem>
              <SelectItem value="SOC 2">SOC 2</SelectItem>
              <SelectItem value="HIPAA">HIPAA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((document) => (
              <Link to={`/document/${document.id}`} key={document.id} className="block group">
                <div className="relative">
                  <DocumentCard document={document} />
                  <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      <Shield className="h-3 w-3 mr-1" />
                      {document.framework}
                    </Badge>
                    
                    {isPastDeadline(document.dueDate) ? (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        Overdue: {new Date(document.dueDate).toLocaleDateString()}
                      </Badge>
                    ) : isApproachingDeadline(document.dueDate) ? (
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        Due: {new Date(document.dueDate).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Due: {new Date(document.dueDate).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-md">
            <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No compliance documents found</h3>
            <p className="text-slate-500 mt-1 mb-4">Create compliance documentation to track regulatory requirements</p>
            <Button>
              <FilePlus className="mr-2 h-4 w-4" />
              Create New Document
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceDocuments;
