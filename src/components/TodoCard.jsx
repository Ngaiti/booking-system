import { useContext } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import Rating from "react-rating";

export default function TodoCard({ todo }) {
    const completed = todo.completed;
    const border = completed ? "success" : "danger";
    const setTodos = useContext(TodoContext).setTodos;


    const deleteTodo = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            setTodos((prevTodos) =>
                prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
            );
        }
    };

    return (
        <>
            <Card border={border} className="my-3 border-2">
                <Card.Header as="h6">{!completed && "Not"} Completed</Card.Header>
                <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                    <Rating initialRating={0} emptySymbol="bi bi-star" fullSymbol="bi bi-star-fill" onChange={(rating) => console.log(rating)} />
                    <div className="d-flex justify-content-center align-items-center">
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary" href={`todo/${todo.id}`} >
                                <i className="bi bi-pencil"></i>
                            </Button>
                            <Button variant="secondary" onClick={deleteTodo} >
                                <i className="bi bi-trash3"></i>
                            </Button>
                        </ButtonGroup>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}