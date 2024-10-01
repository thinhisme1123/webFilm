import React, { useState, useRef } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import '../../Style/PartialsCss/Header.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faList, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'; 
import '../../Style/Responsive/Responsive.css'
import {useHandleEnterSearchFilm} from '../../Ultil/Hepler/navigationHelpers'

function Header() {
    const [isOpen, setOpen] = useState(false)
    const inputBox = useRef(null)
    const handleEnterSearchFilm = useHandleEnterSearchFilm()
    const navigate = useNavigate();

    const hanldeSearchIconClick = () => {
        setOpen(!isOpen)
        inputBox.current.focus()
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleEnterSearchFilm(inputBox.current.value)
        }
    };


    return (
        <header>
            <div className="main-container">
                <div className="grid-container">
                    <header id="header">    
                        <div className="header-list">
                            <FontAwesomeIcon className="header-list_icon" icon={faList} />
                        </div>
                        <h2 className="nameWeb">TTFilm</h2>
                        <nav className="nav">
                            <ul className="navcontainer">
                                <li className="nav-item"><Link to="/" className="nav-item_link">Trang Chủ</Link></li>
                                <li className="nav-item nav-item_hover">
                                    <a className="nav-item_link" href="">Thể Loại</a>
                                    <div className="subnav-genr">
                                        <ul className="genr-list">
                                            <li className="genr-list-item"><Link to="/genre/hanh-dong" className="genr-list-item_link">Hành Động</Link></li>
                                            <li className="genr-list-item"><Link to="/genre/tinh-cam" className="genr-list-item_link">Tình Cảm</Link></li>
                                            <li className="genr-list-item"><Link to="/genre/hai-huoc" className="genr-list-item_link">Hài Hước</Link></li>
                                            <li className="genr-list-item"><Link to="/genre/gia-dinh" className="genr-list-item_link">Gia Đình</Link></li>
                                        </ul>
                                        <ul className="genr-list">
                                            <li className="genr-list-item"><a href="/genre/chinh-kich" className="genr-list-item_link">Chính Kịch</a></li>
                                            <li className="genr-list-item"><a href="/genre/hoat-hinh" className="genr-list-item_link">Anime</a></li>
                                            <li className="genr-list-item"><a href="/genre/khoa-hoc" className="genr-list-item_link">Khoa Học</a></li>
                                            <li className="genr-list-item"><a href="/genre/phieu-luu" className="genr-list-item_link">Phiêu Lưu</a></li>
                                        </ul>
                                        <ul className="genr-list">
                                            <li className="genr-list-item"><a href="/genre/chien-tranh" className="genr-list-item_link">Chiến Tranh</a></li>
                                            <li className="genr-list-item"><a href="/genre/the-thao" className="genr-list-item_link">Thể Thao</a></li>
                                            <li className="genr-list-item"><a href="/genre/lich-su" className="genr-list-item_link">Lịch Sử</a></li>
                                            <li className="genr-list-item"><a href="/genre/bi-an" className="genr-list-item_link">Bí Ẩn</a></li>
                                        </ul>
                                        <ul className="genr-list">
                                            <li className="genr-list-item"><a href="/genre/tam-li" className="genr-list-item_link">Tâm Lí</a></li>
                                            <li className="genr-list-item"><a href="/genre/co-trang" className="genr-list-item_link">Cổ Trang</a></li>
                                            <li className="genr-list-item"><a href="/genre/vo-thuat" className="genr-list-item_link">Võ Thuật</a></li>
                                            <li className="genr-list-item"><a href="/genre/kinh-di" className="genr-list-item_link">Kinh Dị</a></li>
                                        </ul>
                                        <ul className="genr-list">
                                            <li className="genr-list-item"><a href="/genre/truyen-hinh" className="genr-list-item_link">Truyền Hình</a></li>
                                            <li className="genr-list-item"><a href="/genre/than-thoai" className="genr-list-item_link">Thần Thoại</a></li>
                                            <li className="genr-list-item"><a href="/genre/vien-tuong" className="genr-list-item_link">Viễn Tưởng</a></li>
                                            <li className="genr-list-item"><a href="/genre/am-nhac" className="genr-list-item_link">Âm Nhạc</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="nav-item"><Link to="/danh-sach/phim-le" className="nav-item_link">Phim Lẻ</Link></li>
                                <li className="nav-item"><Link to="/danh-sach/phim-bo" className="nav-item_link">Phim Bộ</Link></li>
                                <li className="nav-item topphim-hover">
                                    <a className="nav-item_link" href="">Top Film</a>
                                    <div className="subnav-topphim">
                                        <ul className="topphim-list">
                                            <li className="topphim-list-item"><a className="topphim-list-item_link" href="">Top IMDB</a></li>
                                            <li className="topphim-list-item"><a className="topphim-list-item_link" href="">Netflix Film</a></li>
                                            <li className="topphim-list-item"><a className="topphim-list-item_link" href="">Marvel Film</a></li>
                                        </ul>
                                        <ul className="topphim-list">
                                            <li className="topphim-list-item"><a className="topphim-list-item_link" href="">Hot Film</a></li>
                                            <li className="topphim-list-item"><a className="topphim-list-item_link" href="">DC Comic</a></li>
                                            <li className="topphim-list-item"><a className="topphim-list-item_link" href="">HD Film</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div className="user_search">
                            <div className="user_search-search" onClick={hanldeSearchIconClick}>
                                <FontAwesomeIcon className="user_search-searchicon" icon={faMagnifyingGlass} />
                            </div>
                            <div className="account">
                                <Link to="/login" className="user-link">
                                    <FontAwesomeIcon className="account-icon" icon={faUser} />
                                </Link>
                            </div>
                            <div className={`inputbox transition-inputbox ${isOpen ? 'open' : ''}`}>
                                <input onKeyDown={handleKeyDown} ref={inputBox} placeholder="Search Film Name" className="input-search" type="text" />
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        </header>
    );
}

export default Header