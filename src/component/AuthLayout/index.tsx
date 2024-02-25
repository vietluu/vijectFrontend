import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="auth w-full h-full flex items-center justify-center min-h-[100vh]">{children}</div>;
}

export default AuthLayout;
