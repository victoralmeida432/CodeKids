import Arrow from "../../assets/arrow_solid.svg"
const Toolbar = (props) => {
  return (
    <div style={{width: "100%", height: "45px", position: "relative"}}>
      <img
        onClick={() => window.history.back()}
        src={Arrow}
        style={{position: "absolute", left:0, top:0, bottom:0, margin:"auto 10px"}}/>
    </div>
  )
}

export default Toolbar
