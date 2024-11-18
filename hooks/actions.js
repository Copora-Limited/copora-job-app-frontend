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
