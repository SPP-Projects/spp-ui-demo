const adminRoutes = [
  //adminMode
  {
    path: "/admin",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "admin-dashboard",
        component: () => import("@/views/admin/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboard"],
        },
      },

      //transactions
      {
        path: "/admin/manage-transactions",
        name: "admin-manage-transactions",
        component: () => import("@/views/admin/transactions/general.vue"),
        meta: {
          pageTitle: "Manage Transactions",
          breadcrumbs: ["Manage Transactions"],
        },
      },
      {
        path: "/admin/transactions/types",
        name: "admin-manage-transaction-types",
        component: () => import("@/views/admin/transactions/types.vue"),
        meta: {
          pageTitle: "Transaction Types",
          breadcrumbs: ["Transaction Types"],
        },
      },

      {
        path: "/admin/transactions/mappings",
        name: "manage-transaction-mappings",
        component: () => import("@/views/admin/transactions/mappings.vue"),
        meta: {
          pageTitle: "Transaction Type Accounts Mappings",
          breadcrumbs: ["Transaction Type Accounts Mappings"],
        },
      },

      // accounts
      {
        path: "/admin/manage-accounts",
        name: "admin-manage-accounts",
        component: () => import("@/views/admin/accounts/manage.vue"),
        meta: {
          pageTitle: "Manage Accounts",
          breadcrumbs: ["Manage Accounts"],
        },
      },
      {
        path: "/admin/accounts/types",
        name: "admin-manage-account-types",
        component: () => import("@/views/admin/accounts/types.vue"),
        meta: {
          pageTitle: "Manage Account Types",
          breadcrumbs: ["Manage Account Types"],
        },
      },
      {
        path: "/admin/accounts/groups",
        name: "admin-manage-account-groups",
        component: () => import("@/views/admin/accounts/groups.vue"),
        meta: {
          pageTitle: "Manage Account Groups",
          breadcrumbs: ["Manage Account Groups"],
        },
      },
      {
        path: "/admin/accounts/limits",
        name: "admin-manage-account-limits",
        component: () => import("@/views/admin/accounts/limits.vue"),
        meta: {
          pageTitle: "Manage Account Limits",
          breadcrumbs: ["Manage Account Limits"],
        },
      },

      // customers
      {
        path: "/admin/manage-customers",
        name: "admin-manage-customers",
        component: () => import("@/views/admin/customers/manage.vue"),
        meta: {
          pageTitle: "Manage Customers",
          breadcrumbs: ["Manage Customers"],
        },
      },
      {
        path: "/admin/customers/types",
        name: "admin-manage-customer-types",
        component: () => import("@/views/admin/customers/types.vue"),
        meta: {
          pageTitle: "Manage Customer Types",
          breadcrumbs: ["Manage Customer Types"],
        },
      },
      {
        path: "/admin/customers/groups",
        name: "admin-manage-customer-groups",
        component: () => import("@/views/admin/customers/groups.vue"),
        meta: {
          pageTitle: "Manage Customer Groups",
          breadcrumbs: ["Manage Customer Groups"],
        },
      },

      // customer
      {
        path: "/admin/customers/view/:id",
        name: "admin-manage-customer",
        component: () => import("@/views/admin/customers/customer/index.vue"),
        meta: {
          pageTitle: "View Customer",
          breadcrumbs: ["Manage Customers"],
        },
      },
      {
        path: "/admin/customers/view/:id/kyc",
        name: "admin-manage-customer-kyc",
        component: () => import("@/views/admin/customers/customer/kyc.vue"),
        meta: {
          pageTitle: "Customer KYC",
          breadcrumbs: ["Manage Customers"],
        },
      },
      {
        path: "/admin/customers/view/:id/permissions",
        name: "admin-manage-customer-permissions",
        component: () =>
          import("@/views/admin/customers/customer/permissions.vue"),
        meta: {
          pageTitle: "Customer Permissions",
          breadcrumbs: ["Manage Customers"],
        },
      },
      {
        path: "/admin/customers/view/:id/users",
        name: "admin-manage-customer-users",
        component: () => import("@/views/admin/customers/customer/users.vue"),
        meta: {
          pageTitle: "Customer User List",
          breadcrumbs: ["Manage Customers"],
        },
      },

      // tickets
      {
        path: "/admin/tickets/manage",
        name: "admin-manage-tickets",
        component: () => import("@/views/admin/tickets/manage.vue"),
        meta: {
          pageTitle: "Manage Tickets",
          breadcrumbs: ["Manage Tickets"],
        },
      },

      // settings
      {
        path: "/admin/settings/main/general",
        name: "admin-manage-general-settings",
        component: () => import("@/views/admin/settings/general/manage.vue"),
        meta: {
          pageTitle: "Manage General Settings",
          breadcrumbs: ["Manage General Settings"],
        },
      },

      // KYC Settings
      {
        path: "/admin/settings/kyc/general",
        name: "admin-manage-kyc-settings",
        component: () => import("@/views/admin/settings/kyc/general.vue"),
        meta: {
          pageTitle: "Manage General KYC Settings",
          breadcrumbs: ["Manage General KYC Settings"],
        },
      },
      {
        path: "/admin/settings/kyc/accounts",
        name: "admin-manage-account-kyc-settings",
        component: () => import("@/views/admin/settings/kyc/accounts.vue"),
        meta: {
          pageTitle: "Account Specific KYC Settings",
          breadcrumbs: ["Account Specific KYC Settings"],
        },
      },
      {
        path: "/admin/settings/kyc/customers",
        name: "admin-manage-customer-kyc-settings",
        component: () => import("@/views/admin/settings/kyc/customers.vue"),
        meta: {
          pageTitle: "Manage Customer Specific KYC Settings",
          breadcrumbs: ["Manage Customer Specific KYC Settings"],
        },
      },

      //charges
      {
        path: "/admin/settings/charges",
        name: "admin-manage-charges-settings",
        component: () => import("@/views/admin/settings/charges/manage.vue"),
        meta: {
          pageTitle: "Manage Charge Settings",
          breadcrumbs: ["Manage Charge Settings"],
        },
      },
      {
        path: "/admin/settings/commissions",
        name: "admin-manage-commissions-settings",
        component: () =>
          import("@/views/admin/settings/charges/commissions.vue"),
        meta: {
          pageTitle: "Manage Commissions Settings",
          breadcrumbs: ["Manage Commissions Settings"],
        },
      },

      {
        path: "/admin/admin/settings/charges/edit/:id",
        name: "admin-edit-charge-setting",
        component: () => import("@/views/admin/settings/charges/edit.vue"),
        meta: {
          pageTitle: "Edit Charge",
          breadcrumbs: ["Edit Charge"],
        },
      },
      {
        path: "/settings/charges/add",
        name: "admin-add-charge-setting",
        component: () => import("@/views/admin/settings/charges/add.vue"),
        meta: {
          pageTitle: "Add Charges",
          breadcrumbs: ["Manage Charges"],
        },
      },
      {
        path: "/admin/settings/notifications/general",
        name: "admin-manage-notification-settings",
        component: () =>
          import("@/views/admin/settings/notifications/general.vue"),
        meta: {
          pageTitle: "Manage Notification Settings",
          breadcrumbs: ["Manage Notification Settings"],
        },
      },
      {
        path: "/admin/settings/notifications/activities",
        name: "admin-manage-notification-activities",
        component: () =>
          import("@/views/admin/settings/notifications/activities.vue"),
        meta: {
          pageTitle: "Manage Notification Activities",
          breadcrumbs: ["Manage Notification Activities"],
        },
      },
      {
        path: "/admin/settings/notifications/groups",
        name: "admin-manage-notification-activity-group",
        component: () =>
          import("@/views/admin/settings/notifications/groups.vue"),
        meta: {
          pageTitle: "Manage Notification Activity",
          breadcrumbs: ["Manage Notification Activity Groups"],
        },
      },
      {
        path: "/admin/settings/notifications/templates",
        name: "admin-manage-notification-templates",
        component: () =>
          import("@/views/admin/settings/notifications/templates.vue"),
        meta: {
          pageTitle: "Manage Notification Templates",
          breadcrumbs: ["Manage Notification Templates"],
        },
      },
      {
        path: "/admin/settings/payment-maps",
        name: "admin-manage-payment-map-settings",
        component: () => import("@/views/admin/settings/payment-maps.vue"),
        meta: {
          pageTitle: "Manage Payment Method - Payment Library Mappings",
          breadcrumbs: ["Manage Payment Maps"],
        },
      },
      {
        path: "/admin/settings/exchange-rates",
        name: "admin-manage-exchange-rate-settings",
        component: () => import("@/views/admin/settings/exchange-rates.vue"),
        meta: {
          pageTitle: "Manage Exchange Rates",
          breadcrumbs: ["Manage Exchange Rates"],
        },
      },
      {
        path: "/admin/settings/permissions",
        name: "admin-manage-permissions-settings",
        component: () =>
          import("@/views/admin/settings/permissions/general.vue"),
        meta: {
          pageTitle: "Manage Permissions",
          breadcrumbs: ["Manage Permissions"],
        },
      },
      {
        path: "/admin/settings/permission-groups",
        name: "admin-manage-permission-group-settings",
        component: () =>
          import("@/views/admin/settings/permissions/groups.vue"),
        meta: {
          pageTitle: "Manage Permission Groups",
          breadcrumbs: ["Manage Permission Groups"],
        },
      },

      {
        path: "/admin/settings/permission-types",
        name: "admin-manage-permission-type-settings",
        component: () => import("@/views/admin/settings/permissions/types.vue"),
        meta: {
          pageTitle: "Manage Permission Types",
          breadcrumbs: ["Manage Permission Types"],
        },
      },

      {
        path: "/admin/settings/main/groups",
        name: "admin-manage-groups-settings",
        component: () => import("@/views/admin/settings/general/groups.vue"),
        meta: {
          pageTitle: "Manage Setting Groups",
          breadcrumbs: ["Manage Setting Groups"],
        },
      },
      {
        path: "/admin/settings/main/type",
        name: "admin-manage-type-settings",
        component: () => import("@/views/admin/settings/general/types.vue"),
        meta: {
          pageTitle: "Manage Setting Types",
          breadcrumbs: ["Manage Setting Types"],
        },
      },

      //sms
      {
        path: "/admin/sms/reports",
        name: "admin-manage-sms",
        component: () => import("@/views/admin/sms/reports.vue"),
        meta: {
          pageTitle: "View SMS Reports",
          breadcrumbs: ["SMS Reports"],
        },
      },

      {
        path: "/admin/sms/sender-ids",
        name: "admin-manage-sms-sender-ids",
        component: () => import("@/views/admin/sms/sender-ids.vue"),
        meta: {
          pageTitle: "Manage Sender IDs",
          breadcrumbs: ["Sender IDs"],
        },
      },

      //admin institutions
      {
        path: "/admin/institutions/manage",
        name: "admin-manage-institutions-manage",
        component: () => import("@/views/admin/institutions/manage.vue"),
        meta: {
          pageTitle: "Manage Institutions",
          breadcrumbs: ["Manage Institutions"],
        },
      },
      {
        path: "/admin/institutions/types",
        name: "admin-manage-institutions-type",
        component: () => import("@/views/admin/institutions/types.vue"),
        meta: {
          pageTitle: "Manage Institutions Types",
          breadcrumbs: ["Manage Institutions Types"],
        },
      },

      //languages
      {
        path: "/admin/settings/languages",
        name: "admin-manage-languages-manage",
        component: () => import("@/views/admin/settings/languages/manage.vue"),
        meta: {
          pageTitle: "Manage Languages",
          breadcrumbs: ["Manage Languages"],
        },
      },

      //payment methods
      {
        path: "/admin/settings/payments/methods",
        name: "admin-manage-payment-methods",
        component: () => import("@/views/admin/settings/payments/methods.vue"),
        meta: {
          pageTitle: "Manage Payment Methods",
          breadcrumbs: ["Manage Payment Methods"],
        },
      },
    ],
  },
];

export default adminRoutes;
