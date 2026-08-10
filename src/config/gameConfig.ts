export interface VictimRecord {
  Victim_ID: string;
  Name: string;
  Age: number;
  Occupation: string;
  City: string;
  Blood_Group: string;
  Favorite_Color: string;
  Day_of_Week: string;
  Birth_Month: string;
  Education: string;
  Commute_Mode: string;
  Hobby: string;
  Last_Contact: string;
  Status: string;
}

export interface TargetProfile {
  id: string;
  targetNumber: string;
  name: string;
  age: number;
  occupation: string;
  city: string;
  bloodGroup: string;
  favoriteColor: string;
  birthMonth: string;
  education: string;
  commuteMode: string;
  hobby: string;
  recentActivity: string;
  dossierNotes: string;
  riskLevel: 'ELEVATED' | 'CRITICAL' | 'MODERATE' | 'LOW';
  avatarSeed: string;
}

export interface EventConfig {
  title: string;
  subtitle: string;
  tagline: string;
  caseCode: string;
  rules: string[];
  round1: {
    title: string;
    subtitle: string;
    story: string;
    hint: string;
    password: string; // Easily customizable
    caseFileName: string;
    fileSize: string;
    hashPreview: string;
  };
  round2: {
    title: string;
    subtitle: string;
    story: string;
    instructions: string[];
    accessKey: string; // Easily customizable
    csvFileName: string;
    dataset: VictimRecord[];
  };
  round3: {
    title: string;
    subtitle: string;
    story: string;
    instructions: string;
    targets: TargetProfile[];
    correctVictimId: string;
    correctVictimName: string;
    sampleJustification: string;
  };
  admin: {
    pin: string;
  };
}

