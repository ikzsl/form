import React from 'react';
import { useFormik } from 'formik';

import './form.scss';

const initialValues = {
  name: '',
  password: '',
  repassword: '',
  email: '',
  website: '',
  age: 0,
  skills: [],
  acceptTerms: true,
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.repassword) {
    errors.repassword = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.age) {
    errors.age = 'Required';
  }
  if (!values.acceptTerms) {
    errors.acceptTerms = 'Required';
  }
  return errors;
};

const onSubmit = (values) => {
  // console.log(values);
  alert(JSON.stringify(values, null, 2));
};

const Form = () => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  console.log('form values', formik.values);
  console.log('form errors', formik.errors);

  return (
    // action="http://localhost:3012/sign-up"
    // method="POST"
    <form onSubmit={formik.handleSubmit} className="form">
      <div>
        <label htmlFor="name">
          name
          {' '}
          {formik.errors.name ? <span className="error">{formik.errors.name}</span> : null}
          <input
            id="name"
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </label>
      </div>
      <div>
        <label htmlFor="pwd">
          Password:
          {formik.errors.password ? <span className="error">{formik.errors.password}</span> : null}
          <input
            id="pwd"
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </label>
      </div>
      <div>
        <label htmlFor="repwd">
          rePassword:
          {formik.errors.repassword ? (
            <span className="error">{formik.errors.repassword}</span>
          ) : null}
          <input
            id="repwd"
            type="password"
            name="repassword"
            onChange={formik.handleChange}
            value={formik.values.repassword}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          email
          {formik.errors.email ? <span className="error">{formik.errors.email}</span> : null}
          <input
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </label>
      </div>

      <div>
        <label htmlFor="site">
          website
          <input
            id="site"
            type="text"
            name="website"
            onChange={formik.handleChange}
            value={formik.values.website}
          />
        </label>
      </div>

      <div>
        <label htmlFor="age">
          age
          {formik.errors.age ? <span className="error">{formik.errors.age}</span> : null}
          <input
            id="age"
            type="text"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
          />
        </label>
      </div>

      <div>
        <label htmlFor="skills">
          skills
          <input
            id="skills"
            type="text"
            name="skills"
            onChange={formik.handleChange}
            value={formik.values.skills}
          />
        </label>
      </div>

      <div>
        <label htmlFor="terms">
          acceptTerms
          {formik.errors.acceptTerms ? (
            <span className="error">{formik.errors.acceptTerms}</span>
          ) : null}
          <input
            id="terms"
            type="checkbox"
            name="acceptTerms"
            onChange={formik.handleChange}
            value={formik.values.acceptTerms}
          />
        </label>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
