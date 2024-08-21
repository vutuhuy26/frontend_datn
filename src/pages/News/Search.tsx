import { AiOutlineSearch } from 'react-icons/ai';
import classNames from 'classnames/bind';
import styles from './News.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('search')}>
            <input className={cx('search-input')} type="text" placeholder="Tìm kiếm..." />
            <span className={cx('icon-search')}>
                <AiOutlineSearch />
            </span>
        </div>
    );
}

export default Search;
