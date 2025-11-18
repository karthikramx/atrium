"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Building, Shield, Users } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type UserRole = "admin" | "employee" | "contractor";

interface RoleTheme {
  primary: string;
  primaryHover: string;
  iconBg: string;
  iconColor: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const roleThemes: Record<UserRole, RoleTheme> = {
  admin: {
    primary: "bg-red-600 hover:bg-red-700",
    primaryHover: "hover:bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    icon: Shield,
    title: "Admin Login",
    description: "Access administrative controls and system management",
  },
  employee: {
    primary: "bg-blue-600 hover:bg-blue-700",
    primaryHover: "hover:bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: Users,
    title: "Employee Login",
    description: "Access your employee dashboard and company resources",
  },
  contractor: {
    primary: "bg-green-600 hover:bg-green-700",
    primaryHover: "hover:bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    icon: Building,
    title: "Contractor Login",
    description: "Access contractor portal and project information",
  },
};

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get role from URL parameters
  const roleParam = searchParams?.get("role") as UserRole;
  const role = roleParam && roleThemes[roleParam] ? roleParam : "employee";

  const currentTheme = roleThemes[role];
  const IconComponent = currentTheme.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, role });
  };

  return (
    <div className="flex min-h-svh w-full justify-center pt-40">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col")}>
          <Card>
            <CardHeader className="text-center">
              <div
                className={cn(
                  "mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center",
                  currentTheme.iconBg
                )}
              >
                <IconComponent
                  className={cn("h-6 w-6", currentTheme.iconColor)}
                />
              </div>
              <CardTitle className="text-xl">{currentTheme.title}</CardTitle>
              <CardDescription>{currentTheme.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="/forgotpassword"
                        className={cn(
                          "ml-auto inline-block text-sm underline-offset-4 hover:underline",
                          currentTheme.iconColor
                        )}
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <Button
                      type="submit"
                      className={cn("w-full text-white", currentTheme.primary)}
                    >
                      Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <a
                        href="/signup"
                        className={cn(
                          "underline-offset-4 hover:underline",
                          currentTheme.iconColor
                        )}
                      >
                        Sign up
                      </a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
