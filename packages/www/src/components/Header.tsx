import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import {
  Zap,
  Wallet,
  Rocket,
  ShoppingCart,
  Home,
  Settings,
  Sun,
  Moon,
  Bell,
  User,
  LogOut,
  Gift,
  AlertTriangle,
  Plus,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  X,
  Eye,
  Link,
  Copy,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import logoImage from "../assets/logo.png";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

interface Notification {
  id: string;
  type: "reward" | "issue" | "project";
  title: string;
  message: string;
  timestamp: string;
  amount?: string;
  projectName?: string;
  read: boolean;
  priority?: "high" | "medium" | "low";
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "reward",
      title: "Daily Rewards Ready",
      message: "Your solar panel #1247 has generated 12,500 USDC in rewards",
      timestamp: "2 min ago",
      amount: "12,500 USDC",
      projectName: "Solar Panel #1247",
      read: false,
      priority: "high"
    },
    {
      id: "2",
      type: "project",
      title: "New Project Available",
      message: "Tuscany Solar Park is now open for investment",
      timestamp: "15 min ago",
      projectName: "Tuscany Solar Park",
      read: false,
      priority: "medium"
    },
    {
      id: "3",
      type: "issue",
      title: "Maintenance Required",
      message: "Desert Sun #456 requires scheduled maintenance",
      timestamp: "1 hour ago",
      projectName: "Desert Sun #456",
      read: false,
      priority: "high"
    },
    {
      id: "4",
      type: "reward",
      title: "Weekly Rewards",
      message: "Your energy production rewards are available to claim",
      timestamp: "2 hours ago",
      amount: "8,750 USDC",
      read: true,
      priority: "medium"
    },
    {
      id: "5",
      type: "project",
      title: "Investment Milestone",
      message: "Alpine Wind Farm reached 80% funding goal",
      timestamp: "5 hours ago",
      projectName: "Alpine Wind Farm",
      read: true,
      priority: "low"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string, priority?: string) => {
    switch (type) {
      case "reward":
        return <Gift className="w-4 h-4 text-green-400" />;
      case "issue":
        return <AlertTriangle className={`w-4 h-4 ${priority === "high" ? "text-red-400" : "text-yellow-400"}`} />;
      case "project":
        return <Plus className="w-4 h-4 text-blue-400" />;
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getNotificationBadgeColor = (type: string, priority?: string) => {
    switch (type) {
      case "reward":
        return "bg-green-500/20 text-green-400";
      case "issue":
        return priority === "high" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400";
      case "project":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleWalletConnect = async () => {
    if (isWalletConnected) {
      setIsWalletConnected(false);
      setWalletAddress("");
      return;
    }

    setIsConnecting(true);

    // Simulate wallet connection
    setTimeout(() => {
      setIsWalletConnected(true);
      setWalletAddress("0x742d35Cc6634C0532925a3b8D4d7936F57b9b568");
      setIsConnecting(false);
    }, 1500);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'control-room', label: 'Control Room', icon: Zap },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'launchpad', label: 'Launchpad', icon: Rocket },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between pt-[8px] pr-[14px] pb-[0px] pl-[14px] mx-[183px] my-[10px] mx-[183px]">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveSection('home')}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <img
              src={logoImage}
              alt="Apollo Logo"
              className="w-8 h-8 object-contain filter dark:invert transition-all duration-300"
            />
          </div>
          <h1 className="text-xl font-bold transition-all duration-300">Lumen</h1>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/5 rounded-lg border border-primary/20"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="relative inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <Bell className="w-4 h-4" />
              <AnimatePresence>
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white"
                    >
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-96 p-0 max-h-[500px] overflow-hidden"
              align="end"
              sideOffset={8}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 pb-2">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs h-7"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="w-12 h-12 text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No notifications</p>
                    <p className="text-sm text-muted-foreground">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer relative group ${!notification.read ? 'bg-primary/5' : ''
                          }`}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        {/* Unread indicator */}
                        {!notification.read && (
                          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                        )}

                        {/* Remove button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>

                        <div className="flex items-start space-x-3">
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type, notification.priority)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pr-8">
                            <div className="flex items-start justify-between">
                              <p className={`font-medium text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                {notification.title}
                              </p>
                            </div>

                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {notification.message}
                            </p>

                            {/* Additional Info */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-3">
                                {/* Type Badge */}
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${getNotificationBadgeColor(notification.type, notification.priority)}`}
                                >
                                  {notification.type === 'reward' && 'Reward'}
                                  {notification.type === 'issue' && 'Issue'}
                                  {notification.type === 'project' && 'Project'}
                                </Badge>

                                {/* Amount */}
                                {notification.amount && (
                                  <div className="flex items-center space-x-1 text-xs">
                                    <DollarSign className="w-3 h-3 text-green-400" />
                                    <span className="font-medium text-green-400">
                                      {notification.amount}
                                    </span>
                                  </div>
                                )}

                                {/* Project Name */}
                                {notification.projectName && !notification.amount && (
                                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <Activity className="w-3 h-3" />
                                    <span>{notification.projectName}</span>
                                  </div>
                                )}
                              </div>

                              {/* Timestamp */}
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{notification.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <Separator />
              <div className="p-3">
                <Button
                  variant="ghost"
                  className="w-full justify-center text-sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="theme-toggle"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Account</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center space-x-2 p-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Solar Investor</span>
                  <span className="text-xs text-muted-foreground">investor@solarshare.com</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wallet Connect */}
          {isWalletConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <Wallet className="w-4 h-4" />
                  <span className="hidden md:inline font-mono text-xs">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <div className="p-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium">Wallet Connected</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Address:</span>
                      <div className="flex items-center space-x-1">
                        <code className="text-xs bg-secondary px-2 py-1 rounded">
                          {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
                        </code>
                        <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Network:</span>
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        MultiversX
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Balance:</span>
                      <span className="font-semibold">845,320 USDC</span>
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => window.open('#', '_blank')}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleWalletConnect} className="text-red-600">
                  <Link className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={handleWalletConnect}
              disabled={isConnecting}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
            >
              {isConnecting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 mr-2"
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
              ) : (
                <Wallet className="w-4 h-4 mr-2" />
              )}
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}