import './App.scss';
import Landing from './components/Landing/Landing.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import  EnterForm  from './components/Forms/EnterForm/EnterForm.jsx';
import { Questionnaire } from './components/Questionnaire/Questionnaire.jsx';
import RegistrationForm from './components/Forms/RegistrationForm/RegistrationForm.jsx';
import { useContext, useEffect } from 'react';
import { Context } from './main.jsx';
import { observer } from 'mobx-react-lite';
import Faq from './components/Landing/Main/FAQ/Faq.jsx';
import SpinnerCat from './components/Spinner/SpinnerCat/SpinnerCat.jsx';
import WithAuth from './components/Auth/withAuth.jsx';
import PopupPolicy from './components/Popups/PopupPolicy/PopupPolicy.jsx';
import ResetForm from './components/Forms/ResetForm/ResetForm.jsx';

// eslint-disable-next-line
function App() {

  const {store} = useContext(Context);
  const navigate = useNavigate();
  
  useEffect(()=> {
  //при запуске приложения проверяется авторизован ли пользователь, наличие заполненной анкеты
    const fetchData =async() => {
      try {
        const isAuth = await store.checkAuth();
        const currentPath = window.location.pathname;
        console.log(currentPath);
        if (!isAuth) {
          if (currentPath.includes('/login')) {
            navigate('/auth/login');
            return;
          }
          if (currentPath.includes('/register')) {
            navigate('/auth/register');
            return;
          }  
          // if (currentPath.includes('/reset-password')) {
          //   // navigate(`${currentPath}`);
          //   navigate('/auth/reset-password');
          //   return;
          // }  
        }

        await store.checkPersoncardExist();
        
        if (isAuth && !store.isAnketaExist) {
          navigate('/questionnaire');
          return;
        } 
        if (isAuth && store.isAnketaExist) {
          // const currentPath = window.location.pathname;
          if (currentPath.includes('/main/')) {
            // Если текущий путь не дневник и не рекомендации, то перенаправляем
            // navigate('/main/mainpage');
            return;
          }
          navigate('/'); //исправить если при запуске приложения для авторизованных грузится не личный кабинет , а главная лендинга
          return;
        }
  
      } catch(error) {
        console.error('Ошибка при проверке данных:', error);
      }
    }; 
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (store.isLoading) {
    return <div><SpinnerCat /></div>;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<EnterForm />} />
        {/* <Route path="/main" element={<Main />} /> */}
        <Route path="/questionnaire" element={<Questionnaire />}/>
        <Route path="/auth/register" element={<RegistrationForm />} />
        <Route path="/policy" element={<PopupPolicy />} />
        <Route path= "/auth/*" element= {<EnterForm/>}  />
        <Route path= "/auth/login" element ={ <EnterForm />} />
        <Route path= "/reset-password" element ={ <ResetForm />} />
        {/* <Route path= "/users/activation/:uid/:token" element ={ <EnterForm />} /> */}
        {/* <Route path= "/users/activation/*" element ={ <EnterForm />} /> */}
        <Route path= "/reset-password" element ={ <ResetForm />} />
        <Route
          path="/main/*"
          element={<WithAuth  />}
          // element={<Main />}
        />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </div>
  );
}

// eslint-disable-next-line
export default observer(App);
