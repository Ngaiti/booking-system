import { Modal, Form, Button } from "react-bootstrap";


export default function ReviewCardModal({ show, onClose, onSave, selectedReview, newReview, handleChange }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedReview ? 'Edit Review' : 'Create New Review'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={newReview.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={newReview.date}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="content"
                            value={newReview.content}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="number"
                            name="rating"
                            value={newReview.rating}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="btn btn-outline-info" onClick={selectedReview ? onSave : onSave}>
                    {selectedReview ? 'Update Review' : 'Create Review'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}