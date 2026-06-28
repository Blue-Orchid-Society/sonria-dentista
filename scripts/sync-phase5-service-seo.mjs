import { readFileSync, writeFileSync } from "node:fs";

const enPath = "data/site.en.json";
const esPath = "data/site.es.json";

const existingOverviewSlugs = new Set([
  "preventive",
  "children",
  "restorative",
  "missing-teeth",
  "cosmetic",
  "sedation",
  "clear-braces",
  "implants",
  "snap-on-dentures",
  "emergencies-extractions",
]);

const enServices = [
  {
    slug: "emergency-dentist",
    icon: "phone",
    name: "Emergency dentist",
    blurb: "Urgent dental care for tooth pain, swelling, broken teeth, and dental problems that cannot wait.",
    longBlurb:
      "When dental pain or a broken tooth interrupts your day, Sonria helps patients get clear next steps quickly with bilingual emergency dental care across North Texas.",
    whatIsIt:
      "Emergency dental care focuses on evaluating urgent symptoms such as toothaches, swelling, infection, broken teeth, lost restorations, or injuries so the right treatment can begin.",
    whoFor:
      "This page is for patients with severe tooth pain, swelling, a broken tooth, a loose crown or filling, bleeding, or a dental concern that feels urgent.",
    fourSteps: [
      { title: "Call the office", body: "Tell the team what happened, your symptoms, and which location is closest." },
      { title: "Urgent evaluation", body: "The dentist checks the tooth, gums, bite, and X-rays if needed." },
      { title: "Relief plan", body: "You get a clear recommendation for pain relief, treatment, or extraction if needed." },
      { title: "Follow-up care", body: "The team explains next steps to protect your mouth after the urgent visit." },
    ],
    benefits: [
      "Helps address pain quickly",
      "Clear guidance before problems worsen",
      "Bilingual team support",
      "Available through multiple Sonria locations",
    ],
    whyChoose:
      "Sonria has four North Texas offices, bilingual care, and practical appointment guidance for patients who need help quickly.",
    insuranceNote:
      "Dental insurance, Medicaid, Medicare, and third-party financing may help with emergency treatment costs. The team can review options before care begins.",
    faqs: [
      { q: "What counts as a dental emergency?", a: "Severe pain, swelling, infection, broken teeth, trauma, or a tooth that may need urgent care can all be dental emergencies." },
      { q: "Should I call before coming in?", a: "Yes. Calling helps the team guide you to the right location and appointment option." },
      { q: "Can an emergency visit lead to an extraction?", a: "Sometimes. The dentist will evaluate the tooth and explain whether it can be saved or needs removal." },
    ],
    seoTitle: "Emergency Dentist in North Texas | Sonria Dentista",
    seoDescription: "Emergency dental care for tooth pain, swelling, broken teeth, and urgent dental problems in Arlington, Commerce, Paris, and Grand Prairie.",
    showInOverview: false,
  },
  {
    slug: "dental-implants",
    icon: "sparkles",
    name: "Dental implants",
    blurb: "Secure tooth replacement options designed to restore chewing, confidence, and smile appearance.",
    longBlurb:
      "Dental implants are a long-term option for replacing missing teeth and supporting a smile that feels more stable and natural.",
    whatIsIt:
      "A dental implant is a replacement tooth option that uses an implant post and final restoration to help replace missing tooth structure.",
    whoFor:
      "Dental implants may be right for patients missing one tooth, several teeth, or looking for more stable denture support.",
    fourSteps: [
      { title: "Consultation", body: "The dentist reviews your goals, health history, and missing teeth." },
      { title: "Imaging and planning", body: "The team checks bone support and creates a personalized treatment plan." },
      { title: "Implant treatment", body: "Treatment is completed according to your plan and healing needs." },
      { title: "Final restoration", body: "The replacement tooth or denture attachment is designed for comfort and function." },
    ],
    benefits: [
      "Can look and feel natural",
      "Supports chewing confidence",
      "Can replace one or many teeth",
      "May help stabilize dentures",
    ],
    whyChoose:
      "Sonria helps patients compare implant options, dentures, and snap-on solutions with clear explanations and bilingual support.",
    insuranceNote:
      "Implant coverage varies by plan. Sonria can review insurance and third-party financing options before treatment.",
    faqs: [
      { q: "Am I a candidate for dental implants?", a: "A consultation is needed to check oral health, bone support, medical history, and your treatment goals." },
      { q: "Can implants replace dentures?", a: "Some patients use implants to support snap-on dentures or other tooth replacement solutions." },
      { q: "Is financing available?", a: "Third-party financing options may be available for qualifying patients." },
    ],
    seoTitle: "Dental Implants in North Texas | Sonria Dentista",
    seoDescription: "Dental implants for missing teeth in Arlington, Commerce, Paris, and Grand Prairie. Learn options, benefits, and financing support.",
    showInOverview: false,
  },
  {
    slug: "dentures",
    icon: "badge-check",
    name: "Dentures",
    blurb: "Full denture options to restore your smile when many or all teeth are missing.",
    longBlurb:
      "Dentures can restore appearance, speech, and chewing ability for patients missing many or all teeth.",
    whatIsIt:
      "Dentures are removable tooth replacement appliances made to replace missing teeth and support the lips and cheeks.",
    whoFor:
      "Dentures may be right for patients who are missing many teeth, have failing teeth, or want an affordable full-arch replacement option.",
    fourSteps: [
      { title: "Evaluation", body: "The dentist reviews your mouth, current teeth, gums, and goals." },
      { title: "Options", body: "You compare traditional, partial, and implant-supported denture options." },
      { title: "Design", body: "Your denture is planned for fit, smile appearance, and function." },
      { title: "Adjustments", body: "Follow-up visits help improve comfort and fit." },
    ],
    benefits: [
      "Restores smile appearance",
      "Can improve speech and chewing",
      "Often more affordable than fixed options",
      "Can be paired with implant support in some cases",
    ],
    whyChoose:
      "Sonria offers missing-teeth solutions and helps patients understand dentures, partials, and implant-supported options.",
    insuranceNote:
      "Many plans may include denture benefits. The team can help review insurance, Medicaid, Medicare messaging, and financing options.",
    faqs: [
      { q: "Are dentures removable?", a: "Traditional dentures are removable. Some options may connect to implants for added stability." },
      { q: "Will dentures need adjustments?", a: "Yes. Adjustments are common as your mouth adapts and the fit is refined." },
      { q: "Can I ask about snap-on dentures?", a: "Yes. Sonria can explain whether implant-supported dentures may be appropriate." },
    ],
    seoTitle: "Dentures in North Texas | Sonria Dentista",
    seoDescription: "Full dentures and missing-teeth replacement options at Sonria Dentista offices in Arlington, Commerce, Paris, and Grand Prairie.",
    showInOverview: false,
  },
  {
    slug: "partials",
    icon: "badge-check",
    name: "Partials",
    blurb: "Partial denture options for patients missing some teeth but not a full arch.",
    longBlurb:
      "Partials help fill gaps when some natural teeth remain, restoring smile appearance and everyday function.",
    whatIsIt:
      "A partial denture is a removable appliance that replaces several missing teeth while working around remaining natural teeth.",
    whoFor:
      "Partials may be for patients missing multiple teeth who still have healthy natural teeth that can remain in place.",
    fourSteps: [
      { title: "Exam", body: "The dentist checks the remaining teeth, gums, and bite." },
      { title: "Planning", body: "You review whether a partial, bridge, implant, or denture option fits your needs." },
      { title: "Design", body: "The partial is planned to fit your mouth and fill visible gaps." },
      { title: "Fit visit", body: "The team checks comfort, bite, and instructions for use." },
    ],
    benefits: [
      "Replaces multiple missing teeth",
      "Helps protect smile appearance",
      "Can support chewing and speech",
      "Often more affordable than fixed replacement options",
    ],
    whyChoose:
      "Sonria helps patients compare partials with implants and other missing-teeth options in clear English or Spanish.",
    insuranceNote:
      "Coverage for partials varies. Sonria can review insurance and financing options with you.",
    faqs: [
      { q: "Are partials removable?", a: "Yes. Most partial dentures are removable and should be cleaned as directed." },
      { q: "Can a partial replace several teeth?", a: "Yes. A partial can replace multiple missing teeth when some natural teeth remain." },
    ],
    seoTitle: "Partial Dentures in North Texas | Sonria Dentista",
    seoDescription: "Partial dentures for missing teeth at Sonria Dentista in Arlington, Commerce, Paris, and Grand Prairie.",
    showInOverview: false,
  },
  {
    slug: "dental-crowns",
    icon: "badge-plus",
    name: "Dental crowns",
    blurb: "Crowns help protect damaged, weakened, or heavily restored teeth.",
    longBlurb:
      "Dental crowns are used to restore strength, shape, and appearance when a tooth needs more protection than a filling.",
    whatIsIt:
      "A dental crown is a custom restoration that covers a tooth to protect it after damage, decay, root canal treatment, or heavy wear.",
    whoFor:
      "A crown may be recommended for a cracked tooth, large cavity, worn tooth, root canal treated tooth, or tooth that needs cosmetic improvement.",
    fourSteps: [
      { title: "Diagnosis", body: "The dentist checks the tooth and explains why a crown may be needed." },
      { title: "Preparation", body: "The tooth is shaped and prepared for a custom restoration." },
      { title: "Temporary or scan", body: "The team explains the timeline and protects the tooth while the crown is made." },
      { title: "Final fit", body: "The crown is placed and adjusted for comfort and bite." },
    ],
    benefits: [
      "Protects weakened teeth",
      "Restores chewing function",
      "Can improve tooth appearance",
      "Helps prevent further breakdown",
    ],
    whyChoose:
      "Sonria provides restorative care with clear treatment explanations, bilingual support, and payment guidance.",
    insuranceNote:
      "Crowns are often plan-dependent. The team can help review dental insurance and financing options before treatment.",
    faqs: [
      { q: "When is a crown better than a filling?", a: "A crown may be recommended when a tooth is too weak or damaged for a filling alone." },
      { q: "Can crowns look natural?", a: "Crowns are designed to restore function and can be planned with smile appearance in mind." },
    ],
    seoTitle: "Dental Crowns in North Texas | Sonria Dentista",
    seoDescription: "Dental crowns for damaged or weakened teeth at Sonria Dentista in Arlington, Commerce, Paris, and Grand Prairie.",
    showInOverview: false,
  },
  {
    slug: "tooth-extractions",
    icon: "phone",
    name: "Tooth extractions",
    blurb: "Tooth removal when a tooth cannot be saved or is causing pain, infection, or crowding.",
    longBlurb:
      "Tooth extractions may be needed when a tooth is severely damaged, infected, loose, painful, or creating other oral health problems.",
    whatIsIt:
      "A tooth extraction is the removal of a tooth after evaluation, diagnosis, and discussion of your options.",
    whoFor:
      "Extractions may be for patients with severe decay, infection, broken teeth, wisdom tooth issues, or teeth that cannot be restored.",
    fourSteps: [
      { title: "Exam", body: "The dentist evaluates the tooth, symptoms, and X-rays if needed." },
      { title: "Options", body: "You learn whether the tooth can be saved or should be removed." },
      { title: "Removal", body: "The team focuses on comfort and safe tooth removal." },
      { title: "Healing plan", body: "You get instructions and replacement options when appropriate." },
    ],
    benefits: [
      "Can relieve pain or infection",
      "Removes teeth that cannot be restored",
      "Protects surrounding teeth and gums",
      "Can prepare for dentures, partials, or implants",
    ],
    whyChoose:
      "Sonria offers extractions with bilingual communication, comfort-focused care, and next-step planning.",
    insuranceNote:
      "Extraction costs depend on the tooth and complexity. Insurance and financing options can be reviewed before treatment.",
    faqs: [
      { q: "Will the dentist try to save the tooth first?", a: "The dentist will evaluate the tooth and explain whether restoration or removal is the better option." },
      { q: "What happens after an extraction?", a: "You receive healing instructions and may discuss replacement options such as partials, dentures, or implants." },
    ],
    seoTitle: "Tooth Extractions in North Texas | Sonria Dentista",
    seoDescription: "Tooth extraction care for painful, broken, infected, or non-restorable teeth at Sonria Dentista.",
    showInOverview: false,
  },
  {
    slug: "orthodontics",
    icon: "align-justify",
    name: "Orthodontics",
    blurb: "Braces and clear aligner options to improve tooth alignment and bite function.",
    longBlurb:
      "Orthodontic care helps straighten teeth, improve bite relationships, and support a confident smile.",
    whatIsIt:
      "Orthodontics includes braces, clear aligner-style treatment, and bite guidance for qualifying children, teens, and adults.",
    whoFor:
      "Orthodontics may help patients with crowded teeth, gaps, bite issues, shifting teeth, or cosmetic alignment concerns.",
    fourSteps: [
      { title: "Consultation", body: "The orthodontic team reviews your teeth, bite, and smile goals." },
      { title: "Treatment plan", body: "You learn whether braces or clear aligner options fit your case." },
      { title: "Active care", body: "Progress visits keep treatment moving according to plan." },
      { title: "Retention", body: "Retainers help maintain the final result after treatment." },
    ],
    benefits: [
      "Improves smile alignment",
      "Can support healthier bite function",
      "Options for teens and adults",
      "May include discreet clear options",
    ],
    whyChoose:
      "Sonria has orthodontic specialists connected to select locations and offers clear explanations for families.",
    insuranceNote:
      "Orthodontic coverage varies. The team can review insurance and financing options before treatment begins.",
    faqs: [
      { q: "Do adults get orthodontic treatment?", a: "Yes. Many adults can be candidates for braces or clear aligner-style care." },
      { q: "Are clear options available?", a: "Clear braces or aligner-style options may be available depending on your case." },
    ],
    seoTitle: "Orthodontics in North Texas | Sonria Dentista",
    seoDescription: "Orthodontic care, braces, and clear aligner options for teens and adults at Sonria Dentista.",
    showInOverview: false,
  },
  {
    slug: "teeth-cleaning",
    icon: "shield-check",
    name: "Teeth cleaning",
    blurb: "Professional dental cleanings to remove buildup and support healthier gums and teeth.",
    longBlurb:
      "Regular teeth cleanings help keep your smile healthy, fresh, and easier to maintain at home.",
    whatIsIt:
      "A professional teeth cleaning removes plaque and tartar buildup, polishes the teeth, and helps identify early signs of dental problems.",
    whoFor:
      "Cleanings are for children, teens, adults, and seniors who want to prevent cavities, gum disease, and bigger dental issues.",
    fourSteps: [
      { title: "Review", body: "The team asks about concerns and checks your dental history." },
      { title: "Cleaning", body: "Plaque and tartar are removed from the teeth and gumline." },
      { title: "Polish", body: "The teeth are polished for a smooth, fresh feeling." },
      { title: "Guidance", body: "You get practical home-care advice and next steps." },
    ],
    benefits: [
      "Helps prevent cavities",
      "Supports gum health",
      "Freshens the mouth",
      "Allows early detection of problems",
    ],
    whyChoose:
      "Sonria makes routine care friendly, bilingual, and convenient across four North Texas offices.",
    insuranceNote:
      "Many dental plans include preventive cleanings. Sonria can help answer coverage questions before your visit.",
    faqs: [
      { q: "How often should I get my teeth cleaned?", a: "Many patients benefit from cleanings every 6 months, but your dentist may recommend a different schedule." },
      { q: "Is a cleaning different from a deep cleaning?", a: "Yes. A deep cleaning may be recommended when gum disease or deeper buildup is present." },
    ],
    seoTitle: "Teeth Cleaning in North Texas | Sonria Dentista",
    seoDescription: "Professional teeth cleanings and preventive dental care in Arlington, Commerce, Paris, and Grand Prairie.",
    showInOverview: false,
  },
  {
    slug: "dental-checkups",
    icon: "shield-check",
    name: "Dental checkups",
    blurb: "Routine dental exams to catch problems early and keep your smile on track.",
    longBlurb:
      "Dental checkups help patients understand their oral health and prevent small concerns from becoming bigger problems.",
    whatIsIt:
      "A dental checkup includes an exam of the teeth, gums, bite, and concerns, with X-rays when needed.",
    whoFor:
      "Checkups are for patients of all ages, including children, adults, seniors, and anyone who has not seen a dentist recently.",
    fourSteps: [
      { title: "Conversation", body: "You share symptoms, goals, and any worries." },
      { title: "Exam", body: "The dentist checks teeth, gums, restorations, and bite." },
      { title: "Findings", body: "The team explains what they see in clear language." },
      { title: "Plan", body: "You leave with recommended next steps and timing." },
    ],
    benefits: [
      "Catches problems early",
      "Supports long-term oral health",
      "Helps prevent surprise dental costs",
      "Works well with routine cleanings",
    ],
    whyChoose:
      "Sonria provides practical, bilingual explanations so patients understand their options.",
    insuranceNote:
      "Many plans include routine exams. The team can help review insurance and payment options.",
    faqs: [
      { q: "Do I need X-rays at every checkup?", a: "Not always. X-rays are recommended based on your needs, history, and symptoms." },
      { q: "Can children get checkups at Sonria?", a: "Yes. Sonria welcomes families and children." },
    ],
    seoTitle: "Dental Checkups in North Texas | Sonria Dentista",
    seoDescription: "Dental exams and routine checkups for families in Arlington, Commerce, Paris, and Grand Prairie.",
    showInOverview: false,
  },
  {
    slug: "family-dentistry",
    icon: "smile",
    name: "Family dentistry",
    blurb: "Dental care for children, adults, parents, and seniors in one welcoming office.",
    longBlurb:
      "Family dentistry makes dental care simpler by supporting patients of different ages and needs under one dental home.",
    whatIsIt:
      "Family dentistry includes checkups, cleanings, fillings, emergency care, tooth replacement guidance, and prevention for the whole family.",
    whoFor:
      "This service is for families who want one dental team for children, adults, parents, and seniors.",
    fourSteps: [
      { title: "Choose a location", body: "Pick the Sonria office that is easiest for your family." },
      { title: "Schedule care", body: "The team helps coordinate appointment options." },
      { title: "Personalized visits", body: "Each patient receives care based on age, needs, and comfort." },
      { title: "Ongoing support", body: "Sonria helps your family stay consistent with care." },
    ],
    benefits: [
      "Convenient for households",
      "Care for children and adults",
      "Bilingual English and Spanish team",
      "Multiple North Texas locations",
    ],
    whyChoose:
      "Sonria is built around accessible, bilingual, family-friendly dental care.",
    insuranceNote:
      "The team can help families understand dental insurance, Medicaid, Medicare messaging, and financing options.",
    faqs: [
      { q: "Can multiple family members be seen at Sonria?", a: "Yes. Call your preferred location and the team can help with scheduling options." },
      { q: "Do you speak Spanish?", a: "Yes. Sonria offers bilingual English and Spanish support." },
    ],
    seoTitle: "Family Dentist in North Texas | Sonria Dentista",
    seoDescription: "Family dental care for children, adults, and seniors in Arlington, Commerce, Paris, and Grand Prairie.",
    showInOverview: false,
  },
  {
    slug: "missing-teeth-replacement",
    icon: "sparkles",
    name: "Missing teeth replacement",
    blurb: "Compare dentures, partials, implants, and snap-on options for replacing missing teeth.",
    longBlurb:
      "Missing teeth replacement helps restore eating, speech, appearance, and confidence with a plan designed around your mouth and budget.",
    whatIsIt:
      "Missing teeth replacement may include full dentures, partial dentures, dental implants, snap-on dentures, or a combination of treatments.",
    whoFor:
      "This page is for patients missing one tooth, several teeth, or a full arch who want to understand replacement options.",
    fourSteps: [
      { title: "Consultation", body: "The dentist reviews what is missing and what you want to improve." },
      { title: "Compare options", body: "You learn the difference between dentures, partials, implants, and snap-on options." },
      { title: "Plan around budget", body: "The team explains timing, insurance, and financing considerations." },
      { title: "Restore function", body: "Treatment focuses on comfort, confidence, and daily use." },
    ],
    benefits: [
      "Restores smile confidence",
      "Improves chewing and speaking",
      "Can protect remaining teeth",
      "Includes removable and implant-supported options",
    ],
    whyChoose:
      "Sonria has multiple replacement options and helps patients choose practical care without pressure.",
    insuranceNote:
      "Coverage depends on the option selected. Sonria can help review insurance and third-party financing choices.",
    faqs: [
      { q: "What is the best way to replace missing teeth?", a: "The best option depends on your health, number of missing teeth, bone support, goals, and budget." },
      { q: "Can I replace all my teeth?", a: "Yes. Full dentures or implant-supported options may be discussed during a consultation." },
    ],
    seoTitle: "Missing Teeth Replacement in North Texas | Sonria Dentista",
    seoDescription: "Compare dentures, partials, dental implants, and snap-on dentures for missing teeth replacement at Sonria Dentista.",
    showInOverview: false,
  },
  {
    slug: "insurance-financing",
    icon: "badge-check",
    name: "Insurance and financing",
    blurb: "Understand dental insurance, Medicaid, Medicare messaging, and third-party financing options.",
    longBlurb:
      "Sonria helps patients understand payment options before treatment so cost questions do not delay needed care.",
    whatIsIt:
      "Insurance and financing support includes reviewing dental insurance questions, accepted affordability messaging, and third-party financing options when available.",
    whoFor:
      "This page is for patients who want dental care but need help understanding coverage, payment timing, or financing choices.",
    fourSteps: [
      { title: "Share coverage", body: "Bring or submit your insurance information before the visit." },
      { title: "Review options", body: "The team helps answer coverage and payment questions." },
      { title: "Plan treatment", body: "You receive treatment recommendations with cost context." },
      { title: "Start care", body: "Financing options may help qualifying patients begin care sooner." },
    ],
    benefits: [
      "Helps reduce payment uncertainty",
      "Supports treatment planning",
      "Third-party financing may be available",
      "Useful for families and larger treatment plans",
    ],
    whyChoose:
      "Sonria emphasizes affordability, practical guidance, and clear communication before treatment begins.",
    insuranceNote:
      "Current site messaging includes dental insurance, Medicare, Medicaid, and third-party financing. Final benefits depend on patient plan and eligibility.",
    faqs: [
      { q: "Do you accept dental insurance?", a: "The current Sonria messaging says dental insurance is welcome and the team can help answer coverage questions." },
      { q: "Is financing available?", a: "Third-party financing options may be available for qualifying patients." },
    ],
    seoTitle: "Dental Insurance and Financing | Sonria Dentista",
    seoDescription: "Learn about dental insurance, Medicaid, Medicare messaging, and third-party financing options at Sonria Dentista.",
    showInOverview: false,
  },
];

