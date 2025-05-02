
import { useState } from "react";
import { FilePlus, Search, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import DocumentCard from "@/components/DocumentCard";
import { Badge } from "@/components/ui/badge";

// Mock document data
const mockDocuments = [
  {
    id: "doc-5",
    title: "Previous Quarter Compliance Report",
    status: "archived",
    lastUpdated: "2025-02-15T10:30:00Z",
    createdBy: {
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AJ",
    },
    collaborators: [],
    archivedDate: "2025-03-01T09:15:00Z"
  },
  {
    id: "doc-6",
    title: "Outdated Vendor Agreement",
    status: "archived",
    lastUpdated: "2025-01-20T14:45:00Z",
    createdBy: {
      name: "Madison Lee",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ML",
    },
    collaborators: [],
    archivedDate: "2025-03-05T11:30:00Z"
  },
];

const ArchivedDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredDocuments = mockDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Archived Documents</h1>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-medium">Document Archive</h2>
          <p className="text-slate-500 text-sm">Documents you've archived for reference</p>
        </div>

        <div className="relative flex-1 min-w-[200px] mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            className="pl-10"
            placeholder="Search archived documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((document) => (
              <Link to={`/document/${document.id}`} key={document.id} className="block group">
                <div className="relative">
                  <DocumentCard document={document} />
                  <Badge className="absolute top-3 right-3 bg-slate-200 text-slate-700">
                    <Archive className="h-3 w-3 mr-1" />
                    Archived
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-md">
            <Archive className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No archived documents</h3>
            <p className="text-slate-500 mt-1 mb-4">Archive documents when they're no longer active but you want to keep them</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivedDocuments;
