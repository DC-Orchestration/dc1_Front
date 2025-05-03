import type React from "react"

import { useState } from "react"
import { FileUp, FileText, Check } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock user groups data
const userGroups = [
  { id: "team-1", name: "Executive Team" },
  { id: "team-2", name: "Legal Department" },
  { id: "team-3", name: "Marketing Team" },
  { id: "team-4", name: "Development Team" },
  { id: "team-5", name: "Finance Department" },
]

export function NewDocumentModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<"create" | "permissions" | "success">("create")

  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState("")
  const [documentTitle, setDocumentTitle] = useState("")
  const [documentDescription, setDocumentDescription] = useState("")
  const [documentType, setDocumentType] = useState("")

  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [permissionLevel, setPermissionLevel] = useState("view")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFileName(file.name)
      setDocumentTitle(file.name.split(".")[0])
    }
  }

  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setStep("permissions")
    }, 1500)
  }

  const handleCreateManually = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setDocumentTitle(formData.get("title") as string)
    setDocumentDescription(formData.get("description") as string)
    setDocumentType(formData.get("documentType") as string)
    setStep("permissions")
  }

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    )
  }

  const handlePermissionsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Construct document object
    const documentData = {
      title: documentTitle,
      description: documentDescription,
      type: documentType,
      permissionLevel,
      allowedGroups: selectedGroups,
    }

    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(documentData),
      })

      if (!res.ok) throw new Error("Failed to create document")

      setStep("success")
      setTimeout(() => {
        resetForm()
        onOpenChange(false)
      }, 2000)
    } catch (err) {
      console.error("Error creating document:", err)
    }
  }

  const resetForm = () => {
    setStep("create")
    setFileName("")
    setDocumentTitle("")
    setDocumentDescription("")
    setDocumentType("")
    setSelectedGroups([])
    setPermissionLevel("view")
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === "create" && (
          <>
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
                      <Input id="title" name="title" placeholder="Enter document title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter document description"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document-type">Document Type</Label>
                      <select
                        id="document-type"
                        name="documentType"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>Select document type</option>
                        <option value="report">Report</option>
                        <option value="contract">Contract</option>
                        <option value="assessment">Assessment</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button type="submit" className="w-full">Create Document</Button>
                  </DialogFooter>
                </form>
              </TabsContent>
            </Tabs>
          </>
        )}

        {step === "permissions" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Set Document Permissions</DialogTitle>
              <DialogDescription>
                Choose who can access "{documentTitle || fileName}" and what they can do with it.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handlePermissionsSubmit} className="py-4">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Select User Groups</Label>
                  <div className="mt-3 space-y-3">
                    {userGroups.map((group) => (
                      <div key={group.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={group.id}
                          checked={selectedGroups.includes(group.id)}
                          onCheckedChange={() => handleGroupToggle(group.id)}
                        />
                        <Label htmlFor={group.id} className="font-normal">{group.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Permission Level</Label>
                  <RadioGroup
                    value={permissionLevel}
                    onValueChange={setPermissionLevel}
                    className="mt-3 space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="view" id="view" />
                      <Label htmlFor="view">View Only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comment" id="comment" />
                      <Label htmlFor="comment">View & Comment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="edit" id="edit" />
                      <Label htmlFor="edit">View & Edit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin">Full Access</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setStep("create")} className="mr-2">
                  Back
                </Button>
                <Button type="submit" disabled={selectedGroups.length === 0}>
                  Finish
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === "success" && (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-center">Document Created Successfully</h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              "{documentTitle || fileName}" has been created and shared with {selectedGroups.length} group(s).
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
