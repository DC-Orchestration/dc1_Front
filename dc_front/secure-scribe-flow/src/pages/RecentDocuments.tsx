
import { useState } from "react";
import { FilePlus, Search, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import DocumentCard from "@/components/DocumentCard";

// Mock document data
const mockDocuments = [
  {
    id: "doc-1",
    title: "Q2 Compliance Report",
    status: "draft",
    lastUpdated: "2025-05-01T15:30:00Z",
    createdBy: {
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AJ",
    },
    collaborators: [
      { name: "Sarah Miller", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SM" },
      { name: "Ryan Cooper", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RC" },
    ],
  },
  {
    id: "doc-4",
    title: "Data Processing Agreement",
    status: "review",
    lastUpdated: "2025-04-20T11:05:00Z",
    createdBy: {
      name: "Ryan Cooper",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RC",
    },
    collaborators: [
      { name: "Madison Lee", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ML" },
      { name: "Sarah Miller", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SM" },
    ],
  }
];

const RecentDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredDocuments = mockDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Recent Documents</h1>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-medium">Recently Accessed</h2>
          <p className="text-slate-500 text-sm">Documents you've viewed or edited recently</p>
        </div>

        <div className="relative flex-1 min-w-[200px] mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            className="pl-10"
            placeholder="Search recent documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((document) => (
              <Link to={`/document/${document.id}`} key={document.id} className="block group">
                <DocumentCard document={document} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-md">
            <Clock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No recent documents</h3>
            <p className="text-slate-500 mt-1 mb-4">You haven't opened any documents recently</p>
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

export default RecentDocuments;
