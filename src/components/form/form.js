import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Form, Input, InputNumber, SubmitButton,
} from 'formik-antd';
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
  // alert(JSON.stringify(values, null, 2));
  axios.post('http://localhost:3012/sign-up', values);
  // .then((response) => console.log(`получил клиент ${response.data}`))
  // .catch((err) => {
  // console.log('axios client', err);
  // });
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
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    <Form className="form">
      <div>
        <label htmlFor="name">name</label>
        <Form.Item name="name">
          <Input id="name" type="text" name="name" />
        </Form.Item>
      </div>
      <div>
        <label htmlFor="pwd">password: </label>
        <ErrorMessage name="password">{(msg) => <span className="error">{msg}</span>}</ErrorMessage>
        <Input.Password id="pwd" type="password" name="password" />
      </div>
      <div>
        <label htmlFor="repwd">passwordConfirmation:</label>
        <ErrorMessage name="passwordConfirmation">
          {(msg) => <span className="error">{msg}</span>}
        </ErrorMessage>
        <Input.Password id="repwd" type="password" name="passwordConfirmation" />
      </div>
      <div>
        <label htmlFor="email">email </label>
        <ErrorMessage name="email">{(msg) => <span className="error">{msg}</span>}</ErrorMessage>
        <Input id="email" type="email" name="email" />
      </div>

      <div>
        <label htmlFor="site">website </label>
        <Input id="site" type="text" name="website" />
      </div>

      <div>
        <label htmlFor="age">age </label>
        <ErrorMessage name="age">{(msg) => <span className="error">{msg}</span>}</ErrorMessage>
        <InputNumber id="age" name="age" min={18} />
      </div>

      <div>
        <label htmlFor="skills">skills </label>
        <Input id="skills" type="text" name="skills" />
      </div>

      <div>
        <label htmlFor="terms">acceptTerms </label>
        <ErrorMessage name="acceptTerms">
          {(msg) => <span className="error">{msg}</span>}
        </ErrorMessage>
        <Field id="terms" type="checkbox" name="acceptTerms" />
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
      <SubmitButton disabled={false} />
    </Form>
  </Formik>
);
export default submitForm;
