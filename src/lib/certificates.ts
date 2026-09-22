/**
 * Per-jurisdiction certificates and licenses Spribe holds, as provided by
 * the operator. File names are internal document references, not public
 * links — the panel that renders this points people to the Account
 * Manager rather than trying to open them.
 */
export interface CertificateItem {
  type: string;
  file: string;
}

export interface JurisdictionCertificates {
  jurisdiction: string;
  flag: string;
  certificates: CertificateItem[];
  licenses: CertificateItem[];
}

export const CERTIFICATES: JurisdictionCertificates[] = [
  {
    jurisdiction: "South Africa",
    flag: "🇿🇦",
    certificates: [
      { type: "RNG", file: "RNG" },
      { type: "RGS", file: "RGS" },
      { type: "ISMS", file: "ISMS" },
    ],
    licenses: [],
  },
  {
    jurisdiction: "UK",
    flag: "🇬🇧",
    certificates: [{ type: "RNG", file: "RNG" }],
    licenses: [
      { type: "Personal Management license", file: "UK Personal management license" },
      { type: "Remote operating license", file: "Licences" },
    ],
  },
  {
    jurisdiction: "Switzerland",
    flag: "🇨🇭",
    certificates: [
      {
        type: "Spribe OU RNG Evaluation Report for Switzerland",
        file: "SPR-CH-210706-RC-01-R1 Spribe OU RNG Evaluation Report for Switzerland.pdf",
      },
      {
        type: "Game Audit Report",
        file: "SPR-CH-210706-01-GC-R1 Spribe OU Game Certification Report - Aviator (HTML5).pdf",
      },
      { type: "Test Report", file: "TRS-J0006-I0163.pdf, TRS-J0006-I0163_protocol.pdf" },
    ],
    licenses: [],
  },
  {
    jurisdiction: "Sweden",
    flag: "🇸🇪",
    certificates: [
      { type: "RNG", file: "SPR-SE-251128-01-RC-R1 - RNG Evaluation Report - Spribe OU.pdf" },
      { type: "Evaluation Report", file: "SPR-SE-251128-01-GC-R1-(Aviator)(signed).pdf" },
    ],
    licenses: [
      {
        type: "Permit to manufacture, provide, install, and modify gaming software",
        file: "Sweden.pdf",
      },
    ],
  },
  {
    jurisdiction: "Spain",
    flag: "🇪🇸",
    certificates: [
      { type: "ISMS", file: "TRS-J0043-I0056 ENG.pdf" },
      { type: "Functionality report/Singular license", file: "Spain 26.06.21 ENG.pdf" },
    ],
    licenses: [],
  },
  {
    jurisdiction: "Romania",
    flag: "🇷🇴",
    certificates: [{ type: "RNG", file: "RNG" }],
    licenses: [
      {
        type: "Class II License for activities of production and/or distribution of specialized software in the gambling field",
        file: "Spribe Limited Class 2 Licence.pdf",
      },
    ],
  },
  {
    jurisdiction: "Peru",
    flag: "🇵🇪",
    certificates: [{ type: "RNG", file: "RNG.SPR-OL.1003.01.01.PE_Translation_eSigned.pdf" }],
    licenses: [
      { type: "Resolución Directoral N° 4253-2024-MINCETUR/VMT/DGJCMT", file: "PSV0158 Spribe OÜ.pdf" },
    ],
  },
  {
    jurisdiction: "Panama",
    flag: "🇵🇦",
    certificates: [{ type: "RNG", file: "RNG.PAN.SPR-OL.1003.01.01_SPA.pdf" }],
    licenses: [{ type: "Resolution Spribe System", file: "Resolution Spribe System.pdf" }],
  },
  {
    jurisdiction: "Ontario",
    flag: "🇨🇦",
    certificates: [
      { type: "RNG", file: "RNG" },
      { type: "RGS", file: "RGS" },
      { type: "ISMS", file: "ISMS" },
      { type: "Cam Audit Report", file: "SPR-ON-CA-250618-01-CA-R1 - CAM Audit Report - Spribe OÜ.pdf" },
    ],
    licenses: [{ type: "Gaming Related Supplier", file: "GamingSupplierCertificate.pdf" }],
  },
  {
    jurisdiction: "Netherlands",
    flag: "🇳🇱",
    certificates: [{ type: "RNG", file: "RNG" }],
    licenses: [],
  },
  {
    jurisdiction: "Malta",
    flag: "🇲🇹",
    certificates: [],
    licenses: [{ type: "Recognition Notice", file: "Spribe OU - MGA.pdf" }],
  },
  {
    jurisdiction: "Lithuania",
    flag: "🇱🇹",
    certificates: [
      { type: "Gaming Audit Report-Aviator", file: "SPR-LT-210729-01-GC-R1- Game Audit Report - Avaitor V1.0.pdf" },
      {
        type: "RNG Evaluation Report",
        file: "SPR-LIT-210727-01-RC-R1 Spribe OU RNG certification for Lithuania V1.0.pdf",
      },
    ],
    licenses: [],
  },
  {
    jurisdiction: "Latvia",
    flag: "🇱🇻",
    certificates: [
      { type: "RNG Evaluation Report", file: "SPR-LV-210421-RC-R1 Spribe OU RNG certification report for Latvia.pdf" },
    ],
    licenses: [],
  },
  {
    jurisdiction: "Italy",
    flag: "🇮🇹",
    certificates: [
      { type: "RNG 3.0", file: "SPR-IT-240719-01-RC-R1 RNG rapporto di valutazione - Spribe OÜ.pdf" },
      { type: "RNG 1.0.1", file: "SPR-IT-20200130-01-RC-R1 Spribe OU RNG Evaluation Report for Italy.pdf" },
    ],
    licenses: [],
  },
  {
    jurisdiction: "Greece",
    flag: "🇬🇷",
    certificates: [{ type: "Certificate of Conformity", file: "C-J0034-I0107.pdf" }],
    licenses: [{ type: "Manufacturer Suitability License", file: "Greece Licence 2022.pdf" }],
  },
  {
    jurisdiction: "Germany",
    flag: "🇩🇪",
    certificates: [{ type: 'Test report for the "Aviator"', file: "Germany 23.06.21.pdf" }],
    licenses: [],
  },
  {
    jurisdiction: "Croatia",
    flag: "🇭🇷",
    certificates: [{ type: "RNG", file: "SPR-CC-200416-01-RNG-C1_Spribe OU_Certifikat_RNG.pdf" }],
    licenses: [{ type: "Casino game integration", file: "Spribe-Croatia-certificate-2.pdf" }],
  },
  {
    jurisdiction: "Colombia",
    flag: "🇨🇴",
    certificates: [
      { type: "RNG", file: "RNG" },
      { type: "Evaluation Report-Aviator", file: "SPR-CO-250130-01-GC-R2 - Game Evaluation Report - Aviator.pdf" },
    ],
    licenses: [],
  },
  {
    jurisdiction: "Bulgaria",
    flag: "🇧🇬",
    certificates: [
      { type: "RNG", file: "RNG" },
      { type: "Game Audit Report-Aviator", file: "SPR-BG-200130-GC-R1 Game Audit Report - Aviator.pdf" },
    ],
    licenses: [],
  },
  {
    jurisdiction: "Brazil",
    flag: "🇧🇷",
    certificates: [
      { type: "RNG", file: "RNG" },
      { type: "RGS", file: "RGS" },
      { type: "ISMS", file: "ISMS" },
    ],
    licenses: [],
  },
  {
    jurisdiction: "Belarus",
    flag: "🇧🇾",
    certificates: [{ type: "Test Report Belarus", file: "TestReportBelarus-20-53_30.12.2020-Aviator-v1.0.0.pdf" }],
    licenses: [],
  },
];
