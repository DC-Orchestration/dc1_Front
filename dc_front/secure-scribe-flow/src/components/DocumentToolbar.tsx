
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Table,
  Heading1,
  Heading2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ToolbarButton = ({
  icon: Icon,
  tooltip,
  onClick,
}: {
  icon: React.ElementType;
  tooltip: string;
  onClick?: () => void;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onClick}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const DocumentToolbar = () => {
  return (
    <div className="flex items-center space-x-1 bg-slate-50 rounded-md border p-1">
      <ToolbarButton icon={Bold} tooltip="Bold" />
      <ToolbarButton icon={Italic} tooltip="Italic" />
      <ToolbarButton icon={Underline} tooltip="Underline" />
      <div className="h-4 w-px bg-slate-200 mx-1" />
      <ToolbarButton icon={Heading1} tooltip="Heading 1" />
      <ToolbarButton icon={Heading2} tooltip="Heading 2" />
      <div className="h-4 w-px bg-slate-200 mx-1" />
      <ToolbarButton icon={List} tooltip="Bullet List" />
      <ToolbarButton icon={ListOrdered} tooltip="Numbered List" />
      <div className="h-4 w-px bg-slate-200 mx-1" />
      <ToolbarButton icon={Table} tooltip="Insert Table" />
    </div>
  );
};

export default DocumentToolbar;
