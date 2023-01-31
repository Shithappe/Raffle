import Raffls from './Raffls';
import WhiteList from './WhiteList';

function MenuProvider({menuEl}:{menuEl:any}) {
    
    if (menuEl == 'Raffles') return (<Raffls/>)
    else return(<WhiteList/>)
}

export default MenuProvider