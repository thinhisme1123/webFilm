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


function SearchResult() {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);
    const [filmResult, setFilmResult] = useState([]);
    const [dataFilmResult, setDataFilmResult] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 30;
    const imgUrl = 'https://img.phimapi.com/'
    const hanldeClickFilmDetail = useHandleClickFilmDetail();
    const hanldeTruncateText = useHandleTruncateText()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [searchFilmData] = await fetchingApiData([
                    `https://phimapi.com/v1/api/tim-kiem?keyword=${slug}&limit=50`,
                ]);

                if (searchFilmData && searchFilmData.data.items) {
                    setDataFilmResult(searchFilmData.data);
                    setFilmResult(searchFilmData.data.items);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    },[currentPage,slug])

    useEffect(() => {
        document.title = dataFilmResult?.seoOnPage?.titleHead || 'Kết quả tìm kiếm';
    }, [dataFilmResult]);

    return (
        <div>
            <div class="maincontainer">
                <div class="grid">
                    <div class="row header-container">
                        <div class="film-header-container">
                            <h1 class="film-item_header">{dataFilmResult?.titlePage || "Phim Bộ"}</h1>
                        </div>
                    </div>
                    <div className='row'>
                        {loading ? (
                            <div className="loading-container">
                                <FontAwesomeIcon className='icon-loading' icon={faSpinner} spin size="3x" />
                            </div>
                        ) : (
                            filmResult && filmResult.length > 0 ? (
                                filmResult.map(item => (
                                    <div key={item._id} onClick={() => hanldeClickFilmDetail(item.slug)} className="film-item col col-lg-2 col-md-4">
                                        <div className="film-item-img-container">
                                            <img src={imgUrl + item.poster_url} alt={item.name} />
                                        </div>
                                        <div className="film-item-iconplay">
                                            <FontAwesomeIcon className='fa-circle-play' icon={faCirclePlay} />
                                        </div>
                                        <h4>{hanldeTruncateText(item.name)}</h4>
                                        <button hidden={true} className="film-item-watch-btn">
                                            <a href={`filmDetail.php?name=${item.slug}`} className="film-item-watch-link">Watch</a>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="error-message">No results found</div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResult