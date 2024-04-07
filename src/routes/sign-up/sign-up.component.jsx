import AddUserForm from '../../components/forms/add-user-form.component/add-user-form.component';
import './sign-up.styles.css';

const SignUp = () => {
    return (
        <div>
            <AddUserForm formType={"create"}/>
        </div>
    );
}

export default SignUp;