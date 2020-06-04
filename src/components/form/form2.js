import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Input, Checkbox, Button } from 'antd';

class MyForm extends React.Component {
  initialValues = { firstName: '', lastName: '', email: '' };

  validationSchema = Yup.object({
    firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      // alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.onSubmit}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Input name="firstName" type="text" />
          <ErrorMessage name="firstName" />
          <label htmlFor="lastName">Last Name</label>
          <Input name="lastName" type="text" />
          <ErrorMessage name="lastName" />
          <label htmlFor="email">Email Address</label>
          <Input name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="check">check</label>
          <Checkbox name="check" />
          <ErrorMessage name="check" />

          <Button htmlType="submit">Submit</Button>
        </Form>
      </Formik>
    );
  }
}

export default MyForm;
