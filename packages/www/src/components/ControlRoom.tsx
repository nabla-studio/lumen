import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { 
  Zap, 
  Sun, 
  Cloud, 
  Thermometer, 
  Wind, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Settings,
  TrendingUp,
  Gift,
  Clock,
  DollarSign,
  BarChart3,
  LineChart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export default function ControlRoom() {
  const [energyTimeframe, setEnergyTimeframe] = useState("today");
  const [liveData, setLiveData] = useState({
    totalProduction: 6.1,
    efficiency: 79,
    activeFarms: 2,
    issues: 2
  });

  const [liveProduction, setLiveProduction] = useState({
    totalPower: 7.5,
    dailyProduction: 42.3,
    efficiency: 85,
    currentOutput: 6.2
  });

  const [energyData, setEnergyData] = useState([
    { time: '00:00', production: 0, consumption: 0 },
    { time: '06:00', production: 1.2, consumption: 0.8 },
    { time: '12:00', production: 6.1, consumption: 4.2 },
    { time: '18:00', production: 3.8, consumption: 3.1 },
    { time: '24:00', production: 0, consumption: 0.5 }
  ]);

  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mon', production: 45.2, efficiency: 82 },
    { day: 'Tue', production: 52.1, efficiency: 85 },
    { day: 'Wed', production: 38.7, efficiency: 78 },
    { day: 'Thu', production: 61.3, efficiency: 88 },
    { day: 'Fri', production: 55.8, efficiency: 84 },
    { day: 'Sat', production: 48.9, efficiency: 81 },
    { day: 'Sun', production: 42.3, efficiency: 77 }
  ]);





  // Simulazione aggiornamento dati live
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        totalProduction: prev.totalProduction + (Math.random() - 0.5) * 0.5,
        efficiency: Math.max(75, Math.min(85, prev.efficiency + (Math.random() - 0.5) * 2))
      }));
      
      setLiveProduction(prev => ({
        ...prev,
        currentOutput: Math.max(0, prev.currentOutput + (Math.random() - 0.5) * 0.5),
        efficiency: Math.max(80, Math.min(90, prev.efficiency + (Math.random() - 0.5) * 1))
      }));
      
      setEnergyData(prev => prev.map(item => ({
        ...item,
        production: Math.max(0, item.production + (Math.random() - 0.5) * 0.3)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const solarFields = [
    {
      id: 1,
      name: "Solar Farm Alpha",
      location: "Nevada, USA",
      capacity: "2.5 MW",
      production: `${liveData.totalProduction.toFixed(1)} MW`,
      efficiency: 84,
      status: "active",
      issues: 0,
      dailyRewards: "2.5 USDC",
      weather: {
        temperature: 32,
        humidity: 42,
        windSpeed: 15,
        cloudCover: 10,
        solarIrradiance: 920
      }
    },
    {
      id: 2,
      name: "Green Valley",
      location: "California, USA",
      capacity: "3.2 MW",
      production: "2.8 MW",
      efficiency: 87,
      status: "active",
      issues: 0,
      dailyRewards: "3.1 USDC",
      weather: {
        temperature: 28,
        humidity: 38,
        windSpeed: 12,
        cloudCover: 5,
        solarIrradiance: 880
      }
    },
    {
      id: 3,
      name: "Desert Sun",
      location: "Arizona, USA",
      capacity: "1.8 MW",
      production: "1.2 MW",
      efficiency: 67,
      status: "maintenance",
      issues: 2,
      dailyRewards: "1.8 USDC",
      weather: {
        temperature: 35,
        humidity: 25,
        windSpeed: 18,
        cloudCover: 25,
        solarIrradiance: 750
      }
    }
  ];



  const activeAlerts = [
    { type: "warning", message: "Panel efficiency drop detected in Section B", time: "10 min ago" },
    { type: "error", message: "Inverter offline in Desert Sun facility", time: "3h ago" }
  ];

  const solvedAlerts = [
    { type: "info", message: "Scheduled maintenance completed", time: "2h ago" },
    { type: "warning", message: "High temperature alert resolved", time: "5h ago" },
    { type: "info", message: "Grid synchronization restored", time: "1d ago" },
    { type: "error", message: "Communication error fixed", time: "2d ago" }
  ];



  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Live Production Dashboard */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center p-[0px]">
              <Activity className="w-5 h-5 mr-2" />
              Live Production Dashboard
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center mb-2">
                <Sun className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm">Total Power</span>
              </div>
              <p className="text-xl font-bold">{liveProduction.totalPower} kW</p>
            </div>
            
            <div className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center mb-2">
                <Zap className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-sm">Current Output</span>
              </div>
              <motion.p 
                className="text-xl font-bold text-primary"
                key={liveProduction.currentOutput}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {liveProduction.currentOutput.toFixed(1)} kW
              </motion.p>
            </div>
            
            <div className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-sm">Efficiency</span>
              </div>
              <motion.p 
                className="text-xl font-bold text-accent"
                key={liveProduction.efficiency}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {liveProduction.efficiency.toFixed(2)}%
              </motion.p>
            </div>
            
            <div className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center mb-2">
                <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-sm">Daily Production</span>
              </div>
              <p className="text-xl font-bold">{liveProduction.dailyProduction} kWh</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-glow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Production</p>
                <motion.p 
                  className="text-2xl font-bold gradient-text"
                  key={liveData.totalProduction}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {liveData.totalProduction.toFixed(1)} MW
                </motion.p>
              </div>
              <div className="relative">
                <Zap className="w-8 h-8 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-glow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Efficiency</p>
                <motion.p 
                  className="text-2xl font-bold text-accent"
                  key={liveData.efficiency}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {liveData.efficiency.toFixed(0)}%
                </motion.p>
              </div>
              <Activity className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-glow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Farms</p>
                <p className="text-2xl font-bold">{liveData.activeFarms}/3</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-glow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issues</p>
                <p className="text-2xl font-bold text-destructive">{liveData.issues}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Live Charts */}
      {/* Real-time Energy Production - Full Width */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <LineChart className="w-5 h-5 mr-2" />
              Energy Production
            </div>
            <Select value={energyTimeframe} onValueChange={setEnergyTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#a0a0b0" />
                <YAxis stroke="#a0a0b0" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#151520', 
                    border: '1px solid rgba(0,212,255,0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="production" 
                  stroke="#00d4ff" 
                  strokeWidth={3}
                  dot={{ fill: '#00d4ff', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, stroke: '#00d4ff', strokeWidth: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="consumption" 
                  stroke="#00ff88" 
                  strokeWidth={3}
                  dot={{ fill: '#00ff88', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, stroke: '#00ff88', strokeWidth: 3 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Solar Fields Status Carousel - Full Width */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Sun className="w-5 h-5 mr-2" />
              Solar Fields Status
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {solarFields.length} Active Fields
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                <Activity className="w-3 h-3 mr-1" />
                Live Monitoring
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {solarFields.map((field, index) => (
                <CarouselItem key={field.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card/80 to-secondary/40 card-glow hover:shadow-2xl transition-all duration-500 border border-primary/30 hover:border-primary/60 h-full"
                  >
                    {/* Background Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-60"></div>
                    
                    {/* Status Indicator Strip */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                      field.status === "active" ? "from-green-400 to-emerald-500" :
                      field.status === "maintenance" ? "from-yellow-400 to-orange-500" :
                      "from-gray-400 to-gray-500"
                    }`}></div>
                    
                    <div className="relative z-10 p-5 h-full flex flex-col">
                      {/* Header with Enhanced Badges */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full animate-pulse ${
                            field.status === "active" ? "bg-green-400 shadow-lg shadow-green-400/50" :
                            field.status === "maintenance" ? "bg-yellow-400 shadow-lg shadow-yellow-400/50" :
                            "bg-gray-400 shadow-lg shadow-gray-400/50"
                          }`}></div>
                          <div>
                            <h4 className="font-bold text-lg text-foreground">{field.name}</h4>
                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                              <Activity className="w-3 h-3 mr-1" />
                              {field.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge 
                            variant="secondary"
                            className={`${
                              field.status === "active" 
                                ? "bg-green-500/20 text-green-400 border-green-400/30 shadow-lg shadow-green-400/20" 
                                : field.status === "maintenance"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/30 shadow-lg shadow-yellow-400/20"
                                : "bg-gray-500/20 text-gray-400 border-gray-400/30"
                            } font-semibold px-3 py-1 animate-pulse`}
                          >
                            {field.status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {field.status === "maintenance" && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {field.status.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="bg-accent/20 text-accent border-accent/40 font-bold px-3 py-1 shadow-lg">
                            <Gift className="w-3 h-3 mr-1" />
                            {field.dailyRewards}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Enhanced Production Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-colors">
                          <div className="flex items-center space-x-2 mb-1">
                            <Zap className="w-4 h-4 text-primary" />
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Production</p>
                          </div>
                          <p className="font-bold text-primary text-base">{field.production}</p>
                          <p className="text-xs text-muted-foreground">of {field.capacity}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-colors">
                          <div className="flex items-center space-x-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-accent" />
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Efficiency</p>
                          </div>
                          <p className="font-bold text-accent text-base">{field.efficiency}%</p>
                          <p className="text-xs text-muted-foreground">Performance</p>
                        </div>
                      </div>

                      {/* Enhanced Weather Information */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Cloud className="w-4 h-4 text-blue-400" />
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Weather Conditions</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-gradient-to-br from-secondary/40 to-secondary/20 border border-secondary/30">
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                              <Thermometer className="w-4 h-4 text-red-400" />
                              <span className="text-xs font-medium text-red-400">TEMP</span>
                            </div>
                            <p className="font-bold text-foreground">{field.weather.temperature}°C</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                              <Wind className="w-4 h-4 text-blue-400" />
                              <span className="text-xs font-medium text-blue-400">WIND</span>
                            </div>
                            <p className="font-bold text-foreground">{field.weather.windSpeed}km/h</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                              <Sun className="w-4 h-4 text-yellow-400" />
                              <span className="text-xs font-medium text-yellow-400">SOLAR</span>
                            </div>
                            <p className="font-bold text-foreground">{field.weather.solarIrradiance}W/m²</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">System Efficiency</span>
                          <span className="text-sm font-bold text-primary">{field.efficiency}%</span>
                        </div>
                        <div className="relative">
                          <Progress value={field.efficiency} className="h-3" />
                          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Enhanced Footer */}
                      <div className="flex justify-between items-center pt-3 border-t border-border/50 mt-auto">
                        <div className="flex items-center space-x-2">
                          {field.issues > 0 ? (
                            <>
                              <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium text-yellow-500">
                                {field.issues} Issues
                              </span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-green-500">
                                Operational
                              </span>
                            </>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/50 text-primary hover:text-primary transition-all duration-300"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </CardContent>
      </Card>

      {/* Weekly Production - Full Width Below */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Weekly Production
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="#a0a0b0" />
                <YAxis stroke="#a0a0b0" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#151520', 
                    border: '1px solid rgba(0,212,255,0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="production" 
                  fill="url(#productionGradient)"
                  radius={[4, 4, 0, 0]}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
                <defs>
                  <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>



      {/* System Alerts */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              System Alerts
            </div>
            <Badge variant="secondary" className="bg-red-500/20 text-red-400">
              {activeAlerts.length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active" className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Active</span>
                <Badge variant="secondary" className="bg-red-500/20 text-red-400 text-xs">
                  {activeAlerts.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="solved" className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Solved</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                  {solvedAlerts.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-4">
              <div className="space-y-3">
                {activeAlerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === "error" ? "border-destructive bg-destructive/10" :
                      alert.type === "warning" ? "border-yellow-500 bg-yellow-500/10" :
                      "border-blue-500 bg-blue-500/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{alert.message}</p>
                      <span className="text-sm text-muted-foreground">{alert.time}</span>
                    </div>
                  </motion.div>
                ))}
                {activeAlerts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50 text-green-500" />
                    <p>No active alerts</p>
                    <p className="text-sm">All systems are running smoothly</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="solved" className="mt-4">
              <div className="space-y-3">
                {solvedAlerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 rounded-lg border-l-4 border-green-500 bg-green-500/10 opacity-70"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <p className="font-medium">{alert.message}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{alert.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}