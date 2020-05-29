import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './form.scss';

const initialValues = {
  name: '',
  password: '',
  passwordConfirmation: '',
  email: '',
  website: '',
  age: '',
  skills: [],
  acceptTerms: true,
};

const onSubmit = (values) => {
  // console.log(values);
  alert(JSON.stringify(values, null, 2));
};

const validationSchema = Yup.object({
  name: Yup.string().max(50, 'Слишком длинно - не более 50 символов').required('Имя обязательно'),
  password: Yup.string().required('Пароль нужен'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Надо точь-в-точь как пароль')
    .required('Обязательно'),
  email: Yup.string().email('Неправильная почта').required('Почту, пожалуйста'),
  age: Yup.number()
    .min(18, 'Юнцам тут не место')
    .max(65, 'Займись лучше внуками, дедуля')
    .required('Сколько тебе лет?'),
  skills: Yup.array(),
  acceptTerms: Yup.boolean().required('Нужно твое согласие'),
});

const oldForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  // console.log('form values', formik.values);
  // console.log('form errors', formik.errors);
  console.log('visited fields', formik.touched);

  return (
    // action="http://localhost:3012/sign-up"
    // method="POST"
    <form onSubmit={formik.handleSubmit} className="form">
      <div>
        <label htmlFor="name">
          name
          {formik.touched.name && formik.errors.name ? (
            <span className="error">{formik.errors.name}</span>
          ) : null}
          <input
            id="name"
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </label>
      </div>
      <div>
        <label htmlFor="pwd">
          Password:
          {formik.touched.password && formik.errors.password ? (
            <span className="error">{formik.errors.password}</span>
          ) : null}
          <input
            id="pwd"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </label>
      </div>
      <div>
        <label htmlFor="repwd">
          passwordConfirmation:
          {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
            <span className="error">{formik.errors.passwordConfirmation}</span>
          ) : null}
          <input
            id="repwd"
            type="password"
            name="passwordConfirmation"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirmation}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          email
          {formik.touched.email && formik.errors.email ? (
            <span className="error">{formik.errors.email}</span>
          ) : null}
          <input
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
            value={formik.values.website}
          />
        </label>
      </div>

      <div>
        <label htmlFor="age">
          age
          {formik.touched.age && formik.errors.age ? (
            <span className="error">{formik.errors.age}</span>
          ) : null}
          <input
            id="age"
            type="text"
            name="age"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
            value={formik.values.skills}
          />
        </label>
      </div>

      <div>
        <label htmlFor="terms">
          acceptTerms
          {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
            <span className="error">{formik.errors.acceptTerms}</span>
          ) : null}
          <input
            id="terms"
            type="checkbox"
            name="acceptTerms"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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

export default oldForm;
