import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Instagram, Linkedin, Youtube, Award, Users, Calendar, Target, Github, FileText, Mail, Menu, X } from "lucide-react";
import heroVideo from "./assets/videos/surovervenom2.mp4";
import venomImg from "./assets/images/venom.jpg";
import legacyImg from "./assets/images/legacy1.jpeg";
import teamPhoto from "./assets/images/team.JPG";
import sahaimg from "./assets/images/saha.JPG";
import idefimg from "./assets/images/IDEF.JPG";
import sponsimg from "./assets/images/sponsor.png";
import mahmut from "./assets/images/Mahmut.JPG";
import baris from "./assets/images/Baris.jpg";

// ------------------------------ Minimal Button (self-contained for preview) -----------------
function Button({
  children,
  onClick,
  variant = "default",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:opacity-50 disabled:pointer-events-none";
  const sizes: Record<string, string> = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-3.5 py-2.5",
    lg: "text-base px-4 py-3",
  };
  const variants: Record<string, string> = {
    default: "bg-white text-neutral-900 hover:bg-neutral-200",
    secondary: "bg-neutral-800 text-neutral-100 hover:bg-neutral-700",
  };
  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

// ------------------------------ ASSETS ---------------------------------------
const HERO_VIDEO = heroVideo; // placeholder
const TEAM_PHOTO = teamPhoto; // placeholder
const LEGACY_IMG = legacyImg; // placeholder
const VENOM_IMG = venomImg; // placeholder
const EXPO_IMAGES = {
  saha: sahaimg,
  idef: idefimg,
};
const SPONSOR_IMAGE = sponsimg // preview-safe placeholder

// ------------------------------ NAV -----------------------------------------
const NAV = [
  { label: "About", href: "#about" },
  { label: "Systems", href: "#systems" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "Exhibitions", href: "#exhibitions" },
  { label: "Team", href: "#team" },
];

const SYSTEMS = [
  {
    key: "drivetrain",
    title: "Drivetrain",
    blurb: "Mobility, steering, and terrain negotiation.",
    points: [
      "4WS/4WD with independent steering/drive modules",
      "Kinematics and odometry implemented in ROS2",
      "Telemetry relay over Wi‑Fi & long‑range RF link",
      "Custom RViz mission dashboard",
      "Command queueing & state visualization",
      "Carbon Fiber Monocoque Chassis",
    ],
  },
  {
    key: "arm",
    title: "Arm",
    blurb: "Precision manipulation and sample collection.",
    points: [
      "6‑DOF modular arm (Maxon EC + EPOS4)",
      "EtherCAT communication",
      "Forward/Inverse Kinematics (FK/IK) with singularity avoidance",
      "Trajectory generation and smooth motion control",
      "Kinematic & dynamic simulations for tuning",
    ],
  },
  {
    key: "autonomy",
    title: "Autonomy",
    blurb: "Localization, mapping, and navigation stack.",
    points: [
      "Visual‑Inertial SLAM (ZED2/RealSense + IMU)",
      "RTK GNSS and IMU sensor fusion (Kalman Filtering)",
      "Trajectory generation and tracking",
      "URDF modeling and Gazebo simulation",
      "Digital system integration and simulation",
    ],
  },
  {
    key: "power",
    title: "Power & Electronics",
    blurb: "Energy distribution, communication, and safety backbone.",
    points: [
      "Custom NMC Li‑ion battery with high‑reliability protection",
      "Portenta with micro‑ROS",
      "Custom PCB design for sensor and transceiver integration",
      "Long‑range RF communication & data link",
      "RTK GNSS, IMU, camera, and LiDAR integration",
    ],
  },
  {
    key: "science",
    title: "Science Kit",
    blurb: "Field research payload for in‑situ sample analysis.",
    points: [
      "Arm‑mounted sampling scoop and drill",
      "On‑board analysis: pH, moisture, conductivity, temperature",
      "Custom made Raman Spectrometer",
      "Data logging to science dashboard",
    ],
  },
];

// --- Simple hash-based router -------------------------------------------------
function useHashRoute() {
  const get = () =>
    (typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") || "/home" : "/home");
  const [hash, setHash] = useState(get());
  useEffect(() => {
    const onHash = () => setHash(get());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

// -------------------------- NAVIGATION COMPONENT -----------------------------
function Navigation({ currentPath }: { currentPath?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60 border-b border-neutral-800/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#/home" className="text-xl font-semibold tracking-tight hover:text-emerald-400 transition-colors">
          SuRover
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden gap-6 md:flex">
          {NAV.map((n) => (
            <a 
              key={n.label} 
              href={n.href} 
              className={`text-sm transition-colors ${
                n.href === currentPath 
                  ? 'text-emerald-400 font-medium' 
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-2 hover:bg-neutral-800 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-800 bg-neutral-900/95 backdrop-blur"
          >
            <nav className="flex flex-col px-4 py-3">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 text-sm transition-colors border-b border-neutral-800/50 last:border-0 ${
                    n.href === currentPath 
                      ? 'text-emerald-400 font-medium' 
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// -------------------------- HOME PAGE ----------------------------------------
function HomePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [active, setActive] = useState(SYSTEMS[0].key);
  const activeSystem = SYSTEMS.find((s) => s.key === active)!;

  return (
    <div id="home" className="min-h-screen w-full bg-neutral-950 text-white">
      <Navigation currentPath="#/home" />

      {/* HERO */}
      <section className="relative h-[88vh] w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          src={HERO_VIDEO}
          autoPlay
          muted
          playsInline
          loop
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300"
          >
            <Award className="h-4 w-4" />
            <span>Only Turkish Team • Maxon Young Engineers Programme</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-4xl font-bold md:text-6xl lg:text-7xl"
          >
            SuRover: Autonomous Planetary Exploration
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-neutral-200"
          >
            A research-grade autonomous rover platform combining advanced robotics, AI-driven navigation, and precision manipulation for challenging terrain exploration. Built through multidisciplinary collaboration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <Button
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                if (playing) {
                  v.pause();
                } else {
                  v.play();
                }
                setPlaying(!playing);
              }}
              size="lg"
              className="rounded-2xl"
            >
              {playing ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />} {playing ? "Pause" : "Play"}
            </Button>
          </motion.div>
          
          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl"
          >
            <div className="rounded-xl border border-neutral-700/50 bg-neutral-900/60 backdrop-blur-sm p-3">
              <div className="text-2xl font-bold text-emerald-400">30+</div>
              <div className="text-xs text-neutral-300">Team Members</div>
            </div>
            <div className="rounded-xl border border-neutral-700/50 bg-neutral-900/60 backdrop-blur-sm p-3">
              <div className="text-2xl font-bold text-emerald-400">5</div>
              <div className="text-xs text-neutral-300">Subsystems</div>
            </div>
            <div className="rounded-xl border border-neutral-700/50 bg-neutral-900/60 backdrop-blur-sm p-3">
              <div className="text-2xl font-bold text-emerald-400">2</div>
              <div className="text-xs text-neutral-300">Rover Generations</div>
            </div>
            <div className="rounded-xl border border-neutral-700/50 bg-neutral-900/60 backdrop-blur-sm p-3">
              <div className="text-2xl font-bold text-emerald-400">20+</div>
              <div className="text-xs text-neutral-300">Sponsors & Partners</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Research & Innovation</h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300">
              SuRover is a <span className="font-semibold text-white">multidisciplinary research platform</span> developing autonomous planetary exploration systems for international competitions and real-world applications. Our work spans mechanical design, embedded systems, AI-driven autonomy, and precision manipulation.
            </p>
            <p className="mt-3 text-neutral-300">
              Through collaboration with <span className="font-semibold text-white">leading academic institutions and industry partners</span>, we advance the state of the art in field robotics while providing hands-on engineering experience for students pursuing graduate studies and research careers.
            </p>
            
            {/* Research Focus Areas */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="font-semibold text-white">Autonomous Navigation</div>
                  <div className="text-sm text-neutral-400">Visual-Inertial SLAM, RTK GNSS fusion, trajectory planning</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="font-semibold text-white">Robotic Manipulation</div>
                  <div className="text-sm text-neutral-400">6-DOF arm with FK/IK, EtherCAT control, precision sampling</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="font-semibold text-white">System Integration</div>
                  <div className="text-sm text-neutral-400">ROS2 architecture, distributed computing, real-time control</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-2 text-xs text-neutral-300">
              <span className="rounded-full border border-neutral-700 bg-neutral-800/70 px-3 py-1.5">ROS2 Humble</span>
              <span className="rounded-full border border-neutral-700 bg-neutral-800/70 px-3 py-1.5">4WS/4WD Mechatronics</span>
              <span className="rounded-full border border-neutral-700 bg-neutral-800/70 px-3 py-1.5">EtherCAT</span>
              <span className="rounded-full border border-neutral-700 bg-neutral-800/70 px-3 py-1.5">RTK GNSS</span>
              <span className="rounded-full border border-neutral-700 bg-neutral-800/70 px-3 py-1.5">ZED2 Camera</span>
              <span className="rounded-full border border-neutral-700 bg-neutral-800/70 px-3 py-1.5">LiDAR SLAM</span>
              <span className="rounded-full border border-neutral-700 bg-neutral-800/70 px-3 py-1.5">Gazebo Sim</span>
            </div>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            src={TEAM_PHOTO}
            alt="Team photo"
            className="aspect-video w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
          />
        </div>
      </section>

      {/* OUR ROVERS (Legacy & Venom) */}
      <section id="our-rover" className="mx-auto max-w-7xl px-4 pb-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold md:text-2xl">Our Rovers</h3>
          <p className="mt-2 text-neutral-300">
            We've built two generations so far. Meet <span className="font-semibold">Legacy</span> and
            <span className="font-semibold"> Venom</span>.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 p-3">
            <img src={LEGACY_IMG} alt="Legacy rover" className="h-96 w-full rounded-2xl object-cover object-[center_95%]" />
            <figcaption className="mt-3 px-1 text-sm text-neutral-300">
              <span className="font-medium">Legacy</span> — our first competition-ready platform; the base for early
              autonomy and manipulator experiments.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 p-3">
            <img src={VENOM_IMG} alt="Venom rover" className="h-96 w-full rounded-2xl object-cover" />
            <figcaption className="mt-3 px-1 text-sm text-neutral-300">
              <span className="font-medium">Venom</span> — our latest rover with improved chassis stiffness, serviceability,
              and upgraded compute & sensing.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* SYSTEMS (no detail pages, no 'See details') */}
      <section id="systems" className="mx-auto max-w-7xl px-4 pb-24">
        <div className="mb-8">
          <h3 className="text-3xl font-bold md:text-4xl">Technical Systems</h3>
          <p className="mt-3 max-w-3xl text-neutral-300">
            Five integrated subsystems working in concert to deliver autonomous exploration capabilities.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[260px,1fr]">
          <div className="flex flex-col gap-3">
            {SYSTEMS.map((s) => (
              <Button
                key={s.key}
                variant={s.key === active ? "default" : "secondary"}
                className={`justify-start rounded-2xl text-left ${
                  s.key === active ? "bg-white text-neutral-900" : "bg-neutral-800 text-neutral-100"
                }`}
                onClick={() => setActive(s.key)}
              >
                {s.title}
              </Button>
            ))}
          </div>
          <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSystem.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h4 className="text-lg font-semibold">{activeSystem.title}</h4>
                <p className="mt-2 max-w-2xl text-neutral-300">{activeSystem.blurb}</p>
                <ul className="mt-4 grid gap-2 text-sm text-neutral-300 md:grid-cols-2">
                  {activeSystem.points.map((p, i) => (
                    <li key={i} className="rounded-lg bg-neutral-800/60 px-3 py-2">
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS & SUPPORT */}
      <section id="partnerships" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-8">
          <h3 className="text-3xl font-bold md:text-4xl">Partnerships & Support</h3>
          <p className="mt-3 max-w-3xl text-neutral-300">
            Supported by leading national and international programs connecting our team with industry-grade resources, expert mentorship, and strategic partnerships.
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h4 className="text-xl font-semibold">Maxon Young Engineers Programme</h4>
              <span className="whitespace-nowrap rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-300 border border-amber-900/50">
                Only Turkish Team
              </span>
            </div>
            <p className="text-sm text-neutral-300">
              Selected as Turkey's sole representative for this elite international engineering programme, receiving high-performance actuation systems and expert guidance for drivetrain and manipulator design.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h4 className="text-xl font-semibold mb-3">TUSAŞ Student Project Support</h4>
            <p className="text-sm text-neutral-300">
              Industry collaboration enabling project logistics, visibility at major exhibitions, and technical mentorship from aerospace sector leaders.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h4 className="text-xl font-semibold mb-3">T3 Foundation</h4>
            <p className="text-sm text-neutral-300">
              Student Project Teams Support Programme providing operational funding and ecosystem access for research and development.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h4 className="text-xl font-semibold mb-3">TÜBİTAK Support</h4>
            <p className="text-sm text-neutral-300">
              National & international competition participation support through the 4001 programme, plus access to the National Technology Clubs Union network.
            </p>
          </div>
        </div>
      </section>

      {/* EXHIBITIONS */}
      <section id="exhibitions" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-8">
          <h3 className="text-3xl font-bold md:text-4xl">Industry Exhibitions</h3>
          <p className="mt-3 max-w-3xl text-neutral-300">
            Strategic presence at major defense and aerospace exhibitions, showcasing our capabilities to industry leaders and establishing key partnerships.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* SAHA EXPO 2024 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-neutral-800 bg-neutral-900/50 overflow-hidden"
          >
            <img src={EXPO_IMAGES.saha} alt="SAHA EXPO 2024" className="w-full h-64 object-cover"/>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-emerald-400">2024</span>
                <span className="text-neutral-500">•</span>
                <span className="text-sm text-neutral-400">Istanbul</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">SAHA EXPO 2024</h4>
              <p className="text-sm text-neutral-300">
                Exhibited with Sabancı University IMC, meeting with major companies like Altınay and TUSAŞ to discuss collaborations at Turkey's largest defense & aerospace fair.
              </p>
            </div>
          </motion.div>

          {/* IDEF 2025 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-neutral-800 bg-neutral-900/50 overflow-hidden"
          >
            <img src={EXPO_IMAGES.idef} alt="IDEF 2025" className="w-full h-64 object-cover" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-emerald-400">2025</span>
                <span className="text-neutral-500">•</span>
                <span className="text-sm text-neutral-400">Istanbul</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">IDEF 2025</h4>
              <p className="text-sm text-neutral-300">
                Showcased Venom rover with TUSAŞ, demonstrating upgraded capabilities and establishing strategic connection with TÜBİTAK Uzay.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5">
            <div className="text-sm font-medium text-emerald-400 mb-2">Upcoming • 2026</div>
            <h4 className="text-lg font-semibold mb-2">IAC 2026 Antalya</h4>
            <p className="text-sm text-neutral-300">
              International space congress participation with TÜBİTAK Uzay.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5">
            <div className="text-sm font-medium text-emerald-400 mb-2">Upcoming • 2026</div>
            <h4 className="text-lg font-semibold mb-2">SAHA EXPO 2026</h4>
            <p className="text-sm text-neutral-300">
              Returning with next-generation rover and field demonstrations.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-8">
          <h3 className="text-3xl font-bold md:text-4xl">Our Team</h3>
          <p className="mt-3 max-w-3xl text-neutral-300">
            Led by experienced captains coordinating 30+ members across five technical subsystems.
          </p>
        </div>

        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 text-neutral-200">Team Captains</h4>
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-5 flex items-center gap-4"
            >
              <img src={baris} alt="Barış Bakırdöven" className="h-20 w-20 rounded-full object-cover ring-2 ring-neutral-700" />
              <div>
                <div className="text-lg font-semibold">Barış Bakırdöven</div>
                <a href="mailto:bbakirdoven@sabanciuniv.edu" className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors">
                  bbakirdoven@sabanciuniv.edu
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-5 flex items-center gap-4"
            >
              <img src={mahmut} alt="Mahmut Karaarslan" className="h-20 w-20 rounded-full object-cover ring-2 ring-neutral-700" />
              <div>
                <div className="text-lg font-semibold">Mahmut Karaarslan</div>
                <a href="mailto:mahmut.karaarslan@sabanciuniv.edu" className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors">
                  mahmut.karaarslan@sabanciuniv.edu
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-4 text-neutral-200">Subsystems</h4>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5">
            {["Mechanics", "Software", "Electronics", "Science", "Management"].map((team, idx) => (
              <motion.div
                key={team}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4 text-center"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-neutral-800/60 mb-2" />
                <div className="font-medium text-sm">{team}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section id="sponsors" className="mx-auto max-w-7xl px-4 pb-24">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-bold md:text-4xl">Our Sponsors & Partners</h3>
          <p className="mt-3 max-w-3xl mx-auto text-neutral-300">
            Supported by 20+ leading institutions and companies advancing innovation in robotics and aerospace technology.
          </p>
        </div>
        <img
          src={SPONSOR_IMAGE}
          alt="Sponsors"
          className="mx-auto w-full max-w-5xl object-contain mix-blend-lighten"
          loading="lazy"
        />
      </section>

      <Footer />
    </div>
  );
}

// -------------------------- SHARED FOOTER ------------------------------------
function Footer() {
  return (
    <section id="social" className="border-t border-neutral-800 bg-neutral-950/60">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold mb-3">SuRover</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              An autonomous planetary exploration platform advancing field robotics through multidisciplinary engineering and research.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <div className="space-y-2">
              {NAV.map((n) => (
                <a key={n.label} href={n.href} className="block text-sm text-neutral-400 hover:text-white transition-colors">
                  {n.label}
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <div className="space-y-3">
              <a href="mailto:contact@surover.com" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                <span>contact@surover.com</span>
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a href="https://instagram.com/surover" target="_blank" rel="noopener noreferrer" className="rounded-full bg-neutral-800 p-2 hover:bg-neutral-700 transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/company/surover" target="_blank" rel="noopener noreferrer" className="rounded-full bg-neutral-800 p-2 hover:bg-neutral-700 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://youtube.com/@surover" target="_blank" rel="noopener noreferrer" className="rounded-full bg-neutral-800 p-2 hover:bg-neutral-700 transition-colors" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="https://github.com/surover" target="_blank" rel="noopener noreferrer" className="rounded-full bg-neutral-800 p-2 hover:bg-neutral-700 transition-colors" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-neutral-500">
            © {new Date().getFullYear()} SuRover Team • Sabancı University • All rights reserved.
          </div>
          <div className="text-xs text-neutral-500">
            Built for research and innovation in autonomous robotics
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------- APP ROUTER ------------------------------------
export default function App() {
  // Single page application - always show HomePage
  return <HomePage />;
}
