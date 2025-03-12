import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import Startscreen from "./Startscreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initalState={
  questions:[],
  //loading,error,ready,active,finished
  status:'loading',
  index:0,
  answer:null,
  points:0,
  highscore:0,
  secondRemaining:null
}

const SECS_PER_QUESTION=30
function reducer(state,action){
  switch(action.type){
    case "dataRecieved":
      return {...state,questions:action.payload,status:'ready'}
    case "dataFailed":
      return {...state,status:'error'}
    case 'start':
      return {...state,status:'active',secondRemaining:state.questions.length*SECS_PER_QUESTION}
    case 'newAnswer':
      const question=state.questions.at(state.index)
      return {
        ...state,
        answer:action.payload,
        points:action.payload===question.correctOption?state.points+question.points:state.points
      }
    case 'nextQuestion':
      return {...state,index:state.index+1,answer:null}
    case 'finish':
      return {...state,status:'finished',highscore:state.points>state.highscore?state.points:state.highscore}
    case 'restart':
      return {...initalState,questions:state.questions,status:"ready"}
    case 'tick':
      return {...state,secondRemaining:state.secondRemaining-1,status:state.secondRemaining===0?"finished":state.status}
    default:
       throw new Error ("Action unknown")
  }
}

export default function App(){

 
  const [{questions,status,index,answer,points,highscore,secondRemaining},dispatch]=useReducer(reducer,initalState)

  const numQuestions=questions.length
  const maxPossiblePoints=questions.reduce((a,b)=>a+b.points,0)


  useEffect(function(){
    fetch(`http://localhost:8000/questions`).then((res)=>
      res.json()).then(data=>dispatch({type:'dataRecieved',payload:data})).catch((err)=>dispatch({type:'dataFailed'}))

  },[])

  return(
    <div className="app">
      <Header/>
      <Main>
        {status==='loading'&&<Loader/> }
        {status==='error'&&<Error/> }
        {status==='ready'&&<Startscreen numQuestions={numQuestions} dispatch={dispatch}/> }
        {status==='active'&&
        <>
        <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
        <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
        <Footer>
        <Timer dispatch={dispatch} secondRemaining={secondRemaining}/>
        <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index}/>
        </Footer>
        </>
         }
        {status==='finished'&&<FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </div>
  )
}