import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import AddNewPost from "@/components/newPost/AddNewPost";

export default function NewPostScreen({ navigation }) {
  return (
    <SafeAreaView style={styled.container}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
}

const styled = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
