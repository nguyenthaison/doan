import Top from "../Top";
import PmsSetting from "../PmsSetting";
import Company from "../Company";

export default function IndexRoute() {
  let indexPage = <Top />;

  switch(App.auth.role) {
    case "pms_admin":
      indexPage = <PmsSetting />;
      break;
    case "admin":
      indexPage = App.auth.field_id ? <Top /> : <Company />;
      break;
  }
  return indexPage;
}
