/**
 * Per-industry context media and the approved client names shown on cards.
 *
 * IMPORTANT: every image below is INDUSTRY CONTEXT imagery — licensed-style
 * stock used as a temporary visual placeholder. It is never presented as
 * completed client work. Project work is always shown inside case studies
 * and labelled separately.
 */
export const industryMedia: Record<
  string,
  { image: string; imageAlt: string; clients: string[] }
> = {
  "healthcare-fertility-hospitals": {
    image: "/media/industries/healthcare-fertility-hospitals.jpg",
    imageAlt: "Bright modern hospital corridor with a naturally lit waiting area",
    clients: [
      "Genetics Cryobank",
      "Yashoda IVF & Fertility Centre",
      "Suviksha Hospital",
      "MIMAS World Hospitals",
      "Advaith Hospital",
      "Xpert Super Speciality Trulife",
      "Medibrain",
      "Mahadevi Hospital",
    ],
  },
  "medical-products-b2b-healthcare": {
    image: "/media/industries/medical-products-b2b-healthcare.jpg",
    imageAlt: "Sterile medical and surgical consumables arranged for catalogue photography",
    clients: ["Grace26", "Genetics Cryobank"],
  },
  "education-learning": {
    image: "/media/industries/education-learning.jpg",
    imageAlt: "Students collaborating with laptops and books in a modern college library",
    clients: ["Prober", "Satish Pradhan Dnyanasadhana College, Thane"],
  },
  "government-public-service": {
    image: "/media/industries/government-public-service.jpg",
    imageAlt: "City road junction at dusk with signals, lane markings and a zebra crossing",
    clients: ["Maharashtra Police"],
  },
  "travel-hospitality-community": {
    image: "/media/industries/travel-hospitality-community.jpg",
    imageAlt: "Group of friends laughing together at a coastal viewpoint during a road trip",
    clients: ["TripWithOwners"],
  },
  "fashion-jewellery-lifestyle": {
    image: "/media/industries/fashion-jewellery-lifestyle.jpg",
    imageAlt: "Fine gold jewellery styled on contemporary printed textiles",
    clients: ["Aikaa Fashion", "Mark Jewells"],
  },
  "culture-events-entertainment": {
    image: "/media/industries/culture-events-entertainment.jpg",
    imageAlt: "Warmly lit auditorium stage with a microphone and an attentive audience",
    clients: ["Pasbaan-e-Adab"],
  },
  "technology-professional-services": {
    image: "/media/industries/technology-professional-services.jpg",
    imageAlt: "Minimal studio workstation showing dashboards and interface wireframes",
    clients: ["Siddhartha Logic", "Prober"],
  },
  "mobility-automotive-ev-technology": {
    image: "/media/industries/mobility-automotive-ev-technology.jpg",
    imageAlt: "Electric two-wheelers at a modern urban charging point at dusk",
    clients: ["Ather Energy", "TrusTerra"],
  },
};
