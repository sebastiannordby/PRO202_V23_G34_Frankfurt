import { HomeArrow } from "../components/HomeArrow";

export const metadata = {
    title: 'Quiz',
  }
  
export default function QuizPage() {
    return(
        <main className="main-layout">
            <HomeArrow />
            <h1 className="page-title">Quiz</h1>
            <p className="text-white text-sm">Morsomme spill med din klasse</p>
        </main>
    );
}