import React from "react";

export default function RatesTable(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <button onClick={() => props.sortBy('currency')}>Currency</button>
          </th>
          <th>
            <button onClick={() => props.sortBy('rate')}>Rate</button>
          </th>
          <th>
            <button onClick={() => props.sortBy('bid')}>Bid</button>
          </th>
          <th>
            <button onClick={() => props.sortBy('ask')}>Ask</button>
          </th>
          <th>
            <button onClick={() => props.sortBy('high')}>High</button>
          </th>
          <th>
            <button onClick={() => props.sortBy('low')}>Low</button>
          </th>
          <th>
            <button onClick={() => props.sortBy('open')}>Open</button>
          </th>
          <th>
            <button onClick={() => props.sortBy('close')}>Close</button>
          </th>
          <th>
            <button onClick={() => props.sortBy('timestamp')}>Time</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((row) => (
          <tr>
            <td>{row.currency}</td>
            <td>{row.rate}</td>
            <td>{row.bid}</td>
            <td>{row.ask}</td>
            <td>{row.high}</td>
            <td>{row.low}</td>
            <td>{row.open}</td>
            <td>{row.close}</td>
            <td>{row.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
