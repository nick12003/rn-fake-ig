import { View, Text, StyleSheet } from "react-native";
import { ArrowIcon, IconButton } from "@/components/Icon";
import FormikPostUploader from "./FormikPostUploader";

const AddNewPost = ({ navigation }) => {
  return (
    <View style={styled.container}>
      <Header navigation={navigation} />
      <FormikPostUploader navigation={navigation} />
    </View>
  );
};

const Header = ({ navigation }) => (
  <View style={styled.headerContainer}>
    <IconButton style={styled.iconButton} onPress={() => navigation.goBack()}>
      <ArrowIcon style={styled.icon} />
    </IconButton>
    <Text style={styled.headerText}>NEW POST</Text>
  </View>
);

const styled = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    position: "absolute",
    left: 0,
  },
  icon: {
    color: "#fff",
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 27.5,
  },
});

export default AddNewPost;
