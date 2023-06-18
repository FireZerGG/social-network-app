import React from 'react';
import './App.css';
import { Routes , Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { initializeApp } from './redux/AppReducer';
import ProfileContainer from './components/Profile/profileContainer';
import Menu from './components/Menu/Menu';
import Login from './components/Login/Login';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Preloader from './components/common/preloader';
import { Suspense } from 'react';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {

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
              <Suspense fallback = {<Preloader />}>
                <DialogsContainer />
              </Suspense>}
            />

            <Route path='/users' element={<UsersContainer />} />

            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  initialized: state.App.initialized
})

// const App = () => {
//   return (
//     <div className='container'>

//         <HeaderContainer />

//         <Menu />

//         <div className='app_content'>
//           <Routes>
//             <Route path='/' element={<ProfileContainer />} />
//             <Route path='/profile/:userId?' element={<ProfileContainer />} />
            
//             <Route path='/dialogs' element={
//               <Suspense fallback = {<Preloader />}>
//                 <DialogsContainer />
//               </Suspense>}
//             />

//             <Route path='/users' element={<UsersContainer />} />

//             <Route path='/login' element={<Login />} />
//           </Routes>
//         </div>
//       </div>
//   )
// }

// export default App

export default connect(mapStateToProps, {initializeApp})(App);