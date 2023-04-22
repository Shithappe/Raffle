import Raffls from './Raffls';
import WhiteList from './WhiteList';
import Battle from './Battle';
import Championship from './Championship';

function MenuProvider({menuEl}:{menuEl:any}) {

    switch (menuEl) {
        case 'Raffles': return (<Raffls/>);
        case 'White List': if (localStorage.getItem('discord_data')) return (<WhiteList/>);
        case 'Battles': return (<Battle/>);
        case 'Championship': return (<Championship/>);
        default: return ( <div></div> )
    }
}

export default MenuProvider