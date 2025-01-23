import { useState } from 'react'
import { FaAngleRight, FaFilter } from 'react-icons/fa6'
import logo from "../../assets/logo.png"
import "./comingsoon.css"
import { img_500 } from '../../api/api'
import { useGetUpcomingMoviesQuery } from '../../service/moviesdata'
import Paginationn from '../../components/pagination/Pagination'
import { useNavigate } from 'react-router-dom'
const ComingSoon = () => {
    const navigate = useNavigate()
    const [currentpage, setCurrentpage] = useState(1)
    const { data, isLoading, error } = useGetUpcomingMoviesQuery(currentpage)

    const handlePageChange = (pagenumber) => {
        setCurrentpage(pagenumber)
    }
const clickhandler= (id)=>{
    navigate(`/details/${id}`)
    window.scrollTo(0, 0);
}
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
                         data?.results.map((items) => {
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

export default ComingSoon