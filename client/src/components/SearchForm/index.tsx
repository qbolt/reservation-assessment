import * as React from 'react'
import Input from '../Input'
import { SearchWrapper } from './styled'

interface Props {
  query: {
    [key: string]: any
  }
  onChange: (event: React.FormEvent<HTMLInputElement>) => void
}

const SearchForm = ({ query, onChange }: Props) => {
  return (
    <SearchWrapper>
      <Input placeholder='Reservation Id' name='_id' type='text' onChange={onChange} value={query._id}/>
      <Input placeholder='Guest First Name' name='firstName' type='text' onChange={onChange} value={query.firstName}/>
      <Input placeholder='Guest Last Name' name='lastName' type='text' onChange={onChange} value={query.lastName}/>
      <Input placeholder='Brand' name='brand' type='text' onChange={onChange} value={query.brand}/>
      <Input placeholder='Location' name='location' type='text' onChange={onChange} value={query.location}/>
    </SearchWrapper>
  )
}

export default SearchForm
