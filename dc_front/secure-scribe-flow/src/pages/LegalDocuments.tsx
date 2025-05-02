
import { useState } from "react";
import { FilePlus, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import DocumentCard from "@/components/DocumentCard";
import { Badge } from "@/components/ui/badge";

// Mock document data
const mockDocuments = [
  {
    id: "legal-1",
    title: "Master Service Agreement",
    status: "signed",
    lastUpdated: "2025-04-15T10:30:00Z",
    createdBy: {
      name: "Legal Team",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=LT",
    },
    collaborators: [
      { name: "Madison Lee", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ML" },
    ],
    category: "Contract"
  },
  {
    id: "legal-2",
    title: "Privacy Policy",
    status: "signed",
    lastUpdated: "2025-03-20T14:45:00Z",
    createdBy: {
      name: "Legal Team",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=LT",
    },
    collaborators: [],
    category: "Policy"
  },
  {
    id: "legal-3",
    title: "GDPR Compliance Statement",
    status: "review",
    lastUpdated: "2025-04-28T09:15:00Z",
    createdBy: {
      name: "Compliance Officer",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CO",
    },
    collaborators: [
      { name: "Legal Team", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=LT" },
    ],
    category: "Compliance"
  },
];

const LegalDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  const filteredDocuments = mockDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (categoryFilter === "All" || doc.category === categoryFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Legal Documents</h1>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-medium">Legal Library</h2>
          <p className="text-slate-500 text-sm">Legal documents and templates for your organization</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              className="pl-10"
              placeholder="Search legal documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={categoryFilter === "All" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCategoryFilter("All")}
            >
              All
            </Button>
            <Button 
              variant={categoryFilter === "Contract" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCategoryFilter("Contract")}
            >
              Contracts
            </Button>
            <Button 
              variant={categoryFilter === "Policy" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCategoryFilter("Policy")}
            >
              Policies
            </Button>
            <Button 
              variant={categoryFilter === "Compliance" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCategoryFilter("Compliance")}
            >
              Compliance
            </Button>
          </div>
        </div>

        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((document) => (
              <Link to={`/document/${document.id}`} key={document.id} className="block group">
                <div className="relative">
                  <DocumentCard document={document} />
                  <Badge className="absolute top-3 right-3 bg-blue-100 text-blue-800 border-blue-200">
                    <FileText className="h-3 w-3 mr-1" />
                    {document.category}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-md">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No legal documents found</h3>
            <p className="text-slate-500 mt-1 mb-4">Create or upload legal documents to start building your library</p>
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

export default LegalDocuments;
