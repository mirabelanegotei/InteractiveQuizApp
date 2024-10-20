import styles from '../styles/modalDialog.module.css';

const ModalDialog = ({message, onConfirm, onCancel}) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h1>{message}</h1>
                <div>
                    <button onClick={onConfirm}>OK</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default ModalDialog;