"use client";

import { PageContainer } from "@/components/layout/page-container";
import { RegistrationForm } from "@/components/auth/registration-form-complete";

export default function RegisterPage() {
  return (
    <PageContainer>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-8">
          <RegistrationForm />
        </div>
      </div>
    </PageContainer>
  );
}
