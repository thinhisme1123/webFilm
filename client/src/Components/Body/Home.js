import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay,faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../../Style/BodyCss/Home.css'
import '../../Style/All/grid.css'
import '../../Style/Responsive/Responsive.css'
import fetchingApiData from '../../Ultil/FetchingData/FetchingApi'
import {useHandleClickFilmDetail } from '../../Ultil/Hepler/navigationHelpers';
import {useHandleTruncateText} from '../../Ultil/Hepler/truncateText'


function Home() {
    const [phimmoiCN, setPhimmoiCN] = useState([]);
    const [phimLe, setPhimLe] = useState([]);
    const [phimBo, setPhimBo] = useState([]);
    const [phimHH, setPhimHH] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [slider, setSliders] = useState([]);
    const imgUrl = 'https://img.phimapi.com/'
    const hanldeClickFilmDetail = useHandleClickFilmDetail();
    const hanldeTruncateText = useHandleTruncateText()
    
    useEffect(() => {
        document.title = "Trang Chủ";

        const fetchData = async () => {
            const [phimMoiData, phimLeData, phimBoData, phimHHData,tvShowData] = await fetchingApiData([
                'https://phimapi.com/danh-sach/phim-moi-cap-nhat?limit=12',
                'https://phimapi.com/v1/api/danh-sach/phim-le?limit=12',
                'https://phimapi.com/v1/api/danh-sach/phim-bo?limit=12',
                'https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=12',
                'https://phimapi.com/v1/api/danh-sach/tv-shows?limit=12'
            ]);

            if (phimMoiData && phimMoiData.items) {
                setPhimmoiCN(phimMoiData.items);
                const initialSlider = phimMoiData.items.slice(0, 4);
                setSliders(initialSlider);

                if (initialSlider.length > 0) {
                    $('.slider-container').css('--slider-bg', `url(${initialSlider[0].thumb_url})`);
                }
            }

            if (phimLeData && phimLeData.data.items) {
                setPhimLe(phimLeData.data.items);
            }

            if (phimBoData && phimBoData.data.items) {
                setPhimBo(phimBoData.data.items);
            }

            if (phimHH && phimHHData.data.items) {
                setPhimHH(phimHHData.data.items);
            }

            if (tvShows && tvShowData.data.items) {
                setTvShows(tvShowData.data.items);
            }

        };

        fetchData();
    }, []);

    useEffect(() => {
        if (slider.length > 0) {
            let counter = 1;
            const intervalId = setInterval(() => {
                $('#radio' + counter).prop('checked', true);

                $('.slider-container').css('--slider-bg', `url(${slider[counter - 1].thumb_url})`);

                counter++;
                if (counter > 4) counter = 1;
            }, 4000);

            return () => {
                clearInterval(intervalId); // Clean up the interval on component unmount
            };
        }
    }, [slider]);

    return (
        <div>
            {/* SLIDER - START */}
            <div className="slider-container">
                <div className="slider">
                    <div className="slides">
                        <input type="radio" name="radio-btn" id="radio1"/>
                        <input type="radio" name="radio-btn" id="radio2"/>
                        <input type="radio" name="radio-btn" id="radio3"/>
                        <input type="radio" name="radio-btn" id="radio4"/>
                        {slider.length > 0 && (
                            <>
                                <div className="slide first">
                                    <h4>{slider[0].name}</h4>
                                    <h5>{slider[0].origin_name}<span> ({slider[0].year})</span></h5>
                                    <button onClick={() => hanldeClickFilmDetail(slider[0].slug)} className="watch-btn_slider">Watch</button>
                                    <img src={slider[0].thumb_url} alt="slide1" />
                                </div>
                                <div className="slide">
                                    <h4>{slider[1].name}</h4>
                                    <h5>{slider[1].origin_name}<span> ({slider[1].year})</span></h5>
                                    <button onClick={() => hanldeClickFilmDetail(slider[1].slug)} className="watch-btn_slider">Watch</button>
                                    <img src={slider[1].thumb_url} alt="slide2" />
                                </div>
                                <div className="slide">
                                    <h4>{slider[2].name}</h4>
                                    <h5>{slider[2].origin_name}<span> ({slider[2].year})</span></h5>
                                    <button onClick={() => hanldeClickFilmDetail(slider[2].slug)} className="watch-btn_slider">Watch</button>
                                    <img src={slider[2].thumb_url} alt="slide3" />
                                </div>
                                <div className="slide">
                                    <h4>{slider[3].name}</h4>
                                    <h5>{slider[3].origin_name}<span> ({slider[3].year})</span></h5>
                                    <button onClick={() => hanldeClickFilmDetail(slider[3].slug)} className="watch-btn_slider">Watch</button>
                                    <img src={slider[3].thumb_url} alt="slide4" />
                                </div>
                            </>
                        )}
                        <div className="navigation-auto">
                            <div className="auto-btn1"></div>
                            <div className="auto-btn2"></div>
                            <div className="auto-btn3"></div>
                            <div className="auto-btn4"></div>
                        </div>
                    </div>
                    <div className="navigaiton-manual">
                        <label htmlFor="radio1" className="manual-btn"></label>
                        <label htmlFor="radio2" className="manual-btn"></label>
                        <label htmlFor="radio3" className="manual-btn"></label>
                        <label htmlFor="radio4" className="manual-btn"></label>
                    </div>
                </div>
            </div>
            {/* SLIDER - END */}
            <div className="maincontainer">
                <div className="grid home-container">
                    {/* PHIM MỚI CẬP NHẬT - START */}
                    <div className="row">
                        <div className='header-container'> 
                            <div className="film-header-container">
                                <h1 className="film-item_header">PHIM MỚI CẬP NHẬT</h1>
                            </div>
                            <div className="film-seeAll-container">
                                <Link to="/danh-sach/phim-moi-cap-nhat" className="film-item_seeAll">Xem tất cả</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* Render films */}
                        {phimmoiCN && phimmoiCN.map(item => (
                            <div key={item._id} onClick={() => hanldeClickFilmDetail(item.slug)} className="film-item col col-lg-2 col-md-4">
                                <div className="film-item-img-container">
                                    <img src={item.poster_url} alt={item.name} />
                                </div>
                                <div className="film-item-iconplay">
                                    <FontAwesomeIcon className='fa-circle-play' icon={faCirclePlay} />
                                </div>
                                <h4>{hanldeTruncateText(item.name)}</h4>
                            </div>
                        ))}
                    </div>
                    {/* PHIM MỚI CẬP NHẬT - END */}
                    {/* PHIM LẺ - START */} 
                    <div className="row ">
                    <div className='header-container'> 
                            <div className="film-header-container">
                                <h1 className="film-item_header">PHIM LẺ</h1>
                            </div>
                            <div className="film-seeAll-container">
                                <Link to="/danh-sach/phim-le" className="film-item_seeAll">Xem tất cả</Link>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {phimLe && phimLe.map(item => (
                            <div key={item._id} onClick={() => hanldeClickFilmDetail(item.slug)} className="film-item col col-lg-2 col-md-4">
                                <div className="film-item-img-container">
                                    <img src={imgUrl + item.poster_url} alt={item.name} />
                                </div>
                                <div className="film-item-iconplay">
                                    <FontAwesomeIcon className='fa-circle-play' icon={faCirclePlay} />
                                </div>
                                <h4>{hanldeTruncateText(item.name)}</h4>
                                {/* Adjust button or link as needed */}
                                <button hidden={true} className="film-item-watch-btn"><a href={`filmDetail.php?name=${item.slug}`} className="film-item-watch-link">Watch</a></button>
                            </div>
                        ))}
                    </div>
                    {/* PHIM LẺ - END */}
                    {/* PHIM BỘ - START */} 
                    <div className="row ">
                    <div className='header-container'> 
                            <div className="film-header-container">
                                <h1 className="film-item_header">PHIM BỘ</h1>
                            </div>
                            <div className="film-seeAll-container">
                                <Link to="/danh-sach/phim-bo" className="film-item_seeAll">Xem tất cả</Link>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {phimBo && phimBo.map(item => (
                            <div key={item._id} onClick={() => hanldeClickFilmDetail(item.slug)} className="film-item col col-lg-2 col-md-4 ">
                                <div className="film-item-img-container">
                                    <img src={imgUrl + item.poster_url} alt={item.name} />
                                </div>
                                <div className="film-item-iconplay">
                                    <FontAwesomeIcon className='fa-circle-play' icon={faCirclePlay} />
                                </div>
                                <h4>{hanldeTruncateText(item.name)}</h4>
                                {/* Adjust button or link as needed */}
                                <button hidden={true} className="film-item-watch-btn"><a href={`filmDetail.php?name=${item.slug}`} className="film-item-watch-link">Watch</a></button>
                            </div>
                        ))}
                    </div>
                    {/* PHIM BỘ - END */}
                    {/* PHIM HOẠT HÌNH - START */} 
                    <div className="row ">
                    <div className='header-container'> 
                            <div className="film-header-container">
                                <h1 className="film-item_header">PHIM HOẠT HÌNH</h1>
                            </div>
                            <div className="film-seeAll-container">
                                <Link to="/danh-sach/hoat-hinh" className="film-item_seeAll">Xem tất cả</Link>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {phimHH && phimHH.map(item => (
                            <div key={item._id} onClick={() => hanldeClickFilmDetail(item.slug)} className="film-item col col-lg-2 col-md-4 ">
                                <div className="film-item-img-container">
                                    <img src={imgUrl + item.poster_url} alt={item.name} />
                                </div>
                                <div className="film-item-iconplay">
                                    <FontAwesomeIcon className='fa-circle-play' icon={faCirclePlay} />
                                </div>
                                <h4>{hanldeTruncateText(item.name)}</h4>
                                {/* Adjust button or link as needed */}
                                <button hidden={true} className="film-item-watch-btn"><a href={`filmDetail.php?name=${item.slug}`} className="film-item-watch-link">Watch</a></button>
                            </div>
                        ))}
                    </div>
                    {/* PHIM HOẠT HÌNH - END */}
                    {/* TV SHOWs - START */} 
                    <div className="row ">
                    <div className='header-container'> 
                            <div className="film-header-container">
                                <h1 className="film-item_header">TV SHOWs</h1>
                            </div>
                            <div className="film-seeAll-container">
                                <Link to="/danh-sach/tv-shows" className="film-item_seeAll">Xem tất cả</Link>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {tvShows && tvShows.map(item => (
                            <div key={item._id} onClick={() => hanldeClickFilmDetail(item.slug)} className="film-item col col-lg-2 col-md-4 ">
                                <div className="film-item-img-container">
                                    <img src={imgUrl + item.poster_url} alt={item.name} />
                                </div>
                                <div className="film-item-iconplay">
                                    <FontAwesomeIcon className='fa-circle-play' icon={faCirclePlay} />
                                </div>
                                <h4>{hanldeTruncateText(item.name)}</h4>
                                {/* Adjust button or link as needed */}
                                <button hidden={true} className="film-item-watch-btn"><a href={`filmDetail.php?name=${item.slug}`} className="film-item-watch-link">Watch</a></button>
                            </div>
                        ))}
                    </div>
                    {/* TV SHOWs - END */}
                    
                </div>
            </div>
             

        </div>
    );
}

export default Home;
