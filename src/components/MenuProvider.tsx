import Raffls from './Raffls';
import WhiteList from './WhiteList';

function MenuProvider({menuEl}:{menuEl:any}) {
    
    if (menuEl == 'Raffls') return (<Raffls/>)
    if (menuEl == 'Championship') return (<div>{menuEl}</div>)
    else return(<WhiteList/>)
}

export default MenuProvider