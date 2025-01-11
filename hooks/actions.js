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

export async function filterEmails(filters) {
  // Simulating an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (filters.length > 0) {
        resolve(["email1@example.com", "email2@example.com"]);
      } else {
        reject(new Error("No filters selected"));
      }
    }, 1000);
  });
}
