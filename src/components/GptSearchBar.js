import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const searchText = useRef(null);
    const langKey = useSelector(store => store.config.lang);
    const dispatch = useDispatch();

    const searchMovieTMDB = async (movie) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1',
            API_OPTIONS);

        const json = await data.json();
        return json.results;
    }

    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);
        const gptQuery = "Act as a Movie recommendation system and suggest some movies for the query" + searchText.current.value + ". only give me names of 5 movies, comma seperated like the example result given ahead. Exaple Result: Gadar, Sholay, Don, Golamal, Koi Mil Gaya";
        const gptResults = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: gptQuery,
                },
            ],
        });

        if (!gptResults.choices) {
            //Todo : error handling 
            console.log("error");
        }
        console.log(gptResults.choices[0]?.message?.content);
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

        const promisArray = gptMovies.map(movie => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promisArray);
        console.log(tmdbResults);
        dispatch(addGptMovieResult({movieNames:gptMovies, movieResults:tmdbResults}));
    }

    return (
        <div className='pt-[10%] flex justify-center'>
            <form className='w-1/2 bg-black grid grid-cols-12'
                onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    type='text'
                    className='p-4 m-4 col-span-9'
                    placeholder={lang[langKey].gptSearchPlaceholder} />
                <button
                    className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'
                    onClick={handleGptSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar;