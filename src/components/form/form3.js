// on hooks
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
import {
  MailOutlined, UserOutlined, LinkOutlined, ThunderboltOutlined,
} from '@ant-design/icons';

import getData from '../../data/data';
import './form.scss';

const SubmitForm = () => {
  const [loading, setLoading] = useState(false);
  const [userCreatingErrorMessage, setUserCreatingErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [netErrorMessage, setNetErrorMessage] = useState(false);

  const initialValues = {
    name: '',
    password: '',
    passwordConfirmation: '',
    email: '',
    website: '',
    age: null,
    skills: [''],
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
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
      .typeError('Должно быть число')
      .min(18, 'Юнцам тут не место')
      .max(65, 'Займись лучше внуками, дедуля')
      .required('Сколько тебе лет?'),
    skills: Yup.array(),
    acceptTerms: Yup.bool()
      .oneOf([true], 'Нужно согласие')
      .required('Обязательно')
      .nullable('null'),
  });

  const onSubmit = async (values, { resetForm }) => {
    const filteredSkills = values.skills.filter(Boolean);

    setLoading(true);

    const body = {
      ...values,
      skills: filteredSkills,
    };

    try {
      const res = await getData(body);
      const { data } = res;

      setUserCreatingErrorMessage(null);
      setSuccessMessage(data);
      setNetErrorMessage(null);
      setLoading(false);

      resetForm({
        errorMessage: null,
      });
    } catch (err) {
      if (err.isAxiosError) {
        setNetErrorMessage('Сервер не отвечает');
        setLoading(false);
      }

      setUserCreatingErrorMessage(err.response.data);
      setSuccessMessage(null);
      setNetErrorMessage(null);
      setLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form
        className="form"
        onChange={() => {
          setSuccessMessage(null);
        }}
      >
        <div>
          <label htmlFor="name">
            Имя
            <span className="required-star"> *</span>
          </label>
          <Form.Item name="name">
            <Input
              id="name"
              name="name"
              placeholder="Иван"
              size="large"
              suffix={<UserOutlined />}
            />
          </Form.Item>
        </div>
        <div>
          <label htmlFor="pwd">
            Пароль
            <span className="required-star"> *</span>
          </label>
          <Form.Item name="password">
            <Input.Password
              id="pwd"
              name="password"
              placeholder="bu7UYvjl2nkj9WNshd"
              size="large"
            />
          </Form.Item>
        </div>
        <div>
          <label htmlFor="repwd">
            Повторите пароль
            <span className="required-star"> *</span>
          </label>
          <Form.Item name="passwordConfirmation">
            <Input.Password
              id="repwd"
              name="passwordConfirmation"
              placeholder="bu7UYvjl2nkj9WNshd"
              size="large"
            />
          </Form.Item>
        </div>
        <div>
          <label htmlFor="email">
            Электропочта
            <span className="required-star"> *</span>
          </label>
          <span className="error">{userCreatingErrorMessage}</span>
          <Form.Item name="email">
            <Input
              id="email"
              name="email"
              placeholder="ivan@mail.ru"
              size="large"
              onChange={() => {
                setUserCreatingErrorMessage(null);
              }}
              suffix={<MailOutlined />}
            />
          </Form.Item>
        </div>
        <div>
          <label htmlFor="site">Ваш сайт </label>
          <Form.Item name="website">
            <Input
              id="site"
              name="website"
              placeholder="http://www.ivan.ru"
              size="large"
              suffix={<LinkOutlined />}
            />
          </Form.Item>
        </div>
        <div>
          <label htmlFor="age">
            Возраст
            <span className="required-star"> *</span>
          </label>
          <Form.Item name="age">
            <InputNumber id="age" name="age" placeholder="27" size="large" />
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
                  <Input
                    name={`skills[${i}]`}
                    placeholder="Телепатия"
                    size="large"
                    suffix={<ThunderboltOutlined />}
                    onPressEnter={(evt) => {
                      evt.preventDefault();
                      document.getElementById('addSkillButton').click();
                    }}
                    autoFocus
                  />
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
            id="addSkillButton"
          >
            Добавить суперспособность
          </AddRowButton>
        </div>

        <div>
          <Form.Item name="acceptTerms" shouldUpdate={false}>
            <Checkbox id="terms" name="acceptTerms" />
            <label htmlFor="terms">
              {' '}
              Согласен с условиями
              <span className="required-star"> *</span>
            </label>
          </Form.Item>
        </div>

        <div className="formButtonsContainer">
          <SubmitButton loading={loading} disabled={false} size="large" className="button">
            Зарегистрироваться
          </SubmitButton>
          <ResetButton size="large" className="button">
            Очистить форму
          </ResetButton>
        </div>
        <span className="success">{successMessage}</span>
        <span className="error">{netErrorMessage}</span>
      </Form>
    </Formik>
  );
};

export default SubmitForm;
