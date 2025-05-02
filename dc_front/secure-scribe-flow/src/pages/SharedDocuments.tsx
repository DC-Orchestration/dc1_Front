
import { useState } from "react";
import { FilePlus, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import DocumentCard from "@/components/DocumentCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    sharedBy: "Alex Johnson",
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
    sharedBy: "Ryan Cooper",
  },
];

const SharedDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredDocuments = mockDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Shared with Me</h1>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-medium">Collaboration Documents</h2>
          <p className="text-slate-500 text-sm">Documents shared with you by others</p>
        </div>

        <div className="relative flex-1 min-w-[200px] mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            className="pl-10"
            placeholder="Search shared documents..."
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
                  <div className="absolute top-3 right-3 flex items-center bg-white/90 rounded-full px-2 py-1 shadow-sm">
                    <Avatar className="h-5 w-5 mr-1">
                      <AvatarImage src={document.createdBy.avatar} alt={document.createdBy.name} />
                      <AvatarFallback>{document.createdBy.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">Shared by {document.sharedBy}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-md">
            <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No shared documents</h3>
            <p className="text-slate-500 mt-1 mb-4">Documents shared with you will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedDocuments;
