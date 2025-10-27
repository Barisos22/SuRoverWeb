import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronRight, Instagram, Linkedin, Youtube } from "lucide-react";
//import heroVideo from "./assets/videos/surovervenom2.mp4";

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
const HERO_VIDEO = "https://cdn.coverr.co/videos/coverr-nasa-mission-control-7857/1080p.mp4"; // placeholder
const TEAM_PHOTO =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop"; // placeholder
const LEGACY_IMG =
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop"; // placeholder
const VENOM_IMG =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"; // placeholder
const EXPO_IMAGES = {
  saha: "https://images.unsplash.com/photo-1581091215367-59ab6c3b83b1?q=80&w=1600&auto=format&fit=crop",
  idef: "https://images.unsplash.com/photo-1581092334651-ddf26d9c7c1f?q=80&w=1600&auto=format&fit=crop",
};
const SPONSOR_IMAGE =
  "https://images.unsplash.com/photo-1520975922139-994804f9b2ea?q=80&w=1600&auto=format&fit=crop"; // preview-safe placeholder

// ------------------------------ NAV -----------------------------------------
const NAV = [
  { label: "Home", href: "#/home" },
  { label: "Expos", href: "#/expos" },
  { label: "Sponsors", href: "#/sponsors" },
  { label: "Programs", href: "#/programs" },
  { label: "Team", href: "#/team" },
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

// -------------------------- HOME PAGE ----------------------------------------
function HomePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [active, setActive] = useState(SYSTEMS[0].key);
  const activeSystem = SYSTEMS.find((s) => s.key === active)!;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.currentTime >= 30) {
        v.pause();
        setPlaying(false);
      }
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <div id="home" className="min-h-screen w-full bg-neutral-950 text-white">
      {/* Top Nav */}
      <header className="fixed top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="#/home" className="text-xl font-semibold tracking-tight">
            SuRover
          </a>
          <nav className="hidden gap-6 md:flex">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="text-sm hover:opacity-80 transition-opacity">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[88vh] w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          src={HERO_VIDEO}
          autoPlay
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-4xl font-bold md:text-6xl"
          >
            ERC Opening Sequence — 30 Seconds of Vision
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 max-w-2xl text-neutral-200"
          >
            Autonomy in tough terrain, precise manipulation, and a robust architecture. SuRover is a multidisciplinary
            exploration platform developed through university–industry collaboration.
          </motion.p>
          <div className="mt-6 flex items-center gap-3">
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
            <a href="#about" className="inline-flex items-center text-sm opacity-90 hover:opacity-100">
              What is a rover? <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">What is a rover?</h2>
            <p className="mt-3 text-neutral-300">
              Answer: an autonomous field robot that traverses challenging terrain, perceives its environment, makes
              decisions, and executes tasks. SuRover is designed modularly for exploration, sample collection, and remote
              operation scenarios.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-neutral-300">
              <span className="rounded-full bg-neutral-800/70 px-3 py-1">4WS/4WD</span>
              <span className="rounded-full bg-neutral-800/70 px-3 py-1">ROS2</span>
              <span className="rounded-full bg-neutral-800/70 px-3 py-1">CAN Bus</span>
              <span className="rounded-full bg-neutral-800/70 px-3 py-1">RTK GNSS</span>
              <span className="rounded-full bg-neutral-800/70 px-3 py-1">ZED2 / LiDAR</span>
            </div>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            src={TEAM_PHOTO}
            alt="Team photo"
            className="aspect-video w-full rounded-2xl object-cover shadow-2xl"
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
            <img src={LEGACY_IMG} alt="Legacy rover" className="h-64 w-full rounded-2xl object-cover" />
            <figcaption className="mt-3 px-1 text-sm text-neutral-300">
              <span className="font-medium">Legacy</span> — our first competition-ready platform; the base for early
              autonomy and manipulator experiments.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 p-3">
            <img src={VENOM_IMG} alt="Venom rover" className="h-64 w-full rounded-2xl object-cover" />
            <figcaption className="mt-3 px-1 text-sm text-neutral-300">
              <span className="font-medium">Venom</span> — our latest rover with improved chassis stiffness, serviceability,
              and upgraded compute & sensing.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* SYSTEMS (no detail pages, no 'See details') */}
      <section id="systems" className="mx-auto max-w-7xl px-4 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h3 className="text-xl font-semibold md:text-2xl">Systems</h3>
          <a href="#/team" className="text-sm opacity-80 hover:opacity-100">
            View all team members →
          </a>
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

      <Footer />
    </div>
  );
}

