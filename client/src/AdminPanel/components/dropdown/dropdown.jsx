import React,{useRef} from 'react'
import './dropdown.css'


const clickOutsideRef=(content_ref,toggle_ref)=>{
    document.addEventListener('mousedown',(e)=>{


      // e.tarter is click of mouse.
      // toggle_ref is parent
      // content_ref ref is child

      // parent k under sy targer fire ho raha h tuo active class laga de
        if(toggle_ref.current && toggle_ref.current.contains(e.target)){
         
            content_ref.current.classList.add('active')
        }
        else{
          // agr child k under sy target fire ho tuo active class remove kr de
            if(content_ref.current && ! content_ref.current.contains(e.target)){
             
                content_ref.current.classList.remove('active')
            }
        }
    })
}
const DropDown = (props) => {

    const dropdown_toggle_el=useRef(null);
    const dropdown_content_el=useRef(null)
    clickOutsideRef(dropdown_content_el,dropdown_toggle_el)
  return (
    <div className="dropdown">
      <button  ref={dropdown_toggle_el}className="dropdown__toggle">
        {props.icon ? <i className={props.icon}></i> : ''}
        {props.badge ? (
          <span className="dropdown__toggle-badge">{props.badge}</span>
        ) : (
          ''
        )}

        {
            props.customToggle? props.customToggle():''
        }
      </button>
      <div  ref={dropdown_content_el}className="dropdown__content">
          {
              props.contentData && props.renderItems?props.contentData.map((item,index)=>props.renderItems(item,index)):''
          }
          {
              props.renderFooter?(
                  <div className="dropdown__footer">
                      {props.renderFooter()}
                  </div>

              ):''
          }
      </div>
    </div>
  )
}

export default DropDown
