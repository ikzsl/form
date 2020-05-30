import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Form, Input, InputNumber, Table, AddRowButton, Checkbox,
} from 'formik-antd';
import './form.scss';

class submitForm extends React.Component {
  state = {
    errorMessage: null,
    successMessage: null,
  };

  initialValues = {
    name: '',
    password: '',
    passwordConfirmation: '',
    email: '',
    website: '',
    age: '',
    skills: [],
    acceptTerms: false,
  };

  validationSchema = Yup.object({
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
    acceptTerms: Yup.bool().oneOf([true], 'Нужно  твое согласие'),
  });

  onSubmit = (values) => {
    // console.log(values);
    // alert(JSON.stringify(values, null, 2));
    axios
      .post('http://localhost:3012/sign-up', values)
      .then((response) => {
        // console.log(`получил клиент ${response.data}`);
        this.setState({ errorMessage: null, successMessage: response.data });
      })
      .catch((err) => {
        // console.log('axios client', err.response, err.response.data);
        this.setState({ errorMessage: err.response.data, successMessage: null });
      });
  };

  render() {
    const { successMessage, errorMessage } = this.state;
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.onSubmit}
      >
        <Form className="form">
          <div>
            <label htmlFor="name">Имя</label>
            <Form.Item name="name">
              <Input id="name" name="name" placeholder="Иван" />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="pwd">Пароль </label>
            <Form.Item name="password">
              <Input.Password id="pwd" name="password" placeholder="bu@UYvj#lkfhk!))nkjshd" />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="repwd">Повторите пароль</label>
            <Form.Item name="passwordConfirmation">
              <Input.Password
                id="repwd"
                name="passwordConfirmation"
                placeholder="bu@UYvj#lkfhk!))nkjshd"
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="email">Электропочта </label>
            <span className="error">{errorMessage}</span>
            <Form.Item name="email">
              <Input id="email" name="email" placeholder="ivan@mail.ru" />
            </Form.Item>
          </div>

          <div>
            <label htmlFor="site">Ваш сайт </label>
            <Input id="site" name="website" placeholder="www.ivan.ru" />
          </div>

          <div>
            <label htmlFor="age">Возраст </label>
            <Form.Item name="age">
              <InputNumber id="age" name="age" placeholder="Возраст" />
            </Form.Item>
          </div>

          {/* <div>
            <label htmlFor="skills">Навыки </label>
            <Field id="skills" type="text" name="skills" placeholder="Навыки" />
          </div> */}

          <AddRowButton
            name="skills"
            createNewRow={(text, record) => ({
              name: record,
            })}
          >
            Add
          </AddRowButton>

          <Table
            name="skills"
            rowKey={(row) => `${row.id}`}
            size="small"
            pagination={false}
            columns={[
              {
                title: 'Name',
                key: 'name',
                render: (text, record, i) => <Input name={`skills.${i}.name`} />,
              },
            ]}
          />

          <div>
            <Form.Item name="acceptTerms">
              <Checkbox id="terms" name="acceptTerms" />
              <label htmlFor="terms"> Согласен с условиями </label>
            </Form.Item>
          </div>

          <div>
            <button type="submit">Зарегистрироваться</button>
            <span className="success">{successMessage}</span>
          </div>
        </Form>
      </Formik>
    );
  }
}
export default submitForm;
