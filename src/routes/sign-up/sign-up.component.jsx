import AddUserForm from '../../components/forms/add-user-form.component/add-user-form.component';
import './sign-up.styles.css';

const SignUp = () => {
    return (
        <div>
            <h1>Create an account to find your circle today!</h1>
            <AddUserForm formType={"create"}/>
        </div>
    );
}

export default SignUp;