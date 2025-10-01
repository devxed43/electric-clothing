import { useState, Fragment /*useContext*/ } from "react";
import FormInput from "../form-input/form-input.component";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase.utils";

// import { UserContext } from "../../contexts/user.context";

const initialFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(initialFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => setFormFields(initialFormFields);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    // const { user } = await signInWithGooglePopup();
    // await createUserDocumentFromAuth(user);

    await signInWithGooglePopup();
  };

  // authenticates user
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      // sets the user that gets destructured above
      // setCurrentUser(user);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with email");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <Fragment>
      <div className="sign-in-container">
        <h2>Already have an account?</h2>
        <h3>Sign In with Email and Password</h3>
        <form onSubmit={submitHandler}>
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

          <div className="button-container">
            <button type="submit">Sign In</button>
            <button type="button" onClick={signInWithGoogle}>
              Sign In With Google
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignInForm;
