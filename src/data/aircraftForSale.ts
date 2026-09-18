export type AircraftForSale = {
  id: string;
  slug: string;
  /** Manufacturer + model shown as Make on the card */
  make: string;
  year: number;
  /** Asking / expected price band shown on the card */
  expectedAmount: string;
  category: string;
  seats: number;
  summary: string;
  image: string;
  /**
   * Spec sheet PDF path under /public.
   * Drop your file at public/aircraft-specs/{filename}.pdf and keep this path in sync.
   */
  pdfUrl: string;
  status: "Available" | "Under offer" | "Coming soon";
};

/**
 * Pre-owned / for-sale inventory.
 * Replace `pdfUrl` files in `public/aircraft-specs/` with your uploaded spec sheets.
 */
export const AIRCRAFT_FOR_SALE: AircraftForSale[] = [
  {
    id: "1",
    slug: "dassault-falcon-2000lxs-2015",
    make: "Dassault Falcon 2000LXS",
    year: 2015,
    expectedAmount: "USD 14,500,000",
    category: "Super Midsize",
    seats: 10,
    summary:
      "3,414 hours · ESP Gold / MSP · Starlink connectivity · Matterhorn White with dark blue and silver pearl stripes.",
    image: "/images/stock/jet-exterior-3.jpg",
    pdfUrl: "/aircraft-specs/dassault-falcon-2000lxs-2015.pdf",
    status: "Available",
  },
  {
    id: "2",
    slug: "gulfstream-g550-2012",
    make: "Gulfstream G550",
    year: 2012,
    expectedAmount: "USD 16,900,000",
    category: "Long Range",
    seats: 14,
    summary:
      "Low-time G550 with refreshed cabin, Part 135 eligible history, and current engine programmes.",
    image: "/images/stock/jet-exterior-4.jpg",
    pdfUrl: "/aircraft-specs/gulfstream-g550-2012.pdf",
    status: "Available",
  },
  {
    id: "3",
    slug: "bombardier-global-6000-2014",
    make: "Bombardier Global 6000",
    year: 2014,
    expectedAmount: "USD 19,750,000",
    category: "Ultra Long Range",
    seats: 13,
    summary:
      "Intercontinental cabin, Ka-band connectivity, and recent 96-month inspection completed.",
    image: "/images/stock/jet-exterior-1.jpg",
    pdfUrl: "/aircraft-specs/bombardier-global-6000-2014.pdf",
    status: "Under offer",
  },
  {
    id: "4",
    slug: "embraer-praetor-600-2019",
    make: "Embraer Praetor 600",
    year: 2019,
    expectedAmount: "USD 12,200,000",
    category: "Super Midsize",
    seats: 9,
    summary:
      "Late-model Praetor with low cycles, dual FMS, and turnkey delivery package available.",
    image: "/images/stock/jet-exterior-5.jpg",
    pdfUrl: "/aircraft-specs/embraer-praetor-600-2019.pdf",
    status: "Available",
  },
];
