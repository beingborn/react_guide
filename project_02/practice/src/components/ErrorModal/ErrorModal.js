import classes from './ErrorModal.module.css'

const ErrorModal = ({open = false, errorMessage, onClose}) => {
    return (
        <>
            {open && <div onClick={onClose} className={classes.backdrop}></div> }
            <dialog open={open} className={classes.modal}>
                <div className={classes.header}>
                    <h2>유효성 검증 오류</h2>
                </div>
                <div className={classes.content}>
                    {errorMessage.userName && <p>{errorMessage.userName}</p>}
                    {errorMessage.age && <p>{errorMessage.age}</p>}
                </div>
                <button onClick={onClose} type="button" className={classes.actions}>
                    확인
                </button>
            </dialog>
        </>

    )
}

export default ErrorModal;