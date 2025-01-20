/* eslint-disable no-undef */
 
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import 'react';
import React, { useState, useEffect } from 'react';

import Film from '../Film/Film';
import {  Flex, Spin } from 'antd';
import { useDebounce } from 'use-debounce';
import { HomeContext } from '../Home/Home';

export default function Films() {
  const {
    setJson,
    paginPage,
    languageSearch,
    loading,
    searchVal,
    guestSession,
    setGuestSession,
    items,
    setItems,
  } = React.useContext(HomeContext);
  
  const [elem, setElem] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchValDebounse] = useDebounce(searchVal, 800);
  let colClass;
  
  const lang = languageSearch;
  const errorText =
    languageSearch !== 'en-En'
      ? 'К сожалению ничего не найдено, попробуйте изменить ваш запрос'
      : 'Sorry, nothing was found, please try to change your query.';

  const Api_Token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDM4YmY4YTE5MmViNjZjODNlNjQ5MThlZmU3MmIwMyIsIm5iZiI6MTczNjQyMjYxNy45Miwic3ViIjoiNjc3ZmI0ZDljODFhY2FhNjNkYmI0MGJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.GlmLBJCWFLv60L3djTWk7GT-wMerRss5NcYKYvKG8K8';

  const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=${lang}&page=${paginPage}`;
  const urlStart = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang}&page=${paginPage}&sort_by=popularity.desc`;

  const urlImg = 'https://image.tmdb.org/t/p/w500';
  // const urlImg = 'https://image.tmdb.org/t/p/original'

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Api_Token}`,
    },
  };

  useEffect(() => {
    fetch(urlStart, options)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json)
        setTimeout(() => {
          setJson(json);
          setItems(...items, json.results);
          setLoader(false);
          loading(false, json.total_pages);
        }, 500);
      })
      .catch((err) => console.error(err));
    
    
    fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
      .then((resp) => resp.json())
      .then((json) => {
        sessionStorage.setItem('guest_session_id', json.guest_session_id);
      })
          .catch((er) => console.log(er))
      
  }, []);

  useEffect(() => {
    searchVal.length !== 0
      ? fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=${lang}&page=${paginPage}`,
          options,
        )
          .then((resp) => resp.json())
          .then((json) => {
            setJson(json);
            loading(false, json.total_pages);
            setItems(json.results);
          })
          .catch((er) => console.log(er))
      : fetch(urlStart, options)
          .then((res) => res.json())
          .then((json) => {
            setJson(json);
            setItems(json.results);
            loading(false, json.total_pages);
          })
          .catch((err) => console.error(err));
  }, [searchValDebounse, paginPage, lang]);

  console.log(items)

  const elements =
    items.length !== 0 ? (
      items.map((it, i) => {
        // console.log(it);
        const {
          id,
          overview,
          backdrop_path,
          original_title,
          title,
          popularity,
          release_date,
          vote_average,
        } = it;
        
        if (vote_average >= 7) { colClass='m4' }
        if (6.99 > vote_average && vote_average > 5) { colClass='m3' }
        if (5 > vote_average && vote_average > 3) {
          colClass='m2';
        }
        if (vote_average<3) {colClass= 'm1'}

        return (
          <div className="films" key={id}>
            <Film
              onMouseOver={() => console.log('mouise')}
              onMouseOut={() => console.log('out')}
              vote_average={vote_average}
              lang={lang}
              id={id}
              label={original_title}
              overview={overview}
              img={backdrop_path !== null ? urlImg + backdrop_path : null}
              title={title}
              popularity={popularity}
              release_date={release_date}
              options={options}
              colClass={colClass}
            />
            <br />
          </div>
        );
      })
    ) : (
      <h1 className="error__h1">
        <span className="box">{errorText}</span>
      </h1>
    );

  const contentStyle = (React.CSSProperties = {
    padding: 200,
    // margin: 800,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  });

  const content = <div className="loader" style={contentStyle} />;

  return (
    <div className="container">
      {loader === true ? (
        <div className="lodered">
          <Flex gap="middle" vertical>
            <Flex gap="middle">
              <Spin tip="Loading" size="small">
                {content}
              </Spin>
            </Flex>
          </Flex>
        </div>
      ) : (
        <div className="div__films">{elements}</div>
      )}
    </div>
  );
}
