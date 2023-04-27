import { View, StyleSheet, Text } from "react-native";

const FormItem = ({ children, isError, errorMsg, isInput = true, style }) => {
  return (
    <View style={[styled.container, style]}>
      {isInput ? (
        <View style={styled.field(isError)}>{children}</View>
      ) : (
        children
      )}
      <View>
        <Text style={{ color: "red", opacity: isError ? 1 : 0 }}>
          {errorMsg ?? " "}
        </Text>
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  container: {
    paddingVertical: 2,
  },
  field: (isError) => ({
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#c5c5c5",
    borderWidth: 3,
    borderColor: isError ? "red" : "gray",
  }),
});

export default FormItem;
