import { Dropdown } from 'react-bootstrap';

export default function PlatformDropdown({ platforms, setSelectedPlatform, handleResetPlatform }) {
    const firstEightPlatforms = platforms.slice(0, 8);

    return (
        <Dropdown className='m-3'>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Platforms
            </Dropdown.Toggle>
            <Dropdown.Menu className='mx-2'>
                {firstEightPlatforms.map((platform) => (
                    <Dropdown.Item key={platform.id} onClick={() => setSelectedPlatform(platform.name)}>
                        {platform.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}