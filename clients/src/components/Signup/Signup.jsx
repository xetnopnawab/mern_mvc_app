import { useState } from "react";
import { connect } from "react-redux";
import propTypes from "react-types";
import { registerUser } from "./store/Actions/registerAction";

const Signup = (props) => {
    console.log(props);
  const initialFormData = { username: "", email: "", password: "" };
  const initialFormError = { username: "", email: "", password: "" };
  const [formData, setformData] = useState(initialFormData);
  const [error, setError] = useState(initialFormError);

  const onFormChange = (e) => {
    e.persist();
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const inputValidation = () => {
    if (!formData.email)
      setError((prevState) => ({
        ...prevState,
        email: "email field must be not empty",
      }));

    if (!formData.username)
      setError((prevState) => ({
        ...prevState,
        username: "username field must be not empty",
      }));

    if (!formData.password)
      setError((prevState) => ({
        ...prevState,
        password: "password field must be not empty",
      }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    inputValidation();
    if (formData.username && formData.password && formData.email) {
      props.registerUser(formData);  
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="email"
          onChange={onFormChange}
          name="email"
          required
          label="example@john.com"
          autoFocus
        />
        <Typography variant="inherit" component="small" color="secondry">
          {error.email && !formData.email ? error.email : ""}
        </Typography>
        <input
          type="text"
          name="username"
          onChange={onFormChange}
          required
          label="Username"
        />
        <Typography variant="inherit" component="small" color="secondry">
          {error.username && !formData.username ? error.username : ""}
        </Typography>
        <input required name="password" label="Password" type="password" />
        <Typography variant="inherit" component="small" color="secondry">
          {error.password && !formData.password ? error.password : ""}
        </Typography>

        <Button type="submit" value="submit"> Sign Up </Button>
      </form>
    </div>
  );
};

Signup.prototype = {
  register: propTypes.object,
  registerUser: propTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  register: state.register,
});
const mapDispatchToProps = {
  registerUser: registerUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
