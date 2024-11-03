import { create } from "zustand";

const useDashboardStore = create((set) => ({
  isDashboardSideBarOpen: false,
  setIsDashboardSideBarOpen: (state) =>
    set(() => ({ isDashboardSideBarOpen: state })),
}));

export default useDashboardStore;
