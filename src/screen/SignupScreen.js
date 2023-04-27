import { SafeAreaView, StyleSheet, View } from "react-native";
import { LogoIcon } from "@/components/Icon";
import SignupForm from "@/components/signup/SignupForm";

export default function SignupScreen({ navigation }) {
  return (
    <SafeAreaView style={styled.container}>
      <View style={styled.logoContainer}>
        <LogoIcon height={100} width={100} />
      </View>
      <SignupForm navigation={navigation} />
    </SafeAreaView>
  );
}

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  logoContainer: {
    flex: 1 / 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
