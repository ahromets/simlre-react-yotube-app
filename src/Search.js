import React, {Component} from 'react';

class Search extends Component {

    render() {
        const { onInptChange, onBtnClick, searchTerm } = this.props;

        return (
            <form onSubmit={onBtnClick}>
                <input
                    placeholder="Введите текст"
                    value={searchTerm}
                    onChange={onInptChange}
                />
                <button type="submit">Поиск</button>
            </form>
        );
    }
}

export default Search;
