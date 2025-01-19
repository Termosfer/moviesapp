import React from 'react'
import "../card/card.css"
import logo from "../../assets/logo.png"
import { img_500 } from '../../api/api'
import { useGetPopularTvShowsQuery } from '../../service/moviesdata'
import { useNavigate } from 'react-router-dom'
const PopulatTv = () => {
const navigate = useNavigate()
const clickhandler = (id) => {
    navigate(`/details/${id}`)
}
    const { data, isLoading, error } = useGetPopularTvShowsQuery()
    return (
        <div className='row'>
            {
                data && data.results.map((items) => {
                    return (

                        <div className="card " key={items.id} onClick={() => clickhandler(items.id)}>
                            <img src={img_500 + items.poster_path} className="card-img" alt="..." />
                            <div className='cover-img'>
                                <img src={logo} alt="" className='cover-logo' />
                            </div>
                            <div className="card-img-overlay">
                                <p className="card-text">{items.name}</p>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default PopulatTv