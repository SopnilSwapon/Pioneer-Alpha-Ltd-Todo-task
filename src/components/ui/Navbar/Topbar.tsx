"use client";
import React from "react";

export default function Topbar() {
  return (
    <nav className="bg-white">
      <div className="px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Left - Mobile Menu Icon */}
        <button
          //   onClick={onMenuClick}
          className="text-gray-600 cursor-pointer hover:text-gray-800 md:hidden"
        >
          {/* <HiMenuAlt2 className="h-6 w-6" /> */}Menu Icon
        </button>

        {/* Right - Notifications & Static User */}
        <div className="flex items-center gap-4">
          {/* Static Notification Icon */}
          <button className="relative cursor-pointer border rounded-full h-10 w-10 flex items-center justify-center">
            {/* <Bell className="h-5 w-5 text-gray-600" /> */}Notification
            {/* <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
            >
              3
            </Badge> */}
          </button>

          {/* Static User Avatar + Info */}
          <div className="flex items-center gap-2 cursor-pointer select-none">
            {/* <Avatar className="h-10 w-10">
              <AvatarImage
                src="/images/static-user.png"
                alt="User Avatar"
                className="rounded-full"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar> */}

            <div className="hidden md:flex flex-col items-start select-none">
              <span className="text-sm font-medium text-gray-900">
                John Doe
              </span>
              <span className="text-xs text-gray-500 capitalize">admin</span>
            </div>

            {/* <ChevronDown className="h-4 w-4 text-gray-500" /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
