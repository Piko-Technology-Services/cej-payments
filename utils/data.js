const dpoMNOs = [
  {
    country: "zambia",
    code: "+260",
    networks: [
      { name: "MTN Zambia", mno: "MTNZM" },
      { name: "Airtel Zambia", mno: "AIRTELZM" },
      { name: "Zamtel", mno: "zamtel" }
    ]
  },

  {
    country: "kenya",
    code: "+254",
    networks: [
      { name: "Safaricom (M-Pesa)", mno: "mpesa" },
      { name: "Airtel Kenya", mno: "airtel" }
    ]
  },

  {
    country: "tanzania",
    code: "+255",
    networks: [
      { name: "Vodacom (M-Pesa)", mno: "vodacom" },
      { name: "Airtel Tanzania", mno: "airtel" },
      { name: "Tigo", mno: "tigo" },
      { name: "Halotel", mno: "halotel" }
    ]
  },

  {
    country: "uganda",
    code: "+256",
    networks: [
      { name: "MTN Uganda", mno: "mtn" },
      { name: "Airtel Uganda", mno: "airtel" }
    ]
  },

  {
    country: "ghana",
    code: "+233",
    networks: [
      { name: "MTN Ghana", mno: "mtn" },
      { name: "Vodafone Ghana", mno: "vodafone" },
      { name: "AirtelTigo", mno: "airteltigo" }
    ]
  },

  {
    country: "nigeria",
    code: "+234",
    networks: [
      { name: "MTN Nigeria", mno: "mtn" },
      { name: "Airtel Nigeria", mno: "airtel" },
      { name: "Glo", mno: "glo" },
      { name: "9mobile", mno: "9mobile" }
    ]
  }
];

const dpoSupportedCurrencies = [
  "USD", // US Dollar
  "EUR", // Euro
  "ZMW", // Zambian Kwacha
  "KES", // Kenyan Shilling
  "ZAR", // South African Rand
  "GBP", // British Pound Sterling
  "CHF", // Swiss Franc
  "AUD",  // Australian Dollar
  "TZS", // Tanzanian Shilling
  "UGX", // Ugandan Shilling
  "GHS", // Ghanaian Cedi
  "NGN"  // Nigerian Naira
  
];

export { dpoMNOs, dpoSupportedCurrencies };