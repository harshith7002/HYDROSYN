import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Pin, 
  Wind, 
  Droplet, 
  Compass, 
  Cloud, 
  CloudSun, 
  CloudRain, 
  Sun, 
  Search, 
  Plus, 
  Bell, 
  LayoutGrid, 
  BarChart2, 
  Globe, 
  Calendar, 
  Settings, 
  LogOut,
  X,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface CityWeather {
  id: string;
  name: string;
  country: string;
  temp: number;
  condition: string;
  status: string;
  wind: string;
  humidity: string;
  gust: string;
  headline1: string;
  headline2: string;
  blurb: string;
  iconType: 'cloud' | 'cloud2' | 'hail' | 'sun';
}

const CITIES: CityWeather[] = [
  {
    id: 'central-jakarta',
    name: 'Central Jakarta',
    country: 'Indonesia',
    temp: 10,
    condition: 'Storm with Heavy Rain',
    status: 'Strom with Heavy Rain',
    wind: '19 mph',
    humidity: '40%',
    gust: '15km/h',
    headline1: 'Strom',
    headline2: 'with Heavy Rain',
    blurb: 'Partly cloudy with occasional snow showers. High around 50°F. Wind from the east 11 to 21 mph. Snow chance is 40%, with rainfall expected to be less than an inch.',
    iconType: 'hail'
  },
  {
    id: 'north-jakarta',
    name: 'North Jakarta',
    country: 'Indonesia',
    temp: 12,
    condition: 'Mostly Sunny',
    status: 'Mostly Sunny',
    wind: '14 mph',
    humidity: '52%',
    gust: '12km/h',
    headline1: 'Mostly',
    headline2: 'Sunny & Humid',
    blurb: 'Coastal breeze from Java Sea with scattered high cumulus clouds. Humidity remaining moderate through late afternoon.',
    iconType: 'cloud'
  },
  {
    id: 'bandung',
    name: 'Bandung',
    country: 'Indonesia',
    temp: 10,
    condition: 'Cloudy',
    status: 'Cloudy',
    wind: '8 mph',
    humidity: '75%',
    gust: '10km/h',
    headline1: 'Highland',
    headline2: 'Overcast & Cool',
    blurb: 'Mountain valley mist with persistent cloud cover. Ambient temperature holding steady with light mountain precipitation.',
    iconType: 'cloud'
  },
  {
    id: 'south-jakarta',
    name: 'South Jakarta',
    country: 'Indonesia',
    temp: 14,
    condition: 'Sunny',
    status: 'Sunny',
    wind: '11 mph',
    humidity: '48%',
    gust: '16km/h',
    headline1: 'Clear',
    headline2: 'Tropical Skies',
    blurb: 'Unobstructed solar radiation with gentle southeasterly trades. Mild evening cooling expected after twilight.',
    iconType: 'cloud2'
  }
];

const DAYS_FORECAST = [
  { day: 'Sunday', temp: 11, icon: 'cloud', yVal: 195 },
  { day: 'Monday', temp: 13, icon: 'cloud2', yVal: 172 },
  { day: 'Tuesday', temp: 14, icon: 'cloud2', yVal: 160 },
  { day: 'Wednesday', temp: 10, icon: 'hail', yVal: 218 },
  { day: 'Thursday', temp: 19, icon: 'sun', yVal: 12 },
  { day: 'Friday', temp: 12, icon: 'cloud', yVal: 183 },
];

