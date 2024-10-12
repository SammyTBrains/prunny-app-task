import { Text, View } from "react-native";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View className="w-20 h-2 bg-[#c278ff12] rounded-full overflow-hidden">
      <View className="h-full bg-primary" style={{ width: `${progress}%` }} />
    </View>
  );
}
