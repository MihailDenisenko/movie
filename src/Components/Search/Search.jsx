 
/* eslint-disable react/prop-types */
import 'react'
import React from 'react';
import styles from "./Search.module.scss"
import { CloseOutlined } from '@ant-design/icons';
// import  closeIcon  from "../img/close.svg";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
import { HomeContext } from '../Home/Home';
const items = [
  {
    key: '1',
    label: 'Ру',
  },
  {
    key: '2',
    label: 'En',
  },
 ];


 
 export default function Search() {
   
   const { searchVal, setSearchVal, languageSearch, setLanguageSearch } =
     React.useContext(HomeContext);

  return (
    <div className={styles.root}>
      {searchVal ? (
        <CloseOutlined className={styles.closed} onClick={() => setSearchVal('')} />
      ) : (
        ''
      )}
      <input
        className={styles.input}
        type="text"
        placeholder="поиск фильмов"
        onChange={(e) => setSearchVal(e.target.value)}
        value={searchVal}
      ></input>
      
      <Dropdown
        className={styles.drop}
        menu={{
          onClick: function (e) {
            // if (e.key === '1') { setLanguageSearch({ label: 'Русский', lang: 'ru-RU' }) }
            if (e.key === '1') {
              setLanguageSearch('ru-Ru');
            } else {
              setLanguageSearch('en-En');
            }
          },
          items,
          
          defaultSelectedKeys: ['1'],
        }}
      >
        <Typography.Link >
          <Space>
            {languageSearch === 'ru-Ru' ? 'Русский' : 'English'}
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </div>
  );
}
