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

import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebase";

import FormItem from "../FormItem";

const getRandomProfilePicture = async () => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  return data.results[0].picture.large;
};

const signupFormSchema = Yup.object().shape({
  email: Yup.string().email().required("An email is required"),
  username: Yup.string()
    .required("A username is required")
    .min(2, "username has to at least 2 characters"),
  password: Yup.string()
    .required("A password is required")
    .min(6, "Password has to at least 6 characters"),
});

const SignupForm = ({ navigation }) => {
  // useEffect(() => {
  //   return () => {
  //     console.log("unmount SignupForm");
  //   };
  // }, []);
  const onSingUp = async (email, password, username) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(collection(db, "users"), newUser.user.email), {
        owner_uid: newUser.user.uid,
        username,
        email: newUser.user.email,
        profile_picture: await getRandomProfilePicture(),
      });
      console.log(" firebase signup successful", email, password);
    } catch (error) {
      console.error(error.message);
      Alert.alert(error.code);
    }
  };

  return (
    <View style={styled.wrapper}>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          onSingUp(values.email, values.password, values.username);
        }}
        validationSchema={signupFormSchema}
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
                placeholder="Email"
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
              isError={errors.username && touched.username}
              errorMsg={errors.username}
              style={{
                marginVertical: 2,
              }}
            >
              <TextInput
                placeholder="Username"
                placeholderTextColor="gray"
                autoCapitalize="none"
                textContentType="username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
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
            <Pressable
              style={styled.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styled.buttonText}>Sign Up</Text>
            </Pressable>
          </>
        )}
      </Formik>
      <View style={styled.loginContainer}>
        <Text style={{ color: "#fff" }}>Already have account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push("LoginScreen");
            // navigation.goBack();
          }}
        >
          <Text style={{ color: "#6bb0f5" }}>Log In</Text>
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
    marginTop: 47,
  }),
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  loginContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default SignupForm;
