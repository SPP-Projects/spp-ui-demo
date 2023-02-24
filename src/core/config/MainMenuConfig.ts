export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  svgIcon?: string;
  fontIcon?: string;
  sub?: Array<MenuItem>;
  menuPermission?: Array<string>;
}

const MainMenuConfig: Array<MenuItem> = [
  //home
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        svgIcon: "/media/icons/duotune/art/art002.svg",
        fontIcon: "bi bi-houses-fill",
        menuPermission: ["generate sanctum tokens"],
      },
      {
        heading: "Manage Accounts",
        route: "/accounts",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-wallet-fill",
        menuPermission: ["view accounts and balances"],
      },
    ],
  },

  //remittance
  {
    heading: "Remittance",
    route: "/remittance",
    pages: [
      {
        heading: "Transfers",
        route: "/remittance",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-credit-card-2-front-fill",
        menuPermission: ["view transactions"],
      },
      {
        heading: "Send Money",
        route: "/remittance/rates",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-person-fill-up",
        menuPermission: ["view transactions"],
      },
    ],
  },

  //payments
  {
    heading: "Payments",
    route: "/payments",
    pages: [
      {
        heading: "Transactions",
        route: "/transactions",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-credit-card-2-front-fill",
        menuPermission: ["view transactions"],
      },
      {
        heading: "Transaction Batch Upload",
        route: "/transactions/batches",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-person-fill-up",
        menuPermission: ["view transactions"],
      },
    ],
  },

  //sms
  {
    heading: "SMS",
    route: "/sms",
    pages: [
      {
        heading: "Sender IDs",
        route: "/sms/sender-ids",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi-chat-left",
        menuPermission: ["view sms sender IDs"],
      },
      {
        heading: "Reports",
        route: "/sms/reports",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-journals",
        menuPermission: ["view sms reports"],
      },
    ],
  },

  //collections
  {
    heading: "Collections",
    route: "/collections",
    pages: [
      {
        heading: "Invoices",
        route: "/invoices",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-receipt-cutoff",
        menuPermission: ["view invoices"],
      },
      {
        heading: "Money Requests",
        route: "/money-requests",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-ticket-perforated-fill",
        menuPermission: ["view money requests"],
      },
      {
        heading: "Campaigns",
        route: "/campaigns",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-clipboard2-data",
        menuPermission: ["view campaigns"],
      },
    ],
    menuPermission: ["view invoices", "view money requests", "view campaigns"],
  },
];

export default MainMenuConfig;
