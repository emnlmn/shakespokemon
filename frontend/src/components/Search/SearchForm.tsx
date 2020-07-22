import React from 'react';
import './SearchForm.css'

type Props = {
  searchTerm: string,
  updateSearchTerm: (searchTerm: string) => void,
  onSubmit: () => void,
};

const searchForm = (props: Props) => {
  return(

    <form className={'searchForm'} onSubmit={(event) => { event.preventDefault(); props.onSubmit(); }}>
      <input
        className={'searchInput'}
        type="text"
        value={props.searchTerm}
        onChange={event => props.updateSearchTerm(event.target.value)}
        placeholder={"Enter a Pokemon name"}
      />
    </form>
  )
}

export default searchForm;