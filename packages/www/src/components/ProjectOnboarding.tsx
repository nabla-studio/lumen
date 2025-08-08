import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Sun,
  MapPin,
  Calendar,
  Zap,
  Building,
  Users,
  Target,
  Shield,
  Wallet,
  Award,
  PlayCircle,
  Eye,
  Download,
  RefreshCw,
  Settings,
  Database,
  TrendingUp,
  Briefcase,
  Key,
  FileCheck,
  Signature
} from "lucide-react";

interface ProjectOnboardingProps {
  onClose: () => void;
}

export default function ProjectOnboarding({ onClose }: ProjectOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: "",
    constructionYear: "",
    capacity: "",
    location: "",
    spvType: "new",
    spvName: "",
    spvVAT: "",
    fundingTarget: "",
    deadline: "",
    walletAddress: ""
  });

  const [verificationStatus, setVerificationStatus] = useState({
    esiti: "pending",
    om: "pending",
    tennet: "pending",
    mise: "pending"
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    visura: false,
    photos: false,
    technical: false,
    enea: false
  });

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: "Welcome", icon: Sun, description: "Inizia il processo di candidatura" },
    { id: 2, title: "Plant Data", icon: Settings, description: "Inserisci informazioni tecniche" },
    { id: 3, title: "Document Verification", icon: FileCheck, description: "Controllo documenti" },
    { id: 4, title: "SPV & Identity", icon: Building, description: "Configurazione SPV" },
    { id: 5, title: "Nexcomply Onboarding", icon: Shield, description: "Due diligence e KYC" },
    { id: 6, title: "Fundraising", icon: TrendingUp, description: "Lancio su piattaforma" },
    { id: 7, title: "Validation", icon: Award, description: "Completamento processo" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 py-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
              <Sun className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Solar Plant Application</h2>
              <p className="text-muted-foreground">
                Start the process to apply your plant to SolarShare
              </p>
            </div>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Automated document verification</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Nexcomply integration for KYC</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Automatic NFT tokenization</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Launch on fundraising platform</span>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">Enter Plant Data</h2>
              <p className="text-muted-foreground">
                Provide the technical information of your solar plant
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="e.g., SolarPark North Milan"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="constructionYear">Year of Construction</Label>
                  <Input
                    id="constructionYear"
                    type="number"
                    placeholder="2023"
                    value={formData.constructionYear}
                    onChange={(e) => setFormData({ ...formData, constructionYear: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Plant Size (kWp)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="1500"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Milan, Lombardy"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Required Documentation</Label>
                  <div className="space-y-3 mt-2">
                    <Card className="p-3 border-dashed border-primary/30 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Upload className="w-4 h-4 text-primary" />
                          <span className="text-sm">Land Registry Report</span>
                        </div>
                        {uploadedFiles.visura ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Button size="sm" variant="outline">Upload</Button>
                        )}
                      </div>
                    </Card>

                    <Card className="p-3 border-dashed border-primary/30 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Upload className="w-4 h-4 text-primary" />
                          <span className="text-sm">Plant Photos</span>
                        </div>
                        {uploadedFiles.photos ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Button size="sm" variant="outline">Upload</Button>
                        )}
                      </div>
                    </Card>

                    <Card className="p-3 border-dashed border-primary/30 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Upload className="w-4 h-4 text-primary" />
                          <span className="text-sm">Technical Documentation</span>
                        </div>
                        {uploadedFiles.technical ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Button size="sm" variant="outline">Upload</Button>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">Document Verification</h2>
              <p className="text-muted-foreground">
                Automated check of documents and authorizations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="card-glow p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Status</h3>
                      <p className="text-sm text-muted-foreground">Authorization Check</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(verificationStatus.esiti)}>
                    {getStatusIcon(verificationStatus.esiti)}
                    <span className="ml-1 capitalize">{verificationStatus.esiti}</span>
                  </Badge>
                </div>
              </Card>

              <Card className="card-glow p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">O&M</h3>
                      <p className="text-sm text-muted-foreground">Operation & Maintenance</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(verificationStatus.om)}>
                    {getStatusIcon(verificationStatus.om)}
                    <span className="ml-1 capitalize">{verificationStatus.om}</span>
                  </Badge>
                </div>
              </Card>

              <Card className="card-glow p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">TenneT</h3>
                      <p className="text-sm text-muted-foreground">Grid Connection</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(verificationStatus.tennet)}>
                    {getStatusIcon(verificationStatus.tennet)}
                    <span className="ml-1 capitalize">{verificationStatus.tennet}</span>
                  </Badge>
                </div>
              </Card>

              <Card className="card-glow p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">MISE</h3>
                      <p className="text-sm text-muted-foreground">Ministry of Economic Development</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(verificationStatus.mise)}>
                    {getStatusIcon(verificationStatus.mise)}
                    <span className="ml-1 capitalize">{verificationStatus.mise}</span>
                  </Badge>
                </div>
              </Card>
            </div>

            <Card className="card-glow p-4 bg-blue-500/5 border-blue-500/20">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-400">Verification Process</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The system is automatically verifying your documentation. This process may take 24–48 hours to complete.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">SPV & Identity</h2>
              <p className="text-muted-foreground">
                Set up the Special Purpose Vehicle for your project
              </p>
            </div>

            <Card className="card-glow p-6">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold">SPV Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <Card
                      className={`p-4 cursor-pointer transition-all border-2 ${formData.spvType === 'new'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                        }`}
                      onClick={() => setFormData({ ...formData, spvType: 'new' })}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">New SPV</h3>
                          <p className="text-sm text-muted-foreground">Create a new company</p>
                        </div>
                      </div>
                    </Card>

                    <Card
                      className={`p-4 cursor-pointer transition-all border-2 ${formData.spvType === 'existing'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                        }`}
                      onClick={() => setFormData({ ...formData, spvType: 'existing' })}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Existing SPV</h3>
                          <p className="text-sm text-muted-foreground">Use an existing company</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="spvName">SPV Details</Label>
                    <Input
                      id="spvName"
                      placeholder="SPV Name: Solar Energy S.r.l."
                      value={formData.spvName}
                      onChange={(e) => setFormData({ ...formData, spvName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="spvVAT">VAT Number</Label>
                    <Input
                      id="spvVAT"
                      placeholder="IT12345678901"
                      value={formData.spvVAT}
                      onChange={(e) => setFormData({ ...formData, spvVAT: e.target.value })}
                    />
                  </div>
                </div>

                {formData.spvType === 'existing' && (
                  <Card className="bg-green-500/5 border-green-500/20 p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="font-semibold text-green-400">Integrazione Nexcomply Rilevata</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      I dati della SPV verranno popolati automaticamente dal sistema Nexcomply.
                    </p>
                  </Card>
                )}
              </div>
            </Card>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">Nexcomply Onboarding</h2>
              <p className="text-muted-foreground">
                Automated process for due diligence and SPV creation
              </p>
            </div>

            <div className="space-y-4">
              <Card className="card-glow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Due Diligence</h3>
                      <p className="text-sm text-muted-foreground">KYC and identity verification</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Completed
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
              </Card>

              <Card className="card-glow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">SPV Creation</h3>
                      <p className="text-sm text-muted-foreground">Digital signature and incorporation</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400">
                    <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                    In Progress
                  </Badge>
                </div>
                <Progress value={65} className="h-2" />
              </Card>

              <Card className="card-glow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">NFT Issuance</h3>
                      <p className="text-sm text-muted-foreground">Tokenized SPV shares</p>
                    </div>
                  </div>
                  <Badge className="bg-gray-500/20 text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    Pending
                  </Badge>
                </div>
                <Progress value={0} className="h-2" />
              </Card>

              <Card className="card-glow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Signature className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">SFP/UNIT Signing</h3>
                      <p className="text-sm text-muted-foreground">Contracts and legal documents</p>
                    </div>
                  </div>
                  <Badge className="bg-gray-500/20 text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    Pending
                  </Badge>
                </div>
                <Progress value={0} className="h-2" />
              </Card>
            </div>

            <Card className="bg-blue-500/5 border-blue-500/20 p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-400">Automated Process</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The Nexcomply system automatically handles all legal and bureaucratic steps.
                    You will receive notifications for each completed step.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">Fundraising</h2>
              <p className="text-muted-foreground">
                Set up the fundraising campaign for your project              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fundingTarget">Fundraising Target ($)</Label>
                  <Input
                    id="fundingTarget"
                    type="number"
                    placeholder="1250000"
                    value={formData.fundingTarget}
                    onChange={(e) => setFormData({ ...formData, fundingTarget: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Campaign Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>

              <Card className="card-glow p-4">
                <h3 className="font-semibold mb-3">Project Card Preview</h3>
                <div className="space-y-3">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Sun className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Project Image</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{formData.projectName || "Project Name"}</h4>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {formData.location || "Location"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Goal</span>
                      <span className="font-semibold">€{formData.fundingTarget || "0"}</span>
                    </div>
                    <Progress value={0} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$0 raised</span>
                      <span>0 investors</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="bg-green-500/5 border-green-500/20 p-6">
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Ready for Launch</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your project will be added to the Launchpad section and will be visible to all investors.
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span>Access to 15,000+ investors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>Real-time analytics dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );

      case 7:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">Plant Validation</h2>
              <p className="text-muted-foreground">
                Finalization process and monitoring activation
              </p>
            </div>

            <div className="space-y-4">
              <Card className="card-glow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Upload className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Upload ENEA/GSE</h3>
                      <p className="text-sm text-muted-foreground">Energy certifications</p>
                    </div>
                  </div>
                  {uploadedFiles.enea ? (
                    <Badge className="bg-green-500/20 text-green-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Uploaded
                    </Badge>
                  ) : (
                    <Button size="sm" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  )}
                </div>
              </Card>

              <Card className="card-glow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Sync SCADA</h3>
                      <p className="text-sm text-muted-foreground">Automated production</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Connected
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Monitoring system successfully connected</p>
                  <p>Real-time production data is active</p>
                </div>
              </Card>

              <Card className="card-glow p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Payment Receiving Wallet</h3>
                      <p className="text-sm text-muted-foreground">Address to receive dividends</p>
                    </div>
                  </div>
                  <Input
                    placeholder="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
                    value={formData.walletAddress}
                    onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  />
                </div>
              </Card>

              <Card className="card-glow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">SFP Contract Signing</h3>
                      <p className="text-sm text-muted-foreground">Final agreement</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                    <Signature className="w-4 h-4 mr-2" />
                    Digital Signature
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="bg-green-500/5 border-green-500/20 p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400">Validation Completed!</h3>
                  <p className="text-muted-foreground">
                    Your plant has been successfully validated and will be visible on the marketplace.
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Go to Project
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-card w-full max-w-4xl max-h-[90vh] rounded-xl border border-border shadow-2xl overflow-y-scroll overflow-x-hidden"
      >
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold gradient-text">Project Onboarding</h1>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps Timeline */}
          <div className="mt-6 hidden md:flex items-center justify-between overflow-x-scroll">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= step.id
                    ? 'border-primary bg-primary/20'
                    : 'border-muted-foreground bg-muted'
                    }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium">{step.title}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
              >
                Complete Onboarding
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}