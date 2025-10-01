import { useState, Fragment } from "react";
import FormInput from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const initialFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(initialFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetForm = () => setFormFields(initialFormFields);

  // tracks change within inputs
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // authenticates user
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert("passwords do not match");
        resetForm();
        return;
      }

      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });

      resetForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user. Email already in use");
      } else {
        console.log("Error creating user", error.message);
      }
    }
  };

  return (
    <Fragment>
      <div className="sign-up-container">
        <h2>Sign Up with Email and Password</h2>
        <form
          onSubmit={submitHandler}
          style={{
            display: "flex",
            flexFlow: "column",
            width: "50vw",
          }}
        >
          <FormInput
            label="Display Name"
            type="text"
            name="displayName"
            value={displayName}
            onChange={changeHandler}
            required
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
            required
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={changeHandler}
            required
          />

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={changeHandler}
            required
          />

          <div className="button-container">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUpForm;
