import React, { ChangeEvent, useState } from 'react';
import { Container, InputGroup, FormControl } from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (keywords: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [ keywords, setKeywords ] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newKeywords = event.target.value;
        setKeywords(newKeywords);
        onSearch(newKeywords);
    };

    return (
        <Container>
            <InputGroup className='mb-3'>
                <FormControl
                    onChange={handleChange}
                    value={keywords}
                    placeholder='Search...'
                    className='search-bar'
                />
            </InputGroup>
        </Container>
    );
};