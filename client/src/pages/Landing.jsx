import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import HeroPortfolioChart from "../components/HeroPortfolioChart";
import AnimatedChartBackground from "../components/AnimatedChartBackground";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  TrendingUp,
  Zap,
  Shield,
  BarChart3,
  DollarSign,
  Globe,
  CheckCircle2,
  ArrowRight,
  Clock,
  Activity,
} from "lucide-react";

const Landing = () => {
  const stats = [
    { label: "Active Users", value: "100K+", suffix: "" },
    { label: "Daily Trades", value: "1M+", suffix: "" },
    { label: "Assets Traded", value: "$5B+", suffix: "" },
    { label: "Avg. Response", value: "<100", suffix: "ms" },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our high-performance infrastructure.",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Your funds and data are protected with industry-leading encryption.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Make informed decisions with real-time charts and market insights.",
    },
    {
      icon: DollarSign,
      title: "Low Fees",
      description: "Competitive pricing with no hidden charges or surprises.",
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Access stocks from major exchanges around the world.",
    },
    {
      icon: Activity,
      title: "24/7 Support",
      description: "Our support team is always ready to help you succeed.",
    },
  ];

  const whyChooseUs = [
    "Start with $100,000 virtual money to practice",
    "Real-time stock data from Finnhub API",
    "Track your portfolio performance",
    "No minimum deposit required",
    "Easy deposits and withdrawals",
    "Advanced order types",
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      
     {/* Hero Section */}
<section id = "hero"  className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8">
  <AnimatedChartBackground />

  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-12 gap-8 items-center">

      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-6"
      >
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          Trade Smarter.
          <br />
          <span className="text-primary">
            Invest Better.
          </span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground leading-8 max-w-md">
          Invest confidently with real-time market data,
          portfolio tracking and a seamless virtual trading
          experience designed for modern investors.
        </p>

        <div className="flex gap-4 mt-10">
          <Link to="/register">
            <Button size="lg">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </Link>

          <Link to="/login">
            <Button
              variant="outline"
              size="lg"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-6 relative flex justify-center"
      >

        <div className="absolute -inset-8 bg-primary/10 blur-3xl rounded-full"/>

        <Card className="relative w-full max-w-[520px] mx-auto bg-card/90 backdrop-blur border border-border shadow-xl rounded-2xl">

  <CardContent className="p-5">

    {/* Header */}
    <div className="flex justify-between items-start">

      <div>
        <p className="text-xs text-muted-foreground">
          Portfolio Overview
        </p>

        <h2 className="text-3xl font-bold mt-1">
          $125,483.52
        </h2>

        <div className="flex items-center gap-2 mt-1 text-green-500">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-semibold">
            +$4,283.52 (+3.54%)
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full">
    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
    <span className="text-green-500 font-medium">
        Market Open
    </span>
</div>

    </div>

    {/* Portfolio Chart */}

    <div className="mt-8 rounded-xl bg-muted/20 p-2">
    <HeroPortfolioChart />
</div>

    {/* Holdings */}

    <div className="mt-5">

      <div className="flex justify-between items-center mb-3">

        <h3 className="text-sm font-semibold">
          Top Holdings
        </h3>

        <span className="text-xs text-muted-foreground">
          Allocation
        </span>

      </div>

      <div className="grid grid-cols-2 gap-3">

        {[
          {
            symbol: "AAPL",
            sector: "Technology",
            alloc: "32%",
            change: "+2.8%",
          },
          {
            symbol: "NVDA",
            sector: "Technology",
            alloc: "24%",
            change: "+5.2%",
          },
          {
            symbol: "MSFT",
            sector: "Technology",
            alloc: "18%",
            change: "+1.7%",
          },
          {
            symbol: "TSLA",
            sector: "Automotive",
            alloc: "15%",
            change: "-0.8%",
          },
        ].map((stock) => (

          <div
            key={stock.symbol}
            className="rounded-lg border bg-muted/30 p-3 hover:border-primary transition-all duration-300"
          >

            <div className="flex justify-between items-start">

              <div>

                <p className="font-semibold text-sm">
                  {stock.symbol}
                </p>

                <p className="text-[11px] text-muted-foreground">
                  {stock.sector}
                </p>

              </div>

              <div className="text-right">

                <p className="text-sm font-semibold">
                  {stock.alloc}
                </p>

                <p
                  className={`text-[11px] ${
                    stock.change.startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {stock.change}
                </p>

              </div>

            </div>

          </div>

        ))} 

      </div>

    </div>

  </CardContent>

</Card>

      </motion.div>

    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-y">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                  <span className="text-lg text-muted-foreground ml-1">{stat.suffix}</span>
                </div>
                <div className="text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose StockTrader</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to trade smarter and build your portfolio with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id = "about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Your Trading Journey Today
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of traders who have transformed their financial future with StockTrader.
              </p>
              <ul className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">5-Minute Setup</div>
                      <div className="text-sm text-muted-foreground">Get started in minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <div className="font-semibold">$100K Practice Money</div>
                      <div className="text-sm text-muted-foreground">Perfect for beginners</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join StockTrader today and take control of your financial future. Sign up for free and start building your portfolio.
            </p>
            <Link to="/register">
              <Button size="lg">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
