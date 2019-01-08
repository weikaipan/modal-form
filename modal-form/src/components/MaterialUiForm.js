// The modal form.
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import asyncValidate from './asyncValidate';
import validate from './validate';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const instruments = [
  {
    value: 'violin',
    label: 'Violin',
  },
  {
    value: 'piano',
    label: 'Piano',
  },
];

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    margin="normal"
    variant="outlined"
    fullWidth
    {...input}
    {...custom}
  />
)

const renderHelperTextField = ({
  label,
  input,
  helperText,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={helperText}
    margin="normal"
    variant="outlined"
    fullWidth
    {...input}
    {...custom}
  />
)

const renderSelectField = ({
  input,
  label,
  helperText,
  placeholder,
  selectProps,
  children,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
      label={label}
      select
      error={touched && invalid}
      errorText={touched && error}
      {...input}
      {...custom}
      margin="normal"
      variant="outlined"
      fullWidth
      helperText={touched && error}
      placeholder={placeholder}
      selectProps={selectProps}
  > {children}
  </TextField>
)

class MaterialUiForm extends React.Component {

  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form 
        onSubmit={event => {{ handleSubmit(event).then( () => {
          reset()
        })}}} id="modal-form">
        <div>
          <Field
            name="name"
            component={renderTextField}
            label="Name"
          />
        </div>
        <div>
          <Field
              id="outlined-select-type-native"
              label="Type"
              name="type"
              component={renderSelectField}
              SelectProps={{
                  native: true,
              }}
              placeholder="Type"
          >
          <option />
          {instruments.map(option => (
            <option value={option.value}>
              {option.label}
            </option>
          ))}
          </Field>
        </div>
        <div>
          <Field
            name="description"
            component={renderHelperTextField}
            label="Description"
            helperText="Up to 300 characters."
          />
        </div>
        <div>
          <Field name="cost" component={renderTextField} label="$ Cost" />
        </div>
        </form>
    )
  }
}

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  asyncValidate,
})(MaterialUiForm)
