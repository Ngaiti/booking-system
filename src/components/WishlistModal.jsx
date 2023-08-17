import { Modal, Button } from 'react-bootstrap';

function WishlistModal({ show, onClose, isSuccess, message }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isSuccess ? 'Success' : 'Error'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WishlistModal;