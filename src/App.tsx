import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { initializeApp } from './redux/AppReducer';
import { Suspense } from 'react';
import ProfileContainer from './components/Profile/profileContainer';
import Menu from './components/Menu/Menu';
import Login from './components/Login/Login';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Preloader from './components/common/preloader';
import { appStateType } from './redux/reduxStore';
import { ChatPage } from './pages/chat/ChatPage';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type mapPropsType = ReturnType<typeof mapStateToProps>
type dispatchPropsType = {
  initializeApp: () => void
}


class App extends React.Component<mapPropsType & dispatchPropsType> {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {

    if (!this.props.initialized) {
      return (
        <Preloader />
      )
    }

    return (
      <div className='container'>

        <HeaderContainer />

        <Menu />

        <div className='app_content'>
          <Routes>
            <Route path='/' element={<ProfileContainer />} />
            <Route path='/profile/:userId?' element={<ProfileContainer />} />

            <Route path='/dialogs' element={
              <Suspense fallback={<Preloader />}>
                <DialogsContainer />
              </Suspense>}
            />

            <Route path='/users' element={<UsersContainer />} />

            <Route path='/login' element={<Login />} />

            <Route path = '/chat' element = {<ChatPage />}/>
          </Routes>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state:appStateType) => ({
  initialized: state.App.initialized
})

export default connect(mapStateToProps, { initializeApp })(App);