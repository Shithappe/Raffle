import Raffls from './Raffls';
import WhiteList from './WhiteList';
import Battle from './Battle';
import Championship from './Championship';

function MenuProvider({menuEl}:{menuEl:any}) {

    switch (menuEl) {
        case 'Raffles': return (<Raffls/>);
        case 'Battle': return (<Battle/>);
        case 'White List': if (localStorage.getItem('discord_data')) return (<WhiteList/>);
        case 'Championship': return (<Championship/>);
        default: return ( <div></div> )
    }
}

export default MenuProvider