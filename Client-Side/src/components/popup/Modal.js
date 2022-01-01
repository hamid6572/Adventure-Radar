import classes from "./Modal.module.css"
function Modal(props){
    return (
        <div className={classes.modal}>
            <p>Are you sure?</p>
            <button className={classes.btn} onClick={props.onCancel}>Cancel</button>
            <button className={classes.btn} onClick={props.onConfirm}>Confirm</button>
        </div>
    );
}
export default Modal;