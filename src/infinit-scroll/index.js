import { useState, useRef, useCallback } from 'react';
import useBookSearch from "./useBookSearch";

const InfiniteScroll = () => {
    const [query, setQuery] = useState("")
    const [pageNumber, setPageNumber] = useState(1)

    const { loading, error, hasMore, books } = useBookSearch(query, pageNumber)

    const observer = useRef(null)
    const lastBookElementRef = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })

        if (node) observer.current.observe(node)

    }, [loading, hasMore])

    const handleSearch = (event) => {
        setQuery(event.target.value)
        setPageNumber(1)
    }
    return (
        <div>
            <input type="text" value={query} placeholder="Search Books..." onChange={handleSearch} />

            <div>
                {
                    books.map((book, index) => {
                        if (books.length === index + 1) {
                            return <div ref={lastBookElementRef} key={book}>{book}</div>
                        } else {
                            return <div key={book}>{book}</div>
                        }
                    })
                }
                {loading && <p>loading...</p>}
                {error && <p>error</p>}
            </div>
        </div>
    )
}

export default InfiniteScroll