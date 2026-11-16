// Joestar Family Tree Genealogy Data (Both Original Universe & SBR Universe)
export const FAMILY_TREE_DATA = {
  original: [
    {
      id: "george-1",
      name: "George Joestar I",
      japanese: "ジョージ・ジョースターI世",
      role: "Patriarch",
      part: "Part 1: Phantom Blood",
      generation: 1,
      spouse: "Mary Joestar",
      children: ["jonathan"],
      description: "Aristocratic British nobleman and father of Jonathan. Unknowingly took in Dario Brando's son, Dio, starting the centuries-long feud.",
      badge: "Patriarch"
    },
    {
      id: "jonathan",
      name: "Jonathan Joestar",
      japanese: "ジョナサン・ジョースター",
      role: "The First JoJo",
      part: "Part 1: Phantom Blood",
      generation: 2,
      spouse: "Erina Pendleton",
      children: ["george-2", "giorno"],
      description: "True gentleman and Hamon master who fought his adoptive vampire brother Dio to the death in the Atlantic ocean.",
      badge: "JoJo #1"
    },
    {
      id: "george-2",
      name: "George Joestar II",
      japanese: "ジョージ・ジョースターII世",
      role: "RAF Pilot / Jonathan's Son",
      part: "Part 2: Battle Tendency (Backstory)",
      generation: 3,
      spouse: "Elizabeth (Lisa Lisa)",
      children: ["joseph"],
      description: "A brave Royal Air Force pilot who lacked Hamon training; killed by a disguised zombie general under Dio's remnants.",
      badge: "Generation 3"
    },
    {
      id: "lisa-lisa",
      name: "Lisa Lisa (Elizabeth)",
      japanese: "リサリサ",
      role: "Hamon Master & Mother",
      part: "Part 2: Battle Tendency",
      generation: 3,
      spouse: "George Joestar II",
      children: ["joseph"],
      description: "Supreme Hamon mentor to Joseph and Caesar Zeppeli, guardian of the Red Stone of Aja, and Joseph's long-lost mother.",
      badge: "Hamon Master"
    },
    {
      id: "joseph",
      name: "Joseph Joestar",
      japanese: "ジョセフ・ジョースター",
      role: "Trickster & Hermit Purple",
      part: "Part 2 & 3 & 4",
      generation: 4,
      spouse: "Suzi Q (also Tomoko Higashikata)",
      children: ["holly", "josuke-4"],
      description: "The cunning tactician who defeated the ancient Pillar Men with clackers, Hamon, and the secret Joestar retreat technique.",
      stand: "Hermit Purple",
      badge: "JoJo #2"
    },
    {
      id: "giorno",
      name: "Giorno Giovanna",
      japanese: "ジョルノ・ジョバァーナ",
      role: "Passione Boss / Golden Wind",
      part: "Part 5: Golden Wind",
      generation: 3,
      parent: "DIO (Father) & Jonathan's Body",
      children: [],
      description: "Conceived by DIO using Jonathan's stolen body. Inherited Joestar righteousness and Brando resolve. Master of Gold Experience Requiem.",
      stand: "Gold Experience / GER",
      badge: "JoJo #5 / Mafia Boss"
    },
    {
      id: "holly",
      name: "Holly Kujo (Joestar)",
      japanese: "空条 ホリィ",
      role: "Joseph's Daughter / Jotaro's Mother",
      part: "Part 3: Stardust Crusaders",
      generation: 5,
      spouse: "Sadao Kujo",
      children: ["jotaro"],
      description: "Gentle mother whose peaceful spirit could not control her awakened Stand, prompting Jotaro and Joseph's trek to Cairo.",
      badge: "Generation 5"
    },
    {
      id: "josuke-4",
      name: "Josuke Higashikata",
      japanese: "東方 仗助",
      role: "Protector of Morioh",
      part: "Part 4: Diamond is Unbreakable",
      generation: 5,
      parent: "Joseph Joestar & Tomoko Higashikata",
      children: [],
      description: "Joseph's illegitimate son born in Morioh. Gentle-hearted high schooler with an explosive temper when anyone insults his pompadour.",
      stand: "Crazy Diamond",
      badge: "JoJo #4"
    },
    {
      id: "jotaro",
      name: "Jotaro Kujo",
      japanese: "空条 承太郎",
      role: "Marine Biologist & Stand Legend",
      part: "Part 3, 4, 5, 6",
      generation: 6,
      children: ["jolyne"],
      description: "Stoic, unflinching crusader who ended DIO's reign in 1989. Master of Star Platinum's time-stopping fist.",
      stand: "Star Platinum",
      badge: "JoJo #3"
    },
    {
      id: "jolyne",
      name: "Jolyne Cujoh",
      japanese: "空条 徐倫",
      role: "Prison Crusader / Stone Ocean",
      part: "Part 6: Stone Ocean",
      generation: 7,
      parent: "Jotaro Kujo",
      children: [],
      description: "First female JoJo. Framed and imprisoned in Green Dolphin Street Prison, where she awakens Stone Free and fights to save her father's memory.",
      stand: "Stone Free",
      badge: "JoJo #6"
    }
  ],
  sbr: [
    {
      id: "johnny",
      name: "Johnny Joestar",
      japanese: "ジョニィ・ジョースター",
      role: "Steel Ball Run Champion",
      part: "Part 7: Steel Ball Run",
      generation: 1,
      spouse: "Rina Higashikata",
      children: ["george-sbr-3"],
      description: "Paraplegic former jockey who enters the trans-American race alongside Gyro Zeppeli, mastering the Golden Spin and Tusk Act 4.",
      stand: "Tusk (ACT 1-4)",
      badge: "JoJo #7"
    },
    {
      id: "fumi-joseph",
      name: "Joseph Joestar (Fumi-kun)",
      japanese: "ジョセフ・ジョースター (フミくん)",
      role: "SBR Universe Joseph",
      part: "Part 8: JoJolion (Radio Romance)",
      generation: 3,
      spouse: "Suzi Q (SBR)",
      children: ["holy-kira", "barbara-ann"],
      description: "Alternate Joseph Joestar who grew up in Morioh in 1941, wielding a thorned vine Stand.",
      badge: "SBR Generation 3"
    },
    {
      id: "holy-kira",
      name: "Holy Joestar-Kira",
      japanese: "吉良・ホリー・ジョースター",
      role: "Physician & Mother of Yoshikage Kira",
      part: "Part 8: JoJolion",
      generation: 4,
      children: ["kira-8"],
      description: "TG University Hospital doctor suffering from a brain-petrification illness, prompting the quest for the Locacaca fruit.",
      badge: "SBR Generation 4"
    },
    {
      id: "barbara-ann",
      name: "Barbara Ann Joestar",
      japanese: "バーバラ・アン・ジョースター",
      role: "Mother of Jodio & Dragona",
      part: "Part 9: The JOJOLands",
      generation: 4,
      children: ["dragona", "jodio"],
      description: "Daughter of Joseph Joestar who moved to Oahu, Hawaii. Mother to Dragona and Jodio.",
      badge: "SBR Generation 4"
    },
    {
      id: "gappy",
      name: "Josuke Higashikata (Gappy)",
      japanese: "東方 定助",
      role: "Fusion of Josefumi & Kira",
      part: "Part 8: JoJolion",
      generation: 5,
      description: "Emerged from the Wall Eyes of Morioh as an amnesiac fusion of Josefumi Kujo and Yoshikage Kira via the Locacaca fruit exchange.",
      stand: "Soft & Wet / Go Beyond",
      badge: "JoJo #8"
    },
    {
      id: "dragona",
      name: "Dragona Joestar",
      japanese: "ドラゴナ・ジョースター",
      role: "Jodio's Older Sibling",
      part: "Part 9: The JOJOLands",
      generation: 5,
      stand: "Smooth Operators",
      description: "Stylish, calm older sibling who works with Jodio in Hawaii. Stand can slide and displace physical injuries and objects.",
      badge: "Ally & Sibling"
    },
    {
      id: "jodio",
      name: "Jodio Joestar",
      japanese: "ジョディオ・ジョースター",
      role: "High School Gangster",
      part: "Part 9: The JOJOLands",
      generation: 5,
      stand: "November Rain",
      description: "15-year-old high school student in Hawaii obsessed with 'mechanisms' of social power and wealth.",
      badge: "JoJo #9"
    }
  ]
};
