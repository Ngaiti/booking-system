import { Dropdown } from 'react-bootstrap';

export default function GameSortDropdown({ sortBy, setSortBy }) {
    return (
        <Dropdown className='m-3'>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu className='mx-2'>
                <Dropdown.Item onClick={() => setSortBy('metacritic')}>Popularity</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('released')}>Release Date</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('name')}>Name</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

