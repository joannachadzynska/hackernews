import React from 'react';

const Search = ({ value, onChange, children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="search">{children}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        id="search"
        name="search"
      />
      <button type="submit">{children}</button>
    </form>
  );
};

export default Search;
