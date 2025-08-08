import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { motion } from "motion/react";
import { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Wallet,
  Building2,
  Users,
  Vote,
  TrendingUp,
  DollarSign,
  Zap,
  Shield,
  ExternalLink,
  Copy,
  Activity,
  Coins,
  Timer,
  Target,
  MapPin,
  Award,
  BarChart3,
  PieChart,
  ArrowUpDown,
  ShoppingCart,
  Gavel,
  Plus,
  Minus,
  Tag,
  Eye,
  Heart,
  Share2,
  Settings,
  Camera,
  Upload,
  ChevronDown,
  Info,
  Star,
  TrendingDown,
  History as HistoryIcon
} from "lucide-react";

interface SPVTokenomicsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: any;
}

export default function SPVTokenomics({ isOpen, onClose, selectedProject }: SPVTokenomicsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Sell/Auction state
  const [sellType, setSellType] = useState<"fixed" | "auction">("fixed");
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isListing, setIsListing] = useState(false);
  const [listingForm, setListingForm] = useState({
    title: "",
    description: "",
    price: "",
    startingPrice: "",
    reservePrice: "",
    duration: "7", // days
    category: "energy",
    rarity: "common",
    instantSale: false,
    featured: false
  });

  // Calcola costi e ricavi
  const calculateListingCosts = () => {
    const basePrice = parseFloat(sellType === "fixed" ? listingForm.price : listingForm.startingPrice) || 0;
    const marketplaceFee = basePrice * 0.025; // 2.5%
    const gasFee = 0.01;
    const featuredFee = listingForm.featured ? 0.1 : 0;
    const totalFees = marketplaceFee + gasFee + featuredFee;
    const netReceived = basePrice - totalFees;

    return {
      basePrice,
      marketplaceFee,
      gasFee,
      featuredFee,
      totalFees,
      netReceived: Math.max(0, netReceived)
    };
  };

  // Valida il form
  const validateForm = () => {
    if (!selectedNFT) return false;
    if (!listingForm.title.trim()) return false;
    if (sellType === "fixed" && (!listingForm.price || parseFloat(listingForm.price) <= 0)) return false;
    if (sellType === "auction" && (!listingForm.startingPrice || parseFloat(listingForm.startingPrice) <= 0)) return false;
    return true;
  };

  // Simula il processo di listing
  const handleCreateListing = async () => {
    if (!validateForm()) return;

    setIsListing(true);
    // Simula chiamata API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsListing(false);

    // Reset form dopo successo
    setListingForm({
      title: "",
      description: "",
      price: "",
      startingPrice: "",
      reservePrice: "",
      duration: "7",
      category: "energy",
      rarity: "common",
      instantSale: false,
      featured: false
    });
    setSelectedNFT(null);
  };

  if (!selectedProject) return null;

  // Dati del reward flow timeline
  const rewardFlowSteps = [
    {
      id: 1,
      title: "Incasso Energia",
      status: "completed",
      date: "15 Gennaio 2025",
      amount: "10.000€ ricevuti da GSE",
      description: "Pagamento mensile dal Gestore Servizi Energetici",
      icon: CheckCircle,
      color: "text-green-400"
    },
    {
      id: 2,
      title: "Sync On-Chain",
      status: "in-progress",
      date: "18 Gennaio 2025",
      amount: "Conversione in USDC",
      description: "Trasferimento automatico su blockchain",
      icon: RefreshCw,
      color: "text-yellow-400"
    },
    {
      id: 3,
      title: "Claim Disponibile",
      status: "pending",
      date: "20 Gennaio 2025",
      amount: "Reward distribuibili",
      description: "Ricompense pronte per il claim degli investitori",
      icon: Clock,
      color: "text-blue-400"
    }
  ];

  // Dati votazioni DAO
  const daoProposals = [
    {
      id: 1,
      title: "Upgrade Sistema Monitoraggio",
      description: "Proposta per aggiornare il sistema di monitoraggio IoT con sensori di nuova generazione",
      status: "active",
      endDate: "02/02/2025",
      votes: { yes: 1247, no: 234, abstain: 89 },
      quorum: 75,
      type: "technical"
    },
    {
      id: 2,
      title: "Distribuzione Extra Dividendi",
      description: "Proposta per distribuire dividendi extra dal surplus di produzione Q4 2024",
      status: "active",
      endDate: "28/01/2025",
      votes: { yes: 2156, no: 445, abstain: 178 },
      quorum: 85,
      type: "financial"
    },
    {
      id: 3,
      title: "Espansione Capacità +500kW",
      description: "Proposta per espandere la capacità dell'impianto con nuovi pannelli solari",
      status: "upcoming",
      endDate: "15/02/2025",
      votes: { yes: 0, no: 0, abstain: 0 },
      quorum: 0,
      type: "expansion"
    }
  ];

  // Dati portafoglio utente
  const userPortfolio = {
    nfts: [
      { id: 1, type: "5.000€", quantity: 2, value: "10.000€", status: "active" },
      { id: 2, type: "500€", quantity: 1, value: "500€", status: "active" }
    ],
    totalInvestment: "10.500€",
    availableRewards: "99.00 USDC",
    claimStatus: "not-available"
  };

  // Dati OnChain vs OffChain
  const chainStatus = {
    offChain: {
      amount: "10.000€",
      lastUpdate: "2h fa",
      description: "Fondi ricevuti (conto SPV)"
    },
    onChain: {
      amount: "9.000 USDC",
      status: "Smart contract attivo",
      description: "Fondi convertiti in RewardPool"
    },
    synchronization: 90,
    pendingTransfer: "1.000€"
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400">Completato</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-500/20 text-yellow-400">In corso</Badge>;
      case "pending":
        return <Badge className="bg-blue-500/20 text-blue-400">In attesa</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getProposalIcon = (type: string) => {
    switch (type) {
      case "technical":
        return <Zap className="w-5 h-5" />;
      case "financial":
        return <DollarSign className="w-5 h-5" />;
      case "expansion":
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Vote className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold gradient-text">{selectedProject.name}</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedProject.location}</span>
                  <Badge variant="secondary">{selectedProject.capacity}</Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Panoramica completa della tokenomics SPV, rewards, governance DAO e informazioni societarie per il progetto {selectedProject.name}.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="governance">DAO</TabsTrigger>
            <TabsTrigger value="company">Società</TabsTrigger>
            <TabsTrigger value="sell">Sell/Auction</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* OnChain vs OffChain Status */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowUpDown className="w-5 h-5 mr-2" />
                  OnChain vs OffChain Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Fondi ricevuti (conto SPV)</span>
                    </div>
                    <div className="text-3xl font-bold">{chainStatus.offChain.amount}</div>
                    <div className="text-sm text-muted-foreground">
                      Off-chain • Ultimo aggiornamento: {chainStatus.offChain.lastUpdate}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Coins className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Fondi convertiti in RewardPool</span>
                    </div>
                    <div className="text-3xl font-bold text-accent">{chainStatus.onChain.amount}</div>
                    <div className="text-sm text-muted-foreground">
                      On-chain • {chainStatus.onChain.status}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Sincronizzazione</span>
                    <span className="text-sm font-semibold">{chainStatus.synchronization}%</span>
                  </div>
                  <Progress value={chainStatus.synchronization} className="h-2" />

                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">Parziale - In attesa trasferimento</span>
                      <span className="text-sm font-semibold">{chainStatus.pendingTransfer} in pendenza →</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Il Tuo Portafoglio */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    Il Tuo Portafoglio
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Connesso</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Wallet Address</span>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm">0xF34...A91c</code>
                        <Button size="sm" variant="ghost">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-green-400" />
                      <span className="font-semibold">NFT Posseduti</span>
                    </div>

                    {userPortfolio.nfts.map((nft) => (
                      <div key={nft.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Award className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold">{nft.quantity}x NFT {nft.type}</div>
                            <div className="text-sm text-muted-foreground">Valore: {nft.value}</div>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">Attivo</Badge>
                      </div>
                    ))}

                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Investimento Totale</span>
                        <span className="text-xl font-bold text-accent">{userPortfolio.totalInvestment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6 mt-6">
            {/* Reward Flow Timeline */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Reward Flow Timeline
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400">Ciclo Mensile</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {rewardFlowSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-4 relative"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
                          <Icon className={`w-5 h-5 ${step.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{step.title}</h4>
                            {getStatusBadge(step.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{step.date}</p>
                          <p className="font-medium text-primary">{step.amount}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        {index < rewardFlowSteps.length - 1 && (
                          <div className="absolute left-5 mt-10 w-px h-8 bg-border"></div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold">Prossima Finestra di Claim</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">3d 14h</div>
                      <div className="text-sm text-muted-foreground">70% del ciclo completato</div>
                    </div>
                  </div>
                  <Progress value={70} className="mt-3 h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Reward Disponibili */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Reward Disponibili
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-accent">{userPortfolio.availableRewards}</div>
                  <p className="text-muted-foreground">
                    Calcolato sui tuoi NFT per il periodo corrente
                  </p>
                  <Button disabled className="w-full" variant="outline">
                    Claim Non Disponibile
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Attendi il completamento della sincronizzazione
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 gap-6">
              {daoProposals.map((proposal, index) => (
                <motion.div
                  key={proposal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="card-glow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${proposal.type === 'technical' ? 'bg-blue-500/20' :
                            proposal.type === 'financial' ? 'bg-green-500/20' :
                              'bg-purple-500/20'
                            }`}>
                            {getProposalIcon(proposal.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{proposal.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {proposal.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="secondary"
                            className={proposal.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}
                          >
                            {proposal.status === 'active' ? 'Attiva' : 'In arrivo'}
                          </Badge>
                          <div className="text-right text-sm">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{proposal.endDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {proposal.status === 'active' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center p-3 bg-green-500/10 rounded-lg">
                              <div className="font-semibold text-green-400">{proposal.votes.yes.toLocaleString()}</div>
                              <div className="text-muted-foreground">Favorevoli</div>
                            </div>
                            <div className="text-center p-3 bg-red-500/10 rounded-lg">
                              <div className="font-semibold text-red-400">{proposal.votes.no.toLocaleString()}</div>
                              <div className="text-muted-foreground">Contrari</div>
                            </div>
                            <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                              <div className="font-semibold text-yellow-400">{proposal.votes.abstain.toLocaleString()}</div>
                              <div className="text-muted-foreground">Astenuti</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Quorum</span>
                              <span className="font-semibold">{proposal.quorum}%</span>
                            </div>
                            <Progress value={proposal.quorum} className="h-2" />
                          </div>

                          <div className="flex space-x-2">
                            <Button className="flex-1 bg-green-500 hover:bg-green-600">
                              Vota Sì
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Vota No
                            </Button>
                            <Button variant="ghost" className="flex-1">
                              Astieni
                            </Button>
                          </div>
                        </div>
                      )}

                      {proposal.status === 'upcoming' && (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">Votazione non ancora iniziata</p>
                          <Button variant="outline" className="mt-2" disabled>
                            In attesa
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="company" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informazioni Società */}
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Informazioni SPV
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Ragione Sociale</span>
                      <p className="font-semibold">{selectedProject.name} SPV S.r.l.</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">P.IVA</span>
                      <p className="font-semibold truncate">IT12345678901</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sede Legale</span>
                      <p className="font-semibold">{selectedProject.location}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Codice REA</span>
                      <p className="font-semibold">SI-123456</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capitale Sociale</span>
                      <p className="font-semibold">€1.000.000</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Anno Costituzione</span>
                      <p className="font-semibold">2023</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Amministratore Delegato</h4>
                    <p>Mario Rossi</p>
                    <p className="text-sm text-muted-foreground">Ingegnere Energetico</p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Certificazioni</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">ISO 14001</Badge>
                      <Badge variant="secondary">GSE Qualified</Badge>
                      <Badge variant="secondary">EU Taxonomy</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Finanziarie */}
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Performance Finanziarie
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">€2.1M</div>
                      <div className="text-sm text-muted-foreground">Ricavi Totali</div>
                    </div>
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">8.7%</div>
                      <div className="text-sm text-muted-foreground">ROI Annuale</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">EBITDA Margin</span>
                      <span className="font-semibold">72%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Debt/Equity Ratio</span>
                      <span className="font-semibold">0.35</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Capacity Factor</span>
                      <span className="font-semibold">24.8%</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Contratti PPA</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>GSE - Tariffa Feed-in</span>
                        <span className="font-semibold">€0.08/kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Durata Contratto</span>
                        <span className="font-semibold">20 anni</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Scadenza</span>
                        <span className="font-semibold">2043</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sell" className="space-y-6 mt-6">
            {/* Header con statistiche marketplace */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="card-glow">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">2.847</p>
                  <p className="text-xs text-muted-foreground">Volume Totale</p>
                </CardContent>
              </Card>

              <Card className="card-glow">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-2xl font-bold">+15.7%</p>
                  <p className="text-xs text-muted-foreground">Prezzo Medio</p>
                </CardContent>
              </Card>

              <Card className="card-glow">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Gavel className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-xs text-muted-foreground">Aste Attive</p>
                </CardContent>
              </Card>

              <Card className="card-glow">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Timer className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold">2.3d</p>
                  <p className="text-xs text-muted-foreground">Tempo Medio</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* I Tuoi NFT - Selezione */}
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    I Tuoi NFT
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userPortfolio.nfts.map((nft) => (
                    <motion.div
                      key={nft.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedNFT?.id === nft.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                        }`}
                      onClick={() => setSelectedNFT(nft)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <Zap className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{nft.quantity}x NFT {nft.type}</h3>
                            <p className="text-sm text-muted-foreground">Valore: {nft.value}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                Rarity: Rare
                              </Badge>
                              <Badge className="bg-green-500/20 text-green-400 text-xs">
                                Active
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {selectedNFT?.id === nft.id && (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-primary" />
                          </div>
                        )}
                      </div>

                      {selectedNFT?.id === nft.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pt-4 border-t border-primary/20"
                        >
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <p className="text-muted-foreground">Produzione/Mese</p>
                              <p className="font-semibold">152 kWh</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Efficienza</p>
                              <p className="font-semibold">22.8%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">CO₂ Offset</p>
                              <p className="font-semibold">89.3 kg</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Token ID</p>
                              <p className="font-semibold">#0{nft.id}47</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {!selectedNFT && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Seleziona un NFT per iniziare il processo di listing sul marketplace.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Form di Listing */}
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Crea Listing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedNFT ? (
                    <>
                      {/* Tipo di vendita */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">Tipo di Vendita</Label>
                        <RadioGroup value={sellType} onValueChange={(value: any) => setSellType(value as "fixed" | "auction")}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fixed" id="fixed" />
                            <Label htmlFor="fixed" className="flex items-center space-x-2 cursor-pointer">
                              <ShoppingCart className="w-4 h-4" />
                              <span>Prezzo Fisso</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="auction" id="auction" />
                            <Label htmlFor="auction" className="flex items-center space-x-2 cursor-pointer">
                              <Gavel className="w-4 h-4" />
                              <span>Asta</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      {/* Dettagli listing */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Titolo Listing *</Label>
                          <Input
                            id="title"
                            placeholder="es. Tuscany Solar Panel Premium #247"
                            value={listingForm.title}
                            onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label htmlFor="description">Descrizione</Label>
                          <Textarea
                            id="description"
                            placeholder="Descrivi le caratteristiche uniche del tuo NFT..."
                            className="h-20"
                            value={listingForm.description}
                            onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                          />
                        </div>

                        {sellType === "fixed" ? (
                          <div>
                            <Label htmlFor="price">Prezzo (EGLD) *</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.1"
                              placeholder="es. 2.5"
                              value={listingForm.price}
                              onChange={(e) => setListingForm({ ...listingForm, price: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Prezzo di mercato suggerito: 2.2 - 2.8 EGLD
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="startingPrice">Prezzo di Partenza (EGLD) *</Label>
                              <Input
                                id="startingPrice"
                                type="number"
                                step="0.1"
                                placeholder="es. 1.5"
                                value={listingForm.startingPrice}
                                onChange={(e) => setListingForm({ ...listingForm, startingPrice: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="reservePrice">Prezzo di Riserva (EGLD)</Label>
                              <Input
                                id="reservePrice"
                                type="number"
                                step="0.1"
                                placeholder="es. 2.0 (opzionale)"
                                value={listingForm.reservePrice}
                                onChange={(e) => setListingForm({ ...listingForm, reservePrice: e.target.value })}
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Prezzo minimo sotto il quale non venderai
                              </p>
                            </div>
                            <div>
                              <Label htmlFor="duration">Durata Asta</Label>
                              <Select value={listingForm.duration} onValueChange={(value: any) => setListingForm({ ...listingForm, duration: value })}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 giorno</SelectItem>
                                  <SelectItem value="3">3 giorni</SelectItem>
                                  <SelectItem value="7">7 giorni</SelectItem>
                                  <SelectItem value="14">14 giorni</SelectItem>
                                  <SelectItem value="30">30 giorni</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}

                        <div>
                          <Label htmlFor="category">Categoria</Label>
                          <Select value={listingForm.category} onValueChange={(value: any) => setListingForm({ ...listingForm, category: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="energy">Solar Energy</SelectItem>
                              <SelectItem value="wind">Wind Energy</SelectItem>
                              <SelectItem value="hybrid">Hybrid Energy</SelectItem>
                              <SelectItem value="storage">Energy Storage</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="rarity">Rarità</Label>
                          <Select value={listingForm.rarity} onValueChange={(value: any) => setListingForm({ ...listingForm, rarity: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="common">Common</SelectItem>
                              <SelectItem value="rare">Rare</SelectItem>
                              <SelectItem value="epic">Epic</SelectItem>
                              <SelectItem value="legendary">Legendary</SelectItem>
                              <SelectItem value="mythic">Mythic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator />

                      {/* Opzioni aggiuntive */}
                      <div className="space-y-4">
                        <h4 className="font-semibold">Opzioni Aggiuntive</h4>

                        {sellType === "auction" && (
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Compra Subito</Label>
                              <p className="text-xs text-muted-foreground">
                                Permetti l'acquisto immediato durante l'asta
                              </p>
                            </div>
                            <Switch
                              checked={listingForm.instantSale}
                              onCheckedChange={(checked: any) => setListingForm({ ...listingForm, instantSale: checked })}
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Listing in Evidenza</Label>
                            <p className="text-xs text-muted-foreground">
                              +0.1 EGLD - Maggiore visibilità (24h)
                            </p>
                          </div>
                          <Switch
                            checked={listingForm.featured}
                            onCheckedChange={(checked: any) => setListingForm({ ...listingForm, featured: checked })}
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Preview e Costi */}
                      <Card className="bg-muted/20 border-primary/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3">Riepilogo Costi</h4>
                          <div className="space-y-2 text-sm">
                            {(() => {
                              const costs = calculateListingCosts();
                              return (
                                <>
                                  <div className="flex justify-between">
                                    <span>Prezzo {sellType === "fixed" ? "di vendita" : "di partenza"}</span>
                                    <span className="font-semibold">{costs.basePrice.toFixed(2)} EGLD</span>
                                  </div>
                                  <div className="flex justify-between text-muted-foreground">
                                    <span>Commissione Marketplace (2.5%)</span>
                                    <span>-{costs.marketplaceFee.toFixed(3)} EGLD</span>
                                  </div>
                                  <div className="flex justify-between text-muted-foreground">
                                    <span>Gas Fee (stima)</span>
                                    <span>-{costs.gasFee.toFixed(2)} EGLD</span>
                                  </div>
                                  {listingForm.featured && (
                                    <div className="flex justify-between text-muted-foreground">
                                      <span>Listing in Evidenza</span>
                                      <span>-{costs.featuredFee.toFixed(1)} EGLD</span>
                                    </div>
                                  )}
                                  <Separator />
                                  <div className="flex justify-between font-semibold">
                                    <span>Riceverai (stima)</span>
                                    <span className={`font-bold ${costs.netReceived > 0 ? 'text-accent' : 'text-red-400'}`}>
                                      {sellType === "fixed"
                                        ? `${costs.netReceived.toFixed(3)} EGLD`
                                        : `${costs.netReceived.toFixed(3)}+ EGLD`
                                      }
                                    </span>
                                  </div>
                                  {costs.netReceived <= 0 && (
                                    <Alert className="mt-2">
                                      <AlertCircle className="h-4 w-4" />
                                      <AlertDescription>
                                        Il prezzo è troppo basso per coprire le commissioni
                                      </AlertDescription>
                                    </Alert>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Pulsanti azione */}
                      <div className="flex space-x-3">
                        <Button
                          className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                          disabled={!validateForm() || isListing || calculateListingCosts().netReceived <= 0}
                          onClick={handleCreateListing}
                        >
                          {isListing ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Creando...
                            </>
                          ) : sellType === "fixed" ? (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Lista a Prezzo Fisso
                            </>
                          ) : (
                            <>
                              <Gavel className="w-4 h-4 mr-2" />
                              Avvia Asta
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          disabled={!validateForm()}
                          onClick={() => setShowPreview(true)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Anteprima
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Seleziona un NFT per iniziare</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Storico vendite */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <HistoryIcon className="w-5 h-5 mr-2" />
                    Le Tue Vendite Recenti
                  </div>
                  <Badge variant="secondary">3 vendite completate</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      id: 1,
                      nft: "Solar Panel #189",
                      type: "Prezzo Fisso",
                      price: "2.3 EGLD",
                      buyer: "0x7f5d...a9c2",
                      date: "2 giorni fa",
                      status: "completed"
                    },
                    {
                      id: 2,
                      nft: "Wind Turbine #045",
                      type: "Asta",
                      price: "4.7 EGLD",
                      buyer: "0x2c8e...f1d4",
                      date: "1 settimana fa",
                      status: "completed"
                    },
                    {
                      id: 3,
                      nft: "Energy Storage #012",
                      type: "Prezzo Fisso",
                      price: "1.8 EGLD",
                      buyer: "0x9b3a...e7f6",
                      date: "2 settimane fa",
                      status: "completed"
                    }
                  ].map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{sale.nft}</h4>
                          <p className="text-sm text-muted-foreground">{sale.type} • {sale.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">{sale.price}</p>
                        <p className="text-xs text-muted-foreground">da {sale.buyer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Preview Modal */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Anteprima Listing</DialogTitle>
              <DialogDescription>
                Ecco come apparirà il tuo NFT nel marketplace
              </DialogDescription>
            </DialogHeader>

            {selectedNFT && validateForm() && (
              <div className="space-y-4">
                {/* NFT Card Preview */}
                <Card className="card-glow overflow-hidden">
                  <div className="relative">
                    {/* NFT Image */}
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-3 mx-auto">
                          <Zap className="w-10 h-10" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Solar Energy NFT
                        </p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                      <Badge className={`${listingForm.rarity === "common" ? "bg-gray-500/20 text-gray-400" :
                        listingForm.rarity === "rare" ? "bg-blue-500/20 text-blue-400" :
                          listingForm.rarity === "epic" ? "bg-purple-500/20 text-purple-400" :
                            listingForm.rarity === "legendary" ? "bg-orange-500/20 text-orange-400" :
                              "bg-pink-500/20 text-pink-400"
                        }`}>
                        {listingForm.rarity.charAt(0).toUpperCase() + listingForm.rarity.slice(1)}
                      </Badge>
                    </div>

                    {listingForm.featured && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-yellow-500/20 text-yellow-400">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Auction Type */}
                    <div className="absolute bottom-3 right-3">
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        {sellType === "fixed" ? (
                          <>
                            <ShoppingCart className="w-3 h-3" />
                            <span>Buy Now</span>
                          </>
                        ) : (
                          <>
                            <Gavel className="w-3 h-3" />
                            <span>Auction</span>
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    {/* NFT Info */}
                    <div>
                      <h3 className="font-semibold truncate">{listingForm.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {selectedProject.name} Collection
                      </p>
                      <p className="text-xs text-muted-foreground">#{selectedNFT.id}47</p>
                    </div>

                    {/* Description */}
                    {listingForm.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {listingForm.description}
                      </p>
                    )}

                    {/* Energy Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Generation</p>
                        <p className="font-medium">152 kWh/month</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Efficiency</p>
                        <p className="font-medium">22.8%</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {sellType === "fixed" ? "Price" : "Starting Price"}
                        </span>
                        {sellType === "auction" && (
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Timer className="w-3 h-3" />
                            <span>{listingForm.duration}d remaining</span>
                          </div>
                        )}
                      </div>
                      <p className="text-lg font-bold text-primary">
                        {sellType === "fixed" ? listingForm.price : listingForm.startingPrice} EGLD
                      </p>
                      {sellType === "auction" && listingForm.reservePrice && (
                        <p className="text-xs text-muted-foreground">
                          Reserve: {listingForm.reservePrice} EGLD
                        </p>
                      )}
                    </div>

                    {/* Mock Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>0</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>0</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Just listed</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {sellType === "fixed" ? (
                        <Button className="flex-1 bg-gradient-to-r from-primary to-accent" disabled>
                          Buy Now
                        </Button>
                      ) : (
                        <>
                          <Button className="flex-1" variant="outline" disabled>
                            Place Bid
                          </Button>
                          {listingForm.instantSale && (
                            <Button className="flex-1 bg-gradient-to-r from-primary to-accent" disabled>
                              Buy Now
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Listing Details */}
                <Card className="bg-muted/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Dettagli Listing</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Tipo:</span>
                        <p className="font-semibold capitalize">
                          {sellType === "fixed" ? "Prezzo Fisso" : "Asta"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Categoria:</span>
                        <p className="font-semibold capitalize">{listingForm.category}</p>
                      </div>
                      {sellType === "auction" && (
                        <>
                          <div>
                            <span className="text-muted-foreground">Durata:</span>
                            <p className="font-semibold">{listingForm.duration} giorni</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Compra Subito:</span>
                            <p className="font-semibold">{listingForm.instantSale ? "Sì" : "No"}</p>
                          </div>
                        </>
                      )}
                      <div>
                        <span className="text-muted-foreground">In Evidenza:</span>
                        <p className="font-semibold">{listingForm.featured ? "Sì" : "No"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                    onClick={() => {
                      setShowPreview(false);
                      handleCreateListing();
                    }}
                    disabled={isListing}
                  >
                    {sellType === "fixed" ? "Conferma Listing" : "Conferma Asta"}
                  </Button>
                  <Button variant="outline" onClick={() => setShowPreview(false)}>
                    Modifica
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}