export const eventConfig: EventConfig = {
  title: "THE PATTERN",
  subtitle: "A Digital Crime Investigation",
  tagline: "A killer follows a pattern. The pattern is hidden. Find it before the next target is chosen.",
  caseCode: "CASE #PAT-2026-X9",
  rules: [
    "Teams consist of 2–3 participants.",
    "Internet usage for external answer retrieval is strictly prohibited.",
    "AI tools such as ChatGPT are not allowed.",
    "Participants may use only the provided investigation resources and offline spreadsheets (Excel, Calc).",
    "Teams must remain together throughout all rounds.",
    "Sharing clues, passwords, or answers with other teams is prohibited.",
    "Round 1 and Round 2 access keys have unlimited attempts.",
    "Final answers in Round 3 must include a clear, logical justification of the pattern.",
    "The decision of the forensic judging panel is final."
  ],
  round1: {
    title: "ROUND 01",
    subtitle: "CRACK THE FILE",
    story: "An encrypted evidence file has been recovered from the perpetrator's staging terminal. The access password is encrypted within the forensic clue below. Decrypt the key to unlock the classified victim records.",
    hint: "The killer leaves patterns behind. Look carefully at what appears ordinary. The classified incident codename holds the cipher key: [C]yber [Y]ork [P]roject [H]ash [E]cho [R]ecords.",
    password: "CYPHER", // Organizers can change this to any string
    caseFileName: "EVIDENCE_ARCHIVE_SEC404.DAT.ENC",
    fileSize: "4.82 MB (Encrypted AES-256)",
    hashPreview: "SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
  },
  round2: {
    title: "ROUND 02",
    subtitle: "UNCOVER THE PATTERN",
    story: "The evidence file has been decrypted. Inside are confidential records of previous victims spanning multiple jurisdictions. The perpetrator does not strike at random; selection criteria are deeply embedded across specific demographic, biological, and routine variables.\n\nAnalyze the records. Find the pattern.",
    instructions: [
      "What demographic and physiological characteristics do the victims share?",
      "Which routine habits (commute mode, schedule, locations) appear consistently?",
      "Filter and cross-reference multiple variables to isolate the killer's exact selection rule.",
      "Derive the investigation key to verify your findings and gain clearance for Round 3."
    ],
    accessKey: "PATTERN_AB_SUBWAY", // Organizers can change this to any key (e.g. "SHADOW_VECTOR")
    csvFileName: "THE_PATTERN_VICTIM_RECORDS_DATASET.csv",
    dataset: [
      {
        Victim_ID: "VIC-001",
        Name: "Julian Vance",
        Age: 27,
        Occupation: "Software Engineer",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Obsidian",
        Day_of_Week: "Friday",
        Birth_Month: "March",
        Education: "M.Sc. Computer Science",
        Commute_Mode: "Subway",
        Hobby: "Chess",
        Last_Contact: "2025-09-12 21:40",
        Status: "Confirmed Incident"
      },
      {
        Victim_ID: "VIC-002",
        Name: "Clara Oswald",
        Age: 28,
        Occupation: "Research Biologist",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Crimson",
        Day_of_Week: "Friday",
        Birth_Month: "May",
        Education: "Ph.D. Biochemistry",
        Commute_Mode: "Subway",
        Hobby: "Astronomy",
        Last_Contact: "2025-10-03 22:15",
        Status: "Confirmed Incident"
      },
      {
        Victim_ID: "VIC-003",
        Name: "Nathan Drake",
        Age: 26,
        Occupation: "Financial Analyst",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Navy Blue",
        Day_of_Week: "Friday",
        Birth_Month: "July",
        Education: "B.Com Finance",
        Commute_Mode: "Subway",
        Hobby: "Photography",
        Last_Contact: "2025-10-24 20:55",
        Status: "Confirmed Incident"
      },
      {
        Victim_ID: "VIC-004",
        Name: "Siddharth Rao",
        Age: 29,
        Occupation: "Architect",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Charcoal",
        Day_of_Week: "Friday",
        Birth_Month: "November",
        Education: "M.Arch Urban Design",
        Commute_Mode: "Subway",
        Hobby: "Violin",
        Last_Contact: "2025-11-14 21:10",
        Status: "Confirmed Incident"
      },
      {
        Victim_ID: "VIC-005",
        Name: "Elena Rostova",
        Age: 27,
        Occupation: "Data Scientist",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Teal",
        Day_of_Week: "Friday",
        Birth_Month: "March",
        Education: "M.Tech Data Science",
        Commute_Mode: "Subway",
        Hobby: "Rock Climbing",
        Last_Contact: "2025-12-05 22:30",
        Status: "Confirmed Incident"
      },
      {
        Victim_ID: "VIC-006",
        Name: "Marcus Brody",
        Age: 28,
        Occupation: "Cybersecurity Auditor",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Silver",
        Day_of_Week: "Friday",
        Birth_Month: "May",
        Education: "B.Tech Information Tech",
        Commute_Mode: "Subway",
        Hobby: "Reading",
        Last_Contact: "2025-12-26 21:05",
        Status: "Confirmed Incident"
      },
      {
        Victim_ID: "VIC-007",
        Name: "Ananya Deshmukh",
        Age: 26,
        Occupation: "Molecular Chemist",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Emerald",
        Day_of_Week: "Friday",
        Birth_Month: "July",
        Education: "M.Sc. Chemistry",
        Commute_Mode: "Subway",
        Hobby: "Astrophotography",
        Last_Contact: "2026-01-16 23:00",
        Status: "Confirmed Incident"
      },
      {
        Victim_ID: "VIC-008",
        Name: "Daniel Craig",
        Age: 29,
        Occupation: "Systems Engineer",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Maroon",
        Day_of_Week: "Friday",
        Birth_Month: "November",
        Education: "B.E. Electronics",
        Commute_Mode: "Subway",
        Hobby: "Chess",
        Last_Contact: "2026-02-06 21:50",
        Status: "Confirmed Incident"
      },
      {
        Victim_ID: "VIC-009",
        Name: "Rachel Green",
        Age: 27,
        Occupation: "Forensic Pathologist",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Indigo",
        Day_of_Week: "Friday",
        Birth_Month: "March",
        Education: "M.D. Pathology",
        Commute_Mode: "Subway",
        Hobby: "Marathon Running",
        Last_Contact: "2026-02-27 22:20",
        Status: "Confirmed Incident"
      },
      {
        Victim_ID: "VIC-010",
        Name: "Vikram Seth",
        Age: 28,
        Occupation: "Aerospace Analyst",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Obsidian",
        Day_of_Week: "Friday",
        Birth_Month: "May",
        Education: "M.S. Aerospace",
        Commute_Mode: "Subway",
        Hobby: "Bird Watching",
        Last_Contact: "2026-03-20 21:35",
        Status: "Confirmed Incident"
      },
      {
        Victim_ID: "VIC-011",
        Name: "Sarah Connor",
        Age: 35,
        Occupation: "Operations Manager",
        City: "Metro City",
        Blood_Group: "O+",
        Favorite_Color: "Olive",
        Day_of_Week: "Tuesday",
        Birth_Month: "August",
        Education: "MBA Logistics",
        Commute_Mode: "Personal Car",
        Hobby: "CrossFit",
        Last_Contact: "2025-08-19 18:30",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-012",
        Name: "Gordon Freeman",
        Age: 31,
        Occupation: "Physics Lecturer",
        City: "Black Mesa",
        Blood_Group: "B+",
        Favorite_Color: "Orange",
        Day_of_Week: "Monday",
        Birth_Month: "April",
        Education: "Ph.D. Theoretical Physics",
        Commute_Mode: "Bicycle",
        Hobby: "Electronics Repair",
        Last_Contact: "2025-08-25 17:15",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-013",
        Name: "Kavita Nair",
        Age: 44,
        Occupation: "High School Principal",
        City: "Silverlake",
        Blood_Group: "A+",
        Favorite_Color: "Gold",
        Day_of_Week: "Wednesday",
        Birth_Month: "January",
        Education: "M.Ed Administration",
        Commute_Mode: "Bus",
        Hobby: "Gardening",
        Last_Contact: "2025-09-03 16:45",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-014",
        Name: "Ethan Hunt",
        Age: 38,
        Occupation: "Security Consultant",
        City: "Metro City",
        Blood_Group: "O-",
        Favorite_Color: "Black",
        Day_of_Week: "Thursday",
        Birth_Month: "June",
        Education: "B.Sc. Criminal Justice",
        Commute_Mode: "Motorcycle",
        Hobby: "Skydiving",
        Last_Contact: "2025-09-18 19:20",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-015",
        Name: "Zoe Saldana",
        Age: 22,
        Occupation: "Graphic Illustrator",
        City: "Riverdale",
        Blood_Group: "A-",
        Favorite_Color: "Purple",
        Day_of_Week: "Saturday",
        Birth_Month: "September",
        Education: "B.Des Fine Arts",
        Commute_Mode: "Walking",
        Hobby: "Digital Painting",
        Last_Contact: "2025-10-11 23:45",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-016",
        Name: "Rohan Kapoor",
        Age: 30,
        Occupation: "Corporate Lawyer",
        City: "North Haven",
        Blood_Group: "AB+",
        Favorite_Color: "Charcoal",
        Day_of_Week: "Tuesday",
        Birth_Month: "December",
        Education: "LL.M International Law",
        Commute_Mode: "Subway",
        Hobby: "Tennis",
        Last_Contact: "2025-10-28 20:10",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-017",
        Name: "Melissa Ortiz",
        Age: 27,
        Occupation: "UX Researcher",
        City: "Silverlake",
        Blood_Group: "B-",
        Favorite_Color: "Turquoise",
        Day_of_Week: "Sunday",
        Birth_Month: "February",
        Education: "B.A. Psychology",
        Commute_Mode: "Bicycle",
        Hobby: "Pottery",
        Last_Contact: "2025-11-09 15:30",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-018",
        Name: "Arjun Verma",
        Age: 49,
        Occupation: "Chief Medical Officer",
        City: "Metro City",
        Blood_Group: "A+",
        Favorite_Color: "White",
        Day_of_Week: "Monday",
        Birth_Month: "October",
        Education: "M.S. General Surgery",
        Commute_Mode: "Personal Car",
        Hobby: "Golf",
        Last_Contact: "2025-11-24 19:40",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-019",
        Name: "Hannah Abbott",
        Age: 25,
        Occupation: "Museum Curator",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Bronze",
        Day_of_Week: "Wednesday",
        Birth_Month: "April",
        Education: "M.A. Art History",
        Commute_Mode: "Walking",
        Hobby: "Restoration",
        Last_Contact: "2025-12-10 18:15",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-020",
        Name: "Felix Henderson",
        Age: 33,
        Occupation: "Supply Chain Manager",
        City: "Riverdale",
        Blood_Group: "O+",
        Favorite_Color: "Burgundy",
        Day_of_Week: "Thursday",
        Birth_Month: "June",
        Education: "B.B.A.",
        Commute_Mode: "Subway",
        Hobby: "Woodworking",
        Last_Contact: "2026-01-08 20:45",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-021",
        Name: "Pooja Banerjee",
        Age: 28,
        Occupation: "Journalist",
        City: "North Haven",
        Blood_Group: "A-",
        Favorite_Color: "Emerald",
        Day_of_Week: "Sunday",
        Birth_Month: "May",
        Education: "M.A. Journalism",
        Commute_Mode: "Subway",
        Hobby: "Podcasting",
        Last_Contact: "2026-01-25 21:15",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-022",
        Name: "Liam O'Connor",
        Age: 29,
        Occupation: "Hardware Architect",
        City: "Metro City",
        Blood_Group: "AB-",
        Favorite_Color: "Cobalt",
        Day_of_Week: "Tuesday",
        Birth_Month: "July",
        Education: "B.Tech Computer Engg",
        Commute_Mode: "Personal Car",
        Hobby: "Drones",
        Last_Contact: "2026-02-17 19:30",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-023",
        Name: "Deepika Padukone",
        Age: 36,
        Occupation: "PR Director",
        City: "Silverlake",
        Blood_Group: "B+",
        Favorite_Color: "Lavender",
        Day_of_Week: "Saturday",
        Birth_Month: "January",
        Education: "M.A. Communications",
        Commute_Mode: "Personal Car",
        Hobby: "Pilates",
        Last_Contact: "2026-03-07 16:50",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-024",
        Name: "Tariq Mansoor",
        Age: 26,
        Occupation: "Biostatistician",
        City: "North Haven",
        Blood_Group: "O-",
        Favorite_Color: "Steel Blue",
        Day_of_Week: "Friday",
        Birth_Month: "September",
        Education: "M.Sc. Statistics",
        Commute_Mode: "Bicycle",
        Hobby: "Chess",
        Last_Contact: "2026-03-13 22:00",
        Status: "Unrelated Incident / Distractor"
      },
      {
        Victim_ID: "VIC-025",
        Name: "Beatrice Thorne",
        Age: 40,
        Occupation: "Library Director",
        City: "North Haven",
        Blood_Group: "AB-",
        Favorite_Color: "Charcoal",
        Day_of_Week: "Monday",
        Birth_Month: "March",
        Education: "M.L.I.S. Archival Studies",
        Commute_Mode: "Bus",
        Hobby: "Calligraphy",
        Last_Contact: "2026-03-23 17:30",
        Status: "Unrelated Incident / Distractor"
      }
    ]
  },
  round3: {
    title: "ROUND 03",
    subtitle: "WHO IS NEXT?",
    story: "You have analyzed the previous incident records. The killer's pattern is no longer invisible.\n\nSurveillance intelligence has flagged several individuals across North Haven and surrounding districts whose daily routines intersect with key surveillance vectors.\n\nOnly one person completely matches the killer's exact selection criteria. Determine who is most at risk and formulate your forensic justification.",
    instructions: "Examine the 6 potential targets below. Compare their demographic, physiological, and behavioral profile variables against the confirmed pattern. Select the target and provide your reasoning.",
    correctVictimId: "TGT-02",
    correctVictimName: "Dr. Evelyn Harper",
    sampleJustification: "Target #02 (Dr. Evelyn Harper) matches 100% of the killer's verified pattern: Age 27 (26-29 range), Blood Group AB-, resides/commutes in North Haven, utilizes the Subway daily (including scheduled late Friday transit), and was born in July (prime month). All other targets deviate in blood type (A+, O+, AB+), commute method (Car, Bicycle), or age.",
    targets: [
      {
        id: "TGT-01",
        targetNumber: "TARGET #01",
        name: "Marcus Vance",
        age: 34,
        occupation: "Cloud Infrastructure Architect",
        city: "North Haven",
        bloodGroup: "A+",
        favoriteColor: "Navy Blue",
        birthMonth: "August",
        education: "B.S. Information Systems",
        commuteMode: "Personal Car",
        hobby: "Long-Distance Running",
        recentActivity: "Attended North Haven Tech Summit. Drives a hybrid sedan via Highway 101 daily.",
        dossierNotes: "Under routine monitoring. Does not utilize public transit. Blood group A+ deviates from confirmed incidents.",
        riskLevel: "LOW",
        avatarSeed: "Marcus"
      },
      {
        id: "TGT-02",
        targetNumber: "TARGET #02",
        name: "Dr. Evelyn Harper",
        age: 27,
        occupation: "Bio-Informatics Researcher",
        city: "North Haven",
        bloodGroup: "AB-",
        favoriteColor: "Obsidian",
        birthMonth: "July",
        education: "Ph.D. Computational Genomics",
        commuteMode: "Subway",
        hobby: "Astrophotography",
        recentActivity: "Works late shifts at North Haven Bio-Labs. Takes Central Subway Line every Friday evening between 21:30 and 22:30.",
        dossierNotes: "CRITICAL MATCH: Age 27, Blood Group AB-, North Haven resident, daily Subway commuter on Friday nights, born in July. Fits every single variable from the confirmed victim records.",
        riskLevel: "CRITICAL",
        avatarSeed: "Evelyn"
      },
      {
        id: "TGT-03",
        targetNumber: "TARGET #03",
        name: "Samuel Thorne",
        age: 28,
        occupation: "Investigative Data Journalist",
        city: "North Haven",
        bloodGroup: "O+",
        favoriteColor: "Crimson",
        birthMonth: "May",
        education: "M.A. Journalism",
        commuteMode: "Subway",
        hobby: "Urban Sketching",
        recentActivity: "Reports on city transit infrastructure. Commutes on North Haven Subway regularly.",
        dossierNotes: "Age (28) and Commute (Subway) align, but Blood Group is O+ (confirmed victims are all AB-).",
        riskLevel: "ELEVATED",
        avatarSeed: "Samuel"
      },
      {
        id: "TGT-04",
        targetNumber: "TARGET #04",
        name: "Maya Lin",
        age: 26,
        occupation: "Forensic Toxicologist",
        city: "North Haven",
        bloodGroup: "AB-",
        favoriteColor: "Emerald",
        birthMonth: "October",
        education: "M.Sc. Forensic Science",
        commuteMode: "Bicycle",
        hobby: "Rock Climbing",
        recentActivity: "Works at Municipal Forensics Lab. Commutes exclusively by bicycle along the river greenway.",
        dossierNotes: "Blood group AB- and Age 26 match, but commute is Bicycle rather than Subway, and birth month is October (even month).",
        riskLevel: "MODERATE",
        avatarSeed: "Maya"
      },
      {
        id: "TGT-05",
        targetNumber: "TARGET #05",
        name: "Lucas Rossi",
        age: 42,
        occupation: "Senior Museum Archivist",
        city: "North Haven",
        bloodGroup: "B-",
        favoriteColor: "Charcoal",
        birthMonth: "March",
        education: "Ph.D. Art History & Archives",
        commuteMode: "Bus",
        hobby: "Classical Chess",
        recentActivity: "Curating rare manuscript exhibit. Takes the cross-town public bus route #14.",
        dossierNotes: "Age 42 significantly deviates from the 26-29 cluster. Commutes via Bus with Blood Group B-.",
        riskLevel: "LOW",
        avatarSeed: "Lucas"
      },
      {
        id: "TGT-06",
        targetNumber: "TARGET #06",
        name: "Chloe Bennett",
        age: 29,
        occupation: "Lead UX Product Designer",
        city: "North Haven",
        bloodGroup: "AB+",
        favoriteColor: "Teal",
        birthMonth: "January",
        education: "B.Des Interactive Media",
        commuteMode: "Subway",
        hobby: "Photography",
        recentActivity: "Working on fintech design sprints. Takes the Subway Line 4 daily at 20:00.",
        dossierNotes: "Subway commuter, Age 29, but Blood Group is AB+ (Rh positive, whereas all victims are Rh negative AB-).",
        riskLevel: "ELEVATED",
        avatarSeed: "Chloe"
      }
    ]
  },
  admin: {
    pin: "admin2026"
  }
};
