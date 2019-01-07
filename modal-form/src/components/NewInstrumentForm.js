import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import asyncValidate from './asyncValidate';

import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
});

const currencies = [
    // {
    //   value: 'USD',
    //   label: '$',
    // },
    // {
    //   value: 'EUR',
    //   label: '€',
    // },
    // {
    //   value: 'BTC',
    //   label: '฿',
    // },
    // {
    //   value: 'JPY',
    //   label: '¥',
    // },
];

const validate = values => {
    const errors = {};
    const requiredFields = [ "name", "description", "type", "cost" ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required';
        }
    })
    console.log(errors);

    return errors;
}

const renderTextField = ({ input, label, helperText, meta: { touched, error }, ...custom }) => (
    <TextField
        label={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
        margin="normal"
        variant="outlined"
        fullWidth
        helperText={helperText}
    />
)

const renderSelectField = ({ input, label, helperText, placeholder, selectProps, meta: { touched, error }, ...custom }) => (
    <TextField
        label={label}
        select
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
        margin="normal"
        variant="outlined"
        fullWidth
        helperText={helperText}
        placeholder={placeholder}
        selectProps={selectProps}
    />
)
  

class NewInstrumentForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            description: '',
            cost: '',
        };
        this.classes = {
            container: {
                display: 'flex',
                flexWrap: 'wrap',
              },
              textField: {
                // marginLeft: theme.spacing.unit,
                // marginRight: theme.spacing.unit,
              },
              dense: {
                marginTop: 16,
              },
              menu: {
                width: 200,
              },
        }
    }
    
    handleFormChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render () {
        // const { classes } = this.props;
        const classes = this.classes;
        return (
            <form className={classes.container}>
                <Field
                    id="outlined-name"
                    name="name"
                    component={renderTextField}
                    label="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleFormChange('name')}
                    helperText=""
                />
                <Field
                    id="outlined-select-type-native"
                    label="Type"
                    name="type"
                    className={classes.textField}
                    value={this.state.type}
                    component={renderSelectField}
                    onChange={this.handleFormChange('type')}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                        className: classes.menu,
                        },
                    }}
                    placeholder="Type"
                >   
                {currencies.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
                </Field>
                <Field
                    id="outlined-description"
                    name="description"
                    component={renderTextField}
                    label="Description"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleFormChange('description')}
                    helperText="Up to 300 Characters"
                />
                <Field
                    id="outlined-cost"
                    name="dost"
                    component={renderTextField}
                    label="$ Cost"
                    className={classes.textField}
                    value={this.state.cost}
                    onChange={this.handleFormChange('cost')}
                    helperText=""
                />
            </form>
        )
        
    }
}

export default reduxForm({
    form: 'NewInstrumentForm',  // a unique identifier for this form
    validate,
    asyncValidate
})(NewInstrumentForm);
