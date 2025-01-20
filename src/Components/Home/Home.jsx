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
import ButtonSearch from '../ButtonSearch/ButtonSearch';
import ButtonRate from '../ButtonRate/ButtonRate';
import Imagee from '../Imagee/Imagee';
import Films from '../Films/Films';

export const HomeContext = React.createContext();

export default function Home() {
  const [ite, setIte] = useState('');
  const [loader, setLoader] = useState(true);
  const [pages, setPages] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  const [languageSearch, setLanguageSearch] = useState('ru-Ru');
  const [paginPage, setPaginPage] = useState(1);
  const [jsonFilms, setJson] = useState([]);
  const [apiToken, setApiToken] = useState(
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDM4YmY4YTE5MmViNjZjODNlNjQ5MThlZmU3MmIwMyIsIm5iZiI6MTczNjQyMjYxNy45Miwic3ViIjoiNjc3ZmI0ZDljODFhY2FhNjNkYmI0MGJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.GlmLBJCWFLv60L3djTWk7GT-wMerRss5NcYKYvKG8K8',
  );
  const [favor, setFavor] = useState(false);
  const [rate, setRate] = useState(0);
  const [guestSession, setGuestSession] = useState('');
  const [items, setItems] = useState([]);

  const ApiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDM4YmY4YTE5MmViNjZjODNlNjQ5MThlZmU3MmIwMyIsIm5iZiI6MTczNjQyMjYxNy45Miwic3ViIjoiNjc3ZmI0ZDljODFhY2FhNjNkYmI0MGJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.GlmLBJCWFLv60L3djTWk7GT-wMerRss5NcYKYvKG8K8';

  const optionsGet = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ApiToken}`,
    },
  };

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({}),
  };

  guestSession.length !== 0 ? console.log(guestSession) : '';

  // console.log(jsonFilms.results)

  const loading = (l, pages) => {
    setLoader(l);
    setPages(pages);
  };

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
          rate,
          setRate,
          guestSession,
          setGuestSession,
          options,
          items,
          setItems,
          optionsGet,
          favor,
          setFavor,
          setPages,
        }}
      >
        <div>
          <div className="div__search">
            <Search className="div__search" />
          </div>
          <div className="div__buttons">
            <ButtonSearch className="batSearch" />
            <ButtonRate />
          </div>
        </div>
        <Films />
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
