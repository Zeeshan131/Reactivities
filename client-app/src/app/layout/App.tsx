import { Fragment, useEffect } from 'react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';
import ServerError from '../../features/errors/ServerError';
import NotFound from '../../features/errors/NotFound';
import { observer } from 'mobx-react-lite';
import { Route, useLocation, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestError from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import LoadingComponents from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponents content='Loading app...' />

  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <PrivateRoute exact path='/activities' component={ActivityDashboard} />
                <PrivateRoute path='/activities/:id' component={ActivityDetails} />
                <PrivateRoute key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <PrivateRoute path='/profiles/:username' component={ProfilePage} />
                <PrivateRoute path='/errors' component={TestError} />
                <Route path='/server-error' component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default observer(App);
