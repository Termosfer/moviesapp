import React from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png"
const Footer = () => {
    return (
        <footer className='bg-dark text-white py-5'>
            <div className='w-100 px-5'>
                <div className="row justify-content-between" >
                    <div className="col-6">
                        <div className='d-grid gap-3'>
                            <span className='w-75 span'>FreeMoviesWatch.cc is a Free Movies streaming site with zero ads. We let you watch movies online without having to register or paying, with over 10000 movies and TV-Series. You can also Download full movies from FreeMoviesWatch.cc and watch it later if you want.</span>
                            <div className=''>
                                <Link>Android App -</Link>
                                <Link>Terms of service - </Link>
                                <Link>Contact - </Link>
                                <Link>Sitemap - </Link>
                                <Link>FAQ - </Link>
                                <Link>9anime</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className='footer d-grid gap-4'>
                            <div className='d-flex align-items-center gap-2'>
                                <img src={logo} alt="logo" width={40} height={40} />
                                <h4>FreeMoviesWatch.cc</h4>
                            </div>
                            <div className='footer d-grid gap-2'>
                                <p className='m-0 p'>© FreeMoviesWatch.cc</p>
                                <span className='span'>FreeMoviesWatch.cc does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer