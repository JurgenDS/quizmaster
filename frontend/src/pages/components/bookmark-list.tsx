import React from 'react'

interface BookmarkListProps {
    bookmarks: { title: string; onClick: () => void }[]
}

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks }) => (
    <ul data-testid="bookmark-list">
        {bookmarks.map((bookmark, idx) => (
            <li key={bookmark.title + idx}>
                <button type="button" onClick={bookmark.onClick}>
                    {bookmark.title}
                </button>
            </li>
        ))}
    </ul>
)
