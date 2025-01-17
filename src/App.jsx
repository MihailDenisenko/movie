/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import './App.scss';
import Home from './Components/Home/Home';
import { Offline, Online } from 'react-detect-offline'; 
import { Alert } from 'antd';
import logo from './Components/img/notInternet.png';
import { Spin } from 'antd';



const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = (
  <div className="loder">
    <div style={contentStyle} />
  </div>
);


function App() {
  const [loader, setLoader] = useState(true);

  const loaded = (
    <div className="loadered">
      <div className="loder">
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      </div>
    </div>
  );

  loader ?
    setTimeout(() => {
      setLoader(false)
    }, 500) : '';

  return (
    <>
      {
        loader ? loaded:
      <Online>
            <Home />
      </Online>
      }
      <Offline>
        {loader ? '' : 
        (
          <div className="alert">
          <Alert
            message="Ошибка подключения"
            description="Извините, но в настоящее время ваше подключение к интернету не работает!!! Попробуйте проверить настройки сети или переподключитесь к другой сети"
            type="error"
            />
          <img className="notInternet" src={logo} alt="NOt you Internet" />
        </div>
        )
      }
      </Offline>
    </>
  );
}

export default App;
