function Modal(active:any, setActive:any) {

  console.log(active.active);
  // console.log(setActive);
  


  return (
    <div className={active.active ? "modal_active" : "modal"}>
        <div className="modal_content">

        </div>
    </div>
  )
}

export default Modal