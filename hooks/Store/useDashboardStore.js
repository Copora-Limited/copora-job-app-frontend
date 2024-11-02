// import { create } from "zustand";
// import { UserDataProps } from "../../types";

// type Store = {
//   userData: UserDataProps;
//   setUserData: (userData: UserDataProps) => void;
// };

// const useDashboardStore = create<Store>()((set) => ({
//   userData: {} as UserDataProps,
//   setUserData: (currState) => set(() => ({ userData: currState })),
// }));

// export default useDashboardStore;

import { create } from "zustand";

const useDashboardStore = create((set) => ({
  isDashboardSideBarOpen: false,
  setIsDashboardSideBarOpen: (state) =>
    set(() => ({ isDashboardSideBarOpen: state })),
}));

export default useDashboardStore;
