import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import LogOut from "../modal/LogOut";

const RoleBasedProfile = ({ setShowUserProfile }) => {
  const [userData, setUserData] = useState(null);
  console.log(userData)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const getLoggedInUser = JSON.parse(sessionStorage.getItem("loggedInDetail"));
    setUserData(getLoggedInUser);
  }, []);

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          {/* User Info */}
          <div className="flex items-center gap-3 p-4 rounded-md bg-gray-50 dark:bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-800">
            <div className="w-11 h-11 rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex justify-center items-center text-lg font-semibold text-gray-700 dark:text-white">
              {userData?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">👋 Welcome,</p>
              <p className="font-medium text-sm text-gray-900 dark:text-white">{userData?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{userData?.email}</p>
            </div>
          </div>

          <DropdownMenuLabel>{userData?.role === 'recruiter'? "Recruiter Account":'My Account'}</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleNavigation("/profile")}>Profile</DropdownMenuItem>
            {userData?.role === 'recruiter' ? (
             <>
             <DropdownMenuItem onClick={() => handleNavigation("/post-job")}>Post Jobs</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/community-post")}>My post Jobs</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/settings")}>Settings</DropdownMenuItem>
             
             </>
            )
             : (
             <>
              <DropdownMenuItem onClick={() => handleNavigation("/saved-jobs")}>Saved Jobs</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/applied-jobs")}>Applied Jobs</DropdownMenuItem>
             <DropdownMenuItem onClick={() => handleNavigation("/newlyPosted-jobs")}>Explore Jobs</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/settings")}>Settings</DropdownMenuItem>
             </>
            )
             }
           
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {/* ❗ Don't render dialog here directly */}
          <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ Dialog rendered outside dropdown */}
      <LogOut
        open={showLogoutDialog}
        setOpen={setShowLogoutDialog}
        setShowUserProfile={setShowUserProfile}
      />
    </>
  );
};

export default RoleBasedProfile;





