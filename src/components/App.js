import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([])

  function addQuestion(newItem){
    setQuestions([...questions, newItem])
  }

  function deleteQuestion(liftedItem){
    const updatedQuestions = questions.filter((item)=>item.id !== liftedItem.id)
    setQuestions(updatedQuestions)
  }

  function updateAnswer(event){ 
    const updatedQuestions = questions.map((item) =>{
      if(item.id === event.id) {
        return event
      }else {
        return item
      }
    })
    setQuestions(updatedQuestions)
  }

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((res)=> res.json())
    .then((q)=> setQuestions(q))
  },[])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={addQuestion} /> 
      : <QuestionList 
          questions={questions} 
          onDelete={deleteQuestion}
          onUpdate={updateAnswer} />}
    </main>
  );
}

export default App;