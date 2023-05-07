import React, { useState, useEffect } from "react";
import users from "./users.json";
import User from "./User";
import DragContextProvider from "./components/DragContext";
import DragArea from "./components/DragArea";
import "./App.css"

export default function App() {
  const [items, setItems] = useState<User[]>([]);

  useEffect(() => {
    setItems([...users]);
  }, []);

  const handleDragEnd = (newUsersList: User[]) => {
    setItems(newUsersList);
    console.log("new", newUsersList);
    console.log("items", items);
  };

  return (
    <div className="App">
      <h1>Drag and Drop Demo</h1>
      <DragContextProvider items={items}>
        <DragArea items={items} onChange={setItems} onDragEnd={handleDragEnd}>
        </DragArea>
      </DragContextProvider>
    </div>
  );
}
