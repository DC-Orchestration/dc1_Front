
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  ChevronDown, 
  Clock, 
  Download, 
  History, 
  Lock, 
  Plus, 
  Save, 
  Share, 
  UserPlus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import DocumentToolbar from "@/components/DocumentToolbar";
import ShareDialog from "@/components/ShareDialog";
import AuditTrail from "@/components/AuditTrail";

// Mock document data based on ID
const mockDocumentData = {
  "doc-1": {
    id: "doc-1",
    title: "Q2 Compliance Report",
    content: "# Q2 Compliance Report\n\nThis report outlines our compliance efforts for Q2 of fiscal year 2025.\n\n## Executive Summary\n\nDuring Q2, our organization maintained a strong compliance posture across all regulated activities. Key highlights include:\n\n- Successfully completed all scheduled compliance audits\n- Addressed 100% of findings from previous audits\n- Implemented enhanced data protection measures\n- Updated all compliance policies in line with new regulations\n\n## Risk Assessment\n\nOur quarterly risk assessment identified the following areas of focus:\n\n1. Third-party vendor management\n2. Customer data handling procedures\n3. Regulatory reporting timeliness\n\n## Action Items\n\n- [ ] Review vendor compliance documentation\n- [ ] Update data retention policies\n- [ ] Schedule regulatory training for new hires",
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
    auditTrail: [
      { timestamp: "2025-05-01T15:30:00Z", user: "Alex Johnson", action: "Created document", section: "All" },
      { timestamp: "2025-05-01T15:45:00Z", user: "Alex Johnson", action: "Added Executive Summary", section: "Executive Summary" },
      { timestamp: "2025-05-01T16:15:00Z", user: "Sarah Miller", action: "Edited Risk Assessment", section: "Risk Assessment" },
      { timestamp: "2025-05-02T09:20:00Z", user: "Ryan Cooper", action: "Added Action Items", section: "Action Items" },
    ]
  },
  "doc-2": {
    id: "doc-2",
    title: "Client Onboarding Agreement",
    content: "# Client Onboarding Agreement\n\nThis Agreement is entered into as of the Effective Date by and between [Company Name] (\"Company\") and the client identified below (\"Client\").\n\n## 1. Services\n\nCompany agrees to provide Client with the following services: [Description of services]\n\n## 2. Term\n\nThis Agreement shall commence on the Effective Date and continue until terminated in accordance with Section 7.\n\n## 3. Fees and Payment\n\nClient agrees to pay Company the fees set forth in Exhibit A. All fees are due within thirty (30) days of invoice date.\n\n## 4. Confidentiality\n\nEach party agrees to maintain the confidentiality of the other party's Confidential Information and to not disclose such Confidential Information to any third party without prior written consent.\n\n## 5. Data Protection\n\nCompany shall implement appropriate technical and organizational measures to protect Client Data in accordance with applicable data protection laws.\n\n## 6. Limitation of Liability\n\nNeither party shall be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with this Agreement.\n\n## 7. Termination\n\nEither party may terminate this Agreement with thirty (30) days prior written notice to the other party.\n\n## 8. Governing Law\n\nThis Agreement shall be governed by the laws of [Jurisdiction].",
    status: "signed",
    lastUpdated: "2025-04-28T09:15:00Z",
    createdBy: {
      name: "Madison Lee",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ML",
    },
    collaborators: [
      { name: "Alex Johnson", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AJ" },
    ],
    auditTrail: [
      { timestamp: "2025-04-25T10:15:00Z", user: "Madison Lee", action: "Created document", section: "All" },
      { timestamp: "2025-04-26T14:20:00Z", user: "Alex Johnson", action: "Reviewed Section 4", section: "Confidentiality" },
      { timestamp: "2025-04-27T11:45:00Z", user: "Madison Lee", action: "Updated Section 5", section: "Data Protection" },
      { timestamp: "2025-04-28T09:15:00Z", user: "Madison Lee", action: "Signed document", section: "All" },
    ]
  },
  "doc-3": {
    id: "doc-3",
    title: "Risk Assessment Template",
    content: "# Risk Assessment Template\n\n## 1. Risk Identification\n\n| Risk ID | Risk Description | Risk Category | Risk Owner |\n|---------|------------------|---------------|------------|\n| R-001   | Data breach      | Security      | CISO       |\n| R-002   | System downtime  | Operational   | CTO        |\n| R-003   | Regulatory non-compliance | Compliance | Compliance Officer |\n\n## 2. Risk Analysis\n\n| Risk ID | Likelihood (1-5) | Impact (1-5) | Risk Score | Risk Level |\n|---------|------------------|--------------|------------|------------|\n| R-001   | 3                | 5            | 15         | High       |\n| R-002   | 4                | 4            | 16         | High       |\n| R-003   | 2                | 5            | 10         | Medium     |\n\n## 3. Risk Mitigation\n\n| Risk ID | Mitigation Strategy | Control Measures | Responsible Party | Due Date |\n|---------|---------------------|------------------|------------------|----------|\n| R-001   | Reduce | Implement encryption, access controls | Security Team | 2025-06-30 |\n| R-002   | Reduce | Implement redundancy, monitoring | IT Operations | 2025-07-15 |\n| R-003   | Accept | Regulatory monitoring program | Compliance Team | 2025-06-15 |\n\n## 4. Risk Monitoring\n\n| Risk ID | Key Risk Indicators | Monitoring Frequency | Reporting Method |\n|---------|---------------------|----------------------|------------------|\n| R-001   | Security incidents, Vulnerability scan results | Weekly | Dashboard |\n| R-002   | System uptime, Response time | Daily | Automated alerts |\n| R-003   | Compliance audit findings | Quarterly | Compliance report |",
    status: "draft",
    lastUpdated: "2025-04-25T14:20:00Z",
    createdBy: {
      name: "Taylor Swift",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TS",
    },
    collaborators: [],
    auditTrail: [
      { timestamp: "2025-04-25T14:20:00Z", user: "Taylor Swift", action: "Created document", section: "All" },
      { timestamp: "2025-04-25T14:35:00Z", user: "Taylor Swift", action: "Added Risk Identification table", section: "Risk Identification" },
      { timestamp: "2025-04-25T15:10:00Z", user: "Taylor Swift", action: "Added Risk Analysis table", section: "Risk Analysis" },
    ]
  },
  "doc-4": {
    id: "doc-4",
    title: "Data Processing Agreement",
    content: "# Data Processing Agreement\n\nThis Data Processing Agreement (\"DPA\") is entered into between the Controller and the Processor (as defined below) and forms part of the Agreement between the parties.\n\n## 1. Definitions\n\n**\\\"Controller\\\"** means the entity that determines the purposes and means of the processing of Personal Data.\n\n**\\\"Processor\\\"** means the entity that processes Personal Data on behalf of the Controller.\n\n**\\\"Personal Data\\\"** means any information relating to an identified or identifiable natural person.\n\n**\\\"Processing\\\"** means any operation or set of operations which is performed on Personal Data.\n\n**\\\"Data Subject\\\"** means the identified or identifiable natural person to whom the Personal Data relates.\n\n## 2. Processing of Personal Data\n\n2.1 The Processor shall process Personal Data only on documented instructions from the Controller.\n\n2.2 The Processor shall ensure that persons authorized to process the Personal Data have committed themselves to confidentiality.\n\n## 3. Security of Processing\n\n3.1 The Processor shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.\n\n3.2 The Processor shall notify the Controller without undue delay after becoming aware of a Personal Data breach.\n\n## 4. Sub-processors\n\n4.1 The Processor shall not engage another processor without prior specific or general written authorization of the Controller.\n\n## 5. Data Subject Rights\n\n5.1 The Processor shall assist the Controller in responding to requests from Data Subjects exercising their rights.\n\n## 6. Return or Deletion of Personal Data\n\n6.1 The Processor shall, at the choice of the Controller, delete or return all Personal Data to the Controller after the end of the provision of services relating to Processing.",
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
    auditTrail: [
      { timestamp: "2025-04-18T09:30:00Z", user: "Ryan Cooper", action: "Created document", section: "All" },
      { timestamp: "2025-04-19T13:45:00Z", user: "Madison Lee", action: "Edited Section 3", section: "Security of Processing" },
      { timestamp: "2025-04-20T10:20:00Z", user: "Sarah Miller", action: "Commented on Section 4", section: "Sub-processors" },
      { timestamp: "2025-04-20T11:05:00Z", user: "Ryan Cooper", action: "Submitted for review", section: "All" },
    ]
  }
};

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<any>(null);
  const [documentContent, setDocumentContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [showShareDialog, setShowShareDialog] = useState(false);

  useEffect(() => {
    if (id && mockDocumentData[id as keyof typeof mockDocumentData]) {
      const docData = mockDocumentData[id as keyof typeof mockDocumentData];
      setDocument(docData);
      setDocumentContent(docData.content);
      setDocumentTitle(docData.title);
    }
  }, [id]);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API save
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Document saved",
        description: `${documentTitle} has been saved successfully.`,
      });
    }, 1000);
  };

  if (!document) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/2 bg-slate-200 rounded mx-auto"></div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700">
            <Clock className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        );
      case "review":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        );
      case "signed":
        return (
          <Badge variant="outline" className="bg-green-50 text-success border-success">
            <Lock className="h-3 w-3 mr-1" />
            Signed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <Input
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="text-xl font-semibold border-transparent focus-visible:border-input px-0 w-auto"
                  readOnly={document.status === "signed"}
                />
                {getStatusBadge(document.status)}
              </div>
              <div className="text-sm text-slate-500 flex items-center mt-1">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Last edited on {new Date(document.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2 mr-2">
              <Avatar className="border-2 border-white">
                <AvatarImage src={document.createdBy.avatar} alt={document.createdBy.name} />
                <AvatarFallback>{document.createdBy.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {document.collaborators.slice(0, 2).map((collaborator: any, index: number) => (
                <Avatar key={index} className="border-2 border-white">
                  <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {document.collaborators.length > 2 && (
                <Avatar className="border-2 border-white bg-slate-100">
                  <AvatarFallback>+{document.collaborators.length - 2}</AvatarFallback>
                </Avatar>
              )}
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowShareDialog(true)}
              className="px-2"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Share
            </Button>

            <Button 
              variant="outline" 
              size="sm" 
              className="px-2"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>

            <Button 
              onClick={handleSave} 
              disabled={isSaving || document.status === "signed"}
              size="sm"
            >
              {isSaving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>

        <ShareDialog 
          isOpen={showShareDialog} 
          onClose={() => setShowShareDialog(false)}
          document={document}
        />

        <div className="bg-white border border-slate-200 shadow-sm rounded-lg">
          <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b">
              <div className="flex items-center justify-between px-4">
                <TabsList className="h-12">
                  <TabsTrigger value="editor" className="data-[state=active]:bg-transparent">
                    Editor
                  </TabsTrigger>
                  <TabsTrigger value="audit" className="data-[state=active]:bg-transparent">
                    <History className="h-4 w-4 mr-1" />
                    Audit Trail
                  </TabsTrigger>
                </TabsList>
                
                {activeTab === "editor" && document.status !== "signed" && (
                  <DocumentToolbar />
                )}
              </div>
            </div>
            
            <div className="p-4">
              <TabsContent value="editor" className="m-0">
                {document.status === "signed" ? (
                  <div className="prose prose-slate max-w-none p-4">
                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: documentContent.replace(/\n/g, '<br>') }} />
                  </div>
                ) : (
                  <textarea
                    value={documentContent}
                    onChange={(e) => setDocumentContent(e.target.value)}
                    className="w-full h-[500px] border-none focus:outline-none resize-none font-mono text-sm p-4"
                  />
                )}
              </TabsContent>
              
              <TabsContent value="audit" className="m-0">
                <AuditTrail auditTrail={document.auditTrail} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Editor;
