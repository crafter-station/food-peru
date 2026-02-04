/* =============================================================================
   SECTION 1: HERO
   Purpose: Capture attention, communicate core value proposition, drive signup
   ============================================================================= */
function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-accent-green/30 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Copy */}
          <div className="max-w-xl text-center lg:text-left">
            {/* Trust badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-secondary shadow-sm">
              <span className="text-lg">🏛️</span>
              <span>Respaldado por el INS / CENAN</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              ¿No sabes qué cocinar hoy?
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Planifica las comidas de tu familia con{" "}
              <span className="font-semibold text-foreground">
                recetas nutritivas, económicas y deliciosas
              </span>{" "}
              del Instituto Nacional de Salud del Perú.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#comenzar"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-lg font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/40"
              >
                Comenzar gratis
                <span className="text-xl">→</span>
              </a>
              <a
                href="#como-funciona"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-card-border bg-card px-8 text-lg font-semibold text-foreground transition-all hover:border-primary hover:bg-primary-light"
              >
                Ver cómo funciona
              </a>
            </div>

            {/* Social proof mini */}
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary" />
                <div className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-secondary to-primary" />
                <div className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary-hover to-secondary" />
                <div className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-secondary to-primary-hover" />
              </div>
                <span>
                +2,500 familias ya planifican con{" "}
                <span className="font-semibold text-foreground">PlatoSano</span>
              </span>
            </div>
          </div>

          {/* Right: App Preview */}
          <div className="relative w-full max-w-sm lg:max-w-md">
            <div className="relative rounded-3xl bg-card p-4 shadow-2xl shadow-foreground/10">
              {/* Phone mockup header */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Lunes, 3 de Febrero
                </span>
                <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                  3 comidas planificadas
                </span>
              </div>

              {/* Sample meal cards */}
              <div className="space-y-3">
                <MealPreviewCard
                  time="Desayuno"
                  emoji="🥣"
                  title="Quinua con leche y fruta"
                  calories="320 kcal"
                  cost="S/. 2.50"
                  color="yellow"
                />
                <MealPreviewCard
                  time="Almuerzo"
                  emoji="🍲"
                  title="Ají de gallina con arroz"
                  calories="580 kcal"
                  cost="S/. 8.00"
                  color="green"
                />
                <MealPreviewCard
                  time="Cena"
                  emoji="🥗"
                  title="Ensalada de pallares"
                  calories="290 kcal"
                  cost="S/. 4.50"
                  color="purple"
                />
              </div>

              {/* Bottom stats */}
              <div className="mt-4 flex justify-between rounded-2xl bg-accent-yellow/50 p-3 text-sm">
                <div className="text-center">
                  <p className="font-bold text-foreground">1,190</p>
                  <p className="text-xs text-muted-foreground">kcal total</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-foreground">S/. 15.00</p>
                  <p className="text-xs text-muted-foreground">costo del día</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-success">Balanceado</p>
                  <p className="text-xs text-muted-foreground">nutrición</p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -left-4 top-1/4 rounded-2xl bg-card p-3 shadow-lg">
              <span className="text-2xl">🥑</span>
            </div>
            <div className="absolute -right-4 top-1/2 rounded-2xl bg-card p-3 shadow-lg">
              <span className="text-2xl">🍅</span>
            </div>
            <div className="absolute -bottom-2 left-1/4 rounded-2xl bg-card p-3 shadow-lg">
              <span className="text-2xl">🌽</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MealPreviewCard({
  time,
  emoji,
  title,
  calories,
  cost,
  color,
}: Readonly<{
  time: string;
  emoji: string;
  title: string;
  calories: string;
  cost: string;
  color: "yellow" | "green" | "purple";
}>) {
  const colorClasses = {
    yellow: "bg-accent-yellow border-accent-yellow-border",
    green: "bg-accent-green border-accent-green-border",
    purple: "bg-accent-purple border-accent-purple-border",
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-3 ${colorClasses[color]}`}
    >
      <span className="text-3xl">{emoji}</span>
      <div className="flex-1">
        <p className="text-xs font-medium text-muted-foreground">{time}</p>
        <p className="font-semibold text-foreground">{title}</p>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span>{calories}</span>
          <span>{cost}</span>
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
  const painPoints = [
    {
      id: "que-cocino",
      emoji: "🤔",
      title: '"¿Qué cocino hoy?"',
      description:
        "Todos los días la misma pregunta sin respuesta clara. Terminas repitiendo lo mismo o improvisando.",
    },
    {
      id: "presupuesto",
      emoji: "💸",
      title: '"Se me va el presupuesto"',
      description:
        "Compras de más, desperdicias comida, y al final del mes no cuadran las cuentas.",
    },
    {
      id: "tiempo",
      emoji: "⏰",
      title: '"No tengo tiempo"',
      description:
        "Entre el trabajo y la casa, cocinar algo nutritivo parece imposible.",
    },
    {
      id: "porciones",
      emoji: "👨‍👩‍👧‍👦",
      title: '"Las porciones nunca salen bien"',
      description:
        "O sobra demasiado o falta comida. Calcular para 4, 5 o 6 personas es un dolor de cabeza.",
    },
    {
      id: "ingredientes",
      emoji: "🥬",
      title: '"Tengo ingredientes pero no sé qué hacer"',
      description:
        "Tienes pollo, papas y verduras... pero la inspiración no llega.",
    },
    {
      id: "cambiar",
      emoji: "🍔",
      title: '"Mi familia no quiere cambiar"',
      description:
        "Quieres comer más sano pero nadie acepta platos muy diferentes a lo habitual.",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Sabemos cómo te sientes...
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Planificar las comidas de la familia no debería ser tan difícil.
            Estos problemas los viven miles de familias peruanas cada día.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point) => (
            <div
              key={point.id}
              className="rounded-2xl border border-card-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <span className="mb-3 block text-4xl">{point.emoji}</span>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {point.description}
              </p>
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
  const steps = [
    {
      number: "1",
      emoji: "👨‍👩‍👧‍👦",
      title: "Configura tu familia",
      description:
        "Indica cuántas personas son, edades y preferencias. Solo toma 2 minutos.",
      color: "bg-accent-blue border-accent-blue-border",
    },
    {
      number: "2",
      emoji: "🍽️",
      title: "Recibe sugerencias diarias",
      description:
        "Cada día te sugerimos 3 opciones de menú completo adaptadas a tu familia.",
      color: "bg-accent-green border-accent-green-border",
    },
    {
      number: "3",
      emoji: "✅",
      title: "Elige y planifica",
      description:
        "Selecciona lo que más te guste. Nosotros calculamos porciones y presupuesto.",
      color: "bg-accent-yellow border-accent-yellow-border",
    },
    {
      number: "4",
      emoji: "🛒",
      title: "Cocina con confianza",
      description:
        "Recetas paso a paso con tiempos, costos e información nutricional.",
      color: "bg-accent-purple border-accent-purple-border",
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
            Súper fácil
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            ¿Cómo funciona PlatoSano?
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

                <span className="mb-4 mt-4 block text-5xl">{step.emoji}</span>
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
  const features = [
    {
      id: "opciones-diarias",
      emoji: "🍲",
      title: "3 opciones por día",
      description:
        "Nunca más te quedarás sin ideas. Cada día recibes 3 sugerencias de menú completo para elegir.",
      color: "bg-accent-yellow border-accent-yellow-border",
    },
    {
      id: "calculadora",
      emoji: "🧮",
      title: "Calculadora de porciones",
      description:
        "Ajusta las cantidades automáticamente según el tamaño de tu familia. De 2 a 10 personas.",
      color: "bg-accent-green border-accent-green-border",
    },
    {
      id: "presupuesto",
      emoji: "💰",
      title: "Control de presupuesto",
      description:
        "Ve el costo estimado de cada receta y planifica tu semana sin exceder tu presupuesto.",
      color: "bg-accent-blue border-accent-blue-border",
    },
    {
      id: "ingredientes",
      emoji: "🥕",
      title: '"¿Qué cocino con esto?"',
      description:
        "Ingresa los ingredientes que tienes y te sugerimos recetas que puedes preparar ahora mismo.",
      color: "bg-accent-orange border-accent-orange-border",
    },
    {
      id: "nutricion",
      emoji: "📊",
      title: "Información nutricional",
      description:
        "Cada receta incluye calorías, proteínas, carbohidratos y más. Avalado por nutricionistas del CENAN.",
      color: "bg-accent-purple border-accent-purple-border",
    },
    {
      id: "tiempos",
      emoji: "⏱️",
      title: "Tiempos de preparación",
      description:
        "Filtra recetas por tiempo disponible. Desde 15 minutos hasta preparaciones más elaboradas.",
      color: "bg-accent-pink border-accent-pink-border",
    },
    {
      id: "semanal",
      emoji: "📅",
      title: "Planificación semanal",
      description:
        "Navega entre días, marca lo que ya cocinaste y ajusta el menú cuando quieras.",
      color: "bg-accent-green border-accent-green-border",
    },
    {
      id: "transicion",
      emoji: "🫶",
      title: "Transición gradual",
      description:
        "Respetamos tus comidas habituales. Introducimos opciones más saludables poco a poco.",
      color: "bg-accent-yellow border-accent-yellow-border",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-accent-green px-4 py-2 text-sm font-semibold text-success">
            Todo lo que necesitas
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Funciones pensadas para ti
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Diseñado para las necesidades reales de las familias peruanas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`rounded-2xl border p-6 transition-all hover:shadow-lg ${feature.color}`}
            >
              <span className="mb-4 block text-4xl">{feature.emoji}</span>
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
  const stats = [
    { id: "recetas", number: "500+", label: "Recetas verificadas", emoji: "📚" },
    { id: "regiones", number: "25", label: "Regiones del Perú", emoji: "🗺️" },
    { id: "nutricionistas", number: "100%", label: "Avalado por nutricionistas", emoji: "👩‍⚕️" },
    { id: "costo", number: "S/.15", label: "Costo promedio diario", emoji: "💰" },
  ];

  const trustBadges = [
    { id: "datos", text: "Datos nutricionales verificados" },
    { id: "costos", text: "Costos actualizados" },
    { id: "ingredientes", text: "Ingredientes peruanos" },
  ];

  return (
    <section className="bg-foreground px-4 py-20 text-background sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3">
            <span className="text-2xl">🏛️</span>
            <span className="font-semibold">
              Instituto Nacional de Salud del Perú
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Respaldado por la ciencia y la tradición
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/70">
            Todas nuestras recetas provienen del{" "}
            <span className="font-semibold text-white">
              Centro Nacional de Alimentación y Nutrición (CENAN)
            </span>{" "}
            del INS. Son el resultado de años de investigación en nutrición
            adaptada a la realidad peruana: ingredientes locales, accesibles y
            preparaciones que respetan nuestra cultura culinaria.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-2xl bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <span className="mb-2 block text-3xl">{stat.emoji}</span>
              <p className="text-4xl font-bold text-primary">{stat.number}</p>
              <p className="text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {trustBadges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3"
            >
              <span className="text-xl">✓</span>
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
      title: "Ají de gallina",
      image: "🍲",
      time: "45 min",
      cost: "S/. 8.00",
      servings: "4 porciones",
      calories: "580 kcal",
      tags: ["Almuerzo", "Tradición"],
      region: "Lima",
    },
    {
      id: "quinua-atamalada",
      title: "Quinua atamalada",
      image: "🥣",
      time: "30 min",
      cost: "S/. 5.50",
      servings: "4 porciones",
      calories: "320 kcal",
      tags: ["Desayuno", "Alto en proteína"],
      region: "Puno",
    },
    {
      id: "ceviche-pescado",
      title: "Ceviche de pescado",
      image: "🐟",
      time: "20 min",
      cost: "S/. 12.00",
      servings: "4 porciones",
      calories: "180 kcal",
      tags: ["Almuerzo", "Bajo en calorías"],
      region: "Piura",
    },
    {
      id: "ensalada-pallares",
      title: "Ensalada de pallares",
      image: "🥗",
      time: "25 min",
      cost: "S/. 4.50",
      servings: "4 porciones",
      calories: "290 kcal",
      tags: ["Cena", "Económico"],
      region: "Ica",
    },
  ];

  return (
    <section className="bg-card px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-accent-orange px-4 py-2 text-sm font-semibold text-secondary">
            Muestra de recetas
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Recetas de toda la costa, sierra y selva
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explora nuestra colección de recetas tradicionales adaptadas para
            una alimentación saludable.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group overflow-hidden rounded-2xl border border-card-border bg-background transition-all hover:border-primary/30 hover:shadow-xl"
            >
              {/* Recipe image placeholder */}
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-accent-yellow to-accent-orange">
                <span className="text-7xl transition-transform group-hover:scale-110">
                  {recipe.image}
                </span>
              </div>

              <div className="p-4">
                {/* Region badge */}
                <span className="mb-2 inline-block rounded-full bg-accent-blue px-2 py-0.5 text-xs font-medium text-secondary">
                  {recipe.region}
                </span>

                <h3 className="mb-3 text-lg font-bold text-foreground">
                  {recipe.title}
                </h3>

                {/* Quick stats */}
                <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span>⏱️</span> {recipe.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💰</span> {recipe.cost}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👥</span> {recipe.servings}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🔥</span> {recipe.calories}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.map((tag) => (
                    <span
                      key={`${recipe.id}-${tag}`}
                      className="rounded-full bg-accent-green px-2 py-0.5 text-xs font-medium text-success"
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
          <a
            href="#comenzar"
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Ver las 500+ recetas
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SECTION 7: TESTIMONIALS
   Purpose: Social proof from real Peruvian families
   ============================================================================= */
function TestimonialsSection() {
  const testimonials = [
    {
      id: "maria",
      name: "María Elena",
      location: "Lima, San Juan de Lurigancho",
      avatar: "👩",
      quote:
        "Antes perdía media hora pensando qué cocinar. Ahora abro la app y ya tengo 3 opciones listas. Mi familia come mejor y yo estoy menos estresada.",
      highlight: "Ahorro 30 minutos al día",
    },
    {
      id: "rosa",
      name: "Rosa",
      location: "Arequipa",
      avatar: "👩‍🦱",
      quote:
        "Lo que más me gusta es la calculadora de porciones. Somos 6 en casa y siempre me sobraba o faltaba. Ahora las cantidades salen perfectas.",
      highlight: "Cero desperdicio de comida",
    },
    {
      id: "carmen",
      name: "Carmen",
      location: "Trujillo",
      avatar: "👩‍🦳",
      quote:
        "Mi esposo es diabético y necesitamos controlar lo que come. Las recetas tienen toda la información nutricional y eso me da tranquilidad.",
      highlight: "Control nutricional real",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-accent-pink px-4 py-2 text-sm font-semibold text-secondary">
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
              <span className="mb-4 inline-block rounded-full bg-primary-light px-3 py-1 text-sm font-semibold text-primary">
                {testimonial.highlight}
              </span>

              {/* Quote */}
              <p className="mb-6 text-lg leading-relaxed text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-yellow text-2xl">
                  {testimonial.avatar}
                </span>
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
    { id: "planificacion", text: "Planificación semanal ilimitada" },
    { id: "calculadora", text: "Calculadora de porciones" },
    { id: "nutricion", text: "Información nutricional completa" },
    { id: "busqueda", text: "Búsqueda por ingredientes" },
    { id: "sin-publicidad", text: "Sin publicidad invasiva" },
  ];

  return (
    <section className="bg-gradient-to-b from-accent-yellow/30 to-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-block rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">
          100% Gratuito
        </span>

        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
          Sin costo, sin trucos
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          PlatoSano es un proyecto de impacto social. Nuestro objetivo es que
          todas las familias peruanas tengan acceso a una alimentación
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
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-sm text-white">
                  ✓
                </span>
                <span className="text-foreground">{feature.text}</span>
              </li>
            ))}
          </ul>

          <a
            href="#comenzar"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:shadow-xl"
          >
            Comenzar ahora
            <span className="text-xl">→</span>
          </a>
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
      question: "¿Es realmente gratis?",
      answer:
        "Sí, PlatoSano es 100% gratuito. Es un proyecto de impacto social respaldado por instituciones públicas. No hay costos ocultos ni suscripciones premium.",
    },
    {
      id: "recetas-origen",
      question: "¿De dónde vienen las recetas?",
      answer:
        "Todas las recetas provienen del Centro Nacional de Alimentación y Nutrición (CENAN) del Instituto Nacional de Salud del Perú. Son el resultado de investigación científica en nutrición.",
    },
    {
      id: "porciones",
      question: "¿Puedo ajustar las porciones?",
      answer:
        "¡Claro! Nuestra calculadora te permite ajustar las cantidades desde 2 hasta 10 personas. Los ingredientes y la información nutricional se actualizan automáticamente.",
    },
    {
      id: "dificultad",
      question: "¿Las recetas son difíciles de preparar?",
      answer:
        "Tenemos recetas para todos los niveles. Puedes filtrar por tiempo de preparación, desde platos de 15 minutos hasta preparaciones más elaboradas para ocasiones especiales.",
    },
    {
      id: "offline",
      question: "¿Funciona sin internet?",
      answer:
        "Próximamente. Estamos trabajando en una versión que te permita guardar tus recetas favoritas para verlas sin conexión.",
    },
    {
      id: "dietas",
      question: "¿Tienen recetas para dietas especiales?",
      answer:
        "Sí, puedes filtrar recetas para diabéticos, hipertensos, celíacos, y más. Cada receta tiene información nutricional detallada para que tomes decisiones informadas.",
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
                <span className="ml-4 text-xl transition-transform group-open:rotate-45">
                  +
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
        <span className="mb-6 inline-block text-6xl">🍽️</span>

        <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
          ¿Lista para comer mejor sin complicarte?
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
          Únete a las miles de familias peruanas que ya planifican sus comidas
          con PlatoSano. Empieza hoy, es gratis.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/registro"
            className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-white px-10 text-xl font-bold text-primary shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <span>Crear mi cuenta gratis</span>
            <span className="text-2xl">→</span>
          </Link>
        </div>

        <p className="mt-6 text-sm text-white/60">
          Sin tarjeta de crédito. Sin spam. Solo comida rica y saludable.
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
    { id: "recetas", href: "/recetas", text: "Recetas" },
    { id: "planificador", href: "/planificador", text: "Planificador" },
    { id: "calculadora", href: "/calculadora", text: "Calculadora" },
    { id: "buscar", href: "/buscar", text: "Buscar por ingredientes" },
  ];

  const resourceLinks = [
    { id: "cenan", href: "/sobre-cenan", text: "Sobre CENAN" },
    { id: "guias", href: "/guias", text: "Guías de nutrición" },
    { id: "blog", href: "/blog", text: "Blog" },
    { id: "faq", href: "/faq", text: "Preguntas frecuentes" },
  ];

  const legalLinks = [
    { id: "terminos", href: "/terminos", text: "Términos de uso" },
    { id: "privacidad", href: "/privacidad", text: "Política de privacidad" },
    { id: "contacto", href: "/contacto", text: "Contacto" },
  ];

  return (
    <footer className="border-t border-card-border bg-card px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="text-xl font-bold text-foreground">
                PlatoSano
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Planifica las comidas de tu familia con recetas nutritivas y
              económicas del Instituto Nacional de Salud.
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
                  <a href={link.href} className="hover:text-primary">
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
            © 2026 PlatoSano. Hecho con amor para las familias peruanas.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Datos de recetas por
            </span>
            <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground">
              CENAN / INS Perú
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Header from "@/app/components/Header";

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
