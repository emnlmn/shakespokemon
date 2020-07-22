import React from 'react';

type Props = {
  searchTerm: string,
  updateSearchTerm: (searchTerm: string) => void,
  onSubmit: () => void,
};

const searchForm = (props: Props) => {
  return(
    <form onSubmit={(event) => { event.preventDefault(); props.onSubmit(); }}>
      <input
        type="text"
        value={props.searchTerm}
        onChange={event => props.updateSearchTerm(event.target.value)}
        placeholder={"Enter a Pokemon name"}
      />
      <button type={'submit'}>Search</button>
    </form>
  )
}

export default searchForm;