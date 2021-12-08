import Card from "../components/shared/Card"
import {Link} from 'react-router-dom'

function AboutPage() {
    return (
        <Card>
            <div className="about">
                <h1>About</h1>
                <p>This is a React app to leave feedback on a product</p>
                <p>Version 1.0.0</p>
                <p>
                    <Link to="/">Home</Link>
                </p>
            </div>
        </Card>
    )
}

export default AboutPage
