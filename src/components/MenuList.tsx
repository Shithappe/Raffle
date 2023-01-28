import React, { useState } from 'react'

function MenuList() {
    const menu =['Raffls', 'White List', 'Vote', 'Battle', 'Championship'];
    const [menuSelect, setMenuSelect] = useState('Raffls');
    const listMenu = menu.map((menu_el: string) => <button onClick={handelMenuElement}>{menu_el}</button>);

    function handelMenuElement(e: any) {

        let foo = document.getElementsByClassName("menu")[0].children;
        for (var i = 0; i < foo.length; i++) foo[i].classList.remove("active_tab");
        e.currentTarget.classList.add("active_tab");
    
        setMenuSelect(e.target.innerText)
    }

    document.getElementsByClassName("menu")[0].children[0].classList.add("active_tab")

  return (
    <div className="menu">
            {listMenu}
            <hr />
          </div>
  )
}

export default MenuList