import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay,faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import '../../Style/BodyCss/Home.css'
import '../../Style/All/grid.css'
import fetchingApiData from '../../Ultil/FetchingData/FetchingApi'
import Pagination from '../Pagination/Pagination';
import {useHandleClickFilmDetail } from '../../Ultil/Hepler/navigationHelpers';
import {useHandleTruncateText} from '../../Ultil/Hepler/truncateText'

function GenreFilm() {
    const { slug } = useParams();
    const [phimLe, setPhimLe] = useState([]);
    const [phimBo, setPhimBo] = useState([]);
    const [films,setFilms] = useState([]);
    const [filterdFilm,setFilteredFilms] = useState([]);
    const [titleGenre, setTitleGenre] = useState([])
    const [loading, setLoading] = useState(false);
    const [dataFilm, setDataFilm] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 30;
    const imgUrl = 'https://img.phimapi.com/'
    const hanldeClickFilmDetail = useHandleClickFilmDetail();
    const hanldeTruncateText = useHandleTruncateText()

    const specialGenre = {
        "hanh-dong": "HÀNH ĐỘNG",
        "tinh-cam": "TÌNH CẢM",
        "hai-huoc": "HÀI HƯỚC",
        "gia-dinh": "GIA ĐÌNH",
        "chinh-kich": "CHÍNH KỊCH",
        "hoat-hinh": "HOẠT HÌNH",
        "khoa-hoc": "KHOA HỌC",
        "phieu-luu": "PHIÊU LƯU",
        "chien-tranh": "CHIẾN TRANH",
        "the-thao": "THỂ THAO",
        "lich-su": "LỊCH SỬ",
        "bi-an": "BÍ ẨN",
        "tam-li":"TÂM LÍ",
        "co-trang":"CỔ TRANG",
        "vo-thua":"VÕ TRANG",
        "kinh-di":"KINH DỊ",   
        "vien-tuong":"VIỄN TƯỞNG"  
    };


    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [phimLeData,phimBoData] = await fetchingApiData([
                    `https://phimapi.com/v1/api/danh-sach/phim-le?limit=50&page=${currentPage}`,
                    `https://phimapi.com/v1/api/danh-sach/phim-bo?limit=50&page=${currentPage}`,
                ]);
                if (phimLeData && phimLeData.data.items) {
                    setPhimLe(phimLeData.data.items);
                }
    
                if (phimBoData && phimBoData.data.items) {
                    setPhimBo(phimBoData.data.items);
                }
                const combinedFilms = [
                    ...(phimLeData?.data.items || []),
                    ...(phimBoData?.data.items || [])
                ];
                setFilms(combinedFilms);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false)
            }
        };

        
        setTitleGenre(specialGenre[slug])

        fetchData();
    },[slug,currentPage])

    useEffect(() => {
        const filteredFilms = films.filter(item => 
            item.category.some(category => slug.includes(category.slug))
        );

        setFilteredFilms(filteredFilms);
    },[films,slug])

    useEffect(() => {
        document.title = titleGenre || '';
    }, [titleGenre]);



    return (
        <div>
            <div class="maincontainer">
                <div class="grid">
                    <div class="row header-container">
                        <div class="film-header-container">
                            <h1 class="film-item_header">{`${titleGenre} - TRANG ${currentPage}`}</h1>
                        </div>
                    </div>
                    <div className='row'>
                        {loading ? (
                            <div className="loading-container">
                                <FontAwesomeIcon className='icon-loading' icon={faSpinner} spin size="3x" />
                            </div>
                        ) : (
                            filterdFilm && filterdFilm.map(item => (
                                <div key={item._id} onClick={() => hanldeClickFilmDetail(item.slug)} className="film-item col col-lg-2 col-md-4">
                                    <div className="film-item-img-container">
                                        <img src={imgUrl + item.poster_url} alt={item.name} />
                                    </div>
                                    <div className="film-item-iconplay">
                                        <FontAwesomeIcon className='fa-circle-play' icon={faCirclePlay} />
                                    </div>
                                    <h4>{hanldeTruncateText(item.name)}</h4>
                                </div>
                            ))
                        )}
                    </div>
                    <div class="row pageNum-container">
                        <div class="film-pageNum-continer">
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={(page) => setCurrentPage(page)} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenreFilm