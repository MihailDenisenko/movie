 
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as dateFns from 'date-fns';
import 'react';
import React, { useContext } from 'react';
import { Alert, Drawer, Flex, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { ru } from 'date-fns/locale';
import js from '@eslint/js';
import Ratet from '../Ratet/Ratet';
import { HomeContext } from '../Home/Home';

export default function Film({
  lang,
  id,
  label,
  overview,
  img,
  title,
  popularity,
  release_date,
  options,
  vote_average,
  colClass,
}) {
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const { languageSearch } = useContext(HomeContext);
  let relise;
  // const [colClass, setColClass] = useState('m4')
  languageSearch !== 'en-En' ? (relise = 'Дата выхода') : (relise = 'Release date');
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=${lang}`, options)
      .then((resp) => resp.json())
      .then((json) => {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
        setGenres(() => {
          return json.genres;
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

  const contentStyle = {
    padding: 200,
    paddingTop: 75,
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
        <div className="film">
          <div className="container text-center">
            <div className="row" onClick={showDrawer}>
              <div className="col">
                <img className="title__img" src={img} alt={title} />
              </div>
              <div className="col">
                <div className="about">
                  <div className="title">
                    <b className="title__b">{label.toUpperCase()}</b>
                    <div></div>
                    <div className={`vote_average ${colClass}`}>{`${vote_average.toFixed(1)}`}</div>
                  </div>
                  <div className="release_date">
                    {release_date ? dateFns.format(release_date, 'd MMMM, yyyy', { locale: ru }) : null}
                  </div>
                  <ul className="geners">{genres.length !== 0 ? gen : null}</ul>
                  <div className="overview">{overview}</div>
                </div>
              </div>
            </div>
            <div className="popularity">
              <Ratet id={id} onClick={onClose} className="ratet_bg ratetion" />
            </div>
          </div>

          <div className="title__image"></div>
        </div>
      )}
      <Drawer
        className="DrawerClass"
        width={980}
        title="Закрыть окно просмотра "
        onClose={onClose}
        open={open}
      >
        <div className="div__draw_title">
          <img className="title__img" src={img} alt={title} />
          <div className={`vote_average ${colClass} onDraw`}>{`${vote_average.toFixed(1)}`}</div>
        </div>
        <div className="div__title_draw">
          <b className="title__b_draw">{label.toUpperCase()}</b>
          <div className="release_date">
            {release_date
              ? `${relise} - ${dateFns.format(release_date, 'd MMMM, yyyy', { locale: ru })}`
              : null}
          </div>
          <div>
            <ul className="geners">{genres.length !== 0 ? gen : null}</ul>
          </div>
          <div className="overview">{overview}</div>
        </div>
      </Drawer>
    </>
  );
}
