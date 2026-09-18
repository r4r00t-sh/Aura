import { CHARTER_EMAIL as BRAND_EMAIL } from "../data/brand";

/** Shared navigation payload — prefills charter / contact flows. */
export type NavPayload = {
  tripType?: string;
  from?: string;
  to?: string;
  date?: string;
  returnDate?: string;
  time?: string;
  passengers?: string | number;
  aircraft?: string;
  aircraftSlug?: string;
  subject?: string;
  message?: string;
  name?: string;
  email?: string;
  phone?: string;
};

export type NavigateFn = (page: string, payload?: NavPayload) => void;

export const CHARTER_EMAIL = BRAND_EMAIL;
