import styles from "./Input.module.scss";

function Input(props) {
    return (
        <div className={styles.Input}>
            <input
                name={props?.name}
                onChange={props?.onChange}
                value={props?.value}
                placeholder={props?.placeholder}
                type={props.type || "text"}
            />
            {props?.value && !props?.error && <div className={styles.placeholderClose}>{props?.placeholder}</div>}
        </div>
    );
}

export default Input;
