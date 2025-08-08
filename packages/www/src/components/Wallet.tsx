import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import SPVTokenomics from "./SPVTokenomics";
import {
  Wallet as WalletIcon,
  Send,
  Download,
  Gift,
  Copy,
  ExternalLink,
  Shield,
  TrendingUp,
  Zap,
  Activity,
  Clock,
  DollarSign,
  Sun,
  AlertCircle
} from "lucide-react";

export default function Wallet() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isTokenomicsOpen, setIsTokenomicsOpen] = useState(false);
  const [claimableRewards, setClaimableRewards] = useState([
    { nftId: 1, amount: "12,500 USDC", type: "Daily", timestamp: "Ready", farmName: "Solar Farm Alpha" },
    { nftId: 2, amount: "8,750 USDC", type: "Weekly", timestamp: "2h ago", farmName: "Green Valley" },
    { nftId: 3, amount: "21,800 USDC", type: "Monthly", timestamp: "Ready", farmName: "Desert Sun" }
  ]);



  const walletData = {
    address: "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th",
    balance: "845,320 USDC",
    usdValue: "$845,320",
    nfts: [
      {
        id: 1,
        name: "Solar Panel #1247",
        collection: "SolarShare Genesis",
        power: "25.8 MW",
        roi: "+12.5%",
        dailyRewards: "12,500 USDC",
        status: "active",
        efficiency: 87,
        claimable: true,
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop&crop=center"
      },
      {
        id: 2,
        name: "Green Energy #892",
        collection: "EcoFarm Collection",
        power: "18.2 MW",
        roi: "+8.3%",
        dailyRewards: "8,750 USDC",
        status: "active",
        efficiency: 82,
        claimable: true,
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=400&fit=crop&crop=center"
      },
      {
        id: 3,
        name: "Desert Sun #456",
        collection: "Solar Farms",
        power: "32.5 MW",
        roi: "+15.2%",
        dailyRewards: "21,800 USDC",
        status: "maintenance",
        efficiency: 65,
        claimable: false,
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=400&fit=crop&crop=center"
      }
    ],
    recentTransactions: [
      { type: "Received", amount: "25,480 USDC", from: "Staking Rewards", time: "2h ago", status: "confirmed" },
      { type: "Sent", amount: "12,500 USDC", to: "Solar Farm Investment", time: "5h ago", status: "confirmed" },
      { type: "Reward", amount: "18,750 USDC", from: "Energy Production", time: "1d ago", status: "confirmed" },
      { type: "Reward", amount: "5,200 USDC", from: "Energy Production", time: "2d ago", status: "confirmed" }
    ]
  };



  const copyAddress = () => {
    navigator.clipboard.writeText(walletData.address);
  };

  const handleClaimNFTReward = (nftId: number) => {
    const reward = claimableRewards.find(r => r.nftId === nftId);
    if (reward) {
      setClaimableRewards(prev => prev.filter(r => r.nftId !== nftId));
      // Qui andresti ad implementare la logica di claim verso la blockchain
      console.log(`Claiming NFT reward: ${reward.amount} from NFT ${nftId}`);
    }
  };

  const handleManageNFT = (nft: any) => {
    // Crea un progetto fittizio basato sui dati NFT per aprire la tokenomics
    const projectData = {
      name: nft.collection,
      location: "Italy", // Default location
      capacity: nft.power,
      production: (parseFloat(nft.power) * 0.8).toFixed(1) + " kW",
      status: nft.status,
      type: "marketplace"
    };
    setSelectedProject(projectData);
    setIsTokenomicsOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Wallet Overview */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <WalletIcon className="w-5 h-5 mr-2" />
            Wallet Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-3xl font-bold gradient-text">{walletData.balance}</p>
                <p className="text-lg text-muted-foreground">{walletData.usdValue}</p>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Receive
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Wallet Address</p>
                <div className="flex items-center space-x-2 mt-1">
                  <code className="text-sm bg-secondary/50 px-2 py-1 rounded flex-1 truncate">
                    {walletData.address}
                  </code>
                  <Button size="sm" variant="outline" onClick={copyAddress}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">Wallet Connected & Secured</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Available Rewards Section */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Gift className="w-5 h-5 mr-2" />
              Available Rewards
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              <Activity className="w-3 h-3 mr-1" />
              {claimableRewards.filter(r => r.timestamp === "Ready").length} Ready
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Total Claimable Rewards Summary */}
          <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Claimable Rewards</span>
              <span className="font-bold text-accent">
                {claimableRewards.reduce((total, reward) => total + parseFloat(reward.amount), 0).toFixed(1)} USDC
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {claimableRewards.map((reward, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{reward.farmName}</p>
                    <p className="text-sm text-muted-foreground">{reward.type} Reward</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-semibold text-accent">{reward.amount}</p>
                    <p className="text-xs text-muted-foreground">
                      {reward.timestamp === "Ready" ? (
                        <span className="text-green-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Ready
                        </span>
                      ) : (
                        reward.timestamp
                      )}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                    disabled={reward.timestamp !== "Ready"}
                  >
                    Claim
                  </Button>
                </div>
              </motion.div>
            ))}
            {claimableRewards.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No rewards available at the moment</p>
                <p className="text-sm">Check back later for new rewards</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* My Solar NFTs Section */}
      <Card className="card-glow overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My Solar NFTs</span>
            <Badge variant="secondary">{walletData.nfts.length} NFTs</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Horizontal Scrolling Container */}
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 p-6 pb-4 scrollbar-hide" style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              {walletData.nfts.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px]"
                >
                  {/* NFT Card */}
                  <motion.div
                    className="relative h-full p-6 rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group card-glow"
                    whileHover={{
                      scale: 1.02,
                      y: -5
                    }}
                  >

                    {/* NFT Image Container */}
                    <div className="aspect-square rounded-xl mb-4 overflow-hidden relative group/nft">
                      <ImageWithFallback
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/nft:scale-110"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover/nft:opacity-100 transition-opacity duration-300"></div>

                      {/* Status Indicator */}
                      {nft.status === "active" && (
                        <div className="absolute top-3 right-3">
                          <motion.div
                            className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      )}

                      {/* Type badge */}
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                          <p className="text-xs text-white font-medium flex items-center">
                            <Sun className="w-3 h-3 mr-1" />
                            Solar NFT
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* NFT Information */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-lg">{nft.name}</h4>
                        <p className="text-sm text-muted-foreground">{nft.collection}</p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Power</p>
                          <p className="font-semibold">{nft.power}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">ROI</p>
                          <p className="font-semibold text-accent">{nft.roi}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Daily Rewards</p>
                          <p className="font-semibold text-primary">{nft.dailyRewards}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Efficiency</p>
                          <p className="font-semibold">{nft.efficiency}%</p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-[12px] bg-[rgba(66,66,110,0.3)]"
                          onClick={() => handleManageNFT(nft)}
                        >
                          Manage
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicators */}

          </div>
        </CardContent>
      </Card>

      {/* Transactions Section */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {walletData.recentTransactions.map((tx, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.type === "Received" || tx.type === "Reward" ? "bg-green-500/20" : "bg-blue-500/20"
                    }`}>
                    {tx.type === "Received" || tx.type === "Reward" ? (
                      <Download className="w-5 h-5 text-green-500" />
                    ) : tx.type === "NFT Mint" ? (
                      <Zap className="w-5 h-5 text-purple-500" />
                    ) : (
                      <Send className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {tx.from || tx.to}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-semibold ${tx.type === "Received" || tx.type === "Reward" ? "text-green-400" :
                      tx.type === "Sent" ? "text-red-400" : "text-primary"
                    }`}>
                    {tx.type === "Sent" ? "-" : "+"}{tx.amount}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${tx.status === "confirmed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                        }`}
                    >
                      {tx.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{tx.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Transactions Button */}
          <div className="mt-4 text-center">
            <Button variant="outline" className="w-full bg-[rgba(86,86,140,0.3)]">
              <Activity className="w-4 h-4 mr-2" />
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SPV Tokenomics Modal */}
      <SPVTokenomics
        isOpen={isTokenomicsOpen}
        onClose={() => setIsTokenomicsOpen(false)}
        selectedProject={selectedProject}
      />
    </motion.div>
  );
}