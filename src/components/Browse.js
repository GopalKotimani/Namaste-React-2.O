import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

export const Browse = () => {

  useNowPlayingMovies();

  return (
    <div>
      <Header />
    {/*
      MainContainer 
        - Video background 
        - Video title
      Secondary Container 
        - Movieslist * n
        - Cards * n 
    */}
    <MainContainer />
    <SecondaryContainer />
    </div>
  )
}
