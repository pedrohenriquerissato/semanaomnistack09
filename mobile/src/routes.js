import { createAppContainer, createSwitchNavigator} from 'react-navigation';

//Existem vários tipos de navegação. Na documentação do react navigation pode consutlar. a Switch navigation é uma delas

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })    
);

export default Routes;