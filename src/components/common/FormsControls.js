import c from './common.module.css'

export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={hasError ? c.error : ''}>
            <input {...input} {...props} />
            {hasError && <div>{meta.error}</div>}
        </div>
    )
}