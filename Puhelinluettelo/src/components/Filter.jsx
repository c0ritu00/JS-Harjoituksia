const Filter = ({ handleSearch }) => {
    return (
      <div>
        Filter: <input onChange={handleSearch} />
      </div>
    )
  }
export default Filter