import React from "react";

import Input from "./Input/Input";
import Textarea from "./Textarea/Textarea";
import Password from "./Password/Password";
import PasswordStrength from "./PasswordStrength/PasswordStrength";
import Select from "./Select/Select";
import SelectAsync from "./SelectAsync/SelectAsync";
import Checkbox from "./Checkbox/Checkbox";

const FormikControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "password":
      return <Password {...rest} />;
    case "passwordStrength":
      return <PasswordStrength {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "selectAsync":
      return <SelectAsync {...rest} />;
    case "checkout":
      return <Checkbox {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
