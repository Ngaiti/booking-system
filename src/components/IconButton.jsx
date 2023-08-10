import { Button } from "react-bootstrap";

export default function IconButton({
    isTop,
    isBottom,
    className,
    onClick,
    text,
    href
}) {
    let margin;

    if (isTop) {
        margin = ``;
    } else if (isBottom) {
        margin = ``;
    } else {
        margin = ``;
    }
    const iconMargin = text ? " me-3" : " ";

    return (
        <Button variant={margin} onClick={onClick} href={href}>
            <i
                className={className + iconMargin}
                style={{ fontSize: isBottom ? "60px" : "24px", color: isTop ? "white" : "black" }}
            ></i>
            {text}
        </Button>
    );
}