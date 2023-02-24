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
  {
    pages: [
      //dashboard
      {
        heading: "dashboard",
        route: "/dashboard",
        svgIcon: "/media/icons/duotune/art/art002.svg",
        fontIcon: "bi bi-house-gear-fill",
        menuPermission: ["view settings"],
      },

      //logout
      {
        heading: "Logout",
        route: "/logout",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-box-arrow-in-left",
        menuPermission: ["view settings"],
      },
    ],
  },

  {
    heading: "Admin Tools",
    route: "/apps",
    pages: [
      /**
       * Transactions
       */
      {
        sectionTitle: "Transactions",
        route: "/transactions",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-stack",
        sub: [
          {
            heading: "Manage",
            route: "/admin/transactions/manage",
            menuPermission: ["view transactions"],
          },
          {
            heading: "Types",
            route: "/admin/transactions/types",
            menuPermission: ["view transactions"],
          },
          {
            heading: "Account Type Accounts Mappings",
            route: "/admin/transactions/mappings",
            menuPermission: ["view transactions"],
          },
        ],
      },

      /**
       * Accounts
       */
      {
        sectionTitle: "Accounts",
        route: "/admin/accounts/",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-wallet-fill",
        sub: [
          {
            heading: "Manage",
            route: "/admin/accounts/manage",
            menuPermission: ["view accounts and balances"],
          },
          {
            heading: "Types",
            route: "/admin/accounts/types",
            menuPermission: ["view account types"],
          },
          {
            heading: "Groups",
            route: "/admin/accounts/groups",
            menuPermission: ["view account groups"],
          },
          {
            heading: "Limits",
            route: "/admin/accounts/limits",
            menuPermission: ["view account limits"],
          },
        ],
      },

      /**
       * Customers
       */
      {
        sectionTitle: "Customers",
        route: "/admin/customers",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-people-fill",
        sub: [
          {
            heading: "Manage",
            route: "/admin/customers/manage",
            menuPermission: ["view customers"],
          },
          {
            heading: "Types",
            route: "/admin/customers/types",
            menuPermission: ["view customer types"],
          },
          {
            heading: "Groups",
            route: "/admin/customers/groups",
            menuPermission: ["view customer groups"],
          },
        ],
      },

      /**
       * SMS
       */
      {
        sectionTitle: "SMS",
        route: "/admin/sms",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-chat-right-text-fill",
        sub: [
          {
            heading: "Sender IDs",
            route: "/admin/sms/sender-ids",
            menuPermission: ["view sms sender IDs"],
          },
          {
            heading: "Reports",
            route: "/admin/sms/reports",
            menuPermission: ["view sms reports"],
          },
        ],
      },

      /**
       * Institutions
       */
      {
        sectionTitle: "Institutions",
        route: "/institutions",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-person-vcard-fill",
        sub: [
          {
            heading: "Manage",
            route: "/admin/institutions/manage",
            menuPermission: ["view settings"],
          },

          {
            heading: "Types",
            route: "/admin/institutions/types",
            menuPermission: ["view settings"],
          },
        ],
      },

      /**
       * General Settings
       */
      {
        sectionTitle: "General Settings",
        route: "/admin/settings/main",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-gear-wide-connected",
        sub: [
          {
            heading: "General Settings",
            route: "/admin/settings/main/general",
            menuPermission: ["view settings"],
          },
          {
            heading: "Settings Groups",
            route: "/admin/settings/main/groups",
            menuPermission: ["view setting groups"],
          },
          {
            heading: "Settings Types",
            route: "/admin/settings/main/types",
            menuPermission: ["view setting types"],
          },
          {
            heading: "Languages",
            route: "/admin/settings/languages",
            menuPermission: ["view languages"],
          },
        ],
      },

      /**
       * Notification Settings
       */
      {
        sectionTitle: "Notifications",
        route: "/admin/settings/notifications",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-person-vcard-fill",
        sub: [
          {
            heading: "Manage",
            route: "/admin/settings/notifications/manage",
            menuPermission: ["view notification settings"],
          },
          {
            heading: "Activities",
            route: "/admin/settings/notifications/activities",
            menuPermission: ["view notification activities"],
          },
          {
            heading: "Activity Groups",
            route: "/admin/settings/notifications/groups",
            menuPermission: ["view notification settings"],
          },
          {
            heading: "Templates",
            route: "/admin/settings/notifications/templates",
            menuPermission: ["view notification templates"],
          },
        ],
      },

      /**
       * KYC Settings
       */
      {
        sectionTitle: "KYC",
        route: "/kyc",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-person-vcard-fill",
        sub: [
          {
            heading: "General KYC Settings",
            route: "/admin/settings/kyc/general",
            menuPermission: ["view general KYC settings"],
          },
          {
            heading: "Account Specific Settings",
            route: "/admin/settings/kyc/accounts",
            menuPermission: ["view account specific KYC settings"],
          },
          {
            heading: "Customer Specific Settings",
            route: "/admin/settings/kyc/customers",
            menuPermission: ["view customer specific KYC settings"],
          },
        ],
      },

      /**
       * Rates Settings
       */
      {
        sectionTitle: "Rates",
        route: "/rates",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-person-vcard-fill",
        sub: [
          {
            heading: "Charges",
            route: "/admin/settings/charges",
            menuPermission: ["view charge settings"],
          },
          {
            heading: "Commissions",
            route: "/admin/settings/commissions",
            menuPermission: ["view charge settings"],
          },
          {
            heading: "Exchange Rates",
            route: "/admin/settings/exchange-rates",
            menuPermission: ["view charge settings"],
          },
        ],
      },

      /**
       * Payment Settings
       */
      {
        sectionTitle: "Payment",
        route: "/payment",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-person-vcard-fill",
        sub: [
          {
            heading: "Payment Methods",
            route: "/admin/settings/payments/methods",
            menuPermission: ["view payment maps"],
          },
          {
            heading: "Payment Maps",
            route: "/admin/settings/payment-maps",
            menuPermission: ["view payment maps"],
          },
        ],
      },

      /**
       * Campaigns
       */
      {
        sectionTitle: "Campaign",
        route: "/campaign",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-person-vcard-fill",
        sub: [
          {
            heading: "Manage",
            route: "/admin/campaigns",
            menuPermission: ["view campaigns"],
          },
        ],
      },

      /**
       * Invoices
       */
      {
        sectionTitle: "Invoices",
        route: "/invoices",
        svgIcon: "/media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi bi-person-vcard-fill",
        sub: [
          {
            heading: "Manage",
            route: "/admin/invoices",
            menuPermission: ["view invoices"],
          },
        ],
      },
    ],
  },
];

export default MainMenuConfig;
