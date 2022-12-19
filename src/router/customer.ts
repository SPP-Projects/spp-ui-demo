const customerRoutes = [
  //userMode
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },

      //accounts
      {
        path: "/accounts",
        name: "accounts-list",
        component: () => import("@/views/customer/accounts/manage.vue"),
        meta: {
          pageTitle: "Manage Accounts",
          breadcrumbs: ["Manage Accounts"],
        },
      },

      //transactions
      {
        path: "/transactions",
        name: "manage-transactions",
        component: () => import("@/views/customer/transactions/manage.vue"),
        meta: {
          pageTitle: "Transactions",
          breadcrumbs: ["Manage Transactions"],
        },
      },
      {
        path: "/transactions/initiate",
        name: "initiate-transaction",
        component: function () {
          return import("@/views/customer/transactions/initiate.vue");
        },
        meta: {
          pageTitle: "New Transaction",
          breadcrumbs: ["Manage Transactions", "New Transaction"],
        },
      },

      //transaction batches
      {
        path: "/transactions/batches",
        name: "transaction-batches",
        component: function () {
          return import("@/views/customer/transaction-batches/manage.vue");
        },
        meta: {
          pageTitle: "Transaction Batches",
          breadcrumbs: ["Transactions", "Batches"],
        },
      },
      {
        path: "/transactions/batch/:reference",
        name: "view-transaction-batch",
        component: function () {
          return import("@/views/customer/transaction-batches/view.vue");
        },
        meta: {
          pageTitle: "View Transaction Batch",
          breadcrumbs: ["Transactions", "View Transaction Batch"],
        },
      },

      //sms
      {
        path: "/sms/reports",
        name: "manage-sms",
        component: function () {
          return import("@/views/customer/sms/reports.vue");
        },
        meta: {
          pageTitle: "View SMS reports",
          breadcrumbs: ["SMS Reports", "Manage"],
        },
      },
      {
        path: "/sms/sender-ids",
        name: "manage-sms-sender-ids",
        component: function () {
          return import("@/views/customer/sms/sender-ids.vue");
        },
        meta: {
          pageTitle: "Manage Sender IDS",
          breadcrumbs: ["SMS", "Sender Ids"],
        },
      },

      //documentation
      {
        path: "/documentation",
        name: "documentation",
        component: function () {
          return import("@/views/customer/documentation/index.vue");
        },
        meta: {
          pageTitle: "Documentation & Help",
          breadcrumbs: ["Documentation & Help"],
        },
      },

      //users
      {
        path: "/users",
        name: "manage-users",
        component: function () {
          return import("@/views/customer/users/manage.vue");
        },
        meta: {
          pageTitle: "Manage Users",
          breadcrumbs: ["Users & Permissions", "manage"],
        },
      },

      //campaigns
      {
        path: "/campaigns",
        name: "manage-campaigns",
        component: function () {
          return import("@/views/customer/campaigns/manage.vue");
        },
        meta: {
          pageTitle: "Manage Campaigns",
          breadcrumbs: ["Campaigns", "manage"],
        },
      },
      {
        path: "/campaigns/payments/:reference",
        name: "campaign-payments",
        component: function () {
          return import("@/views/customer/campaigns/view.vue");
        },
        meta: {
          pageTitle: "Campaign Payments",
          breadcrumbs: ["Campaigns", "manage"],
        },
      },

      //money-request
      {
        path: "/money-requests",
        name: "manage-money-requests",
        component: function () {
          return import("@/views/customer/money-request/manage.vue");
        },
        meta: {
          pageTitle: "Money Request",
          breadcrumbs: ["Manage Money Requests"],
        },
      },
      {
        path: "/money-requests/payments/:reference",
        name: "money-request-payments",
        component: function () {
          return import("@/views/customer/money-request/view.vue");
        },
        meta: {
          pageTitle: "Request Details",
          breadcrumbs: ["Request Details"],
        },
      },

      //invoices
      {
        path: "/invoices",
        name: "invoices",
        component: function () {
          return import("@/views/customer/invoices/manage.vue");
        },
        meta: {
          pageTitle: "Invoices",
          breadcrumbs: ["Manage Invoices"],
        },
      },
      {
        path: "/invoices/new",
        name: "new-invoice",
        component: function () {
          return import("@/views/customer/invoices/new-invoice.vue");
        },
        meta: {
          pageTitle: "New Invoice",
          breadcrumbs: ["New Invoice", "manage"],
        },
      },
      {
        path: "/invoices/payments/:reference",
        name: "invoice-payments",
        component: function () {
          return import("@/views/customer/invoices/view.vue");
        },
        meta: {
          pageTitle: "Invoices",
          breadcrumbs: ["Manage Invoices"],
        },
      },

      //onboarding
      {
        path: "/onboarding/kyc",
        name: "kyc",
        component: function () {
          return import("@/views/customer/onboarding/kyc.vue");
        },
        meta: {
          pageTitle: "Manage Your Details",
          breadcrumbs: ["Onboarding", "Manage Your Details"],
        },
      },

      //Profile
      {
        path: "/profile",
        name: "profile-header",
        component: () => import("@/views/customer/profile/header.vue"),
        meta: {
          breadcrumbs: ["Crafted", "Account"],
        },
        children: [
          {
            path: "overview",
            name: "profile-overview",
            component: () => import("@/views/customer/profile/index.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },

          {
            path: "permissions",
            name: "profile-permissions",
            component: () => import("@/views/customer/profile/permissions.vue"),
            meta: {
              pageTitle: "Permissions",
            },
          },
        ],
      },

      //TODO
      // {
      //   path: "/todo",
      //   name: "manage-todo",
      //   component: function () {
      //     return import("@/views/todo/manage.vue");
      //   },
      //   meta: {
      //     pageTitle: "Manage Todo",
      //     breadcrumbs: ["Manage Todo"],
      //   },
      // },
      // {
      //   path: "/bt",
      //   name: "manage-charts",
      //   component: function () {
      //     return import("@/views/todo/bt.vue");
      //   },
      //   meta: {
      //     pageTitle: "Manage Todo",
      //     breadcrumbs: ["Manage Todo"],
      //   },
      // },
    ],
  },
];

export default customerRoutes;
