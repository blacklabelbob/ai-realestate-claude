"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { toast } from "sonner";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Sparkles } from "@/components/aceternity/sparkles";
import { fireSuccessConfetti } from "@/components/magicui/confetti";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const demoData = {
  address: "1234 Maple Street, Austin TX 78701",
  score: 84,
  grade: "B+",
  signal: "BUY",
  categories: [
    { label: "Comps", value: 88, color: "bg-[#1a2332]" },
    { label: "Income", value: 76, color: "bg-forest" },
    { label: "Neighborhood", value: 82, color: "bg-gold" },
    { label: "Investment", value: 79, color: "bg-[#4a6fa5]" },
    { label: "Market", value: 71, color: "bg-[#5a9a6e]" },
  ],
};

export function LiveDemo() {
  const [address, setAddress] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error("Please enter an address");
      return;
    }

    setIsAnalyzing(true);
    setShowResults(false);

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      if (demoData.score >= 80) {
        fireSuccessConfetti();
      }
    }, 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    toast.success("Check your inbox! Your PDF report is on the way.");
    setEmailDialogOpen(false);
    setEmail("");
  };

  return (
    <section id="demo" className="relative py-24 overflow-hidden bg-navy">
      <BackgroundBeams className="opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream text-balance"
          >
            Try It Live — Enter Any US Address
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-cream/60 max-w-2xl mx-auto"
          >
            Real data. Real scores. No signup required for your first 3 analyses.
          </motion.p>
        </div>

        {/* Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-2xl border border-white/10 bg-card p-6 sm:p-8 shadow-2xl">
            <BorderBeam size={300} duration={15} />

            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Address input */}
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="123 Main St, City, State ZIP..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="h-14 pl-12 text-lg bg-background/50 border-border"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="gold"
                      size="xl"
                      className="w-full"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Search className="h-5 w-5" />
                          </motion.span>
                          Analyzing...
                        </span>
                      ) : (
                        "Get My Score"
                      )}
                    </Button>

                    {/* Loading skeleton */}
                    {isAnalyzing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 pt-4"
                      >
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                        <Skeleton className="h-20 w-32 mx-auto rounded-xl" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Address shown */}
                  <p className="text-sm font-mono text-muted-foreground text-center">
                    {address || demoData.address}
                  </p>

                  {/* Score display */}
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-4">
                      <span className="font-mono text-8xl lg:text-9xl font-bold text-forest">
                        <NumberTicker value={demoData.score} />
                      </span>
                      <Sparkles>
                        <Badge
                          variant="gold"
                          className="text-2xl px-4 py-2 font-bold"
                        >
                          {demoData.grade}
                        </Badge>
                      </Sparkles>
                    </div>

                    <Badge variant="success" className="px-6 py-2 text-base">
                      {demoData.signal} SIGNAL
                    </Badge>
                  </div>

                  {/* Category breakdowns */}
                  <div className="space-y-3 pt-4">
                    {demoData.categories.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-sm text-muted-foreground w-28">
                          {item.label}
                        </span>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`h-full ${item.color} rounded-full`}
                          />
                        </div>
                        <span className="text-sm font-mono text-muted-foreground w-10">
                          {item.value}%
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <ShimmerButton
                      onClick={() => setEmailDialogOpen(true)}
                      shimmerColor="#c9982e"
                      className="flex-1 text-cream"
                    >
                      Email Me the Full PDF Report
                    </ShimmerButton>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowResults(false);
                        setAddress("");
                      }}
                      className="text-cream/60 hover:text-cream"
                    >
                      Analyze Another
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Email capture dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Your Full Report</DialogTitle>
            <DialogDescription>
              {`We'll send a detailed 6-page PDF analysis to your inbox.`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" variant="gold" className="w-full">
              Send My Report
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
