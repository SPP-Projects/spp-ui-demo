const sppData = {
  userStatuses: [
    {
      id: 1,
      name: "Inactive",
    },
    {
      id: 2,
      name: "Active",
    },
    {
      id: 3,
      name: "Deleted",
    },
  ],
  senderIdStatuses: [
    {
      id: 1,
      name: "In Review",
    },
    {
      id: 2,
      name: "Approved",
    },
    {
      id: 3,
      name: "Rejected",
    },
    {
      id: 4,
      name: "Suspended",
    },
  ],
  adminNotificationStatuses: [
    {
      id: 0,
      name: "Inactive",
    },
    {
      id: 1,
      name: "Active",
    },
  ],
  institutionStatuses: [
    {
      id: 1,
      name: "Inactive",
    },
    {
      id: 2,
      name: "Active",
    },
  ],
  institutions: [
    { id: "1", type_id: "1", name: "SP Pay", code: "SPP" },
    { id: "2", type_id: "2", name: "Absa Bank Ghana Ltd", code: "030100" },
    { id: "3", type_id: "2", name: "Access Bank", code: "280100" },
    { id: "4", type_id: "2", name: "ADB Bank Limited", code: "080100" },
    { id: "5", type_id: "3", name: "AirtelTigo", code: "ATL" },
    { id: "6", type_id: "2", name: "ARB Apex Bank", code: "070101" },
    { id: "7", type_id: "2", name: "Bank of Africa Ghana", code: "210100" },
    {
      id: "8",
      type_id: "2",
      name: "Bank of Baroda Ghana Limited",
      code: "260100",
    },
    { id: "9", type_id: "2", name: "Bank of Ghana", code: "010100" },
    {
      id: "10",
      type_id: "2",
      name: "Barclays Bank of Ghana Limited",
      code: "030100",
    },
    { id: "11", type_id: "2", name: "BSIC Ghana Limited", code: "270100" },
    { id: "12", type_id: "2", name: "CAL Bank Limited", code: "140100" },
    {
      id: "13",
      type_id: "2",
      name: "Consolidated Bank Ghana Limited",
      code: "300100",
    },
    { id: "14", type_id: "2", name: "Ecobank Ghana Limited", code: "130100" },
    {
      id: "15",
      type_id: "2",
      name: "Energy Bank Ghana Limited",
      code: "290100",
    },
    { id: "16", type_id: "2", name: "FBNBank Ghana Limited", code: "200100" },
    {
      id: "17",
      type_id: "2",
      name: "Fidelity Bank Ghana Limited",
      code: "240100",
    },
    {
      id: "18",
      type_id: "2",
      name: "First Atlantic Bank Limited",
      code: "170100",
    },
    {
      id: "19",
      type_id: "2",
      name: "First National Bank Ghana Limited",
      code: "330100",
    },
    { id: "20", type_id: "2", name: "GCB Bank Limited", code: "040100" },
    { id: "21", type_id: "2", name: "GHL Bank", code: "390100" },
    { id: "22", type_id: "2", name: "GN Bank", code: "320100" },
    {
      id: "23",
      type_id: "2",
      name: "Guaranty Trust Bank (Ghana) Limited",
      code: "230100",
    },
    { id: "24", type_id: "2", name: "Heritage Bank Ghana", code: "370100" },
    { id: "25", type_id: "2", name: "HFC Bank Ghana Limited", code: "110100" },
    { id: "26", type_id: "3", name: "MTN", code: "MTN" },
    {
      id: "27",
      type_id: "2",
      name: "National Investment Bank Limited",
      code: "050100",
    },
    { id: "28", type_id: "2", name: "OmniBank Ghana Limited", code: "360100" },
    { id: "29", type_id: "2", name: "Premium Bank Limited", code: "350100" },
    { id: "30", type_id: "2", name: "Prudential Bank Limited", code: "180100" },
    {
      id: "31",
      type_id: "2",
      name: "Services Integrity Savings and Loans",
      code: "300361",
    },
    {
      id: "32",
      type_id: "2",
      name: "Société Générale Ghana Limited",
      code: "090100",
    },
    { id: "33", type_id: "2", name: "Sovereign Bank Ghana", code: "340100" },
    {
      id: "34",
      type_id: "2",
      name: "Stanbic Bank Ghana Limited",
      code: "190100",
    },
    {
      id: "35",
      type_id: "2",
      name: "Standard Chartered Bank Ghana Limited",
      code: "020100",
    },
    { id: "36", type_id: "2", name: "The Royal Bank Limited", code: "300100" },
    { id: "37", type_id: "2", name: "UniBank Ghana Limited", code: "220100" },
    {
      id: "38",
      type_id: "2",
      name: "United Bank for Africa Ghana Limited",
      code: "060100",
    },
    {
      id: "39",
      type_id: "2",
      name: "Universal Merchant Bank Ghana Limited",
      code: "100100",
    },
    { id: "40", type_id: "3", name: "Vodafone", code: "VOD" },
    { id: "41", type_id: "2", name: "Zenith Bank Ghana", code: "120100" },
  ],
  isDebitOrCredit: [
    {
      id: "Debit",
      name: "Debit",
    },
    {
      id: "Credit",
      name: "Credit",
    },
  ],
  chargeType: [
    {
      id: "fixed",
      name: "Fixed Amount",
    },
    {
      id: "percentage",
      name: "Percentage",
    },
  ],
  invoiceStatuses: [
    {
      id: 1,
      name: "Pending",
    },
    {
      id: 2,
      name: "Completed",
    },
    {
      id: 3,
      name: "Rejected",
    },
    {
      id: 4,
      name: "Cancelled",
    },
    {
      id: 5,
      name: "Draft",
    },
  ],
  moneyRequestStatuses: [
    {
      id: 1,
      name: "Pending",
    },
    {
      id: 2,
      name: "Completed",
    },

    {
      id: 3,
      name: "Cancelled",
    },
  ],
  campaignStatuses: [
    {
      id: 1,
      name: "In Review",
    },
    {
      id: 2,
      name: "Live",
    },

    {
      id: 3,
      name: "Closed",
    },
  ],
  transactionBatchStatuses: [
    {
      id: 1,
      name: "Created",
    },
    {
      id: 2,
      name: "Validating",
    },
    {
      id: 3,
      name: "Validated",
    },
    {
      id: 4,
      name: "Submitting",
    },
    {
      id: 5,
      name: "Submitted",
    },
  ],
  transactionStatuses: [
    {
      id: 1,
      name: "Created",
    },
    {
      id: 2,
      name: "Submitted",
    },
    {
      id: 3,
      name: "Processing",
    },
    {
      id: 4,
      name: "Success",
    },
    {
      id: 5,
      name: "Error",
    },
    {
      id: 6,
      name: "Cancelled",
    },
  ],
  customerTypes: [
    {
      id: 1,
      name: "Individual",
    },
    {
      id: 2,
      name: "Starter Business",
    },
    {
      id: 3,
      name: "Registered Business",
    },
  ],
  customerGroups: [
    {
      id: 1,
      name: "Bronze",
    },
    {
      id: 2,
      name: "Silver",
    },
    {
      id: 3,
      name: "Gold",
    },
    {
      id: 4,
      name: "Premium",
    },
  ],
  transactionTypes: [
    { id: 1, code: "DPST", name: "SPPay Deposit" },
    { id: 2, code: "WTRL", name: "SPPay Withdrawal" },
    { id: 3, code: "ITRF", name: "Internal Transfer" },
    { id: 4, code: "PYMT", name: "SPPay Payment" },
    { id: 5, code: "TRBK", name: "Transfer to Bank" },
    { id: 6, code: "TRMM", name: "Transfer to Mobile Money" },
    { id: 7, code: "TPPY", name: "Third-Party Payment" },
    { id: 8, code: "TPSD", name: "Third-Party SPPay Deposit" },
    { id: 9, code: "CHRG", name: "SP Pay Charge" },
    { id: 10, code: "COMM", name: "SP Pay Commission" },
    { id: 11, code: "TAX", name: "SP Pay Tax" },
    { id: 11, code: "TAX", name: "SP Pay Tax" },
    { id: 12, code: "REMIT", name: "Remittance" },
  ],
};

export default sppData;
