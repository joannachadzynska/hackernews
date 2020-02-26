import React from 'react';
import TableItem from './TableItem';

const Table = ({ list, onDismiss }) => {
  return (
    <div className="table">
      {list.map(item => (
        <TableItem
          key={item.objectID}
          item={item}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};
export default Table;
