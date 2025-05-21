import React from 'react'

interface BookmarkListProps {
    bookmarks: { title: string; onClick: () => void }[]
}

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks }) => (
    <table data-testid="bookmark-list">
        <tbody>
            {bookmarks.map((bookmark, idx) => (
                <tr key={bookmark.title + idx}>
                    <td>
                        <button type="button" onClick={bookmark.onClick}>
                            {bookmark.title}
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)