// -------------------------- EXPOS PAGE ---------------------------------------
function ExposPage() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="#/home" className="text-xl font-semibold tracking-tight">
            SuRover
          </a>
          <nav className="hidden gap-6 md:flex">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className={`text-sm transition-opacity ${n.href === "#/expos" ? "opacity-100" : "hover:opacity-80"}`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-10">Expos</h1>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Participated Expos</h2>

          {/* SAHA EXPO 2024 */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold">SAHA EXPO 2024</h3>
            <p className="mt-2 text-neutral-300 max-w-3xl">
              Participated with Sabancı University IMC (SUIMC). We exhibited the Legacy rover and introduced our new
              prototype. We met with major companies such as Altınay and TUSAŞ, presented our architecture, and
              discussed potential collaborations. As one of Turkey's largest defense & aerospace fairs, SAHA EXPO 2024
              provided high visibility and networking across industry and academia.
            </p>
            <img src={EXPO_IMAGES.saha} alt="SAHA EXPO 2024" className="mt-4 w-full rounded-2xl shadow-2xl" />
          </div>

          {/* IDEF 2025 */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold">IDEF 2025</h3>
            <p className="mt-2 text-neutral-300 max-w-3xl">
              Attended with TUSAŞ and showcased the Venom rover. We demonstrated the upgraded platform and established a
              connection with TÜBİTAK Uzay. IDEF 2025 allowed us to present our latest vehicle to a broader audience and
              strengthen strategic partnerships.
            </p>
            <img src={EXPO_IMAGES.idef} alt="IDEF 2025" className="mt-4 w-full rounded-2xl shadow-2xl" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Expos</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold">IAC 2026 Antalya</h3>
            <p className="mt-2 text-neutral-300 max-w-3xl">
              Planned participation together with TÜBİTAK Uzay at an international space congress scale, highlighting the
              research capability of our student–industry collaboration.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">SAHA EXPO 2026</h3>
            <p className="mt-2 text-neutral-300 max-w-3xl">
              Returning with our next-generation rover prototype, focusing on improved mobility, autonomy, and
              operations readiness for field demonstrations.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// -------------------------- PROGRAMS PAGE ------------------------------------
function ProgramsPage() {
  const programs = [
    {
      name: "Maxon Young Engineers Programme",
      note: "Only team selected from Turkey",
    },
    { name: "TUSAŞ Student Project Support Programme" },
    { name: "T3 Foundation – Student Project Teams Support Programme" },
    { name: "TÜBİTAK (4001) National & International Competition Participation Support" },
    { name: "TÜBİTAK National Technology Clubs Union" },
    { name: "Arduino Support Program" },
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      <header className="fixed top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="#/home" className="text-xl font-semibold tracking-tight">
            SuRover
          </a>
          <nav className="hidden gap-6 md:flex">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className={`text-sm transition-opacity ${n.href === "#/programs" ? "opacity-100" : "hover:opacity-80"}`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-28 pb-20">
        <h1 className="text-3xl font-bold">Programs</h1>
        <p className="mt-3 max-w-3xl text-neutral-300">
          Supported by six national and international programs that accelerate our research, field-readiness, and student
          growth. These partnerships connect our multidisciplinary team with industry-grade tooling, mentorship, and
          competition pathways.
        </p>

        <section className="mt-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {programs.map((p) => (
              <div key={p.name} className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-5 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  {p.note && (
                    <span className="whitespace-nowrap rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300 border border-emerald-900/50">
                      {p.note}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-neutral-300">
                  Part of our ecosystem of support spanning sponsorship, hardware access, mentorship, and competition
                  participation.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h4 className="text-base font-semibold">At a glance</h4>
            <ul className="mt-3 grid gap-2 text-sm text-neutral-300 md:grid-cols-2">
              <li className="rounded-lg bg-neutral-800/60 px-3 py-2">Maxon YEP: tooling, mentorship, expertise transfer</li>
              <li className="rounded-lg bg-neutral-800/60 px-3 py-2">TUSAŞ: student project support and collaboration</li>
              <li className="rounded-lg bg-neutral-800/60 px-3 py-2">T3: student teams funding & operations enablement</li>
              <li className="rounded-lg bg-neutral-800/60 px-3 py-2">TÜBİTAK 4001: competition participation support</li>
              <li className="rounded-lg bg-neutral-800/60 px-3 py-2">TÜBİTAK NT Clubs Union: community & resources</li>
              <li className="rounded-lg bg-neutral-800/60 px-3 py-2">Arduino: hardware support for rapid prototyping</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// -------------------------- TEAM PAGE ---------------------------------------
function TeamPage() {
  const CAPTAINS = [
    {
      name: "Mahmut",
      email: "mahmut@surover.org",
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&h=400&fit=crop&auto=format",
    },
    {
      name: "Barış Bakırdöven",
      email: "baris@surover.org",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&h=400&fit=crop&auto=format",
    },
  ];

  const SUBTEAMS = [
    { key: "mechanics", title: "Mechanics" },
    { key: "software", title: "Software" },
    { key: "electronics", title: "Electronics" },
    { key: "science", title: "Science" },
    { key: "management", title: "Management" },
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      <header className="fixed top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="#/home" className="text-xl font-semibold tracking-tight">SuRover</a>
          <nav className="hidden gap-6 md:flex">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className={`text-sm transition-opacity ${n.href === "#/team" ? "opacity-100" : "hover:opacity-80"}`}>
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-28 pb-20">
        <h1 className="text-3xl font-bold">Team</h1>
        <p className="mt-3 max-w-3xl text-neutral-300">Meet our captains and subteams powering SuRover.</p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Team Captains</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {CAPTAINS.map((c) => (
              <div key={c.email} className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-5 flex items-center gap-4">
                <img src={c.img} alt={c.name} className="h-20 w-20 rounded-full object-cover" />
                <div>
                  <div className="text-lg font-semibold">{c.name}</div>
                  <a href={`mailto:${c.email}`} className="text-sm text-neutral-300 hover:underline">{c.email}</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Subteams</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {SUBTEAMS.map((t) => (
              <div key={t.key} className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-neutral-800/60 mb-3" />
                <div className="font-semibold">{t.title}</div>
                <p className="mt-1 text-xs text-neutral-400">Headshots and roster coming soon.</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// -------------------------- SPONSORS PAGE ------------------------------------

function SponsorsPage() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      <header className="fixed top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="#/home" className="text-xl font-semibold tracking-tight">
            SuRover
          </a>
          <nav className="hidden gap-6 md:flex">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className={`text-sm transition-opacity ${n.href === "#/sponsors" ? "opacity-100" : "hover:opacity-80"}`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pt-28 pb-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Our Sponsors</h1>
        <p className="text-neutral-300 mb-10 max-w-2xl mx-auto">
          We are proud to be supported by leading institutions and companies who share our vision for innovation in
          robotics and technology. Their collaboration empowers our students to push the limits of engineering and
          exploration.
        </p>
        <img src={SPONSOR_IMAGE} alt="Sponsor logos" className="mx-auto w-full rounded-2xl shadow-2xl" />
      </main>

      <Footer />
    </div>
  );
}

// -------------------------- SHARED FOOTER ------------------------------------
function Footer() {
  return (
    <section id="social" className="border-t border-neutral-800 bg-neutral-950/60">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-neutral-400">Follow us</p>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com" className="rounded-full bg-neutral-800 p-2 hover:bg-neutral-700" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" className="rounded-full bg-neutral-800 p-2 hover:bg-neutral-700" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" className="rounded-full bg-neutral-800 p-2 hover:bg-neutral-700" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-neutral-500">© {new Date().getFullYear()} SuRover • All rights reserved.</div>
      </div>
    </section>
  );
}

// ----------------------------- APP ROUTER ------------------------------------
export default function App() {
  const route = useHashRoute();
  if (route.startsWith("/expos")) return <ExposPage />;
  if (route.startsWith("/sponsors")) return <SponsorsPage />;
  if (route.startsWith("/programs")) return <ProgramsPage />;
  if (route.startsWith("/team")) return <TeamPage />;
  return <HomePage />;
}
