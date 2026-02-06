import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Calculator,
  Calendar,
  Check,
  ChefHat,
  Clock,
  Coins,
  Flame,
  Heart,
  HelpCircle,
  ImageIcon,
  Leaf,
  LayoutGrid,
  MapPin,
  Moon,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sun,
  Timer,
  TrendingDown,
  Trash2,
  Users,
  UsersRound,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import Header from "@/app/components/Header";

/* =============================================================================
   SHARED: Image Placeholder
   Purpose: Visual placeholder with AI generation prompt for future replacement
   ============================================================================= */
function ImagePlaceholder({
  prompt,
  className = "",
  gradientFrom = "from-accent-green",
  gradientTo = "to-accent-terracotta",
}: Readonly<{
  prompt: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}>) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <ImageIcon className="h-8 w-8 text-secondary/25" strokeWidth={1.5} />
        <p className="max-w-[200px] text-[11px] leading-snug text-secondary/50">
          {prompt}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   SECTION 1: HERO
   Purpose: Capture attention, communicate core value proposition, drive signup
   ============================================================================= */
function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Copy */}
          <div className="max-w-xl text-center lg:text-left">
            {/* Trust badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-secondary shadow-sm ring-1 ring-card-border">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Respaldado por el INS / CENAN</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Planifica, ahorra y come{" "}
              <span className="text-primary">mejor</span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Organiza las comidas de tu familia con{" "}
              <span className="font-semibold text-foreground">
                recetas nutritivas, economicas y deliciosas
              </span>{" "}
              del Instituto Nacional de Salud del Peru. Ahorra hasta{" "}
              <span className="font-semibold text-secondary">
                S/.90 al mes
              </span>{" "}
              planificando tu semana.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/registro"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-lg font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/40"
              >
                Comenzar gratis
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-card-border bg-card px-8 text-lg font-semibold text-foreground transition-all hover:border-primary hover:bg-primary-light"
              >
                Ver como funciona
              </a>
            </div>

            {/* Social proof mini */}
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary to-primary-hover" />
                <div className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-secondary to-primary" />
                <div className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary-hover to-secondary" />
                <div className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-secondary to-primary-hover" />
              </div>
              <span>
                +2,500 familias ya planifican con{" "}
                <span className="font-semibold text-foreground">Pachamesa</span>
              </span>
            </div>
          </div>

          {/* Right: App Preview */}
          <div className="relative w-full max-w-sm lg:max-w-md">
            <div className="relative rounded-3xl bg-card p-4 shadow-2xl shadow-foreground/10 ring-1 ring-card-border">
              {/* Phone mockup header */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Lunes, 3 de Febrero
                </span>
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
                  3 comidas planificadas
                </span>
              </div>

              {/* Sample meal cards */}
              <div className="space-y-3">
                <MealPreviewCard
                  time="Desayuno"
                  icon={<Sun className="h-7 w-7 text-secondary" />}
                  title="Quinua con leche y fruta"
                  calories="320 kcal"
                  cost="S/. 2.50"
                  color="terracotta"
                />
                <MealPreviewCard
                  time="Almuerzo"
                  icon={
                    <UtensilsCrossed className="h-7 w-7 text-primary" />
                  }
                  title="Aji de gallina con arroz"
                  calories="580 kcal"
                  cost="S/. 8.00"
                  color="green"
                />
                <MealPreviewCard
                  time="Cena"
                  icon={<Moon className="h-7 w-7 text-muted-foreground" />}
                  title="Ensalada de pallares"
                  calories="290 kcal"
                  cost="S/. 4.50"
                  color="blue"
                />
              </div>

              {/* Bottom stats */}
              <div className="mt-4 flex justify-between rounded-2xl bg-primary-light/50 p-3 text-sm">
                <div className="text-center">
                  <p className="font-bold text-foreground">1,190</p>
                  <p className="text-xs text-muted-foreground">kcal total</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-secondary">S/. 15.00</p>
                  <p className="text-xs text-muted-foreground">costo del dia</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-primary">Balanceado</p>
                  <p className="text-xs text-muted-foreground">nutricion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MealPreviewCard({
  time,
  icon,
  title,
  calories,
  cost,
  color,
}: Readonly<{
  time: string;
  icon: ReactNode;
  title: string;
  calories: string;
  cost: string;
  color: "terracotta" | "green" | "blue";
}>) {
  const colorClasses = {
    terracotta: "bg-accent-terracotta border-accent-terracotta-border",
    green: "bg-accent-green border-accent-green-border",
    blue: "bg-accent-blue border-accent-blue-border",
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-3 ${colorClasses[color]}`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/60">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium text-muted-foreground">{time}</p>
        <p className="font-semibold text-foreground">{title}</p>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span>{calories}</span>
          <span className="font-medium text-secondary">{cost}</span>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   SECTION 2: PAIN POINTS / PROBLEM
   Purpose: Connect with user struggles, show empathy, create resonance
   ============================================================================= */
function PainPointsSection() {
  const painPoints: {
    id: string;
    icon: ReactNode;
    title: string;
    description: string;
    stat: string;
  }[] = [
    {
      id: "que-cocino",
      icon: <HelpCircle className="h-6 w-6 text-primary" />,
      title: '"Que cocino hoy?"',
      description:
        "Todos los dias la misma pregunta sin respuesta clara. Terminas repitiendo lo mismo o improvisando.",
      stat: "2 horas semanales ahorradas",
    },
    {
      id: "presupuesto",
      icon: <Wallet className="h-6 w-6 text-secondary" />,
      title: '"Se me va el presupuesto"',
      description:
        "Compras de mas, desperdicias comida, y al final del mes no cuadran las cuentas.",
      stat: "Ahorra S/.80-120 al mes",
    },
    {
      id: "tiempo",
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: '"No tengo tiempo"',
      description:
        "Entre el trabajo y la casa, cocinar algo nutritivo parece imposible.",
      stat: "Recetas desde 15 minutos",
    },
    {
      id: "porciones",
      icon: <UsersRound className="h-6 w-6 text-primary" />,
      title: '"Las porciones nunca salen bien"',
      description:
        "O sobra demasiado o falta comida. Calcular para 4, 5 o 6 personas es un dolor de cabeza.",
      stat: "Porciones exactas automaticas",
    },
    {
      id: "ingredientes",
      icon: <ShoppingCart className="h-6 w-6 text-secondary" />,
      title: '"Tengo ingredientes pero no se que hacer"',
      description:
        "Tienes pollo, papas y verduras... pero la inspiracion no llega.",
      stat: "Busca por lo que tienes",
    },
    {
      id: "cambiar",
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: '"Mi familia no quiere cambiar"',
      description:
        "Quieres comer mas sano pero nadie acepta platos muy diferentes a lo habitual.",
      stat: "Transicion gradual y natural",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Sabemos como te sientes...
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Planificar las comidas de la familia no deberia ser tan dificil.
            Estos problemas los viven miles de familias peruanas cada dia.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point) => (
            <div
              key={point.id}
              className="rounded-2xl border border-card-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                {point.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {point.title}
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                {point.description}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                <TrendingDown className="h-3 w-3" />
                {point.stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SECTION 3: SOLUTION / HOW IT WORKS
   Purpose: Present the app as the solution, explain the process simply
   ============================================================================= */
function HowItWorksSection() {
  const steps: {
    number: string;
    icon: ReactNode;
    title: string;
    description: string;
    color: string;
  }[] = [
    {
      number: "1",
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Configura tu familia",
      description:
        "Indica cuantas personas son, edades y preferencias. Solo toma 2 minutos.",
      color: "bg-accent-blue border-accent-blue-border",
    },
    {
      number: "2",
      icon: <UtensilsCrossed className="h-8 w-8 text-primary" />,
      title: "Recibe sugerencias diarias",
      description:
        "Cada dia te sugerimos 3 opciones de menu completo adaptadas a tu familia.",
      color: "bg-accent-green border-accent-green-border",
    },
    {
      number: "3",
      icon: <Check className="h-8 w-8 text-primary" />,
      title: "Elige y planifica",
      description:
        "Selecciona lo que mas te guste. Nosotros calculamos porciones y presupuesto.",
      color: "bg-accent-terracotta border-accent-terracotta-border",
    },
    {
      number: "4",
      icon: <ChefHat className="h-8 w-8 text-primary" />,
      title: "Cocina con confianza",
      description:
        "Recetas paso a paso con tiempos, costos e informacion nutricional.",
      color: "bg-accent-yellow border-accent-yellow-border",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="bg-card px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-primary">
            Super facil
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Como funciona Pachamesa?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            En 4 simples pasos, transforma la manera en que planificas las
            comidas de tu familia.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {step.number !== "4" && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-card-border lg:block" />
              )}

              <div
                className={`relative rounded-2xl border p-6 text-center ${step.color}`}
              >
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm font-bold text-white">
                  Paso {step.number}
                </div>

                <div className="mx-auto mb-4 mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SECTION 4: FEATURES GRID
   Purpose: Showcase key features with benefits, using pastel cards
   ============================================================================= */
function FeaturesSection() {
  const features: {
    id: string;
    icon: ReactNode;
    title: string;
    description: string;
    color: string;
  }[] = [
    {
      id: "opciones-diarias",
      icon: <LayoutGrid className="h-5 w-5 text-primary" />,
      title: "3 opciones por dia",
      description:
        "Nunca mas te quedaras sin ideas. Cada dia recibes 3 sugerencias de menu completo para elegir.",
      color: "bg-accent-green border-accent-green-border",
    },
    {
      id: "calculadora",
      icon: <Calculator className="h-5 w-5 text-primary" />,
      title: "Calculadora de porciones",
      description:
        "Ajusta las cantidades automaticamente segun el tamano de tu familia. De 2 a 10 personas.",
      color: "bg-accent-blue border-accent-blue-border",
    },
    {
      id: "presupuesto",
      icon: <Wallet className="h-5 w-5 text-secondary" />,
      title: "Control de presupuesto",
      description:
        "Ve el costo estimado de cada receta y planifica tu semana sin exceder tu presupuesto.",
      color: "bg-accent-terracotta border-accent-terracotta-border",
    },
    {
      id: "ingredientes",
      icon: <Search className="h-5 w-5 text-primary" />,
      title: '"Que cocino con esto?"',
      description:
        "Ingresa los ingredientes que tienes y te sugerimos recetas que puedes preparar ahora mismo.",
      color: "bg-accent-yellow border-accent-yellow-border",
    },
    {
      id: "nutricion",
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
      title: "Informacion nutricional",
      description:
        "Cada receta incluye calorias, proteinas, carbohidratos y mas. Avalado por nutricionistas del CENAN.",
      color: "bg-accent-green border-accent-green-border",
    },
    {
      id: "tiempos",
      icon: <Timer className="h-5 w-5 text-secondary" />,
      title: "Tiempos de preparacion",
      description:
        "Filtra recetas por tiempo disponible. Desde 15 minutos hasta preparaciones mas elaboradas.",
      color: "bg-accent-terracotta border-accent-terracotta-border",
    },
    {
      id: "semanal",
      icon: <Calendar className="h-5 w-5 text-primary" />,
      title: "Planificacion semanal",
      description:
        "Navega entre dias, marca lo que ya cocinaste y ajusta el menu cuando quieras.",
      color: "bg-accent-blue border-accent-blue-border",
    },
    {
      id: "transicion",
      icon: <Heart className="h-5 w-5 text-primary" />,
      title: "Transicion gradual",
      description:
        "Respetamos tus comidas habituales. Introducimos opciones mas saludables poco a poco.",
      color: "bg-accent-yellow border-accent-yellow-border",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-primary">
            Todo lo que necesitas
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Funciones pensadas para ti
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Disenado para las necesidades reales de las familias peruanas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`rounded-2xl border p-6 transition-all hover:shadow-lg ${feature.color}`}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/60">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-bold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SECTION 5: CREDIBILITY / TRUST
   Purpose: Build trust through CENAN/INS backing, statistics, methodology
   ============================================================================= */
function TrustSection() {
  const stats: {
    id: string;
    icon: ReactNode;
    number: string;
    label: string;
    highlight?: boolean;
  }[] = [
    {
      id: "recetas",
      number: "500+",
      label: "Recetas verificadas",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      id: "regiones",
      number: "25",
      label: "Regiones del Peru",
      icon: <MapPin className="h-6 w-6 text-primary" />,
    },
    {
      id: "nutricionistas",
      number: "100%",
      label: "Avalado por nutricionistas",
      icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    },
    {
      id: "costo",
      number: "S/.15",
      label: "Costo promedio diario",
      icon: <Coins className="h-6 w-6 text-secondary" />,
      highlight: true,
    },
    {
      id: "ahorro",
      number: "~30%",
      label: "Ahorro en compras semanales",
      icon: <TrendingDown className="h-6 w-6 text-secondary" />,
      highlight: true,
    },
    {
      id: "desperdicio",
      number: "-40%",
      label: "Menos desperdicio de comida",
      icon: <Trash2 className="h-6 w-6 text-secondary" />,
      highlight: true,
    },
  ];

  const trustBadges = [
    { id: "datos", text: "Datos nutricionales verificados" },
    { id: "costos", text: "Costos actualizados" },
    { id: "ingredientes", text: "Ingredientes peruanos accesibles" },
  ];

  return (
    <section
      id="confianza"
      className="bg-foreground px-4 py-20 text-background sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-semibold">
              Instituto Nacional de Salud del Peru
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Respaldado por la ciencia y la tradicion
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/70">
            Todas nuestras recetas provienen del{" "}
            <span className="font-semibold text-white">
              Centro Nacional de Alimentacion y Nutricion (CENAN)
            </span>{" "}
            del INS. Son el resultado de anos de investigacion en nutricion
            adaptada a la realidad peruana: ingredientes locales, accesibles y
            preparaciones que respetan nuestra cultura culinaria.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`rounded-2xl p-6 text-center backdrop-blur-sm ${
                stat.highlight
                  ? "bg-secondary/20 ring-1 ring-secondary/30"
                  : "bg-white/5"
              }`}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                {stat.icon}
              </div>
              <p
                className={`text-4xl font-bold ${
                  stat.highlight ? "text-secondary" : "text-primary"
                }`}
              >
                {stat.number}
              </p>
              <p className="text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {trustBadges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3"
            >
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SECTION 6: RECIPE PREVIEW
   Purpose: Show actual recipe examples to make the value tangible
   ============================================================================= */
function RecipePreviewSection() {
  const recipes = [
    {
      id: "aji-gallina",
      title: "Aji de gallina",
      imagePrompt:
        "Aji de gallina cremoso servido en plato de ceramica con arroz blanco, fotografia profesional de alimentos, luz calida natural",
      gradientFrom: "from-accent-terracotta",
      gradientTo: "to-accent-yellow",
      time: "45 min",
      cost: "S/. 8.00",
      servings: "4 porciones",
      calories: "580 kcal",
      tags: ["Almuerzo", "Tradicion"],
      region: "Lima",
    },
    {
      id: "quinua-atamalada",
      title: "Quinua atamalada",
      imagePrompt:
        "Bowl de quinua atamalada con canela y leche, estilo rustico andino, fotografia cenital, fondo de madera",
      gradientFrom: "from-accent-yellow",
      gradientTo: "to-accent-terracotta",
      time: "30 min",
      cost: "S/. 5.50",
      servings: "4 porciones",
      calories: "320 kcal",
      tags: ["Desayuno", "Alto en proteina"],
      region: "Puno",
    },
    {
      id: "ceviche-pescado",
      title: "Ceviche de pescado",
      imagePrompt:
        "Ceviche peruano fresco con limon, cebolla morada y cilantro, plato de vidrio, fondo costeno luminoso",
      gradientFrom: "from-accent-blue",
      gradientTo: "to-accent-green",
      time: "20 min",
      cost: "S/. 12.00",
      servings: "4 porciones",
      calories: "180 kcal",
      tags: ["Almuerzo", "Bajo en calorias"],
      region: "Piura",
    },
    {
      id: "ensalada-pallares",
      title: "Ensalada de pallares",
      imagePrompt:
        "Ensalada fresca de pallares con tomate, cebolla y hierbas, bowl de barro, fotografia de alimentos natural",
      gradientFrom: "from-accent-green",
      gradientTo: "to-accent-yellow",
      time: "25 min",
      cost: "S/. 4.50",
      servings: "4 porciones",
      calories: "290 kcal",
      tags: ["Cena", "Economico"],
      region: "Ica",
    },
  ];

  return (
    <section id="recetas" className="bg-card px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-secondary-light px-4 py-2 text-sm font-semibold text-secondary">
            Muestra de recetas
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Recetas de toda la costa, sierra y selva
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explora nuestra coleccion de recetas tradicionales adaptadas para
            una alimentacion saludable y economica.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group overflow-hidden rounded-2xl border border-card-border bg-background transition-all hover:border-primary/30 hover:shadow-xl"
            >
              {/* Recipe image placeholder */}
              <div className="relative">
                <ImagePlaceholder
                  prompt={recipe.imagePrompt}
                  className="h-44"
                  gradientFrom={recipe.gradientFrom}
                  gradientTo={recipe.gradientTo}
                />
                {/* CENAN badge over image */}
                <span className="absolute right-2 top-2 rounded-full bg-secondary/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                  CENAN
                </span>
              </div>

              <div className="p-4">
                {/* Region badge */}
                <span className="mb-2 inline-block rounded-full bg-primary-light px-2 py-0.5 text-xs font-medium text-primary">
                  {recipe.region}
                </span>

                <h3 className="mb-3 text-lg font-bold text-foreground">
                  {recipe.title}
                </h3>

                {/* Quick stats */}
                <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {recipe.time}
                  </div>
                  <div className="flex items-center gap-1 font-medium text-secondary">
                    <Coins className="h-3 w-3" /> {recipe.cost}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {recipe.servings}
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3" /> {recipe.calories}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.map((tag) => (
                    <span
                      key={`${recipe.id}-${tag}`}
                      className="rounded-full bg-primary-light px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/registro"
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Ver las 500+ recetas
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SECTION 7: TESTIMONIALS
   Purpose: Social proof from real Peruvian families, emphasis on savings
   ============================================================================= */
function TestimonialsSection() {
  const testimonials = [
    {
      id: "maria",
      name: "Maria Elena",
      initials: "ME",
      location: "Lima, San Juan de Lurigancho",
      quote:
        "Antes gastaba S/.350 a la semana comprando sin planificar. Con Pachamesa bajo a S/.280 y comemos mejor. Las porciones exactas evitan que tire comida.",
      highlight: "Ahorra S/.70 por semana",
    },
    {
      id: "carlos",
      name: "Carlos",
      initials: "CG",
      location: "Arequipa",
      quote:
        "Ya no pierdo tiempo decidiendo que cocinar. Las 3 opciones diarias me ahorran 30 minutos de indecision. Y las recetas del CENAN son confiables.",
      highlight: "30 min menos de indecision al dia",
    },
    {
      id: "rosa",
      name: "Rosa",
      initials: "RM",
      location: "Trujillo",
      quote:
        "Mi familia de 6 personas comia muy repetitivo. Ahora probamos recetas nuevas sin gastar mas, y mis hijos comen mas nutritivo. La calculadora de porciones es genial.",
      highlight: "Familia de 6, sin gastar de mas",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-secondary-light px-4 py-2 text-sm font-semibold text-secondary">
            Historias reales
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Lo que dicen las familias peruanas
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl border border-card-border bg-card p-6"
            >
              {/* Highlight badge */}
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-secondary-light px-3 py-1 text-sm font-semibold text-secondary">
                <TrendingDown className="h-3.5 w-3.5" />
                {testimonial.highlight}
              </span>

              {/* Quote */}
              <p className="mb-6 text-lg leading-relaxed text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SECTION 8: PRICING / VALUE
   Purpose: Show it's free, explain the value
   ============================================================================= */
function PricingSection() {
  const pricingFeatures = [
    { id: "recetas", text: "Acceso a 500+ recetas verificadas" },
    { id: "planificacion", text: "Planificacion semanal ilimitada" },
    { id: "calculadora", text: "Calculadora de porciones" },
    { id: "nutricion", text: "Informacion nutricional completa" },
    { id: "busqueda", text: "Busqueda por ingredientes" },
    { id: "sin-publicidad", text: "Sin publicidad invasiva" },
  ];

  return (
    <section className="bg-gradient-to-b from-primary-light/30 to-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-block rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-primary">
          100% Gratuito
        </span>

        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
          Sin costo, sin trucos
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          Pachamesa es un proyecto de impacto social. Nuestro objetivo es que
          todas las familias peruanas tengan acceso a una alimentacion
          saludable, sin importar su presupuesto.
        </p>

        <div className="mx-auto max-w-lg rounded-3xl border border-card-border bg-card p-8 shadow-xl">
          <div className="mb-6">
            <span className="text-6xl font-bold text-foreground">Gratis</span>
            <p className="text-muted-foreground">para siempre</p>
          </div>

          <ul className="mb-8 space-y-3 text-left">
            {pricingFeatures.map((feature) => (
              <li key={feature.id} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-foreground">{feature.text}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/registro"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:shadow-xl"
          >
            Comenzar ahora
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SECTION 9: FAQ
   Purpose: Address common questions, reduce friction
   ============================================================================= */
function FAQSection() {
  const faqs = [
    {
      id: "gratis",
      question: "Es realmente gratis?",
      answer:
        "Si, Pachamesa es 100% gratuito. Es un proyecto de impacto social respaldado por instituciones publicas. No hay costos ocultos ni suscripciones premium.",
    },
    {
      id: "recetas-origen",
      question: "De donde vienen las recetas?",
      answer:
        "Todas las recetas provienen del Centro Nacional de Alimentacion y Nutricion (CENAN) del Instituto Nacional de Salud del Peru. Son el resultado de investigacion cientifica en nutricion.",
    },
    {
      id: "ahorro",
      question: "Realmente voy a ahorrar dinero?",
      answer:
        "Si. Planificar evita compras impulsivas y desperdicios. El promedio de ahorro reportado por nuestras familias es de S/.90 al mes. Ademas, todas las recetas indican costo estimado para que controles tu presupuesto.",
    },
    {
      id: "porciones",
      question: "Puedo ajustar las porciones?",
      answer:
        "Claro! Nuestra calculadora te permite ajustar las cantidades desde 2 hasta 10 personas. Los ingredientes y la informacion nutricional se actualizan automaticamente.",
    },
    {
      id: "ingredientes-accesibles",
      question: "Las recetas usan ingredientes caros o dificiles de encontrar?",
      answer:
        "No. Todas las recetas del CENAN usan ingredientes accesibles en mercados, bodegas y supermercados peruanos. Puedes filtrar por precio y buscar recetas segun lo que ya tienes en casa.",
    },
    {
      id: "dificultad",
      question: "Las recetas son dificiles de preparar?",
      answer:
        "Tenemos recetas para todos los niveles. Puedes filtrar por tiempo de preparacion, desde platos de 15 minutos hasta preparaciones mas elaboradas para ocasiones especiales.",
    },
    {
      id: "offline",
      question: "Funciona sin internet?",
      answer:
        "Proximamente. Estamos trabajando en una version que te permita guardar tus recetas favoritas para verlas sin conexion.",
    },
    {
      id: "dietas",
      question: "Tienen recetas para dietas especiales?",
      answer:
        "Si, puedes filtrar recetas para diabeticos, hipertensos, celiacos, y mas. Cada receta tiene informacion nutricional detallada para que tomes decisiones informadas.",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group rounded-2xl border border-card-border bg-card"
            >
              <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground">
                {faq.question}
                <span className="ml-4 transition-transform group-open:rotate-45">
                  <Plus className="h-5 w-5" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-muted-foreground">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SECTION 10: FINAL CTA
   Purpose: Strong closing call-to-action
   ============================================================================= */
function FinalCTASection() {
  return (
    <section
      id="comenzar"
      className="bg-gradient-to-br from-primary to-primary-hover px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
          <Leaf className="h-8 w-8 text-white" />
        </div>

        <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
          Lista para comer mejor sin complicarte?
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
          Unite a las miles de familias peruanas que ya planifican sus comidas
          con Pachamesa. Empieza hoy, es gratis.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/registro"
            className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-white px-10 text-xl font-bold text-primary shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <span>Crear mi cuenta gratis</span>
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>

        <p className="mt-6 text-sm text-white/60">
          Sin tarjeta de credito. Sin spam. Solo comida rica y saludable.
        </p>
      </div>
    </section>
  );
}

/* =============================================================================
   SECTION 11: FOOTER
   Purpose: Navigation, legal, social links
   ============================================================================= */
function Footer() {
  const productLinks = [
    { id: "recetas", href: "#recetas", text: "Recetas" },
    { id: "como-funciona", href: "#como-funciona", text: "Como funciona" },
    { id: "confianza", href: "#confianza", text: "Respaldo cientifico" },
    { id: "comenzar", href: "#comenzar", text: "Comenzar gratis" },
  ];

  const resourceLinks = [
    {
      id: "cenan",
      href: "https://web.ins.gob.pe/es/alimentacion-y-nutricion/cenan",
      text: "Sobre CENAN",
    },
    {
      id: "ins",
      href: "https://web.ins.gob.pe",
      text: "Instituto Nacional de Salud",
    },
  ];

  const legalLinks = [
    { id: "terminos", href: "#", text: "Terminos de uso" },
    { id: "privacidad", href: "#", text: "Politica de privacidad" },
    { id: "contacto", href: "#", text: "Contacto" },
  ];

  return (
    <footer className="border-t border-card-border bg-card px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Pachamesa
              </span>
            </div>
            <p className="mb-2 text-xs font-medium text-primary">
              De la tierra a tu mesa
            </p>
            <p className="text-sm text-muted-foreground">
              Planifica las comidas de tu familia con recetas nutritivas y
              economicas del Instituto Nacional de Salud.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {productLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="hover:text-primary">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {resourceLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="hover:text-primary">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-card-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            2026 Pachamesa. Hecho con dedicacion para las familias peruanas.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Datos de recetas por
            </span>
            <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground">
              CENAN / INS Peru
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =============================================================================
   MAIN PAGE COMPONENT
   ============================================================================= */
export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <PainPointsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TrustSection />
        <RecipePreviewSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
