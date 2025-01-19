import React, { useEffect, useState } from 'react'
import "./dropdown.css"
import { FaList, FaPlay } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { useGetTvSeasonDetailsQuery, useGetTvSeasonsVideoQuery } from '../../service/moviesdata'
import Youtube from '../../pages/Youtube/Youtube'
const Dropdown = ({ dat }) => {
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [active, setActive] = useState(false)
    const [episode, setEpisode] = useState(null)
    const { data, isLoading, error } = useGetTvSeasonDetailsQuery({id: dat?.id, seasonNumber: selectedSeason?.season_number || 1})
    const { data: tvshowYoutubeEpisode } = useGetTvSeasonsVideoQuery({id: dat?.id, seasonNumber: selectedSeason?.season_number || 1, episode})
    console.log(tvshowYoutubeEpisode)
    const handleSeasonSelect = (season) => {
        setSelectedSeason(season);
    };
    const clickHandler = (episode) => {
        setEpisode(episode)
        setActive(true)
    }
    return (
        <>
        <Youtube active={active} setActive={setActive} tvYoutubeData={tvshowYoutubeEpisode?.results}/>
            <div className="container px-2 pb-4  mt-5 season-detail">
                <div className="dropdown py-3">
                    <button className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaList />   {selectedSeason ? `${selectedSeason.name}` : "Season 1"}
                    </button>
                    <ul className="dropdown-menu">
                        {
                            dat?.seasons?.map((season, index) => {
                                return (
                                    <li key={index}><Link className="dropdown-item" onClick={() => handleSeasonSelect(season)}>{season.name}</Link></li>

                                )
                            })
                        }
                    </ul>

                </div>
                <div className='d-flex flex-wrap  gap-2 px-2'>
                    {
                        data?.episodes.map((item, index) => {
                            return (

                                <div className="div-button" key={index} onClick={() => clickHandler(item.episode_number)}><FaPlay className='play-icon' />Eps {item.episode_number}: {item.name.length < 20 ? (item.name) : (item.name.slice(0, 16) + "...")}</div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Dropdown