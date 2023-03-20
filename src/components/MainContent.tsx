import { LeftContent } from "./LeftContent";
import { RightContent } from "./RightContent";

export function MainContent() {
    return (
        <div className='mainContent'>
            <h1>World Cities App</h1>
            <hr />
            <br />
            <br />
            <div className='row'>
                <div className='col'>
                    <LeftContent amount={10} />
                </div>

                <div className='col'>
                    <RightContent />
                </div>
            </div>
        </div>
    )
}