import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    // 각각의 board 들은 ITodo 형식의 object로 구성된 배열을 가짐
    "To Do": [],
    Doing: [],
    Done: [],
    Hello: [],
  },
});
