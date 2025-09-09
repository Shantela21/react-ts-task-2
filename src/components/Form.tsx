import React from 'react'

export default function Form() {
  return (
    <form className='form'>
      <label>
        <input type="text" className="title" placeholder="Title" />
        <br></br>
        <input type="text" className="link" placeholder="Link(url)" />
        <br></br>
        <input type="text" className="description" placeholder="Description" />
        <br></br>
      </label>
    </form>
  );
}
