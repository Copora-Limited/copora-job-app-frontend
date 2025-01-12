import { useState, useEffect } from "react";
import { toast } from "react-toastify";
interface UserData {
  id?: number;
  applicationNo?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  tags: [];
  updatedAt?: string;
  onboardingStatus?: string;
  profilePicture: string;
  dateOfBirth: string;
}


export const useUserProfile = (id: string | string[] | undefined, token: string | undefined) => {
  const [userData, setUserData] = useState<UserData>({
    id: undefined,
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "applicant",
    tags: [],
    profilePicture: "/assets/default_user.png",
    dateOfBirth: "Not Provided",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (id && token) {
        setLoading(true);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData({
              id: data.id,
              applicationNo: data.applicationNo,
              firstName: data.firstName,
              middleName: data.middleName,
              lastName: data.lastName,
              email: data.email,
              phoneNumber: data.phoneNumber,
              role: data.role,
              tags: data.tags,
              updatedAt: data.updatedAt,
              onboardingStatus: data.onboardingStatus,
              profilePicture: data.profilePicture || "/assets/default_user.png",
              dateOfBirth: data.dateOfBirth || "Not Provided",
            });
          } else {
            throw new Error("Failed to fetch user profile");
          }
        } catch (error) {
          setError((error as Error).message || "An error occurred");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [id, token]);

  return { userData, loading, error };
};



export const useContactDetails = (applicationNo: string | undefined, token: string | undefined) => {
  const [contactData, setContactData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      if (applicationNo && token) {
        setLoading(true);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/contact-details/${applicationNo}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setContactData(data);
          } else {
            throw new Error("Failed to fetch contact details");
          }
        } catch (error) {
          setError((error as Error).message || "An error occurred");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchContactDetails();
  }, [applicationNo, token]);

  return { contactData, loading, error };
};

export const usePersonalDetails = (applicationNo: string | undefined, token: string | undefined) => {
    const [personalData, setPersonalData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchPersonalDetails = async () => {
        if (applicationNo && token) {
          setLoading(true);
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/personal-details/${applicationNo}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            if (response.ok) {
              const data = await response.json();
              setPersonalData(data);
            } else {
              throw new Error("Failed to fetch contact details");
            }
          } catch (error) {
            setError((error as Error).message || "An error occurred");
          } finally {
            setLoading(false);
          }
        }
      };
  
      fetchPersonalDetails();
    }, [applicationNo, token]);
  
    return { personalData, loading, error };
};


export const useUpdateUserProfile = async (profileData: any, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${profileData.id}`, {
    // Adjust the URL as necessary
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }

  const result = await response.json();
  return result;
};

export const useAddUser = async (profileData: any, token: string) => {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/register`, {
    // Adjust the URL as necessary
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }

  const result = await response.json();
  return result;
};


export const useFetchTags =  (token: string) => {
  const [tags, setTags] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job-listings/tags`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }

        const data = await response.json();
        setTags(data || {});
      } catch (err: any) {
        setError(err || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [token]);

  return { tags, isLoading, error };
};


export const useResendInvite = async (data: any, token: string) => {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/resend-invitation`, {
    // Adjust the URL as necessary
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }

  const result = await response.json();
  return result;
};

export const useApproveApplicant = async (profileData: any, token: string) => {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${profileData.id}`, {
    // Adjust the URL as necessary
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }

  const result = await response.json();
  return result;
};

  
  





