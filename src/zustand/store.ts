import { create } from 'zustand'

export interface Store {
    idempotencyKey?: string;
    orderID?: string;
    movieID?: number;
    movieTimeSlotID?: number;
    venueID?: number;
    contactEmail?: string;
    contactPhoneNumber?: string;
    selectedSeatsID?: string[];
    setIdempotencyKey: (idempotencyKey: string) => void;
    setOrderID: (orderID: string) => void;
    setMovieID: (movieID: number) => void;
    setMovieTimeSlotID: (movieTimeSlotID: number) => void;
    setVenueID: (venueID: number) => void;
    setContactEmail: (contactEmail: string) => void;
    setContactPhoneNumber: (contactPhoneNumber: string) => void;
    setSelectedSeatsID: (selectedSeatsID: string[]) => void;
}

const useStore = create<Store>((set) => ({
    idempotencyKey: undefined,
    orderID: undefined,
    movieID: undefined,
    movieTimeSlotID: undefined,
    venueID: undefined,
    contactEmail: undefined,
    contactPhoneNumber: undefined,
    selectedSeatsID: [],
    setIdempotencyKey: (idempotencyKey: string) => set({ idempotencyKey }),
    setOrderID: (orderID: string) => set({ orderID }),
    setMovieID: (movieID: number) => set({ movieID }),
    setMovieTimeSlotID: (movieTimeSlotID: number) => set({ movieTimeSlotID }),
    setVenueID: (venueID: number) => set({ venueID }),
    setContactEmail: (contactEmail: string) => set({ contactEmail }),
    setContactPhoneNumber: (contactPhoneNumber: string) => set({ contactPhoneNumber }),
    setSelectedSeatsID: (selectedSeatsID: string[]) => set({ selectedSeatsID }),
}))

export default useStore
