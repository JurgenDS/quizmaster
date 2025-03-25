export const LoadedIndicator = ({ isLoaded }: { isLoaded: boolean }) => (
    <input id="is-loaded" type="hidden" value={isLoaded ? 'loaded' : ''} />
)

export const QuestionLink = ({ url }: { url: string }) =>
    url && <a id="question-link" href="{url}">{url}</a>

export const QuestionEditLink = ({ editUrl }: { editUrl: string }) =>
    editUrl && <a id="question-edit-link" href={editUrl}>{editUrl}</a>

export const ErrorMessage = ({ errorMessage }: { errorMessage: string }) =>
    errorMessage && <span id="error-message">{errorMessage}</span>
