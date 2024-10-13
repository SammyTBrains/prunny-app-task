import { useState } from "react";
import OTPVerificationForm from "@/components/myApp/RegisterScreen/OTPVerificationForm";
import PhoneNumberForm from "@/components/myApp/RegisterScreen/PhoneNumberForm";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ProgressBar from "@/components/myApp/UI/ProgressBar";
import UserDetailsForm from "@/components/myApp/RegisterScreen/UserDetailsForm";
import AddressForm from "@/components/myApp/RegisterScreen/AddressForm";

// Enum to represent different steps in the registration process
enum RegistrationStep {
  PhoneNumber,
  OTPVerification,
  UserDetails,
  AddressDetails,
  // Add more steps here as needed
}

const TOTAL_STEPS = 4;

export default function Register() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(
    RegistrationStep.PhoneNumber
  );

  const handleContinue = () => {
    // Move to the next step when continue is pressed
    switch (currentStep) {
      case RegistrationStep.PhoneNumber:
        setCurrentStep(RegistrationStep.OTPVerification);
        break;
      case RegistrationStep.OTPVerification:
        setCurrentStep(RegistrationStep.UserDetails);
        break;
      case RegistrationStep.UserDetails:
        setCurrentStep(RegistrationStep.AddressDetails);
        break;
      case RegistrationStep.AddressDetails:
        console.log("done");
        break;
      // Add more cases for additional steps
    }
  };

  const handleBack = () => {
    // Move to the previous step when back is pressed
    switch (currentStep) {
      case RegistrationStep.OTPVerification:
        setCurrentStep(RegistrationStep.PhoneNumber);
        break;
      case RegistrationStep.UserDetails:
        setCurrentStep(RegistrationStep.OTPVerification);
        break;
      case RegistrationStep.AddressDetails:
        setCurrentStep(RegistrationStep.UserDetails);
        break;
      // Add more cases for additional steps
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case RegistrationStep.PhoneNumber:
        return <PhoneNumberForm onContinue={handleContinue} />;
      case RegistrationStep.OTPVerification:
        return (
          <OTPVerificationForm
            onContinue={handleContinue}
            onBack={handleBack}
          />
        );
      case RegistrationStep.UserDetails:
        return (
          <UserDetailsForm onContinue={handleContinue} onBack={handleBack} />
        );
      case RegistrationStep.AddressDetails:
        return <AddressForm onContinue={handleContinue} onBack={handleBack} />;
      // Add more cases for additional steps
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View className="absolute right-12 top-[42px]">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-[90%] items-center">{renderCurrentStep()}</View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
