// import { useEffect } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

import FormItem from "../FormItem";

const loginFormSchema = Yup.object().shape({
  email: Yup.string().email().required("An email is required"),
  password: Yup.string()
    .required("A password is required")
    .min(6, "Password has to at least 6 characters"),
});

const LoginForm = ({ navigation }) => {
  // useEffect(() => {
  //   return () => {
  //     console.log("unmount LoginForm");
  //   };
  // }, []);

  const onLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(" firebase login successful", email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          Alert.alert("Email not found", "The user does not have a count", [
            {
              text: "OK",
              onPress: () => console.log("Ok"),
              style: "cancel",
            },
            {
              text: "Sign Up",
              onPress: () => navigation.push("SignupScreen"),
            },
          ]);
          break;
        case "auth/wrong-password":
          Alert.alert("Wrong Password");
          break;
        default:
          console.error(error);
          Alert.alert(error.code);
          break;
      }
    }
  };

  return (
    <View style={styled.wrapper}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <FormItem
              isError={errors.email && touched.email}
              errorMsg={errors.email}
              style={{
                marginVertical: 2,
              }}
            >
              <TextInput
                placeholder="Phone number, username or email"
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </FormItem>
            <FormItem
              isError={errors.password && touched.password}
              errorMsg={errors.password}
              style={{
                marginVertical: 2,
              }}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                textContentType="emailAddress"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </FormItem>
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#6bb0f5" }}>Forgot password</Text>
            </View>
            <Pressable
              style={styled.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styled.buttonText}>Log In</Text>
            </Pressable>
          </>
        )}
      </Formik>
      <View style={styled.signupContainer}>
        <Text style={{ color: "#fff" }}>Don't have account? </Text>
        <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
          <Text style={{ color: "#6bb0f5" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styled = StyleSheet.create({
  wrapper: {
    flex: 3 / 4,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096f6" : "#9acaf7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default LoginForm;
