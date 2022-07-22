export default function Square(props) {
    return (
        <input
            className="cellInput"
            maxLength="1"
            value={props.value}
            onChange={(e) => props.onChange(e)}
            disabled={props.disabled}
            readOnly={props.readOnly}
        ></input>
    );
}