const esServices = [
  ["emergency-dentist", "Dentista de emergencia", "Cuidado dental urgente para dolor, inflamacion, dientes rotos y problemas que no pueden esperar."],
  ["dental-implants", "Implantes dentales", "Opciones seguras para reemplazar dientes y restaurar masticacion, confianza y apariencia."],
  ["dentures", "Dentaduras", "Opciones de dentaduras completas para restaurar la sonrisa cuando faltan muchos o todos los dientes."],
  ["partials", "Parciales", "Opciones de dentadura parcial para pacientes a quienes les faltan algunos dientes."],
  ["dental-crowns", "Coronas dentales", "Las coronas ayudan a proteger dientes danados, debiles o muy restaurados."],
  ["tooth-extractions", "Extracciones dentales", "Extraccion de dientes cuando no se pueden salvar o causan dolor, infeccion o problemas."],
  ["orthodontics", "Ortodoncia", "Brackets y opciones transparentes para mejorar alineacion dental y funcion de mordida."],
  ["teeth-cleaning", "Limpieza dental", "Limpiezas profesionales para remover acumulacion y apoyar dientes y encias mas saludables."],
  ["dental-checkups", "Examenes dentales", "Examenes de rutina para detectar problemas temprano y mantener la sonrisa en buen camino."],
  ["family-dentistry", "Odontologia familiar", "Cuidado dental para ninos, adultos, padres y personas mayores en un consultorio amable."],
  ["missing-teeth-replacement", "Reemplazo de dientes perdidos", "Compara dentaduras, parciales, implantes y opciones snap-on para dientes perdidos."],
  ["insurance-financing", "Seguro y financiamiento", "Entiende seguro dental, Medicaid, Medicare y opciones de financiamiento de terceros."],
];

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

