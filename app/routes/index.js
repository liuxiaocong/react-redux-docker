import { injectAll } from 'utils/asyncInjectors';
import ProgressModal from 'components/ProgressModal';

const loadingModal = {
  show: () => ProgressModal.show({ mask: true }),
  hide: () => ProgressModal.hide(),
};

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

function createBaseRoutes(store) {
  return [
    {
      path: '/',
      name: 'homePage',
      indexRoute: { onEnter: (nextState, replace) => replace('/home') },
    },
    {
      path: '/home',
      name: 'home',
      getComponent: (nextState, cb) => {
        loadingModal.show();
        System.import('containers/Home')
        .then((component) => cb(null, component.default)).then(loadingModal.hide()).catch(errorLoading);
      },
      childRoutes: createHomeRoutes(store),
    },
    {
      path: '/login',
      name: 'login',
      getComponent: (nextState, cb) => {
        loadingModal.show();
        System.import('containers/Login')
        .then((component) => cb(null, component.default)).then(loadingModal.hide()).catch(errorLoading);
      },
    },
    {
      path: '/template',
      name: 'template',
      getComponent: (nextState, cb) => {
        loadingModal.show();
        Promise.all([
          System.import('containers/Template'),
          System.import('containers/Template/reducer'),
          System.import('containers/Template/sagas'),
        ]).then(injectAll(store, 'template', cb)).then(loadingModal.hide()).catch(errorLoading);
      },
    },
  ];
}

function createHomeRoutes(store) {
  return [
    {
      path: 'test',
      name: 'test',
      getComponent: (nextState, cb) => {
        loadingModal.show();
        System.import('containers/Home/Test')
        .then((component) => cb(null, component.default)).then(loadingModal.hide()).catch(errorLoading);
      },
    },
  ];
}

export default function createRoutes(store) {
  return {
    getComponent: (nextState, cb) => {
      loadingModal.show();
      Promise.all([
        System.import('containers/App'),
        System.import('containers/App/reducer'),
        System.import('containers/App/sagas'),
      ]).then(injectAll(store, 'global', cb)).then(loadingModal.hide()).catch(errorLoading);
    },
    childRoutes: createBaseRoutes(store),
  };
}
