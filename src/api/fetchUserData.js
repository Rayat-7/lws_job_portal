export default fetchUserData = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await fetch("http://localhost:5000/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};
