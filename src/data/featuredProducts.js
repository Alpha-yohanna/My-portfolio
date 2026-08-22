export const featuredProducts = [
  {
    slug: "verirent",
    name: "VeriRent",
    category: "Property Technology / Rental Platform",
    platform: "Mobile Application",
    theme: "mobile",
    tagline:
      "A digital record-keeping and rental transparency platform designed to reduce misunderstandings and improve trust between landlords and tenants.",
    problem:
      "Renting a property is often opaque. Listings can be misleading, agents can add unnecessary charges, and once an agreement is made verbally or on paper, there's rarely a reliable record either side can refer back to — which is where disputes start.",
    idea:
      "A mobile platform that lets tenants discover and verify listings more directly, while keeping a clear, shared digital record of what landlords and tenants actually agreed to — reducing the friction, cost, and confusion that currently sits between them.",
    product:
      "VeriRent is a React Native mobile app for property renting. It is not a legal or dispute-resolution service — it's a digital record-keeping and rental transparency platform designed to reduce misunderstandings and improve trust between landlords and tenants.",
    howItWorks: [
      "Browse property listings with a verification layer to help reduce fraudulent or misleading posts.",
      "Review agreement terms directly in the app before committing.",
      "Store the agreement and payment history digitally, tied to both parties.",
      "Refer back to what was actually agreed, at any point.",
    ],
    features: [
      "Property listing verification",
      "Direct landlord–tenant access",
      "Digital agreement records",
      "Payment history tracking",
      "Reduced reliance on agent overhead",
    ],
    tech: ["React Native"],
    vision:
      "A rental process where every party can trust what was agreed — without needing to rely on memory, paper, or a third party to hold that record for them.",
  },
  {
    slug: "yangnews",
    name: "YangNews",
    category: "Global News & Publishing Platform",
    platform: "Web & Mobile",
    theme: "editorial",
    tagline:
      "Discover, read, and publish global news — designed to stay useful even when connectivity doesn't cooperate.",
    problem:
      "Staying properly informed today means juggling too many separate sources, and losing access the moment a connection drops — right as it becomes reachable, right when it matters.",
    idea:
      "One platform that brings global news discovery, independent publishing, and offline-friendly reading together, so people can stay informed without needing a constant connection.",
    product:
      "YangNews is a global news and publishing platform for discovering headlines, reading in depth, and publishing stories — built around staying useful with limited or intermittent connectivity, not just when everything is online.",
    howItWorks: [
      "Browse global headlines organized by category and trending topic.",
      "Save or cache stories so they remain readable offline.",
      "Publishers post directly to the platform.",
      "Search and follow the stories and topics that matter to you.",
    ],
    features: [
      "Global headline discovery",
      "Category & trending browsing",
      "Offline-friendly reading",
      "Publisher tools",
      "Search across stories and topics",
    ],
    tech: ["Planned: offline-first architecture", "Content publishing platform"],
    vision:
      "A place to stay informed that doesn't assume a perfect connection — news that travels with you, not just to you.",
  },
  {
    slug: "lifeline",
    name: "Lifeline",
    category: "Emergency Connectivity / Digital Wallet",
    platform: "Mobile Application",
    theme: "connectivity",
    tagline:
      "An emergency connectivity companion — set funds aside in advance, so buying airtime or data when it matters most is instant.",
    problem:
      "People lose the ability to communicate exactly when it matters most — during an emergency, or while travelling — often simply because they've run out of airtime or data at the wrong moment.",
    idea:
      "An app that lets people set aside an emergency balance ahead of time, so that buying airtime or data in a moment of need is quick, rather than blocked by not having cash, banking access, or time to figure it out.",
    product:
      "Lifeline is an emergency connectivity and digital wallet app. It's important to be clear about what it is and isn't: Lifeline does not provide internet access without a network connection. It stores emergency funds in advance, so that airtime and data purchases — which still require a working connection to complete — are instant once you have one.",
    howItWorks: [
      "Set aside an emergency balance in advance, while you have a stable connection.",
      "Access that balance instantly when you need it.",
      "Use it to buy airtime or data through the connected purchase flow.",
      "Clear, honest indicators show what works offline versus what still needs a connection.",
    ],
    features: [
      "Emergency balance, set aside in advance",
      "Fast top-up access in a crisis or while travelling",
      "Travel / emergency mode",
      "Clear offline vs. connection-dependent states",
      "Securely stored payment information",
    ],
    tech: ["Planned: mobile app direction"],
    vision:
      "A safety net for staying reachable — so running out of airtime doesn't also mean being cut off from everyone who needs to reach you.",
  },
];

export function getFeaturedProduct(slug) {
  return featuredProducts.find((product) => product.slug === slug);
}
