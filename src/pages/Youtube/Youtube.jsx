import React, { useEffect, useState } from 'react'
import "./youtube.css"
import { IoClose } from "react-icons/io5";
const Youtube = ({ active, setActive, isMovie, movieYoutubeData, tvYoutubeData }) => {
    const [closing, setClosing] = useState(false);
    const data = isMovie ? movieYoutubeData : tvYoutubeData

    useEffect(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (active) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [active]);
    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setActive(false);
            setClosing(false);
        }, 700);
    };

    return (
        <>
            {
                active &&  (

                    <div className={`modal-div ${closing ? 'closing' : ''}`}>
                        {
                            data?.slice(0, 1).map((item, index) => {
                                return (


                                    <div className='youtube' key={item.id}>
                                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                                        </iframe>
                                        <div onClick={handleClose}><IoClose /></div>
                                    </div>

                                )
                            })
                        }


                    </div>
                )

            }
        </>
    )
}

export default Youtube