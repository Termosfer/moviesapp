import { img_500 } from '../../api/api'
import logo from "../../assets/logo.png"
import "./recommend.css"
import { useNavigate } from 'react-router-dom'
const Recommend = ({ data, tvdata, isMovie }) => {
    
    const itemsToMap = isMovie  ? (data?.results || []) : (tvdata?.results || []);
    const navigate = useNavigate()
    const clickhandler = (id) => {
        navigate(`/details/${id}`)
    }
    return (
        <div className='row recommend pb-5'>
            {
                itemsToMap?.slice(0,12).map((items) => {
                    const titleOrName = isMovie ? items.title : items.name
                    return (

                        <div className="card detail-card" key={items.id} onClick={() => clickhandler(items.id)}>
                            <img src={img_500 + items.poster_path} className="card-img" alt="..." />
                            <div className='cover-img'>
                                <img src={logo} alt="" className='cover-logo' />
                            </div>
                            <div className="card-img-overlay">
                                <p className="card-text">{titleOrName}</p>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Recommend