import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Alert from "../ui/alert/Alert";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alerts, setAlerts] = useState<Array<{
    id: number;
    variant: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  }>>([]);

  const navigate = useNavigate();

  const addAlert = (
    variant: "success" | "error" | "warning" | "info",
    title: string,
    message: string
  ) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, variant, title, message }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 2000);
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { username, password };

    try {
      setLoading(true);
      clearAlerts();

      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          for (const key in data.errors) {
            addAlert("error", "Xatolik", data.errors[key]);
          }
        } else {
          addAlert("error", "Xatolik", data.message || "Xatolik yuz berdi");
        }
        return;
      }

      addAlert("success", "Muvaffaqiyatli", data.message || "Ro'yxatdan o'tdingiz");
      localStorage.setItem("token", data.token);

      // ✅ LocalStorage ga +1 qilish
      const prevCount = localStorage.getItem("admin_register_count");
      const newCount = prevCount ? parseInt(prevCount, 10) + 1 : 1;
      localStorage.setItem("admin_register_count", newCount.toString());

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Tarmoq xatosi yuz berdi";
      addAlert("error", "Tarmoq xatosi", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center py-12 ">
      {alerts.length > 0 && (
        <div className="absolute top-0 mx-auto z-50 flex w-full max-w-sm flex-col gap-4 p-4">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              variant={alert.variant}
              title={alert.title}
              message={alert.message}
            />
          ))}
        </div>
      )}
      <div className="w-full max-w-md relative">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800 dark:text-white">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your-username"
              required
            />
          </div>

          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="size-5 fill-gray-500" />
                ) : (
                  <EyeCloseIcon className="size-5 fill-gray-500" />
                )}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Yuborilmoqda..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
