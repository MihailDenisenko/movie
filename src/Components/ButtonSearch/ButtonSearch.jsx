import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'react';
import styles from './ButtonSearch.module.scss';
import { HomeContext } from '../Home/Home';
import React from 'react';

export default function ButtonSearch() {
  const { setItems, optionsGet, lang, setFavor, setPages } = React.useContext(HomeContext);

  const searched = () => {
    setFavor(false);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang}&page=1&sort_by=popularity.desc`,
      optionsGet,
    )
      .then((res) => res.json())

      .then((json) => {
        setItems(json.results);
        setPages(json.total_pages);
        console.log(json);

        // setJson(json);
        // setItems(...items, json.results);
        // setLoader(false);
        // loading(false, json.total_pages);
      })
      .catch((err) => console.error(err));
  };

  const { languageSearch } = React.useContext(HomeContext);
  return (
    <div className={styles.root}>
      <Button
        onClick={searched}
        className={styles.button}
        type="primary"
        icon={<SearchOutlined />}
        iconPosition={'end'}
      >
        {languageSearch !== 'en-En' ? 'Поиск ' : 'Search '}
      </Button>
    </div>
  );
}
