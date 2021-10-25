import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyC0QoAGE6eK5iWR4KlQns5o-xnNMeTZIvo',
  authDomain: 'adminio-47db9.firebaseapp.com',
  projectId: 'adminio-47db9',
  storageBucket: 'adminio-47db9.appspot.com',
  messagingSenderId: '122091370639',
  appId: '1:122091370639:web:38f796cbcb4f82b16b58fa',
  measurementId: 'G-GBQ45FJGBJ',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  //let location = useLocation()

  //render() {
  /*
    useEffect(() => {
        const analytics = window.firebase && window.firebase.analytics;
        if (typeof analytics === 'function') {
            const page_path = location.pathname + location.search;
            analytics().setCurrentScreen(page_path);
            analytics().logEvent('page_view', { page_path });
        }
    }, [location]);*/
  // logEvent(analytics, 'notification_received')
  //analytics.logEvent('Testing')
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
          <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
        </Switch>
        <FirebaseAnalytics />
      </React.Suspense>
    </HashRouter>
  )
  // }
}

function FirebaseAnalytics() {
  let location = useLocation()

  useEffect(() => {
    const page_path = location.pathname + location.search
    //logEvent(analytics, page_path)

    logEvent(analytics, 'screen_view', {
      firebase_screen: page_path, 
      firebase_screen_class: "pageview"
    });
    console.log({
      page_path,
    })
  }, [location])
  return null
}

export default App
