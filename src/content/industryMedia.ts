/** Per-industry cover media and approved client names shown on industry cards. */
export const industryMedia: Record<
  string,
  { image: string; imageAlt: string; clients: string[] }
> = {
  "healthcare-fertility": {
    image: "/media/clients/genetics-social-grid.jpg",
    imageAlt: "Fertility awareness campaign creatives",
    clients: ["Genetics Cryobank", "Yashoda IVF & Fertility Centre"],
  },
  "medical-surgical": {
    image: "/media/clients/grace26-packaging.jpg",
    imageAlt: "Medical and surgical product packaging",
    clients: ["Grace26"],
  },
  "travel-hospitality": {
    image: "/media/clients/two-travel.jpg",
    imageAlt: "Coastal travel and campsite photography",
    clients: ["TripWithOwners", "Trek Power Adventures"],
  },
  "fashion-lifestyle": {
    image: "/media/clients/aikaa-social.jpg",
    imageAlt: "Fashion campaign creatives",
    clients: ["Aikaa Fashion"],
  },
  "professional-services": {
    image: "/media/clients/siddhartha-design.jpg",
    imageAlt: "Professional services brand collateral",
    clients: ["Siddhartha Logic", "Prober"],
  },
  "culture-events": {
    image: "/media/clients/pasbaan-events.jpg",
    imageAlt: "Literary festival event creatives",
    clients: ["Pasbaan-e-Adab"],
  },
  "startups-local-businesses": {
    image: "/media/clients/trekpower-brochure.jpg",
    imageAlt: "Adventure travel brochure design",
    clients: ["Trek Power Adventures"],
  },
};
