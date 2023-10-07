import './styles.css';

function Input({ etiqueta, type, name, value, onChange, modal, placeholder }) {
    return (
        <div className='container__input'>
            <label
                className='input__label'
                htmlFor={name}
            >{etiqueta}</label>
            <input
                className={`input ${modal}`}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
}

export default Input;