 
//  eslint-disable react/prop-types 
import 'react'

import styles from "./Search.module.scss"

import { CloseOutlined } from '@ant-design/icons';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
import { HomeContext } from '../Home/Home';
import React from 'react';

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
    const { searchVal, setSearchVal, languageSearch, setLanguageSearch, favor } =
     React.useContext(HomeContext);

   
  return (
    <div className={styles.root}>
      {searchVal ? (
        <CloseOutlined className={styles.closed} onClick={() => setSearchVal('')} />
      ) : (
        ''
      )}
      {!favor?
      <input
        className={styles.input}
        type="text"
        placeholder={languageSearch!=='en-En'?"поиск фильмов":"Search Movies"}
        onChange={(e) => setSearchVal(e.target.value)}
        value={searchVal}
        ></input>:''
      }
      
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
          
          defaultSelectedKeys: [''],
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
