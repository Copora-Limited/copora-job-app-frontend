import { create } from "zustand";

const useOnboardingStore = create((set) => ({
  applicationNo: "",
  setApplicationNo: (currState) => set(() => ({ applicationNo: currState })),
  profilePic: "",
  setProfilePic: (currState) => set(() => ({ profilePic: currState })),
}));

export default useOnboardingStore;
