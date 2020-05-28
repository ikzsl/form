import React from 'react';
import { useFormik } from 'formik';

import './form.scss';

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <form action="http://localhost:3012/sign-up" method="POST" className="form">
      <div>
        <label htmlFor="name">
          name
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
        <label htmlFor="email">
          email
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
        <label htmlFor="pwd">
          Password:
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
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
