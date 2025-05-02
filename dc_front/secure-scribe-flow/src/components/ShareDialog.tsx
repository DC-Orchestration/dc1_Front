
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Copy, Lock, Mail, Shield, X } from "lucide-react";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: any;
}

const ShareDialog = ({ isOpen, onClose, document }: ShareDialogProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [publicLink, setPublicLink] = useState(false);

  const handleInvite = () => {
    if (email) {
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${email}.`,
      });
      setEmail("");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://securescribe.example/document/${document.id}`);
    toast({
      title: "Link copied",
      description: "The document link has been copied to the clipboard.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Document</DialogTitle>
          <DialogDescription>
            Invite others to collaborate on this document.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-start gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="text-sm">
              <h3 className="font-medium">Secure Sharing</h3>
              <p className="text-muted-foreground text-xs">All access is logged and can be revoked at any time.</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={document.createdBy.avatar} alt={document.createdBy.name} />
              <AvatarFallback>{document.createdBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm flex-1">
              <p className="font-medium">{document.createdBy.name}</p>
              <p className="text-muted-foreground text-xs">Owner</p>
            </div>
          </div>

          {document.collaborators.map((collaborator: any, index: number) => (
            <div className="flex gap-2" key={index}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm flex-1">
                <p className="font-medium">{collaborator.name}</p>
                <p className="text-muted-foreground text-xs">Editor</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Add people
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  placeholder="Email address"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="commenter">Commenter</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleInvite}>Invite</Button>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="space-y-0.5">
                <Label className="text-sm">Anyone with the link</Label>
                <p className="text-xs text-muted-foreground">
                  {publicLink ? "Anyone with the link can view" : "Only invited people can access"}
                </p>
              </div>
              <Switch
                checked={publicLink}
                onCheckedChange={setPublicLink}
                disabled={document.status === "signed"}
              />
            </div>

            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  readOnly
                  value={`https://securescribe.example/document/${document.id}`}
                  className="pl-10 pr-20 bg-slate-50"
                />
                <Button
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 text-xs px-2"
                  onClick={handleCopyLink}
                >
                  <Copy className="h-3 w-3 mr-1" /> Copy
                </Button>
              </div>
            </div>

            {document.status === "signed" && (
              <div className="mt-4 text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200 flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>This document has been signed and is read-only. Collaborator access is limited to viewing only.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