function syncSite(site, services, locale) {
  site.services.list = site.services.list.map((service) => ({
    ...service,
    showInOverview: existingOverviewSlugs.has(service.slug),
    whoFor: service.whoFor ?? fallbackWhoFor(locale),
    insuranceNote: service.insuranceNote ?? fallbackInsurance(locale),
  }));

  const existing = new Set(site.services.list.map((service) => service.slug));

  if (locale === "en") {
    for (const service of services) {
      if (!existing.has(service.slug)) site.services.list.push({ price: "", ...service });
    }
  } else {
    const enBySlug = new Map(enServices.map((service) => [service.slug, service]));
    for (const [slug, name, blurb] of esServices) {
      if (existing.has(slug)) continue;
      const en = enBySlug.get(slug);
      site.services.list.push({
        price: "",
        slug,
        icon: en.icon,
        name,
        blurb,
        longBlurb: blurb,
        whatIsIt: spanishWhatIsIt(name),
        whoFor: spanishWhoFor(name),
        fourSteps: [
          { title: "Consulta", body: "El equipo revisa tus necesidades, sintomas y objetivos." },
          { title: "Evaluacion", body: "El dentista examina tu boca y recomienda los siguientes pasos." },
          { title: "Opciones", body: "Recibes una explicacion clara de tratamiento, tiempo y costos." },
          { title: "Cuidado", body: "El plan se enfoca en comodidad, funcion y confianza." },
        ],
        benefits: [
          "Apoya la salud oral",
          "Ayuda a mejorar comodidad y confianza",
          "Incluye explicaciones en ingles o espanol",
          "Disponible en multiples ubicaciones de Sonria",
        ],
        whyChoose:
          "Sonria ofrece cuidado dental bilingue, ubicaciones convenientes y orientacion practica antes de iniciar tratamiento.",
        insuranceNote:
          "El costo y la cobertura dependen del tratamiento y del plan del paciente. El equipo puede revisar seguro dental y opciones de financiamiento.",
        faqs: [
          { q: "Necesito una consulta primero?", a: "Si. Una consulta ayuda a confirmar que opcion es adecuada para tu salud oral y tus objetivos." },
          { q: "Puedo preguntar por seguro o financiamiento?", a: "Si. El equipo puede revisar preguntas sobre cobertura y opciones de pago antes del tratamiento." },
        ],
        seoTitle: `${name} | Sonria Dentista`,
        seoDescription: `${name} en Arlington, Commerce, Paris y Grand Prairie. Cuidado dental bilingue y opciones de pago.`,
        showInOverview: false,
      });
    }
  }

  const allSlugs = site.services.list.map((service) => service.slug);
  site.locations.list = site.locations.list.map((location) => ({
    ...location,
    servicesOffered: Array.from(new Set([...(location.servicesOffered ?? []), ...allSlugs])),
  }));
}

function fallbackWhoFor(locale) {
  return locale === "es"
    ? "Este servicio es para pacientes que quieren entender sus opciones y recibir una recomendacion clara antes de iniciar tratamiento."
    : "This service is for patients who want clear options, practical guidance, and a treatment recommendation before starting care.";
}

function fallbackInsurance(locale) {
  return locale === "es"
    ? "El equipo puede revisar preguntas sobre seguro dental, Medicaid, Medicare y financiamiento de terceros antes del tratamiento."
    : "The team can review dental insurance, Medicaid, Medicare, and third-party financing questions before treatment.";
}

function spanishWhatIsIt(name) {
  return `${name} incluye una evaluacion dental, explicacion de opciones y un plan de cuidado segun las necesidades del paciente.`;
}

function spanishWhoFor(name) {
  return `${name} puede ser adecuado para pacientes que buscan mejorar salud oral, comodidad, funcion o confianza.`;
}

const en = readJson(enPath);
const es = readJson(esPath);

syncSite(en, enServices, "en");
syncSite(es, esServices, "es");

writeJson(enPath, en);
writeJson(esPath, es);

