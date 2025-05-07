export const TimeOutReachedModal = ({
    timeoutReached,
}: {
    timeoutReached: boolean
}) => {

    return (
        <dialog
            open={timeoutReached}
        ><div data-testId="modal-timeout">Game over time</div></dialog>
    )
}
