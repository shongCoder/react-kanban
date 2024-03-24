import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import { memo } from "react";

const Card = styled.div<{ isDragging: boolean }>`
  position: relative;
  padding: 15px 20px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 15px 15px rgba(59, 68, 74, 0.1)" : "none"};
  border: 1px solid #c1c8d0;
  &::before {
    position: absolute;
    top: 10px;
    left: -1px;
    display: inline-block;
    content: "";
    width: 5px;
    height: 24px;
    border-radius: 2px;
    background-color: ${(props) => props.theme.accentColor};
  }
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps} // 해당 속성이 적용된 요소를 클릭해야 옮길 수 있음
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
