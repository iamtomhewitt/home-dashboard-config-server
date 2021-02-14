import React from 'react';

const BBCNews = ({ data }) => (
  <>
    <div>Title {data.title}</div>
    <div>Seconds Between Articles {data.secondsBetweenArticles}</div>
    <div>Sleep Start {data.sleepStart}</div>
  </>
)

export default BBCNews;