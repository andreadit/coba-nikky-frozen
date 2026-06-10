import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(
        email,
        password
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Login gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Nikky Frozen POS
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Email</label>

            <input
              type="email"
              className="w-full border rounded-lg p-3 mt-1"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="mb-6">
            <label>Password</label>

            <input
              type="password"
              className="w-full border rounded-lg p-3 mt-1"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}