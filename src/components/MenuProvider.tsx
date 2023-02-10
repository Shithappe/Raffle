import Raffls from './Raffls';
import WhiteList from './WhiteList';
import Battle from './Battle';

function MenuProvider({menuEl}:{menuEl:any}) {

    switch (menuEl) {
        case 'Raffles': return (<Raffls/>);
        case 'White List': return (<WhiteList/>);
        case 'Battle': return (<Battle/>);
        default: return ( <div></div> )
    }
}

export default MenuProvider