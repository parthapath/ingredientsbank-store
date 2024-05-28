import Cookies from "js-cookie";

const Auth = (props) => {
  const token = Cookies.get("token");
  return token ? props.children : null;
};

export default Auth;
