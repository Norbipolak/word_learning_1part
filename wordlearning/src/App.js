import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./styles/style.scss";
import Lessons from './components/Lessons';
import Lesson from './components/Lesson';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
library.add(
    faArrowUpRightFromSquare
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Lessons/>}/>
                <Route path="/lesson/:lessonID" element={<Lesson/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
