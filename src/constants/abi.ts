export const CUSTODIA_ABI = [
  {
    "type": "function",
    "name": "createEvent",
    "inputs": [
      { "name": "name", "type": "string" },
      { "name": "eventDate", "type": "uint256" },
      { "name": "resaleCapBps", "type": "uint256" },
      { "name": "waitlistMode", "type": "uint8" },
      { "name": "offerWindowSeconds", "type": "uint256" }
    ],
    "outputs": [{ "name": "eventId", "type": "uint256" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addTier",
    "inputs": [
      { "name": "eventId", "type": "uint256" },
      { "name": "tierName", "type": "string" },
      { "name": "price", "type": "uint256" },
      { "name": "supply", "type": "uint256" },
      { "name": "openImmediately", "type": "bool" }
    ],
    "outputs": [{ "name": "tierIndex", "type": "uint256" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setTierOpen",
    "inputs": [
      { "name": "eventId", "type": "uint256" },
      { "name": "tierIndex", "type": "uint256" },
      { "name": "open", "type": "bool" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "buyTicket",
    "inputs": [
      { "name": "eventId", "type": "uint256" },
      { "name": "tierIndex", "type": "uint256" }
    ],
    "outputs": [{ "name": "ticketId", "type": "uint256" }],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "resellTicket",
    "inputs": [
      { "name": "ticketId", "type": "uint256" },
      { "name": "to", "type": "address" }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "isValidTicketHolder",
    "inputs": [
      { "name": "ticketId", "type": "uint256" },
      { "name": "holder", "type": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "checkIn",
    "inputs": [{ "name": "ticketId", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "cancelEvent",
    "inputs": [{ "name": "eventId", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "refundAllTickets",
    "inputs": [{ "name": "eventId", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "joinWaitlist",
    "inputs": [
      { "name": "eventId", "type": "uint256" },
      { "name": "tierIndex", "type": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "offerWaitlistSlot",
    "inputs": [
      { "name": "eventId", "type": "uint256" },
      { "name": "waitlistIndex", "type": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "claimWaitlistOffer",
    "inputs": [
      { "name": "eventId", "type": "uint256" },
      { "name": "waitlistIndex", "type": "uint256" }
    ],
    "outputs": [{ "name": "ticketId", "type": "uint256" }],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getEvent",
    "inputs": [{ "name": "eventId", "type": "uint256" }],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "name": "id", "type": "uint256" },
          { "name": "name", "type": "string" },
          { "name": "organizer", "type": "address" },
          { "name": "eventDate", "type": "uint256" },
          { "name": "resaleCapBps", "type": "uint256" },
          { "name": "waitlistMode", "type": "uint8" },
          { "name": "offerWindowSeconds", "type": "uint256" },
          { "name": "totalTiers", "type": "uint256" },
          { "name": "cancelled", "type": "bool" },
          { "name": "active", "type": "bool" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTier",
    "inputs": [
      { "name": "eventId", "type": "uint256" },
      { "name": "tierIndex", "type": "uint256" }
    ],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "name": "tierName", "type": "string" },
          { "name": "price", "type": "uint256" },
          { "name": "supply", "type": "uint256" },
          { "name": "sold", "type": "uint256" },
          { "name": "isOpen", "type": "bool" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTicket",
    "inputs": [{ "name": "ticketId", "type": "uint256" }],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "name": "ticketId", "type": "uint256" },
          { "name": "eventId", "type": "uint256" },
          { "name": "tierIndex", "type": "uint256" },
          { "name": "owner", "type": "address" },
          { "name": "originalPrice", "type": "uint256" },
          { "name": "isCheckedIn", "type": "bool" },
          { "name": "isForResale", "type": "bool" },
          { "name": "resalePrice", "type": "uint256" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserTickets",
    "inputs": [{ "name": "user", "type": "address" }],
    "outputs": [{ "name": "ticketIds", "type": "uint256[]" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getEventTickets",
    "inputs": [{ "name": "eventId", "type": "uint256" }],
    "outputs": [{ "name": "ticketIds", "type": "uint256[]" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMaxResalePrice",
    "inputs": [{ "name": "ticketId", "type": "uint256" }],
    "outputs": [{ "name": "maxPrice", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPlatformStats",
    "inputs": [],
    "outputs": [
      { "name": "totalEvents", "type": "uint256" },
      { "name": "totalTicketsIssued", "type": "uint256" },
      { "name": "totalVolume", "type": "uint256" }
    ],
    "stateMutability": "view"
  }
] as const;
