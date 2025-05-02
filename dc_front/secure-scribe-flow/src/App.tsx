
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import RecentDocuments from "./pages/RecentDocuments";
import StarredDocuments from "./pages/StarredDocuments";
import SharedDocuments from "./pages/SharedDocuments";
import ArchivedDocuments from "./pages/ArchivedDocuments";
import LegalDocuments from "./pages/LegalDocuments";
import ComplianceDocuments from "./pages/ComplianceDocuments";
import TeamsPage from "./pages/teams";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/document/:id" element={<Editor />} />
              <Route path="/recent" element={<RecentDocuments />} />
              <Route path="/starred" element={<StarredDocuments />} />
              <Route path="/shared" element={<SharedDocuments />} />
              <Route path="/archived" element={<ArchivedDocuments />} />
              <Route path="/legal" element={<LegalDocuments />} />
              <Route path="/teams" element={<TeamsPage/>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
