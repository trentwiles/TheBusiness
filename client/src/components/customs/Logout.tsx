export default function Logout() {
  localStorage.removeItem("token");
  return <p>Please wait...</p>;
}