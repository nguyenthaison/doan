import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

import Login from "./Login";
import App from "./App";
import Index from "./App/IndexRoute"
import Top from "./Top";

import Notifications from "./Notifications";
import NotificationForm from "./Notifications/Form";
import NotificationDetail from "./Notifications/NotificationDetail";

import Faquestions from "./Faquestions/";
import FaquestionForm from "./Faquestions/Form/";
import FaquestionDetail from "./Faquestions/FaquestionDetail";

import CommunityForm from "./Communities/Form";
import Communities from "./Communities";
import CommunityDetail from "./Communities/CommunityDetail";

import Master from "./Master";
import Clients from "./Master/Clients";
import Positions from "./Master/Positions";
import Troubles from "./Master/Troubles";
import TroubleNames from "./Master/Troubles/TroubleNames";
import TroubleCategories from "./Master/Troubles/TroubleCategories";
import Tags from "./Master/Tags";
import Users from "./Master/Users";
import Organizations from "./Master/Organizations";
import NotificationAddresses from "./Master/NotificationAddresses";

import Company from "./Company";
import Field from "./Company/Field";

import PmsSetting from "./PmsSetting";
import Companies from "./PmsSetting/Companies";

import MasterNavigation from "./Navigations/Master";
import StepConfig from "./Navigations/Master/StepConfig";
import MasterNavigationList from "./Navigations/Master/Navigation/NavigationList";
import MasterNavigationDetail from "./Navigations/Master/Navigation/MasterNavigationDetail";
import NavigationFlow from "./Navigations/Master/Flow";
import FlowForm from "./Navigations/Master/Flow/Form";
import ClaimMaster from "./Navigations/Master/Claims";

import MyPage from "./MyPage";

import Navigations from "./Navigations";

import FlowDetail from "./Navigations/Master/Flow/FlowDetail";

import ManualFile from "./ManualFiles";
import Bookmark from "./Bookmarks";

const router = (
  <Router history={browserHistory}>
    <Route path="users/sign_in" component={Login} />
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="top" component={Top} />

      <Route path="navigations" component={Navigations} />

      <Route path="faqs" component={Faquestions} />
      <Route path="faqs/new" component={FaquestionForm} />
      <Route path="faqs/clone/:comment_id" component={FaquestionForm} />
      <Route path="faqs/:id/edit" component={FaquestionForm} />
      <Route path="faqs/:id" component={FaquestionDetail} />

      <Route path="communities" component={Communities} />
      <Route path="communities/new" component={CommunityForm} />
      <Route path="communities/:id" component={CommunityDetail} />
      <Route path="communities/:id/edit" component={CommunityForm} />

      <Route path="notifications" component={Notifications} />
      <Route path="notifications/new" component={NotificationForm} />
      <Route path="notifications/:id" component={NotificationDetail} />
      <Route path="notifications/:id/edit" component={NotificationForm} />

      <Route path="master" component={Master} />
      <Route path="master/clients" component={Clients} />
      <Route path="master/users" component={Users} />
      <Route path="master/tags" component={Tags} />
      <Route path="master/troubles" component={Troubles} />
      <Route path="master/troubles/name" component={TroubleNames} />
      <Route path="master/troubles/list" component={TroubleCategories} />
      <Route path="master/notificationAddresses" component={NotificationAddresses} />

      <Route path="company" component={Company} />
      <Route path="company/users" component={Users} />
      <Route path="company/positions" component={Positions} />
      <Route path="company/organizations" component={Organizations} />
      <Route path="company/Fields" component={Field} />

      <Route path="pmsSetting" component={PmsSetting} />
      <Route path="pmsSetting/companies" component={Companies} />
      <Route path="pmsSetting/users" component={Users} />
      <Route path="pmsSetting/positions" component={Positions} />
      <Route path="pmsSetting/organizations" component={Organizations} />

      <Route path="masterNavigation" component={MasterNavigation} />
      <Route path="masterNavigation/stepConfig" component={StepConfig} />
      <Route path="masterNavigation/navigations" component={MasterNavigationList} />
      <Route path="masterNavigation/navigations/:id" component={MasterNavigationDetail} />
      <Route path="masterNavigation/flows" component={NavigationFlow} />
      <Route path="masterNavigation/flows/new" component={FlowForm} />
      <Route path="masterNavigation/flows/:id" component={FlowDetail} />
      <Route path="masterNavigation/flows/:id/edit" component={FlowForm} />
      <Route path="masterNavigation/flows/:id/clone" component={FlowForm} />
      <Route path="masterNavigation/claims" component={ClaimMaster} />

      <Route path="manual_files/:id" component={ManualFile} />
      <Route path="bookmarks/:id" component={Bookmark} />

      <Route path="myPage" component={MyPage} />
    </Route>
  </Router>
);

export default router;
