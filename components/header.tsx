"use client";

import { Building } from "lucide-react";

export function Header() {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="p-6 cursor-pointer" onClick={handleLogoClick}>
      <div className="flex items-center gap-2">
        <Building className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-foreground">Atrium</span>
      </div>
    </header>
  );
}
