const SearchBox = (props) => {
    return ( 
        <div className="col col-sm-4">
            <input
            className="form-control"
            type="text"
            value={props.value}
            onChange={(e)=> props.setSearchValue(e.target.value)}
            placeholder="Search a movie..."
             />
        </div>
     );
}
 
export default SearchBox;