export const WeatherDashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityWeather>(CITIES[0]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(3); // Wednesday = default
  const [activeTab, setActiveTab] = useState<'grid' | 'chart' | 'globe' | 'cal' | 'gear'>('grid');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCities = CITIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen bg-[#04121b] text-white overflow-hidden select-none font-['Inter',sans-serif]">
      {/* ── STAGE ATMOSPHERIC BACKDROP ── */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url("./assets/storm-background.jpg")`,
          backgroundColor: '#071c28'
        }}
      />

      {/* SVG Lightning Pylons & Glow Layer */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[1]" viewBox="0 0 1357 871" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="lg1" cx="510" cy="380" r="310" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#67e8f9" stop-opacity=".22"/>
            <stop offset="45%" stop-color="#0284c7" stop-opacity=".08"/>
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="lg2" cx="650" cy="410" r="330" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#67e8f9" stop-opacity=".24"/>
            <stop offset="45%" stop-color="#0284c7" stop-opacity=".08"/>
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="510" cy="430" rx="300" ry="380" fill="url(#lg1)"/>
        <ellipse cx="650" cy="430" rx="320" ry="360" fill="url(#lg2)"/>
        <g opacity=".85" stroke-linecap="round">
          <polyline points="515,70 510,130 522,188 504,250 519,318 498,385 515,462 494,535 511,615 490,695 516,752 547,802" fill="none" stroke="#e0f2fe" stroke-width="2.6"/>
          <polyline points="510,70 519,142 507,214 526,294 504,372 523,452 499,543 520,635 494,714 531,782" fill="none" stroke="#7dd3fc" stroke-width="1.3"/>
          <polyline points="519,188 498,234 514,282 487,342 516,413 479,484 511,562 474,644 511,732 469,802" fill="none" stroke="#38bdf8" stroke-width="1.0" opacity=".7"/>
        </g>
        <g opacity=".88" stroke-linecap="round">
          <polyline points="644,118 650,192 636,272 653,354 634,434 652,514 629,594 648,674 624,743 641,797" fill="none" stroke="#f0f9ff" stroke-width="3"/>
          <polyline points="639,118 658,202 641,292 661,382 639,472 663,562 637,652 661,732 644,797" fill="none" stroke="#7dd3fc" stroke-width="1.4"/>
          <polyline points="650,192 629,253 648,323 621,402 651,492 619,572 648,662 614,732 644,797" fill="none" stroke="#38bdf8" stroke-width="1.1" opacity=".75"/>
        </g>
        <path d="M0,871 L0,792 Q340,760 680,806 T1357,782 L1357,871 Z" fill="#0a221a"/>
      </svg>

      {/* Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[2] bg-gradient-to-tr from-[rgba(4,16,24,0.4)] via-[rgba(4,16,24,0.15)] to-transparent" />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row p-3 md:p-6 lg:p-8 gap-4 md:gap-8 max-w-[1600px] mx-auto">
        
        {/* 1. LEFT SIDEBAR */}
        <aside className="w-full md:w-16 lg:w-20 py-4 md:py-6 px-4 md:px-2 rounded-2xl md:rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 flex flex-row md:flex-col items-center justify-between shadow-2xl flex-shrink-0 z-30">
          {/* Logo */}
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M4 12 Q8 9 12 12 T20 12" />
              <path d="M4 16 Q8 13 12 16 T20 16" />
              <path d="M4 8 Q8 5 12 8 T20 8" />
            </svg>
          </div>

          {/* Navigation Icons */}
          <nav className="flex flex-row md:flex-col items-center gap-6 md:gap-8 my-0 md:my-auto">
            <button 
              onClick={() => setActiveTab('grid')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${activeTab === 'grid' ? 'text-white bg-white/20 shadow-md scale-110' : 'text-white/60 hover:text-white'}`}
              title="Dashboard"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('chart')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${activeTab === 'chart' ? 'text-white bg-white/20 shadow-md scale-110' : 'text-white/60 hover:text-white'}`}
              title="Reports & Analytics"
            >
              <BarChart2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('globe')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${activeTab === 'globe' ? 'text-white bg-white/20 shadow-md scale-110' : 'text-white/60 hover:text-white'}`}
              title="Explore Regions"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('cal')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${activeTab === 'cal' ? 'text-white bg-white/20 shadow-md scale-110' : 'text-white/60 hover:text-white'}`}
              title="Weather Calendar"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('gear')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${activeTab === 'gear' ? 'text-white bg-white/20 shadow-md scale-110' : 'text-white/60 hover:text-white'}`}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </nav>

          <button className="text-white/50 hover:text-white transition-colors cursor-pointer p-2" title="Sign Out">
            <LogOut className="w-5 h-5" />
          </button>
        </aside>

        {/* 2. CENTER & HERO SECTION */}
        <div className="flex-1 flex flex-col justify-between min-h-[85vh]">
          {/* Header */}
          <header className="flex items-center justify-between w-full mb-6">
            <div>
              <span className="text-sm font-normal text-white/80 block">Welcome</span>
              <span className="text-lg md:text-xl font-bold tracking-tight text-white block">Calfin Danang</span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all cursor-pointer text-white shadow-sm"
                title="Search City"
              >
                <Search className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all cursor-pointer text-white shadow-sm"
                title="Add Location"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all cursor-pointer text-white shadow-sm"
                title="Weather Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </button>
              <div className="w-11 h-11 rounded-full overflow-hidden border border-white/30 cursor-pointer hover:scale-105 transition-transform shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&q=80&auto=format" 
                  alt="Calfin Danang" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </header>

          {/* Hero Headline & Description */}
          <div className="max-w-2xl my-auto py-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90 mb-4 shadow-sm">
              <CloudSun className="w-3.5 h-3.5" />
              <span>Weather Forecast • {selectedCity.name}</span>
            </div>

            <motion.h1 
              key={selectedCity.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.08] mb-4 font-['Inter_Tight',sans-serif]"
            >
              <span className="block">{selectedCity.headline1}</span>
              <span className="block text-white/95">{selectedCity.headline2}</span>
            </motion.h1>

            <motion.p 
              key={selectedCity.blurb}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-base text-white/85 leading-relaxed max-w-lg font-normal"
            >
              {selectedCity.blurb}
            </motion.p>
          </div>

          {/* 4. FORECAST STRIP & ANIMATED WAVE CHART */}
          <div className="w-full max-w-4xl mt-auto pt-6">
            {/* Temperatures Row */}
            <div className="flex items-end justify-between px-2 sm:px-4">
              {DAYS_FORECAST.map((item, index) => (
                <div 
                  key={item.day}
                  onClick={() => setSelectedDayIndex(index)}
                  className={`flex items-center gap-2 cursor-pointer transition-all ${selectedDayIndex === index ? 'scale-110 text-cyan-300 font-semibold' : 'opacity-80 hover:opacity-100 text-white'}`}
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl font-light">{item.temp}°</span>
                  {item.icon === 'cloud' && <Cloud className="w-5 h-5 text-white/80" />}
                  {item.icon === 'cloud2' && <CloudSun className="w-5 h-5 text-white/80" />}
                  {item.icon === 'hail' && <CloudRain className="w-5 h-5 text-cyan-300" />}
                  {item.icon === 'sun' && <Sun className="w-5 h-5 text-amber-300" />}
                </div>
              ))}
            </div>

            {/* SVG Animated Wave Chart */}
            <div className="w-full h-32 md:h-44 relative my-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 835 230" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wfg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#67e8f9" stop-opacity="0.35"/>
                    <stop offset="60%" stop-color="#0ea5e9" stop-opacity="0.12"/>
                    <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
                  </linearGradient>
                </defs>

                {/* Fill Area */}
                <path
                  d="M 0,195 C 70,195 159,172 209,172 C 298,160 348,160 348,160 C 437,218 487,218 487,218 C 576,12 626,12 626,12 C 715,183 765,183 835,183 L 835,230 L 0,230 Z"
                  fill="url(#wfg)"
                />

                {/* Stroke Line */}
                <path
                  d="M 0,195 C 70,195 159,172 209,172 C 298,160 348,160 348,160 C 437,218 487,218 487,218 C 576,12 626,12 626,12 C 715,183 765,183 835,183"
                  fill="none"
                  stroke="rgba(125,211,252,0.95)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Days Labels Row */}
            <div className="flex justify-between px-2 sm:px-4">
              {DAYS_FORECAST.map((item, index) => (
                <button
                  key={item.day}
                  onClick={() => setSelectedDayIndex(index)}
                  className={`text-xs sm:text-sm md:text-base transition-all cursor-pointer ${selectedDayIndex === index ? 'text-white font-bold underline decoration-cyan-400 underline-offset-8' : 'text-white/70 hover:text-white'}`}
                >
                  {item.day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. RIGHT RAIL (CLICKABLE WEATHER CARDS) */}
        <aside className="w-full md:w-80 lg:w-88 flex flex-col gap-4 z-20">
          {/* Card A: Big Primary City Card */}
          <motion.div 
            key={selectedCity.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/25 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                <Pin className="w-4 h-4 text-cyan-300" />
                <span>{selectedCity.name}</span>
              </div>
              <div className="flex items-start">
                <span className="text-7xl sm:text-8xl font-normal tracking-tighter leading-none">{selectedCity.temp}°</span>
                <span className="text-2xl font-normal mt-2 ml-1 text-white/80">C</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-white/20 text-center">
              <div className="flex flex-col items-center">
                <Wind className="w-4 h-4 text-cyan-300 mb-1" />
                <span className="text-xs font-medium text-white">{selectedCity.wind}</span>
                <span className="text-[10px] text-white/60">Wind</span>
              </div>
              <div className="flex flex-col items-center">
                <Droplet className="w-4 h-4 text-cyan-300 mb-1" />
                <span className="text-xs font-medium text-white">{selectedCity.humidity}</span>
                <span className="text-[10px] text-white/60">Humidity</span>
              </div>
              <div className="flex flex-col items-center">
                <Compass className="w-4 h-4 text-cyan-300 mb-1" />
                <span className="text-xs font-medium text-white">{selectedCity.gust}</span>
                <span className="text-[10px] text-white/60">Gust</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Secondary City Cards (B, C, D) */}
          {CITIES.filter(c => c.id !== selectedCity.id).map((city) => (
            <motion.div
              key={city.id}
              onClick={() => setSelectedCity(city)}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.25)' }}
              whileTap={{ scale: 0.98 }}
              className="p-4 px-5 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all flex items-center justify-between cursor-pointer shadow-lg group"
            >
              <div>
                <span className="text-[11px] text-white/70 block">{city.country}</span>
                <span className="text-base font-semibold text-white block group-hover:text-cyan-200 transition-colors">{city.name}</span>
                <span className="text-xs text-white/80">{city.status}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-light text-white">{city.temp}°</span>
                <div className="text-white/80 group-hover:scale-110 transition-transform">
                  {city.iconType === 'cloud' && <Cloud className="w-6 h-6" />}
                  {city.iconType === 'cloud2' && <CloudSun className="w-6 h-6" />}
                  {city.iconType === 'hail' && <CloudRain className="w-6 h-6" />}
                  {city.iconType === 'sun' && <Sun className="w-6 h-6" />}
                </div>
              </div>
            </motion.div>
          ))}
        </aside>
      </div>

      {/* ── SEARCH MODAL POPUP ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#071924]/95 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Select or Search Location</h3>
                <button onClick={() => setIsSearchOpen(false)} className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-white/50" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city or country..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:border-cyan-400 text-sm text-white placeholder-white/40"
                  autoFocus
                />
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredCities.map(city => (
                  <div 
                    key={city.id}
                    onClick={() => { setSelectedCity(city); setIsSearchOpen(false); }}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-sm text-white block">{city.name}</span>
                      <span className="text-xs text-white/60">{city.country} • {city.status}</span>
                    </div>
                    <span className="text-xl font-light text-cyan-300">{city.temp}°C</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── NOTIFICATIONS DRAWER ── */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-6 z-50 w-80 p-5 rounded-3xl bg-[#071924]/95 backdrop-blur-2xl border border-white/20 shadow-2xl text-white"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Live Weather Alerts</span>
              <button onClick={() => setIsNotificationsOpen(false)} className="text-white/60 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-200 block">Severe Thunderstorm Warning</span>
                  <span className="text-white/70">Lightning active across Central Jakarta basin. Precipitation 18mm/hr.</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-300 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-cyan-200 block">Radar Telemetry Synchronized</span>
                  <span className="text-white/70">Next scan update in 4 minutes.</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
