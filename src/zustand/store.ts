import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Store {
  idempotencyKey?: string;
  orderID?: string;
  movieID?: number;
  movieTimeSlotID?: number;
  venueID?: number;
  contactEmail?: string;
  contactPhoneNumber?: string;
  selectedSeatsID?: string[];
  customersID?: string;
  setIdempotencyKey: (idempotencyKey: string) => void;
  setOrderID: (orderID: string) => void;
  setMovieID: (movieID: number) => void;
  setMovieTimeSlotID: (movieTimeSlotID: number) => void;
  setVenueID: (venueID: number) => void;
  setContactEmail: (contactEmail: string) => void;
  setContactPhoneNumber: (contactPhoneNumber: string) => void;
  setSelectedSeatsID: (selectedSeatsID: string[]) => void;
  setCustomersID: (customersID: string) => void;
  clearStore: () => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      idempotencyKey: undefined,
      orderID: undefined,
      movieID: undefined,
      movieTimeSlotID: undefined,
      venueID: undefined,
      contactEmail: undefined,
      contactPhoneNumber: undefined,
      selectedSeatsID: [],
      customersID: undefined,
      setIdempotencyKey: (idempotencyKey) => set({ idempotencyKey }),
      setOrderID: (orderID) => set({ orderID }),
      setMovieID: (movieID) => set({ movieID }),
      setMovieTimeSlotID: (movieTimeSlotID) => set({ movieTimeSlotID }),
      setVenueID: (venueID) => set({ venueID }),
      setContactEmail: (contactEmail) => set({ contactEmail }),
      setContactPhoneNumber: (contactPhoneNumber) => set({ contactPhoneNumber }),
      setSelectedSeatsID: (selectedSeatsID) => set({ selectedSeatsID }),
      setCustomersID: (customersID) => set({ customersID }),
      clearStore: () => set({}), // You may want to reset to initial state manually
    }),
    {
      name: 'booking-store', // localStorage key
      partialize: (state) => ({ ...state }), // Optional: choose what to persist
    }
  )
);
export default useStore
