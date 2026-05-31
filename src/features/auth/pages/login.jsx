import { ModeToggle } from "@/components/common/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Images } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Google from "../../../assets/icons/google.svg?react";
import { useState } from "react";

export default function Login() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const redirect = query.get("redirect") || "/";

  const [loading, setLoading] = useState(false);

  const authenticateViaOAuth = () => {
    setLoading(true);

    window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/google?redirect=${redirect}`;

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen px-5">
      <Card className="w-full max-w-sm mx-auto gap-0">
        <CardHeader>
          <Images
            size={32}
            className="bg-blue-500 mx-auto box-content p-3 rounded-3xl text-white"
          />
          <CardTitle className="text-center text-2xl font-bold">
            SnapVault
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Your memories, beautifully organized
          </CardDescription>
          <hr className="my-6" />
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-sm">
            Sign in to manage your photos and albums
          </CardDescription>
          <Button
            variant="outline"
            className={`${loading ? "opacity-60" : "opacity-100"} w-full mt-4 py-5 cursor-pointer hover:text-blue-500 rounded-2xl`}
            onClick={authenticateViaOAuth}
          >
            <Google /> {loading ? "Signing in..." : "Continue with Google"}
          </Button>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-6">
          <CardDescription className="text-center text-xs">
            By continuing, you agree to our{" "}
            <Link to="" className="text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="" className="text-blue-500">
              Privacy Policy
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
