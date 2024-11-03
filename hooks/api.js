export const getAllUsers = async () => {
  try {
    const url = `auth/users`;
    const { data, status } =
      (await adminAxiosInstance.get) < UsersDataResponse > url;
    if (status === 200) {
      return { data, status };
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
