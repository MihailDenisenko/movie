/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import js from '@eslint/js';
import { useEffect, useState } from 'react';
import React from 'react';
import 'react';
import { Offline, Online } from 'react-detect-offline'; 
import { CloseSquareFilled } from '@ant-design/icons';
import { Alert } from 'antd';
import Pagin from '../Pagination/Pagin';
import Search from '../Search/Search';

import Films from '../Films/Films';

export const HomeContext = React.createContext();

export default function Home() {
  const [ite, setIte] = useState('');
  const [loader, setLoader] = useState(true)
  const [pages, setPages] = useState(0)
  const [searchVal, setSearchVal] = useState('');
  const [languageSearch, setLanguageSearch] = useState('ru-Ru');
  const [paginPage, setPaginPage] = useState(1)
  const[jsonFilms, setJson]=useState([])

  // console.log(jsonFilms.results)

  const loading = (l, pages) => {
    setLoader(l)
    setPages(pages)
  }

  return (
    <div className="div__home">
      <HomeContext.Provider
        value={{
          searchVal,
          setSearchVal,
          languageSearch,
          setLanguageSearch,
          loading,
          paginPage,
          setJson,
        }}
      >
        <div>
          <div className="div__search">
            <Search className="div__search" />
          </div>
        </div>
        <Films
        />
        <div className="pagination">
          {!loader ? (
            <Pagin
              pages={pages}
              paginPage={[paginPage]}
              setPaginPage={(e) => setPaginPage(e)}
              languageSearch={languageSearch}
            />
          ) : (
            ''
          )}
        </div>
      </HomeContext.Provider>
    </div>
  );
}
