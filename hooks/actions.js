const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Use environment variable

export const fetchApplicantGeneralInfo = async (token, applicationNo) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/general-info/${applicationNo}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to fetch general information."
      );
    }

    const data = await response.json();
    console.log("Fetched General Info Data:", data); // Debugging line

    // Ensure data is returned as-is (not forced into an array)
    return data;
  } catch (error) {
    console.error("Error fetching general information:", error.message);
    throw new Error(error.message || "Error fetching general information.");
  }
};

export const fetchApplicantRecord = async (token, applicationNo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/applicant/${applicationNo}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch record.");
    }

    const data = await response.json();
    // console.log("Fetched Data:", data); // Debugging line

    // Ensure data is returned as-is (not forced into an array)
    return data;
  } catch (error) {
    console.error("Error fetching record:", error.message);
    throw new Error(error.message || "Error fetching record.");
  }
};

export const fetchUsersByTags = async (token, tags) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users/search-by-tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch users by tags.");
    }

    const data = await response.json();
    // console.log("Fetched Data:", data); // Debugging line

    // Ensure data is returned as-is (not forced into an array)
    return data;
  } catch (error) {
    console.error("Error fetching users by tags:", error.message);
    throw new Error(error.message || "Error fetching users by tags.");
  }
};

export const sendBulkEmail = async (token, emailData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bulk-email/send-bulk-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send bulk email.");
    }

    const data = await response.json();
    console.log("Bulk Email Response:", data); // Debugging line

    return data;
  } catch (error) {
    console.error("Error sending bulk email:", error.message);
    throw new Error(error.message || "Error sending bulk email.");
  }
};
