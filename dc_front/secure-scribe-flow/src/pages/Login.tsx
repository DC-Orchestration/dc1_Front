
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Fingerprint, Shield } from "lucide-react";

const Login = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState<"password" | "webauthn">("password");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === "password") {
      await login(email, password);
    } else {
      // In a real app, this would trigger WebAuthn
      console.log("WebAuthn login would be triggered here");
      await login("webauth@example.com", "mock-webauthn");
    }
  };

  const handleWebAuthnLogin = () => {
    setLoginMethod("webauthn");
    // This would trigger WebAuthn in a real implementation
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">SecureScribe</h1>
          <p className="text-slate-500 mt-1">Secure document collaboration for regulated industries</p>
        </div>
        
        <Card className="p-6 shadow-lg border-slate-200">
          <h2 className="text-xl font-semibold mb-6 text-center">Sign in to your account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMethod === "password" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 text-slate-400">
                      <User className="h-5 w-5" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 text-slate-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Authenticating..." : "Sign in"}
                </Button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">Or</span>
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleWebAuthnLogin}
                >
                  <Fingerprint className="mr-2 h-5 w-5" />
                  Login with WebAuthn
                </Button>
              </>
            ) : (
              <div className="text-center space-y-6 py-4">
                <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center animate-pulse">
                  <Fingerprint className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Biometric Authentication</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Use your device's biometric sensor to sign in securely
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Authenticate Now"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setLoginMethod("password")}
                >
                  Use password instead
                </Button>
              </div>
            )}
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">Don't have an account?</span>{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Request access
            </a>
          </div>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500 flex items-center justify-center">
            <Lock className="h-3 w-3 mr-1" /> Secure, encrypted connection
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
