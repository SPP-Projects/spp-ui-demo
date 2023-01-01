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
          },
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
          },
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
          },
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
          },
          {
            heading: "Reports",
            route: "/admin/sms/reports",
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
          },

          {
            heading: "Types",
            route: "/admin/institutions/types",
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
          },
          {
            heading: "Settings Groups",
            route: "/admin/settings/main/groups",
          },
          {
            heading: "Settings Types",
            route: "/admin/settings/main/types",
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
          },
          {
            heading: "Activities",
            route: "/admin/settings/notifications/activities",
          },
          {
            heading: "Activity Groups",
            route: "/admin/settings/notifications/groups",
          },
          {
            heading: "Templates",
            route: "/admin/settings/notifications/templates",
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
          },
          {
            heading: "Commissions",
            route: "/admin/settings/commissions",
          },
          {
            heading: "Exchange Rates",
            route: "/admin/settings/exchange-rates",
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
          },
          {
            heading: "Payment Maps",
            route: "/admin/settings/payment-maps",
          },
        ],
      },

      //languages
      {
        heading: "Languages",
        route: "/admin/settings/languages",
        svgIcon: "/media/icons/duotune/general/gen014.svg",
        fontIcon: "bi bi-diagram-2-fill",
      },
    ],
  },
];

export default MainMenuConfig;
