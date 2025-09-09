import React from 'react'

export default function SearchBar() {
  return (
    <div>
       <div className="search-container" style={{}}>
         <form action="/action_page.php">
           <input type="text" placeholder="Search.." alt="search"></input>
             <button type="submit"><i className="fa fa-search"></i></button>
         </form>
  </div>
    </div>
  );
}
