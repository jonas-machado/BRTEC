import {
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
  ClipboardDocumentListIcon,
  TableCellsIcon,
} from "@heroicons/react/20/solid";
import {
  ExclamationTriangleIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";

export const links = [
  {
    name: "Scripts",
    link: "/script",
    icon: DocumentTextIcon,
  },
  {
    name: "Aferir pon",
    link: "/network/verifyOlt",
    icon: WrenchScrewdriverIcon,
  },
  {
    name: "Banco de soluções",
    link: "/solutionBank",
    icon: LightBulbIcon,
  },
  {
    name: "Monitoramento",
    link: "/monitoring",
    icon: ExclamationTriangleIcon,
  },
  {
    name: "Configuração",
    link: "/config/manual",
    icon: WrenchIcon,
  },
];

export const linksBlank = [
  {
    name: "Wiki",
    link: "http://131.255.132.6:8887/doku.php",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "CNPJ/COND",
    link: "https://docs.google.com/spreadsheets/d/1aiSO7e_fERVePE9VhMXfA4sHHpbLwxpdAr__ei7k0y4/edit#gid=0",
    icon: TableCellsIcon,
  },
];
