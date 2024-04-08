import { useState } from "react";
import LoginForm from "../../components/forms/login-form.component/login-form.component";

const Home = () => {
    //TODO: create conditional logic to render a different component based on users authenticated status
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setIsAuthenticatedFromLogin = (data) => {
        setIsAuthenticated(data);
    };

    return (
        <div>
            {isAuthenticated && (
                <div>
                    <h1>Successfully authenticated</h1>
                </div>
            )}
            {!isAuthenticated && (
                <div>
                    <h1>Please login to continue:</h1>
                    <LoginForm setIsAuthenticatedFromLogin={setIsAuthenticatedFromLogin}/>
                </div>
            )}
        </div>
    );
}
export default Home;