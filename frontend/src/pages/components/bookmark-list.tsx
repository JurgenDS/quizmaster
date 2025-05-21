import type React from 'react'

interface BookmarkListProps {
    bookmarks: { title: string; onClick: () => void }[]
}

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks }) => (
    <table data-testid="bookmark-list">
        <tbody>
            {bookmarks.map(bookmark => (
                <tr key={bookmark.title}>
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
