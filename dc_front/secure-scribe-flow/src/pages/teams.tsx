import { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Shield,
  Mail,
  Pencil,
  Trash2,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: number;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'pending';
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Legal Department',
    description: 'Team responsible for legal document review and compliance',
    members: [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'member', status: 'active' },
      { id: '3', name: 'Alice Johnson', email: 'alice@example.com', role: 'member', status: 'pending' }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30 // 30 days ago
  },
  {
    id: '2',
    name: 'Finance Team',
    description: 'Financial document management and reporting team',
    members: [
      { id: '4', name: 'Bob Wilson', email: 'bob@example.com', role: 'admin', status: 'active' },
      { id: '5', name: 'Carol Brown', email: 'carol@example.com', role: 'member', status: 'active' }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15 // 15 days ago
  }
];

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteRole, setInviteRole] = useState<'member' | 'admin'>('member');
  
  const handleCreateTeam = () => {
    if (!newTeamName.trim()) return;
    
    const newTeam: Team = {
      id: String(Date.now()),
      name: newTeamName,
      description: newTeamDescription,
      members: [],
      createdAt: Date.now()
    };
    
    setTeams([...teams, newTeam]);
    setIsCreateDialogOpen(false);
    setNewTeamName('');
    setNewTeamDescription('');
  };
  
  const handleInviteMembers = () => {
    if (!selectedTeam || !inviteEmails.trim()) return;
    
    const emails = inviteEmails
      .split(',')
      .map(email => email.trim())
      .filter(Boolean);
    
    const updatedTeams = teams.map(team => {
      if (team.id === selectedTeam.id) {
        const newMembers = emails.map(email => ({
          id: String(Date.now() + Math.random()),
          name: email.split('@')[0],
          email,
          role: inviteRole,
          status: 'pending' as const
        }));
        
        return {
          ...team,
          members: [...team.members, ...newMembers]
        };
      }
      return team;
    });
    
    setTeams(updatedTeams);
    setIsInviteDialogOpen(false);
    setInviteEmails('');
    setInviteRole('member');
  };

  const handleDeleteTeam = () => {
    if (!selectedTeam) return;
    
    setTeams(teams.filter(team => team.id !== selectedTeam.id));
    setIsDeleteAlertOpen(false);
    setSelectedTeam(null);
  };
  
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Teams</h1>
          <p className="text-slate-500">Manage your organization's teams and members</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            New Team
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="relative flex-1 mb-4 md:mb-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search teams..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200">
            {filteredTeams.map(team => (
              <div key={team.id} className="p-4 hover:bg-slate-50 transition">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between sm:justify-start gap-2">
                      <h3 className="text-lg font-medium text-slate-900">{team.name}</h3>
                      <Badge variant="outline" className="ml-2">
                        {team.members.length} {team.members.length === 1 ? 'member' : 'members'}
                      </Badge>
                    </div>
                    <p className="text-slate-500 text-sm mt-1 mb-2">{team.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-slate-500">Created {formatDate(team.createdAt)}</span>
                      <div className="flex items-center text-slate-500">
                        <Shield className="h-4 w-4 mr-1.5 text-slate-400" />
                        {team.members.filter(m => m.role === 'admin').length} admins
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTeam(team);
                        setIsInviteDialogOpen(true);
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit Team
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500"
                          onClick={() => {
                            setSelectedTeam(team);
                            setIsDeleteAlertOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Team
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex -space-x-2 mr-2">
                      {team.members.slice(0, 5).map(member => (
                        <Avatar key={member.id} className="border-2 border-white">
                          <AvatarFallback 
                            className={member.status === 'pending' 
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-primary-50 text-primary-700'
                            }
                          >
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {team.members.length > 5 && (
                        <Avatar className="border-2 border-white">
                          <AvatarFallback className="bg-slate-100 text-slate-700">
                            +{team.members.length - 5}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    
                    {team.members.some(m => m.status === 'pending') && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                        Pending invites
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredTeams.length === 0 && (
              <div className="p-8 text-center">
                <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-1">No teams found</h3>
                <p className="text-slate-500 mb-4">
                  {searchQuery
                    ? `No teams match "${searchQuery}"`
                    : "Get started by creating your first team"}
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create new team
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Create Team Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>
              Create a team to organize users and manage document access permissions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                placeholder="Enter team name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team-description">Description</Label>
              <Textarea
                id="team-description"
                placeholder="Describe the team's purpose"
                className="min-h-24"
                value={newTeamDescription}
                onChange={(e) => setNewTeamDescription(e.target.value)}
              />
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-2">
              <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">Team Security</p>
                <p className="text-xs text-slate-600">
                  Team members will have access to shared documents and resources. 
                  Make sure to add trusted members only.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTeam} disabled={!newTeamName.trim()}>
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite Members Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
            <DialogDescription>
              {selectedTeam ? `Add new members to ${selectedTeam.name}` : 'Add new team members'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="member-emails">Email Addresses</Label>
              <Textarea
                id="member-emails"
                placeholder="Enter email addresses (comma separated)"
                className="min-h-24"
                value={inviteEmails}
                onChange={(e) => setInviteEmails(e.target.value)}
              />
              <p className="text-xs text-slate-500">
                Separate multiple email addresses with commas
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Access Level</Label>
              <RadioGroup value={inviteRole} onValueChange={(value) => setInviteRole(value as 'member' | 'admin')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="member" id="member" />
                  <Label htmlFor="member">Team Member</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Team Admin</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-2">
              <Mail className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">Invitation Notice</p>
                <p className="text-xs text-slate-600">
                  Invited members will receive an email with instructions to join the team.
                  They must have a SecureDoc account or create one.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsInviteDialogOpen(false);
                setInviteEmails('');
                setInviteRole('member');
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleInviteMembers}
              disabled={!inviteEmails.trim()}
            >
              Send Invites
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Team Alert */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the team
              {selectedTeam ? ` "${selectedTeam.name}"` : ''} and remove all members' access
              to team resources.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTeam} className="bg-red-500 hover:bg-red-600">
              Delete Team
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}