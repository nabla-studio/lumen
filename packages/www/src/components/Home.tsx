import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
// import europeanMapImage from 'figma:asset/53407aa2930eee1165a364c3fa7fb7f274cab06b.png';
import SPVTokenomics from "./SPVTokenomics";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  TrendingUp,
  Sun,
  Battery,
  Zap,
  DollarSign,
  Users,
  Calendar,
  ArrowRight,
  MapPin,
  Rocket,
  Map,
  Activity,
  Play,
  Gamepad2,
  Wifi,
  Signal,
  Target,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Crosshair
} from "lucide-react";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTokenomicsOpen, setIsTokenomicsOpen] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<any>(null);
  const [clickedMarker, setClickedMarker] = useState(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [portfolioTimeframe, setPortfolioTimeframe] = useState<"today" | "month" | "quarter" | "year">("month");

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile && !isDragging) {
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        setParallaxOffset({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, isDragging]);

  const handleMarkerClick = (farm: any) => {
    if (isMobile) {
      if (clickedMarker === farm.id) {
        // Se è già cliccato, apri tokenomics
        setSelectedProject(farm);
        setIsTokenomicsOpen(true);
        setClickedMarker(null);
      } else {
        // Primo click, mostra tooltip
        setClickedMarker(farm.id);
      }
    } else {
      // Desktop: apri direttamente
      setSelectedProject(farm);
      setIsTokenomicsOpen(true);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };

  const handleMapMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapOffset.x, y: e.clientY - mapOffset.y });
  };

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setMapOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMapMouseUp = () => {
    setIsDragging(false);
  };

  // Chiudi tooltip quando si clicca fuori
  const handleMapClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setClickedMarker(null);
    }
  };

  const stats = [
    {
      title: "Total Energy Generated",
      value: "2,847 kWh",
      change: "+12.5%",
      icon: Sun,
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "Active Solar Farms",
      value: "24",
      change: "+3",
      icon: MapPin,
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Total Investment",
      value: "$45,230",
      change: "+8.2%",
      icon: DollarSign,
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "NFT Collection",
      value: "12",
      change: "+2",
      icon: Zap,
      color: "from-purple-400 to-pink-500"
    }
  ];



  // Portfolio Performance Data for different timeframes
  const portfolioData = {
    today: [
      { time: '00:00', value: 45230, change: 0 },
      { time: '04:00', value: 45180, change: -0.11 },
      { time: '08:00', value: 45420, change: 0.42 },
      { time: '12:00', value: 45680, change: 0.99 },
      { time: '16:00', value: 45520, change: 0.64 },
      { time: '20:00', value: 45780, change: 1.21 }
    ],
    month: [
      { time: 'W1', value: 42100, change: 2.3 },
      { time: 'W2', value: 43200, change: 5.0 },
      { time: 'W3', value: 44100, change: 7.2 },
      { time: 'W4', value: 45230, change: 9.8 }
    ],
    quarter: [
      { time: 'Gen', value: 38500, change: -6.2 },
      { time: 'Feb', value: 42100, change: 2.5 },
      { time: 'Mar', value: 45230, change: 10.1 }
    ],
    year: [
      { time: 'Q1', value: 38500, change: -6.2 },
      { time: 'Q2', value: 42100, change: 2.5 },
      { time: 'Q3', value: 44600, change: 8.5 },
      { time: 'Q4', value: 45230, change: 10.1 }
    ]
  };

  const getTimeframeLabel = (timeframe: string) => {
    switch (timeframe) {
      case 'today': return 'Oggi';
      case 'month': return 'Ultimo Mese';
      case 'quarter': return 'Ultimo Trimestre';
      case 'year': return 'Ultimo Anno';
      default: return 'Ultimo Mese';
    }
  };

  const getCurrentPortfolioData = () => portfolioData[portfolioTimeframe] || portfolioData.month;

  const getPortfolioStats = () => {
    const data = getCurrentPortfolioData();
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    const totalChange = latest ? latest.change : 0;
    const recentChange = latest && previous ?
      ((latest.value - previous.value) / previous.value) * 100 : 0;

    return {
      currentValue: latest ? latest.value : 45230,
      totalChange: totalChange,
      recentChange: recentChange,
      isPositive: totalChange >= 0
    };
  };



  // Dati per la mappa degli impianti europei aggiornati con coordinate realistiche
  const solarFarms = [
    {
      id: 1,
      name: "SolarPark Tuscany",
      location: "Siena, Italy",
      coordinates: { x: 52, y: 65 },
      status: "active",
      type: "marketplace",
      capacity: "2.5 MW",
      production: "2.1 MW",
      players: 234,
      level: 5
    },
    {
      id: 2,
      name: "Alpine Solar Farm",
      location: "Bolzano, Italy",
      coordinates: { x: 50, y: 58 },
      status: "active",
      type: "marketplace",
      capacity: "1.8 MW",
      production: "1.6 MW",
      players: 156,
      level: 3
    },
    {
      id: 3,
      name: "Puglia Solar Complex",
      location: "Lecce, Italy",
      coordinates: { x: 58, y: 72 },
      status: "funding",
      type: "launchpad",
      capacity: "4.2 MW",
      production: "0 MW",
      players: 89,
      level: 1
    },
    {
      id: 4,
      name: "Roma Solar District",
      location: "Rome, Italy",
      coordinates: { x: 53, y: 68 },
      status: "active",
      type: "marketplace",
      capacity: "1.2 MW",
      production: "1.1 MW",
      players: 445,
      level: 7
    },
    {
      id: 5,
      name: "Mediterranean Wind",
      location: "Palermo, Italy",
      coordinates: { x: 55, y: 78 },
      status: "maintenance",
      type: "marketplace",
      capacity: "3.5 MW",
      production: "2.8 MW",
      players: 278,
      level: 4
    },
    {
      id: 6,
      name: "Adriatic Energy Hub",
      location: "Bari, Italy",
      coordinates: { x: 60, y: 73 },
      status: "funding",
      type: "launchpad",
      capacity: "2.8 MW",
      production: "0 MW",
      players: 167,
      level: 2
    },
    {
      id: 7,
      name: "Barcelona Solar Grid",
      location: "Barcelona, Spain",
      coordinates: { x: 38, y: 68 },
      status: "active",
      type: "marketplace",
      capacity: "3.1 MW",
      production: "2.9 MW",
      players: 321,
      level: 6
    },
    {
      id: 8,
      name: "Provence Energy Park",
      location: "Marseille, France",
      coordinates: { x: 43, y: 62 },
      status: "active",
      type: "marketplace",
      capacity: "4.5 MW",
      production: "4.2 MW",
      players: 512,
      level: 8
    },
    {
      id: 9,
      name: "Berlin Smart Solar",
      location: "Berlin, Germany",
      coordinates: { x: 53, y: 45 },
      status: "funding",
      type: "launchpad",
      capacity: "2.2 MW",
      production: "0 MW",
      players: 198,
      level: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'from-green-400 to-emerald-500';
      case 'funding':
        return 'from-blue-400 to-cyan-500';
      case 'maintenance':
        return 'from-yellow-400 to-orange-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 7) return 'from-purple-400 to-pink-500';
    if (level >= 5) return 'from-blue-400 to-cyan-500';
    if (level >= 3) return 'from-green-400 to-emerald-500';
    return 'from-yellow-400 to-orange-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Stats Grid - Mobile Optimized */}
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'} gap-4 md:gap-6`}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="card-glow hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50"></div>
                <CardContent className={`${isMobile ? 'p-3' : 'p-6'} relative z-10`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{stat.title}</p>
                      <p className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>{stat.value}</p>
                      <Badge variant="secondary" className={`${isMobile ? 'text-xs' : ''} mt-2`}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </Badge>
                    </div>
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <Icon className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Pro Gaming Style Map with Zoom */}
      <Card className="card-glow relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Crosshair className="w-5 h-5 mr-2 text-primary" />
              <span className="gradient-text">Energy Grid Command Center</span>
              {isMobile && <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">LIVE</Badge>}
            </div>
            <div className="flex items-center space-x-2">
              {!isMobile && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                  <Signal className="w-3 h-3 mr-1" />
                  Grid Online
                </Badge>
              )}
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  className="bg-primary/10 border-primary/30"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  className="bg-primary/10 border-primary/30"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                {!isMobile && (
                  <Button variant="outline" size="sm" className="bg-primary/10 border-primary/30">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div
            className={`relative ${isMobile ? 'h-80' : 'h-96'} bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden cursor-${zoomLevel > 1 ? 'move' : 'default'}`}
            onMouseDown={handleMapMouseDown}
            onMouseMove={handleMapMouseMove}
            onMouseUp={handleMapMouseUp}
            onMouseLeave={handleMapMouseUp}
            onClick={handleMapClick}
          >
            {/* Gaming Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className={`grid ${isMobile ? 'grid-cols-8 grid-rows-6' : 'grid-cols-12 grid-rows-8'} h-full`}>
                {Array.from({ length: isMobile ? 48 : 96 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="border border-cyan-400/20"
                    animate={{
                      opacity: [0.1, 0.2, 0.1],
                      borderColor: ['rgba(6, 182, 212, 0.2)', 'rgba(6, 182, 212, 0.4)', 'rgba(6, 182, 212, 0.2)']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: (i % 10) * 0.1
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Zoomable Map Container */}
            <div
              className="absolute inset-0 transition-transform duration-300"
              style={{
                transform: `scale(${zoomLevel}) translate(${mapOffset.x / zoomLevel}px, ${mapOffset.y / zoomLevel}px)`,
              }}
            >
              {/* Neon Map Background */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                style={{
                  // backgroundImage: `url(${europeanMapImage})`,
                  transform: isMobile ? 'none' : `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)`,
                  filter: 'sepia(1) hue-rotate(200deg) saturate(2) brightness(0.6)',
                }}
              />

              {/* Cyber Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)]"></div>

              {/* Precision Markers */}
              {solarFarms.map((farm, index) => (
                <motion.div
                  key={farm.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  style={{
                    left: `${farm.coordinates.x}%`,
                    top: `${farm.coordinates.y}%`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkerClick(farm);
                  }}
                  onMouseEnter={() => !isMobile && setHoveredMarker(farm.id)}
                  onMouseLeave={() => !isMobile && setHoveredMarker(null)}
                >
                  {/* Scanning Ring */}
                  <motion.div
                    className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 border border-cyan-400/50 rounded-full"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.8, 0.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Power Ring */}
                  <motion.div
                    className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${getStatusColor(farm.status)} opacity-60`}
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Core Marker - Much Smaller */}
                  <motion.div
                    className={`w-2 h-2 rounded-full relative z-10 bg-gradient-to-r ${getStatusColor(farm.status)} border border-white/70 shadow-lg`}
                    whileHover={{ scale: isMobile ? 1 : 1.5 }}
                    whileTap={{ scale: 0.8 }}
                    animate={{
                      boxShadow: [
                        `0 0 4px ${farm.status === 'active' ? '#00ff88' : '#00d4ff'}`,
                        `0 0 8px ${farm.status === 'active' ? '#00ff88' : '#00d4ff'}`,
                        `0 0 4px ${farm.status === 'active' ? '#00ff88' : '#00d4ff'}`
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {/* Micro Level Badge */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-black shadow-md">
                      <span className="text-xs" style={{ fontSize: '6px' }}>{farm.level}</span>
                    </div>
                  </motion.div>

                  {/* Professional Tooltip */}
                  <motion.div
                    className={`absolute ${isMobile ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-2' : 'bottom-full left-1/2 transform -translate-x-1/2 mb-3'} pointer-events-none z-30`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: (!isMobile && hoveredMarker === farm.id) || (isMobile && clickedMarker === farm.id) ? 1 : 0,
                      y: (!isMobile && hoveredMarker === farm.id) || (isMobile && clickedMarker === farm.id) ? 0 : 10
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black/90 backdrop-blur-md border border-cyan-400/40 rounded-lg p-3 min-w-48 shadow-2xl">
                      {/* Pro Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getStatusColor(farm.status)} animate-pulse`}></div>
                          <h4 className="font-bold text-white text-xs">{farm.name}</h4>
                        </div>
                        <Badge className={`text-xs bg-gradient-to-r ${getLevelColor(farm.level)} text-black px-1 py-0`}>
                          L{farm.level}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-1 text-cyan-400">
                          <MapPin className="w-2 h-2" />
                          <span className="text-xs">{farm.location}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Cap:</span>
                            <div className="text-yellow-400 font-semibold">{farm.capacity}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Out:</span>
                            <div className="text-green-400 font-semibold">{farm.production}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Users:</span>
                            <div className="text-blue-400 font-semibold">{farm.players}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">State:</span>
                            <div className={`font-semibold capitalize text-xs ${farm.status === 'active' ? 'text-green-400' :
                              farm.status === 'funding' ? 'text-blue-400' :
                                'text-yellow-400'
                              }`}>
                              {farm.status}
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 pt-1 border-t border-cyan-400/30">
                          <div className="flex items-center justify-center space-x-1 text-cyan-400 font-bold">
                            <Target className="w-2 h-2" />
                            <span className="text-xs">{isMobile ? 'TAP TO ENTER' : 'CLICK TO ACCESS'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Pro Control Panel */}
            <div className={`absolute ${isMobile ? 'bottom-2 left-2' : 'bottom-4 left-4'} bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-cyan-400/30`}>
              <div className={`space-y-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs">Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 text-xs">Funding</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-400 text-xs">Maintenance</span>
                </div>
              </div>
            </div>

            {/* Zoom Indicator */}
            <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-4 right-4'} bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-cyan-400/30`}>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-400 flex items-center space-x-2`}>
                <Target className="w-3 h-3" />
                <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
              </div>
            </div>

            {/* Pro Statistics HUD */}
            <div className={`absolute ${isMobile ? 'top-2 left-2' : 'top-4 left-4'} bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-cyan-400/30`}>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} space-y-1 text-cyan-400`}>
                <div className="flex items-center space-x-2">
                  <Activity className="w-3 h-3" />
                  <span className="text-xs">Grid</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs">Active:</span>
                    <span className="text-green-400 font-bold text-xs">{solarFarms.filter(f => f.status === 'active').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Funding:</span>
                    <span className="text-blue-400 font-bold text-xs">{solarFarms.filter(f => f.status === 'funding').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Total Users:</span>
                    <span className="text-yellow-400 font-bold text-xs">{solarFarms.reduce((sum, f) => sum + f.players, 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SPV Tokenomics Modal */}
      <SPVTokenomics
        isOpen={isTokenomicsOpen}
        onClose={() => setIsTokenomicsOpen(false)}
        selectedProject={selectedProject}
      />

      {/* Portfolio Performance Chart - Full Width */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Portfolio Performance
            </div>
            <Select value={portfolioTimeframe} /*onValueChange={setPortfolioTimeframe}*/>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Oggi</SelectItem>
                <SelectItem value="month">Ultimo Mese</SelectItem>
                <SelectItem value="quarter">Ultimo Trimestre</SelectItem>
                <SelectItem value="year">Ultimo Anno</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Portfolio Summary - Enhanced for full width */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
              <div className="col-span-1 md:col-span-2">
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Valore Totale</p>
                <p className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold gradient-text`}>
                  ${getPortfolioStats().currentValue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Rendimento</p>
                <p className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold ${getPortfolioStats().isPositive ? 'text-accent' : 'text-destructive'
                  }`}>
                  {getPortfolioStats().isPositive ? '+' : ''}{getPortfolioStats().totalChange.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Periodo</p>
                <p className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold text-primary`}>
                  {getTimeframeLabel(portfolioTimeframe)}
                </p>
              </div>
              <div className="hidden md:block">
                <p className="text-sm text-muted-foreground">Miglior Performance</p>
                <p className="text-lg font-bold text-accent">
                  {Math.max(...getCurrentPortfolioData().map(d => d.change)).toFixed(1)}%
                </p>
              </div>
              <div className="hidden xl:block">
                <p className="text-sm text-muted-foreground">Volatilità</p>
                <p className="text-lg font-semibold text-primary">
                  Bassa
                </p>
              </div>
            </div>

            {/* Performance Chart - Enhanced height for full width */}
            <div className={`${isMobile ? 'h-64' : 'h-80'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getCurrentPortfolioData()}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="time"
                    stroke="var(--muted-foreground)"
                    fontSize={isMobile ? 12 : 14}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={isMobile ? 12 : 14}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: isMobile ? '14px' : '16px'
                    }}
                    formatter={(value, name) => [
                      `${value.toLocaleString()}`,
                      'Valore Portfolio'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    fill="url(#portfolioGradient)"
                    dot={{ fill: 'var(--primary)', strokeWidth: 3, r: 5 }}
                    activeDot={{ r: 8, stroke: 'var(--primary)', strokeWidth: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Indicators - Enhanced layout for full width */}
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 lg:grid-cols-4 gap-4'}`}>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${getPortfolioStats().isPositive ? 'bg-accent' : 'bg-destructive'
                    } animate-pulse`}></div>
                  <span className={`${isMobile ? 'text-sm' : 'text-base'} text-muted-foreground`}>Tendenza</span>
                </div>
                <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold ${getPortfolioStats().isPositive ? 'text-accent' : 'text-destructive'
                  }`}>
                  {getPortfolioStats().isPositive ? '↗' : '↘'}
                  {Math.abs(getPortfolioStats().recentChange).toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <span className={`${isMobile ? 'text-sm' : 'text-base'} text-muted-foreground`}>Miglior Performance</span>
                <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-accent`}>
                  +{Math.max(...getCurrentPortfolioData().map(d => d.change)).toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <span className={`${isMobile ? 'text-sm' : 'text-base'} text-muted-foreground`}>Volatilità</span>
                <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-primary`}>
                  Bassa
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <span className={`${isMobile ? 'text-sm' : 'text-base'} text-muted-foreground`}>ROI Medio</span>
                <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-accent`}>
                  +{((getPortfolioStats().currentValue - 40000) / 40000 * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Energy Blog Section */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Energy News & Insights
            </div>
            <Button variant="outline" size="sm" className="bg-primary/10 border-primary/30">
              <ArrowRight className="w-4 h-4" />
              All Articles
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-3 gap-6'}`}>
            {/* Normative Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group cursor-pointer"
            >
              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all duration-300 border border-primary/20 hover:border-primary/40">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sun className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <Badge className="bg-blue-500/20 text-blue-400 mb-2">
                      Normative
                    </Badge>
                    <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold mb-2 group-hover:text-primary transition-colors`}>
                      Nuova Direttiva UE RED III: Obiettivi Rinnovabili al 42.5% entro il 2030
                    </h3>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mb-3 line-clamp-3`}>
                      La Commissione Europea ha approvato la revisione della Renewable Energy Directive,
                      introducendo target ambiziosi per accelerare la transizione energetica e ridurre
                      la dipendenza dai combustibili fossili.
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>15 Gen 2025</span>
                      <div className="flex items-center space-x-3">
                        <span>5 min read</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bandi Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group cursor-pointer"
            >
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 border border-green-500/20 hover:border-green-500/40">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <Badge className="bg-green-500/20 text-green-400 mb-2">
                      Bandi
                    </Badge>
                    <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold mb-2 group-hover:text-accent transition-colors`}>
                      PNRR Missione 2: Aperto Bando da 2.2 Miliardi per Comunità Energetiche
                    </h3>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mb-3 line-clamp-3`}>
                      Il Ministero dell'Ambiente ha pubblicato il nuovo bando per il finanziamento
                      delle Comunità Energetiche Rinnovabili. Scadenza 30 marzo 2025.
                      Contributi fino al 40% dei costi ammissibili.
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>12 Gen 2025</span>
                      <div className="flex items-center space-x-3">
                        <span>7 min read</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Incentivi Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group cursor-pointer"
            >
              <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-300 border border-yellow-500/20 hover:border-yellow-500/40">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <Badge className="bg-yellow-500/20 text-yellow-400 mb-2">
                      Incentivi
                    </Badge>
                    <h3 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold mb-2 group-hover:text-yellow-500 transition-colors`}>
                      Nuovo Conto Energia: Tariffe Incentivanti per Fotovoltaico fino a 0.085 €/kWh
                    </h3>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mb-3 line-clamp-3`}>
                      Il GSE ha pubblicato le nuove tariffe per gli impianti fotovoltaici installati nel 2025.
                      Aumenti significativi per le installazioni innovative e gli impianti agrivoltaici.
                      Durata contratti estesa a 25 anni.
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>8 Gen 2025</span>
                      <div className="flex items-center space-x-3">
                        <span>6 min read</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold mb-1`}>
                  Stay Updated on Energy Markets
                </h4>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                  Ricevi settimanalmente aggiornamenti su normative, bandi e incentivi del settore energetico
                </p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80">
                <Activity className="w-4 h-4 mr-2" />
                {isMobile ? 'Subscribe' : 'Subscribe Newsletter'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}