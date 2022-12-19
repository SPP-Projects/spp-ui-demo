const guestRoutes = [
  //guestMode

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
      {
        path: "/test1",
        name: "public-test1",
        component: function () {
          return import("@/views/_dev/test1/index.vue");
        },
        meta: {
          pageTitle: "SP Pay",
        },
      },
      {
        path: "/test1/a",
        name: "public-test1a",
        component: function () {
          return import("@/views/_dev/test1/a.vue");
        },
        meta: {
          pageTitle: "SP Pay",
        },
      },

      //test 2
      {
        path: "/test2",
        name: "public-test2",
        component: function () {
          return import("@/views/_dev/test2/index.vue");
        },
        meta: {
          pageTitle: "SP Pay",
        },
      },
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

  //test uth
  //guestMode
  {
    path: "/tester",
    component: () => import("@/views/_dev/sign-in/LayoutOne.vue"),
    children: [
      {
        path: "/test/sign-in",
        name: "test-sign-in",
        component: () => import("@/views/_dev/sign-in/login-one.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
    ],
  },

  {
    path: "/tester2",
    component: () => import("@/views/_dev/sign-in/LayoutTwo.vue"),
    children: [
      {
        path: "/test/sign-in2",
        name: "test-sign-in2",
        component: () => import("@/views/_dev/sign-in/login-two.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
    ],
  },
];

export default guestRoutes;
