// components/NewDocumentModal.tsx
"use client"

import type React from "react"

import { useState } from "react"
import { FileUp, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function NewDocumentModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleUpload = () => {
    setIsUploading(true)
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      onOpenChange(false)
      // Reset state
      setFileName("")
    }, 1500)
  }

  const handleCreateManually = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle manual document creation
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Document</DialogTitle>
          <DialogDescription>Upload a file or create a document manually.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="create">Create Manually</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="py-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
              <FileUp className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop your file here or click to browse</p>
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md">Browse Files</div>
                <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
              </Label>
              {fileName && (
                <div className="mt-4 text-sm text-gray-700 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  {fileName}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleUpload} disabled={!fileName || isUploading} className="w-full">
                {isUploading ? "Uploading..." : "Upload Document"}
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="create" className="py-4">
            <form onSubmit={handleCreateManually}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Document Title</Label>
                  <Input id="title" placeholder="Enter document title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter document description" className="min-h-[100px]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <select id="document-type" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="">
                    <option value="" disabled>
                      Select document type
                    </option>
                    <option value="report">Report</option>
                    <option value="contract">Contract</option>
                    <option value="assessment">Assessment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit" className="w-full">
                  Create Document
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}