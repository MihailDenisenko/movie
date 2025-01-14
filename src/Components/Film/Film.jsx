/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import 'react';
import React from 'react';
import { Alert, Flex, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { ru } from 'date-fns/locale';
import js from '@eslint/js';

export default function Film({
  id,
  label,
  overview,
  img,
  title,
  popularity,
  release_date,
  options,
}) {
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=ru-Ru`, options)
      .then((resp) => resp.json())
      .then((json) => {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
        setGenres(() => {
          console.log(json)
          return json.genres
        });
      });
  });

  const gen = genres.map((g) => {
    const { id, name } = g;

    return (
      <li className="geners__li" key={id}>
        {name}
      </li>
    );
  });

  // const data = format(release_date, 'MMMM d, yyyy');
  // release_date? console.log(format(release_date, 'MMMM d, yyyy')):''

  const contentStyle = {
    padding: 200,
    paddingTop: 75 ,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;

  return (
    <>
      {loader ? (
        <div className="film">
          <div className="container text-center">
            <div className="row">
              <div className="col-loader">
                
              
                <div className="about">
                  <Flex gap="middle" vertical>
                    <Flex gap="middle">
                      <Spin tip="Loading" size="large">
                        {content}{' '}
                      </Spin>
                    </Flex>
                  </Flex>
                </div>
              </div>
            </div>
          </div>

          <div className="title__image"></div>
        </div>
      ) : (
        // <Flex gap="middle" vertical>
        //   <Flex gap="middle">
        //     <Spin tip="Loading" size="small">
        //       {content}{' '}
        //     </Spin>
        //   </Flex>
        // </Flex>
        <div className="film">
          <div className="container text-center">
            <div className="row">
              <div className="col">
                <img className="title__img" src={img} alt={title} />
              </div>
              <div className="col">
                <div className="about">
                  <div className="title">
                    <b>{label.toUpperCase()}</b>
                  </div>
                  <div className="release_date">
                    {release_date ? format(release_date, 'd MMMM, yyyy', { locale: ru }) : ''}
                  </div>
                  <ul className="geners">{genres.length !== 0 ? gen : ''}</ul>
                  <div className="overview">{overview}</div>
                  <div className="popularity">{`Рейтинг - ${popularity}`}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="title__image"></div>
        </div>
      )}
    </>
  );
}
