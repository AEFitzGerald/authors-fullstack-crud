import './App.css';
import AuthorList from './components/AuthorList';
import AuthorForm from './components/AuthorForm';
import AuthorUpdate from './components/AuthorUpdate';
import { BrowserRouter, Route, Switch} from "react-router-dom";



function App() {


    return (
            <BrowserRouter> 
                <Switch>

                    <Route exact path="/">
                        <AuthorList/>
                    </Route>

                    <Route exact path="/add">
                        <AuthorForm/>
                    </Route>
            
                    <Route exact path="/author/update/:id">
                        <AuthorUpdate/>
                    </Route>

                </Switch>

            </BrowserRouter>
    )
}
export default App;
