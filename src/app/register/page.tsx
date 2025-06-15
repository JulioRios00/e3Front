"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { RegistrationFormStep1 } from "@/components/auth/registration-form-step1";
import { RegistrationFormStep2 } from "@/components/auth/registration-form-step2";
import { RegistrationSuccess } from "@/components/auth/registration-success";

type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type AdditionalInfo = {
  birthday: string;
  password: string;
  confirmPassword: string;
  userType: "CLIENT" | "LUTHER";
};

type RegistrationStep = "step1" | "step2" | "success";

export default function RegisterPage() {
  const [step, setStep] = useState<RegistrationStep>("step1");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  const handleStep1Submit = (data: PersonalInfo) => {
    setPersonalInfo(data);
    setStep("step2");
  };

  const handleStep2Back = () => {
    setStep("step1");
  };

  const handleStep2Submit = (data: AdditionalInfo) => {
    // In a real app, we would submit the combined data to an API
    console.log("Registration data:", { ...personalInfo, ...data });
    setStep("success");
  };

  return (
    <PageContainer showNav={false}>
      <div className="max-w-md mx-auto">
        {step === "step1" && <RegistrationFormStep1 onNext={handleStep1Submit} />}
        {step === "step2" && (
          <RegistrationFormStep2
            onBack={handleStep2Back}
            onSubmit={handleStep2Submit}
          />
        )}
        {step === "success" && <RegistrationSuccess />}
      </div>
    </PageContainer>
  );
}

