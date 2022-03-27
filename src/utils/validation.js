const valPatterns = {
  spaces: /^[\s]*$/,
  displayName: /^[A-Za-zÀ-ȕ\s\-]*$/,
  optionValue: /^[A-Za-z0-9\-]*$/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  url: /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
};

const valTemplates = {
  required: `This is required`,
  spaces: `This cannot contain only space(s)`,
  special: `This cannot contain special characters`,
  specialSpace: `This cannot contain special characters and/or spaces`,
  maxLength: (length) =>
    `This cannot exceed ${length} characters including spaces`,
  email: `This is not a valid email address`,
  url: `This is not a valid URL`,
};

const valHelper = (err, { pattern, length }= {}) => {
  let helperText = "";
  console.log(err);
  if (err) {
    if (err.type === "pattern") {
      helperText = pattern === "displayName" ? valTemplates.special
          : pattern === "optionValue" ? valTemplates.optionValue
          : pattern === "email" ? valTemplates.email
          : pattern === "url" ? valTemplates.url
          : "";
    } else if (err.type === "maxLength") {
      helperText = valTemplates.maxLength(length);
    } else if (err.type === "required") {
      helperText = valTemplates.required;
    }
  }
  return helperText ? { error: true, helperText } : {error: false};
};

export { valPatterns, valTemplates };
export default valHelper;
