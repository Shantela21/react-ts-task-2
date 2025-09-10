import React from 'react'

export default function Table() {
  return (
    <div>
      <div className="links">
        <strong>Added Links</strong>
        <table
          className="table"
          style={{
            width: "80%",
            border: "1px solid red",
            borderCollapse: "collapse",
          }}
        >
          <tr>
            <th>Title</th>
            <th>Link</th>
            <th>Tag</th>
            <th>Description</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  );
}
