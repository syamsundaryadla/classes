import { create } from 'zustand'

interface PresentationState {
  currentSlide: number
  totalSlides: number
  isSidebarOpen: boolean
  isPresenterMode: boolean
  direction: number // 1 for next, -1 for previous
  setSlide: (index: number) => void
  nextSlide: () => void
  prevSlide: () => void
  setTotalSlides: (total: number) => void
  toggleSidebar: () => void
  setSidebar: (open: boolean) => void
  togglePresenterMode: () => void
}

export const usePresentationStore = create<PresentationState>((set) => ({
  currentSlide: 0,
  totalSlides: 0,
  isSidebarOpen: false,
  isPresenterMode: false,
  direction: 0,
  setSlide: (index) => set((state) => ({ 
    direction: index > state.currentSlide ? 1 : -1,
    currentSlide: index 
  })),
  nextSlide: () => set((state) => {
    if (state.currentSlide < state.totalSlides - 1) {
      return { currentSlide: state.currentSlide + 1, direction: 1 }
    }
    return state
  }),
  prevSlide: () => set((state) => {
    if (state.currentSlide > 0) {
      return { currentSlide: state.currentSlide - 1, direction: -1 }
    }
    return state
  }),
  setTotalSlides: (total) => set({ totalSlides: total }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebar: (open) => set({ isSidebarOpen: open }),
  togglePresenterMode: () => set((state) => ({ isPresenterMode: !state.isPresenterMode })),
}))
