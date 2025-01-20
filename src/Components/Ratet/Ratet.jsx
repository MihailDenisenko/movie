/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import 'react'
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Flex, Rate, message } from 'antd';
import styles  from "./Ratet.module.scss";
import { HomeContext } from '../Home/Home';
import React from 'react';
import { Value } from 'sass';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};


export default function Ratet({ id }) {
  const [messageApi, contextHolder] = message.useMessage();

  const { rate, setRate, guestSession, languageSearch } = React.useContext(HomeContext);
  let mess
  languageSearch === 'ru-Ru'
    ? (mess = 'Спасибо оценка принята')
    : mess='Thank you, the rating is accepted';

  
    
    
    
    const cons = (e) => {
      console.log(id, e);


     const optionsi = {
       method: 'POST',
       headers: {
         accept: 'application/json',
         'Content-Type': 'application/json;charset=utf-8',
         Authorization:
           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDM4YmY4YTE5MmViNjZjODNlNjQ5MThlZmU3MmIwMyIsIm5iZiI6MTczNjQyMjYxNy45Miwic3ViIjoiNjc3ZmI0ZDljODFhY2FhNjNkYmI0MGJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.GlmLBJCWFLv60L3djTWk7GT-wMerRss5NcYKYvKG8K8',
       },
       body: '{"value":8.5}',
     };
      //          `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${sessionStorage.getItem('guest_session_id')}`
      const url = `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${sessionStorage.getItem('guest_session_id')}`;

      const success = (r) => {
        messageApi.open({
          type: 'success',
          content: `${mess} `,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      };

      fetch(url, optionsi)
        .then((res) => {
          res.ok ? success() : '';
          return res.json();
        })
        .then((json) => console.log(json, sessionStorage.getItem('guest_session_id')))
        .catch((err) => console.error(err));

      // messageApi.open({
      //   type: 'success',
      //   content: mess,
      //   className: 'custom-class',
      //   style: {
      //     marginTop: '20vh',
      //   },
      // });
    }

  return (
    <div className={styles.root}>
      {contextHolder}
      <Flex gap="middle" vertical>
        {/* <Rate defaultValue={2} character={({ index = 0 }) => index + 1} /> */}
        <Rate
          defaultValue={rate}
          character={({ index = 0 }) => customIcons[index + 1]}
          tooltips={['Ужасно', 'Плохо', 'Пойдет', 'Хорошо', 'Отлично']}
          onChange={cons}
        />
      </Flex>
    </div>
  );
}
