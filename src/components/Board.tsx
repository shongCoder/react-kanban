import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  min-width: 280px;
  padding-top: 20px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.boardColor};
  border: 1px solid #b3c6fd;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.accentColor};
  padding-left: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 800;
`;

interface IAreaProps {
  draggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  // Area에 할당될 isDraggingOver의 형식을 알려줌
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#eaf0fa" // 올라갔을 때
      : "transparent"}; // 평소
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
  padding: 20px;
  height: 0 auto;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 20px;
  input {
    width: 100%;
    border: 1px solid ${(props) => props.theme.accentColor};
    outline: none;
    border-radius: 5px;
    padding: 10px;
    &:focus {
      box-shadow: 0px 0px 10px rgba(98, 116, 255, 0.3);
      border: 1px solid ${(props) => props.theme.accentColor};
    }
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
