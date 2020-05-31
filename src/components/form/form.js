import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Form,
  Input,
  InputNumber,
  Table,
  AddRowButton,
  Checkbox,
  SubmitButton,
  ResetButton,
} from 'formik-antd';
import './form.scss';

class submitForm extends React.Component {
  state = {
    loading: false,
    errorMessage: null,
    successMessage: null,
  };

  initialValues = {
    name: '',
    password: '',
    passwordConfirmation: '',
    email: '',
    website: '',
    // age: '',
    skills: [''],
    acceptTerms: false,
  };

  validationSchema = Yup.object({
    name: Yup.string().max(50, 'Слишком длинно - не более 50 символов').required('Имя обязательно'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        'от 8 до 40 символов, как минимум одна цифра и одна заглавная буква',
      )
      .required('Пароль нужен'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Надо точь-в-точь как пароль')
      .required('Обязательно'),
    email: Yup.string().email('Неправильная почта').required('Почту, пожалуйста'),
    website: Yup.string().url('Неверный адрес сайта'),
    age: Yup.number()
      .min(18, 'Юнцам тут не место')
      .max(65, 'Займись лучше внуками, дедуля')
      .required('Сколько тебе лет?'),
    skills: Yup.array(),
    acceptTerms: Yup.bool().oneOf([true], 'Нужно  твое согласие'),
  });

  onSubmit = (values, { resetForm }) => {
    const filteredSkills = values.skills.filter(Boolean);
    this.setState({ loading: true });
    axios
      .post('http://localhost:3012/sign-up', { ...values, skills: filteredSkills })
      .then((response) => {
        this.setState({ errorMessage: null, successMessage: response.data, loading: false });
        resetForm({});
      })
      .catch((err) => {
        this.setState({ errorMessage: err.response.data, successMessage: null, loading: false });
      });

    Form.reset();
  };

  render() {
    const { successMessage, errorMessage, loading } = this.state;
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
              <Input id="name" name="name" placeholder="Иван" size="large" />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="pwd">Пароль </label>
            <Form.Item name="password">
              <Input.Password
                id="pwd"
                name="password"
                placeholder="bu@UYvj#lkfhk!))nkjshd"
                size="large"
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="repwd">Повторите пароль</label>
            <Form.Item name="passwordConfirmation">
              <Input.Password
                id="repwd"
                name="passwordConfirmation"
                placeholder="bu@UYvj#lkfhk!))nkjshd"
                size="large"
              />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="email">Электропочта </label>
            <span className="error">{errorMessage}</span>
            <Form.Item name="email">
              <Input id="email" name="email" placeholder="ivan@mail.ru" size="large" />
            </Form.Item>
          </div>

          <div>
            <label htmlFor="site">Ваш сайт </label>
            <Form.Item name="website">
              <Input id="site" name="website" placeholder="http://www.ivan.ru" size="large" />
            </Form.Item>
          </div>

          <div>
            <label htmlFor="age">Возраст </label>
            <Form.Item name="age">
              <InputNumber id="age" name="age" placeholder="Возраст" size="large" />
            </Form.Item>
          </div>

          <div>
            <Table
              name="skills"
              rowKey={(row) => `${row.id}`}
              size="small"
              pagination={false}
              columns={[
                {
                  title: 'Cуперспособности',
                  key: 'name',
                  render: (text, record, i) => (
                    <Input name={`skills[${i}]`} placeholder="Телепатия" size="large" />
                  ),
                },
              ]}
            />
            <AddRowButton
              name="skills"
              createNewRow={(text) => text || ''}
              size="large"
              type="primary"
              className="skillsButton"
            >
              Добавить суперспособность
            </AddRowButton>
          </div>

          <div>
            <Form.Item name="acceptTerms">
              <Checkbox id="terms" name="acceptTerms" />
              <label htmlFor="terms"> Согласен с условиями </label>
            </Form.Item>
          </div>

          <div>
            <div className="success">{successMessage}</div>
            <SubmitButton loading={loading} size="large" className="button">
              Зарегистрироваться
            </SubmitButton>
            <ResetButton size="large" className="button">
              Очистить форму
            </ResetButton>
          </div>
        </Form>
      </Formik>
    );
  }
}
export default submitForm;
