import { Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import 'react';
import styles from './ButtonRate.module.scss';
import { HomeContext } from '../Home/Home';
import React from 'react';



export default function ButtonRate() {
  const { languageSearch, setItems, setFavor, setPages } =
    React.useContext(HomeContext);
  // guestSession
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDM4YmY4YTE5MmViNjZjODNlNjQ5MThlZmU3MmIwMyIsIm5iZiI6MTczNjQyMjYxNy45Miwic3ViIjoiNjc3ZmI0ZDljODFhY2FhNjNkYmI0MGJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.GlmLBJCWFLv60L3djTWk7GT-wMerRss5NcYKYvKG8K8',
    },
  };
  const rated = () => {
    // console.log(sessionStorage.getItem('guest_session_id'));
    setFavor(true)
    fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionStorage.getItem('guest_session_id')}/rated/movies?language=${languageSearch}&page=1&sort_by=created_at.asc`,
      options,
    )
      .then((res) => {
        console.log(res)
        if (res.ok) {
          return res.json();
        }else setItems([])
      })
      .then((json) => {
        console.log(json)
        setItems(json.results);
        setPages(json.total_pages);
        // console.log(sessionStorage.getItem('guest_session_id'));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.root}>
      <Button
       
        className={styles.button}
        type="primary"
        icon={<StarOutlined />}
        iconPosition={'start'}
        onClick={rated}
      >
        {languageSearch !== 'en-En' ? '   Оценённые' : '   RATE'}
      </Button>
    </div>
  );
}
