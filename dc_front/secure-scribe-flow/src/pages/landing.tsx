
import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Lock, Users, History } from "lucide-react"

import LampDemo from "@/components/lamp-demo"
import CardSpotlightDemo from "@/components/card-spotlight-demo"

export default function LandingPage() {
  const router = useRouter()
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Hero Section with Lamp Effect */}
      <section className="relative w-full">
        <LampDemo />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Secure Document Orchestration
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8"
          >
            Military-grade encryption with blockchain audit trails for regulated industries
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 rounded-md text-lg"
              onClick={() => router.push("/login")}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span>Get Started</span>
              <ArrowRight className={`ml-2 transition-transform duration-300 ${isHovering ? "translate-x-1" : ""}`} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Enterprise-Grade Security Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Lock className="h-10 w-10 text-cyan-500" />}
              title="End-to-End Encryption"
              description="Files encrypted in browser, never stored in plaintext. Military-grade protection for your sensitive documents."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-cyan-500" />}
              title="Real-Time Collaboration"
              description="Live collaborative editing with fine-grained permissions by role. Work together securely."
            />
            <FeatureCard
              icon={<History className="h-10 w-10 text-cyan-500" />}
              title="Immutable Audit Trail"
              description="Every action hashed and stored in a blockchain-based audit log chain for complete transparency."
            />
          </div>
        </div>
      </section>

      {/* Security Section with Card Spotlight */}
      <section className="py-20 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Compliance & Security First</h2>
              <p className="text-slate-300 mb-8">
                Our platform is designed for industries with the highest security requirements. With eIDAS-compliant
                signatures, role-based access control, and AI-powered compliance assistance, we ensure your documents
                meet regulatory standards.
              </p>
              <ul className="space-y-4">
                <SecurityFeature text="eIDAS-Compliant Digital Signatures" />
                <SecurityFeature text="Role-Based Access Control" />
                <SecurityFeature text="AI-Powered Compliance Assistance" />
                <SecurityFeature text="Integration with Enterprise Systems" />
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <CardSpotlightDemo />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Secure Your Documents?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Join leading organizations in banking, insurance, and legal industries who trust our platform for their most
            sensitive documents.
          </p>
          <Button
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 rounded-md text-lg"
            onClick={() => router.push("/login")}
          >
            <span>Get Started Now</span>
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <FileText className="h-8 w-8 text-cyan-500 mr-2" />
            <span className="text-white text-xl font-bold">DC Orchestration</span>
          </div>
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} DC Orchestration. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  )
}

const SecurityFeature = ({ text }: { text: string }) => {
  return (
    <li className="flex items-start gap-3">
      <div className="rounded-full bg-cyan-500/20 p-1 mt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-cyan-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <span className="text-slate-300">{text}</span>
    </li>
  )
}
