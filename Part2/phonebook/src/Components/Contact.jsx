const Contact = ({ name, number }) => {
    return (
    <p key={name}>{name} {number}</p>
    )}

export default Contact