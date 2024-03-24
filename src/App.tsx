import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  margin: 50px 50px 50px 50px;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.boardColor};
  flex: none;
  display: block;
  margin-bottom: 30px;
  border-radius: 3px;
  border: 1px solid #b3c6fd;
`;

const BoardWrap = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
`;

const Boards = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]; // 보드에 있는 모든 카드 할당
        const taskObj = boardCopy[source.index]; // 움직이려는 object(카드) 할당
        boardCopy.splice(source.index, 1); // 기존 움직인 요소 삭제
        boardCopy.splice(destination?.index, 0, taskObj); // 움직인 요소를 도착지점으로 할당
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinBoard,
        };
      });
    }
  };
  return (
    <Wrapper>
      <Header>
        <span>보드 생성</span>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardWrap>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </BoardWrap>
      </DragDropContext>
    </Wrapper>
  );
}

export default App;
