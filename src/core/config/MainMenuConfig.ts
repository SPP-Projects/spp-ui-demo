export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  svgIcon?: string;
  fontIcon?: string;
  sub?: Array<MenuItem>;
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
      },
      {
        heading: "KYC",
        route: "/onboarding/kyc",
        svgIcon: "/media/icons/duotune/art/art002.svg",
        fontIcon: "bi bi-file-earmark-person-fill",
      },
    ],
  },

  //account
  {
    heading: "SPP Account",
    route: "/account",
    pages: [
      {
        heading: "Manage Accounts",
        route: "/accounts",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-wallet-fill",
      },
      {
        heading: "Users",
        route: "/users",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-people-fill",
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
      },
      {
        heading: "Transaction Batch Upload",
        route: "/transactions/batches",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-person-fill-up",
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
      },
      {
        heading: "Reports",
        route: "/sms/reports",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-journals",
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
      },
      {
        heading: "Money Requests",
        route: "/money-requests",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-ticket-perforated-fill",
      },
      {
        heading: "Campaigns",
        route: "/campaigns",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-clipboard2-data",
      },
    ],
  },
];

export default MainMenuConfig;
