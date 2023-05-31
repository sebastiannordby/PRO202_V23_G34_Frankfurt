import { HomeArrow } from "../components/HomeArrow";

export const metadata = {
    title: 'Quiz',
  }
  
export default function QuizPage() {
    return(
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content">
                <h1 className="page-title">Aktiviteter</h1>
                <ul className="text-sm">
                    <li>Morsomme spill med din klasse</li>
                    <li>Reflektive spørsmål - vekk ditt indre</li>
                </ul>
            </div>
        </main>
    );
}