/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import 'react';

import Film from '../Film/Film';
// import js from '@eslint/js';
import React, { useState, useEffect } from 'react';
import { Alert, Flex, Spin } from 'antd';
import { tr } from 'date-fns/locale';

export default function Films() {
  const [items, setItems] = useState([]);
  const [elem, setElem] = useState(false);
  const [loader, setLoader] = useState(false);

  const searchText = 'sonic';
  // const lang = 'en-US';
  const lang = 'ru-RU';

  const Api_Token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDM4YmY4YTE5MmViNjZjODNlNjQ5MThlZmU3MmIwMyIsIm5iZiI6MTczNjQyMjYxNy45Miwic3ViIjoiNjc3ZmI0ZDljODFhY2FhNjNkYmI0MGJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.GlmLBJCWFLv60L3djTWk7GT-wMerRss5NcYKYvKG8K8';

  const url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=${lang}&page=1`;

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
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json)
        setTimeout(() => {
          setItems(...items, json.results);
          setLoader(false);
          console.log(loader);
        }, 500);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [items]);

  const elements = items.map((it, i) => {
    // console.log(it);
    const { id, overview, backdrop_path, original_title, title, popularity, release_date } = it;

    return (
      <div className="films" key={id}>
        <Film
          id={id}
          label={original_title}
          overview={overview}
          img={backdrop_path !== null ? urlImg + backdrop_path : null}
          title={title}
          popularity={popularity}
          release_date={release_date}
          options={options}
        />
        <br />
      </div>
    );
  });

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
