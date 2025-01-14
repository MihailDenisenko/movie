/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import js from '@eslint/js';
import { useEffect, useState } from 'react';
import React from 'react';
import 'react';
import { Offline, Online } from 'react-detect-offline'; 
import { CloseSquareFilled } from '@ant-design/icons';
import { Alert } from 'antd';


import Films from '../Films/Films';

export default function Home() {
  const [ite, setIte] = useState('');

  const onClose = (e) => {
    console.log(e, 'I was closed.');
  };


  const handleChange = (e) => {
    console.log(e.target.value);
    setIte(e.target.value);
  };

  return (
    <div>
      <Online>
        <Films />
      </Online>
      <Offline>


        
      </Offline>
    </div>
  );
}
