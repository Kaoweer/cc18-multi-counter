function App() {
  const [counters,setCounters] = React.useState([
    {id : 1,
    number : 0
    }
  ])
  const [sum,setSum] = React.useState(0)
  let curSum = sum
  
  const updateCounter = (id,num) => {
    let index = counters.findIndex((el) => el.id == id)
    const newCounter = [...counters]
    if (newCounter[index].number + num < 0){
      return
    }
    newCounter[index].number += num
    setCounters([...newCounter])
    setSum(counters.reduce((prv,cur) => prv+cur.number,0))
  }
  
  const removeCounter = (id) => {
    let index = counters.findIndex((el) => el.id == id)
    let removedArr = [...counters]
    removedArr.splice(index,1)
  if (removedArr < 1){
    return
  }
    setCounters(removedArr)
    setSum(removedArr.reduce((prv,cur) => prv+cur.number,0))
  }
  const addCounter = () =>{
    console.log('activated')
    // {id : counters[counters.length-1].id+1,number:0}
    setCounters(prv => [...prv,{id : counters[counters.length-1].id+1,number:0}])
    // console.log(counters[counters.length-1].id+2)
  }
  const updateAll = () => {
    let updatedCounter = counters.map(el => ({id : el.id, number:el.number+1}))
    setCounters(updatedCounter)
    setSum(updatedCounter.reduce((prv,cur) => prv+cur.number,0))
  }

  return (
    <div>
      <h1>Sum : {curSum}</h1>
      <button onClick = {addCounter}>Add counter</button>
      <button onClick = {updateAll}>Add all</button>
      <hr />
    {counters.map(el => (
        <Counter key = {el.id} 
        item = {el} 
        updateCounter = {updateCounter} 
        removeCounter = {removeCounter}/>
    ))}
    </div>
  );
}

function Counter(props) {
  const {item,updateCounter,removeCounter} = props
  return (
    <div className="counter">
      <button onClick = {() => updateCounter(item.id,-1)} className="btn btn-dec">-</button>
      <h3 className="number" key = {item.id}>{item.number}</h3>
      <button onClick = {() => updateCounter(item.id,1)} className="btn btn-inc">+</button>
      <button onClick = {() => updateCounter(item.id,-item.number)} className="btn btn-clr">C</button>
      <button onClick = {() => removeCounter(item.id)} className="btn btn-clr">X</button>
    </div>
  );
}




ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
