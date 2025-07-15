import logoImg from '../assets/quiz-logo.png'

const Header = props => {
    return <header>
        <img src={logoImg} alt="Quiz Logo" />
        <h1>ReactQuiz</h1>
    </header>
}

export default Header;