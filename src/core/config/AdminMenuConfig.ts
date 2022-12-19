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
  {
    pages: [
      //dashboard
      {
        heading: "dashboard",
        route: "/dashboard",
        svgIcon: "/media/icons/duotune/art/art002.svg",
        fontIcon: "bi bi-house-gear-fill",
      },

      //logout
      {
        heading: "Logout",
        route: "/logout",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-box-arrow-in-left",
      },
    ],
  },

  {
    heading: "Accounts & Transactions",
    route: "/reports",
    pages: [
      //transaction listing
      {
        heading: "Transactions",
        route: "/admin/manage-transactions",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-cash-stack",
      },

      //account listing
      {
        heading: "Accounts",
        route: "/admin/manage-accounts",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-postcard",
      },

      //customer listing
      {
        heading: "Customers",
        route: "/admin/manage-customers",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-person-video2",
      },

      //sms listing
      {
        sectionTitle: "SMS",
        route: "/admin/sms",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-chat-right-text-fill",
        sub: [
          {
            heading: "Sender IDs",
            route: "/admin/sms/sender-ids",
          },
          {
            heading: "Reports",
            route: "/admin/sms/reports",
          },
        ],
      },
    ],
  },

  {
    heading: "Static Settings",
    route: "/apps",
    pages: [
      //general settings
      {
        sectionTitle: "General Settings",
        route: "/general-settings",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-gear-wide-connected",
        sub: [
          {
            heading: "General Settings",
            route: "/admin/settings/main/general",
          },
          {
            heading: "Settings Groups",
            route: "/admin/settings/main/groups",
          },
          {
            heading: "Settings Types",
            route: "/admin/settings/main/type",
          },
        ],
      },

      //accounts settings
      {
        sectionTitle: "Accounts",
        route: "/admin/accounts/",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-wallet-fill",
        sub: [
          {
            heading: "Types",
            route: "/admin/accounts/types",
          },
          {
            heading: "Groups",
            route: "/admin/accounts/groups",
          },
          {
            heading: "Limits",
            route: "/admin/accounts/limits",
          },
        ],
      },

      //customers settings
      {
        sectionTitle: "Customers",
        route: "/customers",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-people-fill",
        sub: [
          {
            heading: "Types",
            route: "/admin/customers/types",
          },
          {
            heading: "Groups",
            route: "/admin/customers/groups",
          },
        ],
      },

      //transactions settings
      {
        sectionTitle: "Transactions",
        route: "/transactions",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-stack",
        sub: [
          {
            heading: "Types",
            route: "/admin/transactions/types",
          },
          {
            heading: "Account Type Accounts Mappings",
            route: "/admin/transactions/mappings",
          },
        ],
      },

      //notification settings
      {
        sectionTitle: "Notifications",
        route: "/notifications",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-person-vcard-fill",
        sub: [
          {
            heading: "Notification Settings",
            route: "/admin/settings/notifications/general",
          },
          {
            heading: "Notification Activities",
            route: "/admin/settings/notifications/activities",
          },
          {
            heading: "Notification Activity Groups",
            route: "/admin/settings/notifications/groups",
          },
          {
            heading: "Notification Templates",
            route: "/admin/settings/notifications/templates",
          },
        ],
      },

      //kyc settings
      {
        sectionTitle: "KYC",
        route: "/kyc",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-person-vcard-fill",
        sub: [
          {
            heading: "General KYC Settings",
            route: "/admin/settings/kyc/general",
          },
          {
            heading: "Account Specific Settings",
            route: "/admin/settings/kyc/accounts",
          },
          {
            heading: "Customer Specific Settings",
            route: "/admin/settings/kyc/customers",
          },
        ],
      },

      //charges settings
      {
        heading: "Charges",
        route: "/admin/settings/charges",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-credit-card-2-back-fill",
      },
      {
        heading: "Commissions",
        route: "/admin/settings/commissions",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-credit-card-2-back-fill",
      },

      //payment maps settings
      {
        heading: "Payment Maps",
        route: "/admin/settings/payment-maps",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-diagram-2-fill",
      },

      //exchange rates
      {
        heading: "Exchange Rates",
        route: "/admin/settings/exchange-rates",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-diagram-2-fill",
      },

      //languages
      {
        heading: "Languages",
        route: "/admin/settings/languages",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-diagram-2-fill",
      },

      //payment methods
      {
        heading: "Payment Methods",
        route: "/admin/settings/payments/methods",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-diagram-2-fill",
      },

      //institutions
      {
        sectionTitle: "Institutions",
        route: "/institutions",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-person-vcard-fill",
        sub: [
          {
            heading: "Manage",
            route: "/admin/institutions/manage",
          },

          {
            heading: "Types",
            route: "/admin/institutions/types",
          },
        ],
      },
    ],
  },
];

export default MainMenuConfig;
