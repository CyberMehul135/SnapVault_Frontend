import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon, Palette, Sun, Moon, Laptop } from "lucide-react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAuthContext } from "@/features/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserDetails, logoutUser } from "@/features/auth/auth.service";
import { useTheme } from "@/theme/ThemeProvider";

export function AccountOptions() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
  });

  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      logout();
      navigate("/logout", { replace: true });
    },
  });

  const handleLogout = async () => {
    logoutMutation.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={data?.user?.avtar} alt="User Image" />
          <AvatarFallback>CN</AvatarFallback>
          <AvatarBadge className="bg-green-600 dark:bg-green-800" />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {/* <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem> */}
        {/* Theme submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette />
            Theme
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun />
              Light
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon />
              Dark
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Laptop />
              System
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
