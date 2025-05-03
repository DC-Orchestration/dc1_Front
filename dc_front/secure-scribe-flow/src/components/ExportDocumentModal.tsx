"use client"

import { useState } from "react"
import { FileText, FileType, FileSpreadsheet, Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExportDocumentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  documentTitle?: string
}

export function ExportDocumentModal({ open, onOpenChange, documentTitle = "Document" }: ExportDocumentModalProps) {
  const [format, setFormat] = useState("pdf")
  const [loading, setLoading] = useState(false)
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [includeComments, setIncludeComments] = useState(true)
  const [includeVersionHistory, setIncludeVersionHistory] = useState(false)

  // CSV specific options
  const [delimiter, setDelimiter] = useState("comma")

  const handleExport = () => {
    setLoading(true)

    // Simulate export process
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)

      // In a real app, you would trigger the actual export here
      console.log(`Exporting ${documentTitle} as ${format}`, {
        includeMetadata,
        includeComments,
        includeVersionHistory,
        delimiter: format === "csv" ? delimiter : undefined,
      })
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Document</DialogTitle>
          <DialogDescription>Export "{documentTitle}" in your preferred format</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup value={format} onValueChange={setFormat} className="grid grid-cols-3 gap-4">
            <div
              className={`flex flex-col items-center gap-2 rounded-lg border p-4 ${format === "pdf" ? "border-primary bg-primary/5" : "border-muted"}`}
            >
              <RadioGroupItem value="pdf" id="pdf" className="sr-only" />
              <Label htmlFor="pdf" className="cursor-pointer flex flex-col items-center gap-2">
                <FileText className="h-8 w-8 text-primary" />
                <span className="font-medium">PDF</span>
                <span className="text-xs text-muted-foreground text-center">Preserve formatting</span>
              </Label>
            </div>

            <div
              className={`flex flex-col items-center gap-2 rounded-lg border p-4 ${format === "txt" ? "border-primary bg-primary/5" : "border-muted"}`}
            >
              <RadioGroupItem value="txt" id="txt" className="sr-only" />
              <Label htmlFor="txt" className="cursor-pointer flex flex-col items-center gap-2">
                <FileType className="h-8 w-8 text-primary" />
                <span className="font-medium">TXT</span>
                <span className="text-xs text-muted-foreground text-center">Plain text only</span>
              </Label>
            </div>

            <div
              className={`flex flex-col items-center gap-2 rounded-lg border p-4 ${format === "csv" ? "border-primary bg-primary/5" : "border-muted"}`}
            >
              <RadioGroupItem value="csv" id="csv" className="sr-only" />
              <Label htmlFor="csv" className="cursor-pointer flex flex-col items-center gap-2">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <span className="font-medium">CSV</span>
                <span className="text-xs text-muted-foreground text-center">Spreadsheet format</span>
              </Label>
            </div>
          </RadioGroup>

          <Tabs value={format} className="mt-6">
            <TabsList className="hidden">
              <TabsTrigger value="pdf">PDF Options</TabsTrigger>
              <TabsTrigger value="txt">TXT Options</TabsTrigger>
              <TabsTrigger value="csv">CSV Options</TabsTrigger>
            </TabsList>

            <TabsContent value="pdf" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">PDF Options</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pdf-metadata"
                    checked={includeMetadata}
                    onCheckedChange={(checked) => setIncludeMetadata(!!checked)}
                  />
                  <Label htmlFor="pdf-metadata">Include document metadata</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pdf-comments"
                    checked={includeComments}
                    onCheckedChange={(checked) => setIncludeComments(!!checked)}
                  />
                  <Label htmlFor="pdf-comments">Include comments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pdf-history"
                    checked={includeVersionHistory}
                    onCheckedChange={(checked) => setIncludeVersionHistory(!!checked)}
                  />
                  <Label htmlFor="pdf-history">Include version history</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="txt" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">TXT Options</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="txt-metadata"
                    checked={includeMetadata}
                    onCheckedChange={(checked) => setIncludeMetadata(!!checked)}
                  />
                  <Label htmlFor="txt-metadata">Include document metadata</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="txt-comments"
                    checked={includeComments}
                    onCheckedChange={(checked) => setIncludeComments(!!checked)}
                  />
                  <Label htmlFor="txt-comments">Include comments</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="csv" className="space-y-4 mt-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">CSV Options</h4>
                <div className="grid gap-2">
                  <Label htmlFor="delimiter">Delimiter</Label>
                  <RadioGroup
                    id="delimiter"
                    value={delimiter}
                    onValueChange={setDelimiter}
                    className="grid grid-cols-3 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comma" id="comma" />
                      <Label htmlFor="comma">Comma (,)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="semicolon" id="semicolon" />
                      <Label htmlFor="semicolon">Semicolon (;)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tab" id="tab" />
                      <Label htmlFor="tab">Tab</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="csv-headers"
                    checked={includeMetadata}
                    onCheckedChange={(checked) => setIncludeMetadata(!!checked)}
                  />
                  <Label htmlFor="csv-headers">Include column headers</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={loading} className="gap-2">
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
