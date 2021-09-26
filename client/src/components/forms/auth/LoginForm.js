import React from "react";
import { useFormik } from "formik";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <fieldset>
        <legend>LoginForm</legend>
        <label for="email">
          Email{" "}
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </label>
        <label for="password">
          Password{" "}
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
