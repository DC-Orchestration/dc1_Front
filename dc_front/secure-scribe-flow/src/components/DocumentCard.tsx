
import { useState } from "react"
import { FileText, MoreHorizontal, Download, Trash, Edit, Share2, Copy } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExportDocumentModal } from "./ExportDocumentModal"

interface DocumentCardProps {
  document: {
    id: string
    title: string
    status: string
    lastUpdated: string
    createdBy: {
      name: string
      avatar: string
    }
    collaborators: Array<{
      name: string
      avatar: string
    }>
  }
}

export default function DocumentCard({ document }: DocumentCardProps) {
  const [showExportModal, setShowExportModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-slate-100 text-slate-700 border-slate-200"
      case "review":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "signed":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "Draft"
      case "review":
        return "Under Review"
      case "signed":
        return "Signed"
      default:
        return status
    }
  }

  return (
    <>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md group/card">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className={`${getStatusColor(document.status)}`}>
                {getStatusText(document.status)}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger className="opacity-0 group-hover/card:opacity-100 transition-opacity">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100">
                    <MoreHorizontal className="h-4 w-4 text-slate-500" />
                    <span className="sr-only">More options</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Share2 className="mr-2 h-4 w-4" />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Duplicate</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setShowExportModal(true)
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span>Export</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-100 rounded-md">
                <FileText className="h-6 w-6 text-slate-500" />
              </div>
              <div>
                <h3 className="font-medium line-clamp-2 group-hover/card:text-primary transition-colors">
                  {document.title}
                </h3>
                <p className="text-sm text-slate-500">
                  Updated {formatDistanceToNow(new Date(document.lastUpdated), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-slate-50 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={document.createdBy.avatar || "/placeholder.svg"} alt={document.createdBy.name} />
              <AvatarFallback>{document.createdBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-slate-500">{document.createdBy.name}</span>
          </div>
          {document.collaborators.length > 0 && (
            <div className="flex -space-x-2">
              {document.collaborators.map((collaborator, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>

      <ExportDocumentModal open={showExportModal} onOpenChange={setShowExportModal} documentTitle={document.title} />
    </>
  )
}
