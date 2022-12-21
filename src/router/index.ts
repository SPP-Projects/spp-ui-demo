import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import adminRoutes from "@/router/admin";
import customerRoutes from "@/router/customer";
import guestRoutes from "@/router/guest";

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
const routes: Array<RouteRecordRaw> = [
  //userMode
  // @ts-ignore
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

  //adminMode
  // @ts-ignore
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

  //guestMode
  // @ts-ignore
  {
    path: "/",
    component: () => import("@/layouts/AuthLayoutTwo.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/shared/authentication/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/shared/authentication/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/shared/authentication/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },

  //guest payment
  {
    path: "/public",
    component: () => import("@/layouts/PayLayout.vue"),
    children: [
      //test 1
      // {
      //   path: "/test1",
      //   name: "public-test1",
      //   component: function () {
      //     return import("@/views/_dev/test1/index.vue");
      //   },
      //   meta: {
      //     pageTitle: "SP Pay",
      //   },
      // },
      // {
      //   path: "/test1/a",
      //   name: "public-test1a",
      //   component: function () {
      //     return import("@/views/_dev/test1/a.vue");
      //   },
      //   meta: {
      //     pageTitle: "SP Pay",
      //   },
      // },

      //test 2
      // {
      //   path: "/test2",
      //   name: "public-test2",
      //   component: function () {
      //     return import("@/views/_dev/test2/index.vue");
      //   },
      //   meta: {
      //     pageTitle: "SP Pay",
      //   },
      // },
      //public
      {
        path: "/pay",
        name: "public-home-page",
        component: function () {
          return import("@/views/guest/pay/index.vue");
        },
        meta: {
          pageTitle: "SP Pay",
        },
      },
      {
        path: "/pay/invoice-details/:reference",
        name: "pay-invoice-details",
        component: function () {
          return import("@/views/guest/pay/invoice.vue");
        },
        meta: {
          pageTitle: "Invoice Payment",
          breadcrumbs: ["invoices", "manage"],
        },
      },
      {
        path: "/pay/payment/:reference/:collectiontype",
        name: "initiate-generic-payment",
        component: function () {
          return import("@/views/guest/pay/payment.vue");
        },
        meta: {
          pageTitle: "Request campaign Payment",
          breadcrumbs: ["campaign", "manage"],
        },
      },
    ],
  },

  //sharedRoutes
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/shared/authentication/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/shared/errors/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/shared/errors/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },

  //logout
  {
    path: "/logout",
    name: "logout",
    component: {
      beforeRouteEnter(to, from, next) {
        const store = useAuthStore();
        store.logout();
        next("/sign-in");
      },
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
