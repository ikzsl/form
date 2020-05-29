import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
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
  console.log(values);
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
  // acceptTerms: Yup.boolean().required('Нужно  твое согласие'),
});

const submitForm = () => (
  // console.log('form values', formik.values);
  // console.log('form errors', formik.errors);
  // console.log('visited fields', formik.touched);

  // action="http://localhost:3012/sign-up"
  // method="POST"
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    <Form className="form">
      <div>
        <label htmlFor="name">
          name
          <ErrorMessage
            name="name"
            className="error"
            render={(msg) => <span className="error">{msg}</span>}
          />
          <Field id="name" type="text" name="name" />
        </label>
      </div>
      <div>
        <label htmlFor="pwd">
          Password:
          <ErrorMessage name="password" render={(msg) => <span className="error">{msg}</span>} />
          <Field id="pwd" type="password" name="password" />
        </label>
      </div>
      <div>
        <label htmlFor="repwd">
          passwordConfirmation:
          <ErrorMessage
            name="passwordConfirmation"
            render={(msg) => <span className="error">{msg}</span>}
          />
          <Field id="repwd" type="password" name="passwordConfirmation" />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          email
          <ErrorMessage name="email" render={(msg) => <span className="error">{msg}</span>} />
          <Field id="email" type="email" name="email" />
        </label>
      </div>

      <div>
        <label htmlFor="site">
          website
          <Field id="site" type="text" name="website" />
        </label>
      </div>

      <div>
        <label htmlFor="age">
          age
          <ErrorMessage name="age" render={(msg) => <span className="error">{msg}</span>} />
          <Field id="age" type="text" name="age" />
        </label>
      </div>

      <div>
        <label htmlFor="skills">
          skills
          <Field id="skills" type="text" name="skills" />
        </label>
      </div>

      <div>
        <label htmlFor="terms">
          acceptTerms
          <ErrorMessage name="acceptTerms" render={(msg) => <span className="error">{msg}</span>} />
          <Field id="terms" type="checkbox" name="acceptTerms" />
        </label>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  </Formik>
);
export default submitForm;
