"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FilePlus, Filter, Search, SortAsc, Clock, Lock, FileText, User, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "../contexts/AuthContext"
import DocumentCard from "@/components/DocumentCard"
import { NewDocumentModal } from "@/components/NewDocumentModal"
import { ExportDocumentModal } from "@/components/ExportDocumentModal"

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
    id: "doc-2",
    title: "Client Onboarding Agreement",
    status: "signed",
    lastUpdated: "2025-04-28T09:15:00Z",
    createdBy: {
      name: "Madison Lee",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ML",
    },
    collaborators: [{ name: "Alex Johnson", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AJ" }],
  },
  {
    id: "doc-3",
    title: "Risk Assessment Template",
    status: "draft",
    lastUpdated: "2025-04-25T14:20:00Z",
    createdBy: {
      name: "Taylor Swift",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TS",
    },
    collaborators: [],
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
  },
]

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("last-updated")
  const [filterOption, setFilterOption] = useState("all")
  const [documents, setDocuments] = useState(mockDocuments)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter documents based on search and filter options
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    if (filterOption === "all") return matchesSearch
    return matchesSearch && doc.status === filterOption
  })

  // Sort documents based on sort option
  useEffect(() => {
    const sortedDocuments = [...documents]

    switch (sortOption) {
      case "last-updated":
        sortedDocuments.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      case "name":
        sortedDocuments.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "status":
        sortedDocuments.sort((a, b) => a.status.localeCompare(b.status))
        break
      default:
        break
    }

    setDocuments(sortedDocuments)
  }, [sortOption])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Document Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setExportOpen(true)} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setOpen(true)}>
            <FilePlus className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-medium">Your Documents</h2>
          <p className="text-slate-500 text-sm">Manage your secure documents and collaborations</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              className="pl-10"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={filterOption} onValueChange={setFilterOption}>
                <DropdownMenuRadioItem value="all">All Documents</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="draft">Drafts</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="review">Under Review</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="signed">Signed</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <SortAsc className="h-4 w-4" />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                <DropdownMenuRadioItem value="last-updated">Last Updated</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="p-6 animate-pulse">
                <div className="h-4 w-1/3 bg-slate-200 rounded mb-4"></div>
                <div className="h-10 w-full bg-slate-200 rounded mb-4"></div>
                <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
              </Card>
            ))}
          </div>
        ) : filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((document) => (
              <Link to={`/document/${document.id}`} key={document.id} className="block group">
                <DocumentCard document={document} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-md">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No documents found</h3>
            <p className="text-slate-500 mt-1 mb-4">Create your first secure document to get started</p>
            <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center justify-center">
              <FilePlus className="mr-2 h-4 w-4" />
              New Document
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-md">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Recent Activity</h3>
              <p className="text-sm text-slate-500">Document updates</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 text-sm py-2 hover:bg-slate-50 rounded-md px-2 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=SM" alt="Sarah Miller" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <p>
                  <span className="font-medium">Sarah Miller</span> edited{" "}
                  <span className="text-primary">Q2 Compliance Report</span>
                </p>
                <p className="text-xs text-slate-500">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm py-2 hover:bg-slate-50 rounded-md px-2 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=RC" alt="Ryan Cooper" />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
              <div>
                <p>
                  <span className="font-medium">Ryan Cooper</span> commented on{" "}
                  <span className="text-primary">Client Onboarding Agreement</span>
                </p>
                <p className="text-xs text-slate-500">45 minutes ago</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-md">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Security Status</h3>
              <p className="text-sm text-slate-500">System status</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Encryption</span>
              <Badge variant="outline" className="bg-green-50 text-success border-success">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Audit Logging</span>
              <Badge variant="outline" className="bg-green-50 text-success border-success">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Compliance Check</span>
              <Badge variant="outline" className="bg-amber-50 text-warning border-warning">
                Review Needed
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-md">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Your Team</h3>
              <p className="text-sm text-slate-500">Active collaborators</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex -space-x-2 overflow-hidden mb-3">
              <Avatar className="border-2 border-white hover:translate-y-[-2px] transition-transform">
                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=AJ" alt="Alex Johnson" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white hover:translate-y-[-2px] transition-transform">
                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=SM" alt="Sarah Miller" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white hover:translate-y-[-2px] transition-transform">
                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=RC" alt="Ryan Cooper" />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white hover:translate-y-[-2px] transition-transform">
                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=ML" alt="Madison Lee" />
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Manage Team Access
            </Button>
          </div>
        </Card>
      </div>
      <NewDocumentModal open={open} onOpenChange={setOpen} />
      <ExportDocumentModal open={exportOpen} onOpenChange={setExportOpen} documentTitle="Selected Documents" />
    </div>
  )
}

export default Dashboard
