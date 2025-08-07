// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ThemeProvider } from "./components/ThemeProvider";
import Header from "./components/Header";
import Home from "./components/Home";
import ControlRoom from "./components/ControlRoom";
import Wallet from "./components/Wallet";
import FloatingMenu from "./components/FloatingMenu";
import ProjectOnboarding from "./components/ProjectOnboarding";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Progress } from "./components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./components/ui/dialog";
import { Separator } from "./components/ui/separator";
import { Alert, AlertDescription } from "./components/ui/alert";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  Rocket,
  ShoppingCart,
  TrendingUp,
  Users,
  Calendar,
  Star,
  Search,
  Filter,
  MapPin,
  Clock,
  Target,
  Euro,
  Sun,
  Wind,
  Zap,
  Eye,
  Heart,
  Share2,
  Award,
  Gem,
  Wallet as WalletIcon,
  History as HistoryIcon,
  Tag,
  Plus,
  Minus,
  ArrowRight,
  X,
  Calculator,
  Activity,
  CheckCircle,
  Timer,
  DollarSign,
  Info
} from "lucide-react";

function AppContent() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const LaunchpadComponent = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBy, setFilterBy] = useState("all");

    const solarProjects = [
      {
        id: 1,
        name: "SolarPark Tuscany",
        location: "Siena, Italy",
        capacity: "2.5 MW",
        risk: "Low Risk",
        riskLevel: "low",
        yield: "8.5%",
        rating: 4.8,
        description: "Large-scale solar installation in prime Tuscan location with guaranteed 20-year PPA contract.",
        fundingProgress: 76,
        raised: "€950K",
        goal: "€1250K",
        investors: 234,
        deadline: "16/02/2025",
        image: "/api/placeholder/400/200",
        projectType: "solar"
      },
      {
        id: 2,
        name: "Alpine Solar Farm",
        location: "Bolzano, Italy",
        capacity: "1.8 MW",
        risk: "Medium Risk",
        riskLevel: "medium",
        yield: "7.8%",
        rating: 4.6,
        description: "Mountain solar project with innovative tracking systems and excellent irradiation levels.",
        fundingProgress: 60,
        raised: "€450K",
        goal: "€900K",
        investors: 156,
        deadline: "01/03/2025",
        image: "/api/placeholder/400/200",
        projectType: "wind"
      },
      {
        id: 3,
        name: "Puglia Solar Complex",
        location: "Lecce, Italy",
        capacity: "4.2 MW",
        risk: "Low Risk",
        riskLevel: "low",
        yield: "9.2%",
        rating: 4.9,
        description: "Premium southern Italy location with highest solar irradiation and established grid connection.",
        fundingProgress: 80,
        raised: "€1680K",
        goal: "€2100K",
        investors: 387,
        deadline: "30/01/2025",
        image: "/api/placeholder/400/200",
        projectType: "solar"
      },
      {
        id: 4,
        name: "Mediterranean Wind",
        location: "Palermo, Italy",
        capacity: "3.5 MW",
        risk: "Medium Risk",
        riskLevel: "medium",
        yield: "8.9%",
        rating: 4.7,
        description: "Coastal wind farm with consistent wind patterns and modern turbine technology.",
        fundingProgress: 45,
        raised: "€675K",
        goal: "€1500K",
        investors: 198,
        deadline: "15/03/2025",
        image: "/api/placeholder/400/200",
        projectType: "wind"
      },
      {
        id: 5,
        name: "Roma Solar District",
        location: "Rome, Italy",
        capacity: "1.2 MW",
        risk: "Low Risk",
        riskLevel: "low",
        yield: "7.5%",
        rating: 4.5,
        description: "Urban solar installation with battery storage and smart grid integration.",
        fundingProgress: 92,
        raised: "€828K",
        goal: "€900K",
        investors: 445,
        deadline: "10/02/2025",
        image: "/api/placeholder/400/200",
        projectType: "solar"
      },
      {
        id: 6,
        name: "Adriatic Energy Hub",
        location: "Bari, Italy",
        capacity: "2.8 MW",
        risk: "Medium Risk",
        riskLevel: "medium",
        yield: "8.3%",
        rating: 4.4,
        description: "Hybrid solar-wind project with innovative energy storage solutions.",
        fundingProgress: 38,
        raised: "€532K",
        goal: "€1400K",
        investors: 167,
        deadline: "25/03/2025",
        image: "/api/placeholder/400/200",
        projectType: "hybrid"
      }
    ];

    const filteredProjects = solarProjects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" || project.riskLevel === filterBy;
      return matchesSearch && matchesFilter;
    });

    const getProjectIcon = (type: string) => {
      switch (type) {
        case "solar":
          return <Sun className="w-6 h-6" />;
        case "wind":
          return <Wind className="w-6 h-6" />;
        case "hybrid":
          return <Zap className="w-6 h-6" />;
        default:
          return <Sun className="w-6 h-6" />;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Solar Project Launchpad</h1>
            <p className="text-muted-foreground">
              Discover and invest in tokenized solar energy projects
            </p>
          </div>

          {/* Add Project Button */}
          <Button
            onClick={() => setShowOnboarding(true)}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
          >
            <Plus className="w-4 h-4 mr-2" />
            Candidatura Progetto
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-glow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="relative">
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-2 mx-auto">
                        {getProjectIcon(project.projectType)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1)} Energy
                      </p>
                    </div>
                  </div>

                  {/* Risk Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="secondary"
                      className={`${project.riskLevel === "low"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                        }`}
                    >
                      {project.risk}
                    </Badge>
                  </div>

                  {/* Yield Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-accent/20 text-accent font-bold">
                      {project.yield}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{project.rating}</span>
                  </div>
                </div>

                <CardContent className="p-4 space-y-4">
                  {/* Project Info */}
                  <div>
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Funding Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="font-semibold">{project.fundingProgress}%</span>
                    </div>
                    <Progress value={project.fundingProgress} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-accent">
                        {project.raised} raised
                      </span>
                      <span className="text-muted-foreground">
                        {project.goal} goal
                      </span>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span>{project.investors} investors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span>{project.deadline}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80">
                      <Euro className="w-4 h-4 mr-2" />
                      Invest Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Upcoming Launches - Mobile Optimized */}
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Rocket className="w-5 h-5 mr-2" />
                Upcoming Launches
              </div>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
              {[
                { name: "Ocean Breeze Solar", date: "Jan 28", participants: 1247, target: "50 USDC" },
                { name: "Highland Energy", date: "Feb 2", participants: 892, target: "75 USDC" },
                { name: "Sunrise Valley", date: "Feb 8", participants: 2341, target: "100 USDC" }
              ].map((launch, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className={`font-semibold mb-2 ${isMobile ? 'text-sm' : ''}`}>{launch.name}</h4>
                  <div className={`space-y-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Launch Date</span>
                      <span>{launch.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Participants</span>
                      <span>{launch.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target</span>
                      <span className="text-accent">{launch.target}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    Join Waitlist
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const MarketplaceComponent = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("recent");
    const [filterBy, setFilterBy] = useState("all");
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [selectedNFT, setSelectedNFT] = useState<any>(null);
    const [selectedCut, setSelectedCut] = useState(500);
    const [quantity, setQuantity] = useState(1);

    const solarNFTs = [
      {
        id: 1,
        name: "Tuscany Solar Panel #247",
        collection: "SolarPark Tuscany Collection",
        tokenId: "#0247",
        price: "2.5 USDC",
        previousPrice: "2.2 USDC",
        priceChange: "+13.6%",
        rarity: "Rare",
        powerGeneration: "152 KWh/month",
        efficiency: "22.8%",
        carbonOffset: "89.3 kg CO₂",
        owner: "0x1234...5678",
        likes: 42,
        views: 1247,
        timeRemaining: "2d 14h",
        auctionType: "timed",
        verified: true,
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop&crop=center",
        timeline: [
          { phase: "Development", status: "completed", date: "Jan 2024", description: "Site preparation and permits" },
          { phase: "Construction", status: "completed", date: "Mar 2024", description: "Solar panel installation" },
          { phase: "Grid Connection", status: "in-progress", date: "Feb 2025", description: "Grid synchronization and testing" },
          { phase: "Operations", status: "pending", date: "Mar 2025", description: "Full commercial operation" }
        ],
        cuts: [
          { amount: 500, roi: "8.5%", yearlyReturn: "42.5 USDC" },
          { amount: 1000, roi: "9.2%", yearlyReturn: "92.0 USDC" },
          { amount: 2500, roi: "10.1%", yearlyReturn: "252.5 USDC" },
          { amount: 5000, roi: "11.5%", yearlyReturn: "575.0 USDC" }
        ]
      },
      {
        id: 2,
        name: "Alpine Wind Turbine #089",
        collection: "Alpine Wind Farm",
        tokenId: "#0089",
        price: "4.2 USDC",
        previousPrice: "4.5 USDC",
        priceChange: "-6.7%",
        rarity: "Epic",
        powerGeneration: "328 KWh/month",
        efficiency: "94.2%",
        carbonOffset: "195.7 kg CO₂",
        owner: "0x9876...4321",
        likes: 89,
        views: 2156,
        timeRemaining: "6h 32m",
        auctionType: "buyNow",
        verified: true,
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=400&fit=crop&crop=center",
        timeline: [
          { phase: "Development", status: "completed", date: "Dec 2023", description: "Environmental impact assessment" },
          { phase: "Construction", status: "completed", date: "Jun 2024", description: "Turbine installation and testing" },
          { phase: "Grid Connection", status: "completed", date: "Sep 2024", description: "Grid integration completed" },
          { phase: "Operations", status: "completed", date: "Oct 2024", description: "Full commercial operation" }
        ],
        cuts: [
          { amount: 500, roi: "7.8%", yearlyReturn: "39.0 USDC" },
          { amount: 1000, roi: "8.5%", yearlyReturn: "85.0 USDC" },
          { amount: 2500, roi: "9.2%", yearlyReturn: "230.0 USDC" },
          { amount: 5000, roi: "10.8%", yearlyReturn: "540.0 USDC" }
        ]
      },
      {
        id: 3,
        name: "Mediterranean Solar Array #156",
        collection: "Puglia Solar Complex",
        tokenId: "#0156",
        price: "1.8 USDC",
        previousPrice: "1.6 USDC",
        priceChange: "+12.5%",
        rarity: "Common",
        powerGeneration: "98 KWh/month",
        efficiency: "21.3%",
        carbonOffset: "58.4 kg CO₂",
        owner: "0x5555...7777",
        likes: 23,
        views: 892,
        timeRemaining: "1d 8h",
        auctionType: "timed",
        verified: true,
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=400&fit=crop&crop=center",
        timeline: [
          { phase: "Development", status: "completed", date: "Nov 2023", description: "Land acquisition and surveys" },
          { phase: "Construction", status: "completed", date: "Apr 2024", description: "Solar farm construction" },
          { phase: "Grid Connection", status: "completed", date: "Jul 2024", description: "Grid connection established" },
          { phase: "Operations", status: "completed", date: "Aug 2024", description: "Full commercial operation" }
        ],
        cuts: [
          { amount: 500, roi: "9.2%", yearlyReturn: "46.0 USDC" },
          { amount: 1000, roi: "9.8%", yearlyReturn: "98.0 USDC" },
          { amount: 2500, roi: "10.5%", yearlyReturn: "262.5 USDC" },
          { amount: 5000, roi: "12.0%", yearlyReturn: "600.0 USDC" }
        ]
      },
      {
        id: 4,
        name: "Roma Smart Grid Node #034",
        collection: "Roma Solar District",
        tokenId: "#0034",
        price: "3.7 USDC",
        previousPrice: "3.7 USDC",
        priceChange: "0%",
        rarity: "Legendary",
        powerGeneration: "275 KWh/month",
        efficiency: "96.8%",
        carbonOffset: "164.2 kg CO₂",
        owner: "0x2222...9999",
        likes: 156,
        views: 3428,
        timeRemaining: "4d 12h",
        auctionType: "auction",
        verified: true,
        image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&h=400&fit=crop&crop=center",
        timeline: [
          { phase: "Development", status: "completed", date: "Jan 2024", description: "Urban planning and permits" },
          { phase: "Construction", status: "completed", date: "May 2024", description: "Smart grid infrastructure" },
          { phase: "Grid Connection", status: "completed", date: "Aug 2024", description: "Advanced grid integration" },
          { phase: "Operations", status: "completed", date: "Sep 2024", description: "Smart grid operations" }
        ],
        cuts: [
          { amount: 500, roi: "7.5%", yearlyReturn: "37.5 USDC" },
          { amount: 1000, roi: "8.2%", yearlyReturn: "82.0 USDC" },
          { amount: 2500, roi: "9.0%", yearlyReturn: "225.0 USDC" },
          { amount: 5000, roi: "10.5%", yearlyReturn: "525.0 USDC" }
        ]
      },
      {
        id: 5,
        name: "Hybrid Energy Core #078",
        collection: "Adriatic Energy Hub",
        tokenId: "#0078",
        price: "5.9 USDC",
        previousPrice: "5.1 USDC",
        priceChange: "+15.7%",
        rarity: "Mythic",
        powerGeneration: "412 KWh/month",
        efficiency: "98.1%",
        carbonOffset: "245.8 kg CO₂",
        owner: "0x8888...1111",
        likes: 234,
        views: 5672,
        timeRemaining: "12h 45m",
        auctionType: "buyNow",
        verified: true,
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=400&fit=crop&crop=center",
        timeline: [
          { phase: "Development", status: "completed", date: "Feb 2024", description: "Hybrid system design" },
          { phase: "Construction", status: "in-progress", date: "Current", description: "Solar-wind hybrid installation" },
          { phase: "Grid Connection", status: "pending", date: "Apr 2025", description: "Advanced grid synchronization" },
          { phase: "Operations", status: "pending", date: "May 2025", description: "Hybrid operations start" }
        ],
        cuts: [
          { amount: 500, roi: "8.3%", yearlyReturn: "41.5 USDC" },
          { amount: 1000, roi: "9.0%", yearlyReturn: "90.0 USDC" },
          { amount: 2500, roi: "9.8%", yearlyReturn: "245.0 USDC" },
          { amount: 5000, roi: "11.2%", yearlyReturn: "560.0 USDC" }
        ]
      },
      {
        id: 6,
        name: "Solar Tracker Pro #192",
        collection: "Alpine Solar Farm",
        tokenId: "#0192",
        price: "2.1 USDC",
        previousPrice: "2.3 USDC",
        priceChange: "-8.7%",
        rarity: "Rare",
        powerGeneration: "187 KWh/month",
        efficiency: "89.4%",
        carbonOffset: "111.6 kg CO₂",
        owner: "0x4444...6666",
        likes: 67,
        views: 1834,
        timeRemaining: "3d 7h",
        auctionType: "timed",
        verified: false,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center",
        timeline: [
          { phase: "Development", status: "completed", date: "Mar 2024", description: "Tracking system design" },
          { phase: "Construction", status: "completed", date: "Jul 2024", description: "Advanced tracker installation" },
          { phase: "Grid Connection", status: "completed", date: "Oct 2024", description: "Grid connection active" },
          { phase: "Operations", status: "completed", date: "Nov 2024", description: "Tracking operations active" }
        ],
        cuts: [
          { amount: 500, roi: "8.9%", yearlyReturn: "44.5 USDC" },
          { amount: 1000, roi: "9.4%", yearlyReturn: "94.0 USDC" },
          { amount: 2500, roi: "10.1%", yearlyReturn: "252.5 USDC" },
          { amount: 5000, roi: "11.8%", yearlyReturn: "590.0 USDC" }
        ]
      }
    ];

    const filteredNFTs = solarNFTs.filter(nft => {
      const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nft.collection.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" ||
        (filterBy === "verified" && nft.verified) ||
        (filterBy === "auction" && nft.auctionType === "auction") ||
        (filterBy === "buyNow" && nft.auctionType === "buyNow");
      return matchesSearch && matchesFilter;
    });

    const getRarityColor = (rarity: string) => {
      switch (rarity.toLowerCase()) {
        case "common":
          return "bg-gray-500/20 text-gray-400";
        case "rare":
          return "bg-blue-500/20 text-blue-400";
        case "epic":
          return "bg-purple-500/20 text-purple-400";
        case "legendary":
          return "bg-orange-500/20 text-orange-400";
        case "mythic":
          return "bg-pink-500/20 text-pink-400";
        default:
          return "bg-gray-500/20 text-gray-400";
      }
    };

    const getAuctionTypeIcon = (type: string) => {
      switch (type) {
        case "auction":
          return <Target className="w-4 h-4" />;
        case "buyNow":
          return <ShoppingCart className="w-4 h-4" />;
        case "timed":
          return <Clock className="w-4 h-4" />;
        default:
          return <Tag className="w-4 h-4" />;
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case "completed":
          return <CheckCircle className="w-4 h-4 text-green-400" />;
        case "in-progress":
          return <Activity className="w-4 h-4 text-blue-400" />;
        case "pending":
          return <Timer className="w-4 h-4 text-yellow-400" />;
        default:
          return <Clock className="w-4 h-4 text-muted-foreground" />;
      }
    };

    const handleBuyNow = (nft: any) => {
      setSelectedNFT(nft);
      setShowPurchaseModal(true);
    };

    const calculateTotalCost = () => {
      if (!selectedNFT) return 0;
      return selectedCut * quantity;
    };

    const getSelectedCutInfo = () => {
      if (!selectedNFT) return null;
      return selectedNFT.cuts.find((cut: any) => cut.amount === selectedCut);
    };

    const handlePurchase = () => {
      // Simulate purchase process
      console.log(`Purchasing ${quantity}x ${selectedCut} USDC NFT cuts of ${selectedNFT.name}`);
      setShowPurchaseModal(false);
      setSelectedNFT(null);
      setQuantity(1);
      setSelectedCut(500);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold gradient-text">NFT Marketplace</h1>
          <p className="text-muted-foreground">
            Trade solar energy NFTs in the secondary market
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search NFTs by name or collection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All NFTs</SelectItem>
                  <SelectItem value="verified">Verified Only</SelectItem>
                  <SelectItem value="auction">Auctions</SelectItem>
                  <SelectItem value="buyNow">Buy Now</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Listed</SelectItem>
                <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-glow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Gem className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="font-semibold">2,847 USDC</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-glow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <WalletIcon className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Floor Price</p>
                  <p className="font-semibold">1.2 USDC</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-glow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Owners</p>
                  <p className="font-semibold">1,456</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-glow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <HistoryIcon className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-sm text-muted-foreground">24h Sales</p>
                  <p className="font-semibold">89</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-glow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group">
                <div className="relative">
                  {/* NFT Image */}
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3">
                    <Badge className={getRarityColor(nft.rarity)}>
                      {nft.rarity}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 flex space-x-1">
                    {nft.verified && (
                      <Badge className="bg-blue-500/20 text-blue-400">
                        <Award className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  {/* Auction Type */}
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      {getAuctionTypeIcon(nft.auctionType)}
                      <span className="capitalize">{nft.auctionType}</span>
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  {/* NFT Info */}
                  <div>
                    <h3 className="font-semibold truncate">{nft.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{nft.collection}</p>
                    <p className="text-xs text-muted-foreground">{nft.tokenId}</p>
                  </div>

                  {/* Energy Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Generation</p>
                      <p className="font-medium">{nft.powerGeneration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Efficiency</p>
                      <p className="font-medium">{nft.efficiency}</p>
                    </div>
                  </div>

                  {/* Price and Change */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Price</span>
                      <span className={`text-xs ${nft.priceChange.startsWith('+') ? 'text-green-400' :
                        nft.priceChange.startsWith('-') ? 'text-red-400' : 'text-muted-foreground'
                        }`}>
                        {nft.priceChange}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-primary">{nft.price}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{nft.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{nft.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{nft.timeRemaining}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {nft.auctionType === "buyNow" ? (
                      <Button
                        className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                        onClick={() => handleBuyNow(nft)}
                      >
                        Buy Now
                      </Button>
                    ) : (
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={() => handleBuyNow(nft)}
                      >
                        Place Bid
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNFTs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No NFTs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Purchase Modal */}
        <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Purchase NFT</h2>
                    <p className="text-sm text-muted-foreground">{selectedNFT?.name}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setShowPurchaseModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </DialogTitle>
              <DialogDescription>
                Choose your investment amount and review the project timeline
              </DialogDescription>
            </DialogHeader>

            {selectedNFT && (
              <div className="space-y-6 mt-6">
                {/* NFT Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={selectedNFT.image}
                        alt={selectedNFT.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Power Generation</p>
                        <p className="font-semibold">{selectedNFT.powerGeneration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Efficiency</p>
                        <p className="font-semibold">{selectedNFT.efficiency}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Carbon Offset</p>
                        <p className="font-semibold">{selectedNFT.carbonOffset}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rarity</p>
                        <Badge className={getRarityColor(selectedNFT.rarity)}>
                          {selectedNFT.rarity}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Investment Selection */}
                    <Card className="card-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calculator className="w-5 h-5 mr-2" />
                          Investment Selection
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Choose Investment Cut</label>
                          <Select value={selectedCut.toString()} onValueChange={(value: any) => setSelectedCut(parseInt(value))}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedNFT.cuts.map((cut: any) => (
                                <SelectItem key={cut.amount} value={cut.amount.toString()}>
                                  {cut.amount} USDC - ROI: {cut.roi}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Quantity</label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <Input
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                              className="text-center w-20"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {getSelectedCutInfo() && (
                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertDescription>
                              <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Annual ROI</p>
                                    <p className="font-bold text-accent">{getSelectedCutInfo().roi}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Yearly Return</p>
                                    <p className="font-bold text-green-400">{getSelectedCutInfo().yearlyReturn}</p>
                                  </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Total Investment</p>
                                    <p className="font-bold text-primary">{calculateTotalCost()} USDC</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Expected Annual Return</p>
                                    <p className="font-bold text-accent">
                                      {(parseFloat(getSelectedCutInfo().yearlyReturn) * quantity).toFixed(1)} USDC
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Project Timeline */}
                <Card className="card-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Project Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedNFT.timeline.map((phase: any, index: any) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary flex-shrink-0">
                            {getStatusIcon(phase.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{phase.phase}</h4>
                              <Badge
                                variant="secondary"
                                className={
                                  phase.status === "completed"
                                    ? "bg-green-500/20 text-green-400"
                                    : phase.status === "in-progress"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-yellow-500/20 text-yellow-400"
                                }
                              >
                                {phase.status === "completed" ? "Completed" :
                                  phase.status === "in-progress" ? "In Progress" : "Pending"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{phase.date}</p>
                            <p className="text-sm">{phase.description}</p>
                          </div>
                          {index < selectedNFT.timeline.length - 1 && (
                            <div className="absolute left-[19px] mt-8 w-px h-8 bg-border"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Purchase Actions */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowPurchaseModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                    onClick={handlePurchase}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Purchase for {calculateTotalCost()} USDC
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    );
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      case "control-room":
        return <ControlRoom />;
      case "wallet":
        return <Wallet />;
      case "launchpad":
        return <LaunchpadComponent />;
      case "marketplace":
        return <MarketplaceComponent />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderActiveSection()}
          </motion.div>
        </div>
      </main>

      {/* Floating Menu - Mobile Priority */}
      <FloatingMenu
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Project Onboarding Modal */}
      {showOnboarding && (
        <ProjectOnboarding onClose={() => setShowOnboarding(false)} />
      )}

      {/* Background Effects - Hidden on Mobile */}
      <div className="fixed inset-0 -z-10 overflow-hidden hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}