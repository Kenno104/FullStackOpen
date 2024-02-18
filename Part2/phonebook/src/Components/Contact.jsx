const Contact = ({ person, name, number, handleDelete }) => {
    return (
    <p>{name} {number} <button onClick={() => handleDelete(person.id)}>delete</button></p>
    )}

export default Contact