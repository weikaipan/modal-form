const validate = values => {
    const errors = {}
    const requiredFields = [
      'name',
      'type',
      'cost',
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
  
    return errors
}

export default validate;
