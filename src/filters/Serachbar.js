import React from 'react'

const Serachbar = ({handleInputChange, search}) => {
    return (
        <div className='searchbar'>
            <form>
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search..."
                    className='search-input'
                    value={search}
                    onChange={handleInputChange}
                />
                <button className="search-btn">Search</button>
            </form>
        </div>
    )
}

export default Serachbar