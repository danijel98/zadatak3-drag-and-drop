import { useState, useCallback } from "react";
import User from "../User";
import UserItem from "./UserItem";
import style from './dragAndDrop.module.css'


interface Props {
  items: User[];
  onChange: (items: User[]) => void;
  children: React.ReactElement[];
  onDragEnd: (newUsersList: User[]) => void;
}

const DragArea = ({ items, onDragEnd }: Props) => {
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLLIElement>, index: number) => {
      event.dataTransfer.setData("text/plain", items[index].id.toString());
      setDraggedItemIndex(index);
    },
    [items]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLLIElement>, index: number) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLLIElement>, index: number) => {
      event.preventDefault();
      if (draggedItemIndex === null) return;

      const newItems = [...items];
      const [removed] = newItems.splice(draggedItemIndex, 1);
      newItems.splice(index, 0, removed);
      onDragEnd(newItems);
      setDraggedItemIndex(null);
    },
    [draggedItemIndex, items, onDragEnd]
  );

  return (
    <div className={style.containerArea}>
      <ul>
        {items.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDrop={(event) => handleDrop(event, index)}
          >
            <UserItem name={item.firstName} email={item.email}></UserItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DragArea;
