<template>
  <div class="card pt-4 mb-6 mb-xl-9">
    <!--begin::Card header-->
    <div class="card-header border-0">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>Creating & Managing Transactions</h2>
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body py-0">
      <p class="mb-4">
        The
        <b class="text-info">Transactions Area</b>
        is where you can view and manage all your transactions. <br />
        You will be able to see all your transactions, for all your accounts and
        each account depending on the filter applied.
      </p>

      <p class="mb-4">
        <span>
          You can also create transactions using the New Transaction button. The
          steps for creating transactions are as follows:</span
        >

        <!--              <ol class="test">-->
        <!--        <li>-->
        <!--          <b>Enter Transaction Details</b> - Select Credit and Debit Accounts,-->
        <!--          Amount and Transaction References.-->
        <!--        </li>-->

        <!--        <li>-->
        <!--          <b>Validate Transaction</b> - Clicking the validate transaction-->
        <!--          performs all the checks including name validation for any third party-->
        <!--          account involved without actually creating the transaction.-->
        <!--        </li>-->
        <!--        <li>-->
        <!--          <b>Submit Transaction</b> - Submitting the transaction adds t he-->
        <!--          transaction to the processing queue. For payments, an approval prompt-->
        <!--          will be sent to the number in question.-->
        <!--        </li>-->
        <!--              </ol>-->
      </p>
    </div>

    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
export default {
  name: "TransactionsDocumentation",
};
</script>

<style scoped></style>
