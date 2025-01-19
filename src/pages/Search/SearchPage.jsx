import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetSearchIdQuery } from '../../service/moviesdata'
import { img_500 } from '../../api/api'
import { FaAngleRight, FaFilter } from 'react-icons/fa6'
import Paginationn from '../../components/pagination/Pagination'
import logo from "../../assets/logo.png"

const SearchPage = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const serachQuery = queryParams.get("query")
    const page = parseInt(queryParams.get('page')) || 1
    const [currentpage, setCurrentpage] = useState(page)
    const { data, isLoading, error } = useGetSearchIdQuery({ query: serachQuery, page: currentpage })
    console.log(data, "serachdata")


    const handlePageChange = (pagenumber) => {
        setCurrentpage(pagenumber)
        navigate(`?query=${serachQuery}&page=${pagenumber}`);
    }

    const clickhandler = (id) => {
        navigate(`/details/${id}`)
    }
    /* useEffect(() => {
        setCurrentpage(page);  // URL'deki page parametresi değiştiğinde state'i güncelliyoruz
    }, [page]); */

    return (
        <div className="main-div pb-5">
            <div className='container-fluid px-5'>
                <div className='d-flex align-items-center justify-content-between pt-3 pb-4'>
                    <div className='trending-div py-2 px-4'>Coming Soon
                        <FaAngleRight /></div>
                    <div className='filter'><FaFilter />Filter</div>
                </div>
                <Paginationn handlePageChange={handlePageChange} currentpage={currentpage}
                    totalPages={data?.total_pages} />
                <div className='row'>
                    {
                        data?.results.filter(item => item.backdrop_path).map((items) => {
                            return (

                                <div className="card " key={items.id} onClick={() => clickhandler(items.id)}>
                                    <img src={img_500 + items.poster_path} className="card-img" alt="..." />
                                    <div className='cover-img'>
                                        <img src={logo} alt="" className='cover-logo' />
                                    </div>
                                    <div className="card-img-overlay">
                                        <p className="card-text">{items.title}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default SearchPage