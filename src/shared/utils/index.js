const isValidFields = body => {
  const fieldsErrors = [];
  const keys = ['title', 'status', 'priority'];
  keys.every(key => {
    if(!body[key]?.trim()) {
      fieldsErrors.push(key);
      return false;
    }
    return true;
  });

  return fieldsErrors?.length ? "Os campos " + fieldsErrors.join(", ") + " são obrigatórios" : null;
};

module.exports = isValidFields;
